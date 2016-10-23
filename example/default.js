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


var srv = require('mongojs')('tunneltest1.com/somedb');
srv.forms.findOne({}, function() {
    srv.close();
});


var srv2 = require('mongojs')('tunneltest2.com/somedb');
srv2.someCollection.findOne({}, function() {
    srv2.close();
});
