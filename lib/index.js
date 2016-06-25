var net = require('net');
var events = require('events');
var Promise = require('bluebird');
var tunnel = Promise.promisify(require('tunnel-ssh'));
var localPort = Promise.promisify(require('./port'));
var find = require('lodash.find');
// Save a copy from the original
var connect = net.Socket.prototype.connect;
var debug;

try {
    debug = require('debug')('tunnel.net');
} catch (e) {
    debug = function() {
        // noop
    };
}
// Borrowed from node source (net.js)
function isPipeName(s) {
    return typeof s === 'string' && toNumber(s) === false;
}

// Borrowed from node source (net.js)
function toNumber(x) {
    return (x = Number(x)) >= 0 ? x : false;
}

// Borrowed from node source (net.js)
// Returns an array [options] or [options, cb]
function normalizeConnectArgs(args) {
    var options = {};
    var cb;

    if (args[0] !== null && typeof args[0] === 'object') {
        options = args[0];
    } else if (isPipeName(args[0])) {
        options.path = args[0];
    } else {
        options.port = args[0];
        if (typeof args[1] === 'string') {
            options.host = args[1];
        }
    }
    cb = args[args.length - 1];

    return typeof cb === 'function' ? [options, cb] : [options];
}

function hasValidConfiguration(options) {
    return options !== null || typeof options === 'object';
}

module.exports = function(configCollection) {
    var emitter = new events.EventEmitter();

    /**
     * Socket connect prototype to use ssh connection
     * Check if config for target is set
     * Start SSH tunnel if not already started
     *
     * @param options
     * @param cb
     * @returns {net.Socket}
     */
    var con = net.Socket.prototype.connect = function(options, cb) {
        var self = this;

        // Borrowed from net.js
        // Restart method if normalization is required.
        if (!hasValidConfiguration(options)) {
            var args = normalizeConnectArgs(arguments);
            return con.apply(this, args);
        }

        var configElement = find(configCollection, {host: options.host, dstPort: options.port});

        // Exit if no config was found.
        if (!configElement) {
            debug('skip, %j', options);
            return connect.call(self, options, cb);
        }

        if (!configElement.promise) {
            configElement.promise = localPort(configElement.localPort || 3000).then(function(port) {
                configElement.localPort = port;
                return tunnel(configElement).then(function(tnl) {
                    tnl.on('close', function() {
                        debug('remove tunnel');
                        delete configElement.promise;
                    });
                });
            }).catch(function(e) {
                emitter.emit(e);
            });
        }
        configElement.promise.then(function() {
            var connectionConfig = {
                host: configElement.localHost,
                port: configElement.localPort
            };
            debug('connect %j', connectionConfig)
            connect.call(self, connectionConfig, cb);
        });
        return self;
    };

    return emitter;
};

