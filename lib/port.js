var Socket = require('net').Socket;
var debug;

try {
  debug = require('debug')('portscan');
} catch (e) {
  debug = function() {
    // noop
  };
}

function scan(port, callback) {
  var config = {
    port: port,
    host: '127.0.0.1'
  };
  var socket = new Socket();
  
  socket.once('error', function(e) {
    if (e.code === 'ECONNREFUSED') {
      socket.result = port;
    }
  }).once('connect', function() {
    socket.result = false;
    socket.end();
  }).once('close', function() {
    if (!socket.result) {
      debug('fail', port);
      scan(++port, callback);
    } else {
      debug('hit', socket.result);
      callback(null, socket.result);
    }
  });
  socket.connect(config);
}
module.exports = scan;
