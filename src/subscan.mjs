import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';
const ___filename = fileURLToPath(import.meta.url);
const ___dirname = path.dirname(___filename);
const urisJson = JSON.parse(
  fs.readFileSync(path.resolve(___dirname, '../data/uris.json'))
);

import fetch from 'node-fetch';

/**
 * @function scan
 * @desc Scan subdomains of domain
 * @param {string} domain
 */
async function scan(domain, uris = urisJson) {
  const result = {
    error: undefined,
    domain: domain,
    subdomains: [],
  };
  const tasks = [];

  for (let uri of uris) {
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
 * @param {string} domain default GET
 * @param {string} ua User-Agent default Sans
 */
async function at(uri, domain) {
  const subdomains = [];
  uri = uri.replace(/{domain}/g, domain);

  return new Promise((resolve) => {
    fetch(uri, { signal: AbortSignal.timeout(5000) })
      .then(async (res) => {
        const data = await res.text();
        domain = encodeURI(domain);
        domain = domain.replace(/\./g, '\\.');
        const regex = new RegExp(`([\\w\\d.-]+\\.${domain})`, `ig`);
        const matches = data.match(regex) || [];
        subdomains.push(...matches);
        resolve(subdomains);
      })
      .catch((error) => {
        console.error(error);
        resolve(subdomains);
      });
  });
}

export default scan;

export { scan, at };
