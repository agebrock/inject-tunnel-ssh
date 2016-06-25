# inject-tunnel-ssh [![NPM version][npm-image]][npm-url]  [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Integrate tunnel-ssh without wrapping your existing codebase

## Installation

```sh
$ npm install --save inject-tunnel-ssh
```
## Motivation and usage
The injector was build to support almost zero changes to your existing codebase. 

## Example

In the following example explains the integration (well injection) 
based on a little mongojs app.. 

```js
var db = require('mongojs')('tunneltest1.com/test');
db.test.findOne(console.log);
```
For some we now need a tunnel to connect to the server..

```js
  
    // ---- START INTEGRATION CODE -----
    require('inject-tunnel-ssh')([{
          dstPort: 27017,
          host: 'tunneltest1.com',
          username: 'root'
      }]).on('error',console.log);
    // ---- END INTEGRATION CODE -----
      
    var db = require('mongojs')('tunneltest1.com/test');
    db.test.findOne(console.log);
```
## How it works
The injector is a module wrapping the native node "net.connection" function to inject 
the tunnel configuration. 



## Configuration
You can use the same properties as you would use in tunnel-ssh but in form of an array, since you can 
setup as many host / port combinations as you want. If no localPort is provided, the injector will search 
for a free one.
For more information about the configuration please refer to the [tunnel-ssh](https://github.com/Finanzchef24-GmbH/tunnel-ssh) package.



If you get stuck using the lib please raise an issue or wait until we 
write a better readme.. ;) 


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
