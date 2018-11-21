# config-server-client

[![build status](https://img.shields.io/travis/hermogenes/config-server-client.svg)](https://travis-ci.com/hermogenes/config-server-client)
[![code coverage](https://img.shields.io/codecov/c/github/hermogenes/config-server-client.svg)](https://codecov.io/gh/hermogenes/config-server-client)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/hermogenes/config-server-client.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/config-server-client.svg)](https://npm.im/config-server-client)

> An npm package to get configurations from a Spring Cloud Config Server


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install config-server-client
```

[yarn][]:

```sh
yarn add config-server-client
```


## Usage

```js
const ConfigServerClient = require('config-server-client');

const configServerClient = new ConfigServerClient();

console.log(configServerClient.renderName());
// script
```


## Contributors

| Name                    |
| ----------------------- |
| **Hermógenes Ferreira** |


## License

[MIT](LICENSE) © Hermógenes Ferreira


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
