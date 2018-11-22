# config-server-client

[![license](https://img.shields.io/github/license/hermogenes/config-server-client.svg)](LICENSE)

[![npm downloads](https://img.shields.io/npm/dt/config-server-client.svg)](https://npm.im/config-server-client)

> An npm package to get configurations from a Spring Cloud Config Server and transforms to env vars.


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Options](#options)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm i -s config-server-client
```


## Usage

```js
const  ConfigServerClient = require('config-server-client');

  

console.log(configServerClient.loadSync());

// script
```


## Options

| Item              | Description                                                       | Default                                               |
| ----------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| config.server.url | The endpoint of the Spring Cloud Config Server                    | process.env.CONFIG_SERVER_URL                         |
| env               | Environment (e.g development, test, production)                   | process.env.CONFIG_SERVER_ENV or process.env.NODE_ENV |
| application.name  | Application name (e.g myAwesomeApp)                               | process.env.CONFIG_SERVER_APP                         |
| prefix            | One prefix to use in resulted env name (eg process.env.VUE_APP_   | (none)                                                |
| stringify         | Indicate if needs to JSON.stringify contents (usually to webpack) | false                                                 |


## Contributors

| Name                    |
| ----------------------- |
| **Hermógenes Ferreira** |

| Name |

\| ----------------------- \|

\| **Hermógenes Ferreira** \|


## License

[MIT](LICENSE) © Hermógenes Ferreira


## 

[npm]: https://www.npmjs.com/
