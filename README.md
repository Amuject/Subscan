# Subscan

Simple subdomain scanner

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
  - [Scan Subdomains](#scan-subdomains)

## Installation

```
npm i subscan
```

## Usage

### Scan Subdomains

Code

ESM

```js
import subscan from 'subscan';

subscan('example.com')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    throw err;
  });
```

CJS

```js
const subscan = require('subscan').default;

subscan('example.com')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    throw err;
  });
```

<details><summary>Result</summary>

```js
{
  error: undefined,
  domain: 'example.com',
  subdomains: [
    '0.example.com',
    '001.example.com',
    '02.example.com',
    '04.example.com',
    '05.example.com',
    '06.example.com',
    '07.example.com',
    '08.example.com',
    '09.example.com',
    '1.example.com',
    '1.unused.example.com',
    '10.example.com',
    '100.example.com',
    '101.example.com',
    '101065.example.com',
    '102.example.com',
    '102323.example.com',
    '103.example.com',
    '104323.example.com',
    '105.example.com',
    '10588.example.com',
    '105889.example.com',
    '106936.example.com',
    '10762.example.com',
    '108-62-208-15.example.com',
    '108156.example.com',
    '108158.example.com',
    '108194.example.com',
    '109199.example.com',
    '11.example.com',
    '110711.example.com',
    '111.example.com',
    '11113.example.com',
    '111870.example.com',
    '112900.example.com',
    '113326.example.com',
    '116704.example.com',
    '12.example.com',
    '12.unused.example.com',
    '120113.example.com',
    '1212133146.example.com',
    '122066.example.com',
    '122137.example.com',
    '122169.example.com',
    '12256.example.com',
    '122651.example.com',
    '12345.example.com',
    '12345.test011.example.com',
    '123803.example.com',
    '124644.example.com',
    '126125.example.com',
    '126415.example.com',
    '1270011721.example.com',
    '128172.example.com',
    '129.unused.example.com',
    '13.example.com',
    '13.unused.example.com',
    '130.unused.example.com',
    '130011.example.com',
    '131.unused.example.com',
    '132.unused.example.com',
    '132627.example.com',
    '133.unused.example.com',
    '133175.example.com',
    '133740.example.com',
    '133778.example.com',
    '134.unused.example.com',
    '134330.example.com',
    '134615.example.com',
    '134892.example.com',
    '135.unused.example.com',
    '135163.example.com',
    '135876.example.com',
    '136.unused.example.com',
    '136093.example.com',
    '137.unused.example.com',
    '137393.example.com',
    '137430.example.com',
    '137991.example.com',
    '138.unused.example.com',
    '138429.example.com',
    '138544.example.com',
    '138550.example.com',
    '139.180.141.53.example.com',
    '139.unused.example.com',
    '139418.example.com',
    '139520.example.com',
    '139542.example.com',
    '139722.example.com',
    '139855.example.com',
    '139871.example.com',
    '139938.example.com',
    '14.example.com',
    '14.unused.example.com',
    '140.unused.example.com',
    '141.unused.example.com',
    '141553.example.com',
    '142.unused.example.com',
    '143.unused.example.com',
    '143214.example.com',
    ... 22169 more items
  ]
}
```

</details>
