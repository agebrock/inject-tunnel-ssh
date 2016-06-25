'use strict';
var tinject = require('../lib');
tinject([{
    dstPort: 27017,
    host: 'tunneltest1.com',
    username: 'root'
}, {
    dstPort: 27017,
    host: 'tunneltest2.com',
    username: 'root'
}]);


function create(target) {
    return function runsrv() {
        var srv = require('mongojs')(target);
        srv.forms.findOne({}, function() {
            srv.close();
        });
        srv.on('close', runsrv);
    }
}
create('tunneltest2.com/fc24')();

create('tunneltest1.com/fc24')();
