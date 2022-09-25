import fs from 'fs';
import http from 'http';
import https from 'https';

import path from 'path';
import { fileURLToPath } from 'url';
const ___filename = fileURLToPath(import.meta.url);
const ___dirname = path.dirname(___filename);
const scanURIs = JSON.parse(
  fs.readFileSync(path.resolve(___dirname, '../data/scan-URIs.json'))
);

/**
 * @function scan
 * @desc Scan subdomains of domain
 * @param {string} domain
 */
async function scan(domain, URIs = scanURIs) {
  const result = {
    error: undefined,
    domain: domain,
    subdomains: [],
  };
  const tasks = [];

  for (let uri of URIs) {
    if (uri.match(/^#/)) {
      continue;
    }
    uri = uri.replace(/{domain}/g, domain);
    tasks.push(at(uri, domain));
  }

  return new Promise((resolve, reject) => {
    Promise.all(tasks)
      .then((results) => {
        for (const rs of results) {
          for (const r of rs) {
            if (!result.subdomains.includes(r)) {
              result.subdomains.push(r);
            }
          }
        }
        result.subdomains.sort();
        resolve(result);
      })
      .catch((error) => {
        result.error = error;
        resolve(result);
      });
  });
}

/**
 * @function at
 * @desc Find target at uri
 * @param {string} uri
 * @param {string} target
 * @param {string} method default GET
 * @param {string} ua User-Agent default Sans
 */
async function at(uri, target, method = 'GET', ua = 'Sans') {
  return new Promise((resolve, reject) => {
    target = encodeURI(target);
    const regex = new RegExp(
      '([a-zA-Z0-9_-][a-zA-Z0-9_.-]*\\.' + target.replace(/\./g, '\\.') + ')',
      'ig'
    );
    const urim = uri.match(/(https?):\/\/([^/]+)(.+)/);
    const proc = urim[1];
    const host = urim[2];
    const path = urim[3];
    const timestamp = new Date().getTime();
    const subdomains = [];
    (proc == 'http' ? http : https)
      .request(
        {
          method: method,
          host: host,
          path: path,
          headers: {
            'User-Agent': ua,
          },
        },
        (response) => {
          let d = '';
          response.on('data', (data) => {
            d += data.toString();
          });
          response.on('end', () => {
            d = d.replace(/(\\n|\\r)/gi, ' ');
            const matches = d.match(regex) || [];
            for (const m of matches) {
              //m = m.toUpperCase();
              if (!subdomains.includes(m)) {
                subdomains.push(m);
              }
            }
            //subdomains.length > 0 ? log.debug('Find ' + subdomains.length + ' ' + target + ' subdomains at ' + host + ' (' + (new Date().getTime() - timestamp) + 'ms)') : null;
            resolve(subdomains);
          });
        }
      )
      .on('error', (error) => {
        //log.error(host + ' ' + error);
        resolve(subdomains);
      })
      .end();
  });
}

export default scan;

export { scan, at };
