'use strict';
var tinject = require('../lib');
tinject({
    'agebrock.com:27017': {
        username: 'root'
    }
});

var srv = require('mongojs')('agebrock.com/test');

srv.foo.findOne({}, function(error, result) {
    console.log(result);
    srv.close();
});


    var srv2 = require('mongojs')('agebrock.com/test');

    srv2.foo.findOne({}, function(error, result) {
        console.log(result);
        srv.close();
    });

