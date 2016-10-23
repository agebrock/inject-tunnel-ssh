'use strict';
var portscan = require('../lib/port');
var ts = require('proxy-sinon-chai');
var expect = ts.expect;

describe('inject-tunnel-ssh', function() {

    beforeEach(() => {
    });

    it('should return a port number', function(done) {
        portscan(8080, function(error, port){
           expect(port).to.be.at.least(8080);
           done();
        });
    });
});
