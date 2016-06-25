# inject-tunnel-ssh [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Integrate tunnel-ssh without wrapping your existing codebase

## Installation

```sh
$ npm install --save inject-tunnel-ssh
```

## Motivation and usage
The injector was build to support almost zero changes to your existing codebase. 

## How it works
The injector is a module wrapping the native node "net.connection" function to inject 
the tunnel configuration. 

## Usage
For more information about the configuration please refer to the [tunnel-ssh](https://github.com/Finanzchef24-GmbH/tunnel-ssh) package.

```js
  
  var its = require('inject-tunnel-ssh');
  
  its([{
      dstPort: 27017,
      host: 'tunneltest1.com',
      username: 'root'
  }, {
      dstPort: 27017,
      host: 'tunneltest2.com',
      username: 'root'
  }]).on('error',console.log);

```
## License

MIT © [Christoph Hagenbrock](agebrock.com)


[npm-image]: https://badge.fury.io/js/inject-tunnel-ssh.svg
[npm-url]: https://npmjs.org/package/inject-tunnel-ssh
[travis-image]: https://travis-ci.org/agebrock/inject-tunnel-ssh.svg?branch=master
[travis-url]: https://travis-ci.org/agebrock/inject-tunnel-ssh
[daviddm-image]: https://david-dm.org/agebrock/inject-tunnel-ssh.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/agebrock/inject-tunnel-ssh
[coveralls-image]: https://coveralls.io/repos/github/agebrock/inject-tunnel-ssh/badge.svg
[coveralls-url]: https://coveralls.io/r/agebrock/inject-tunnel-ssh
