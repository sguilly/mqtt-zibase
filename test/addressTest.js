/**
 * Created by sguilly on 21/11/14.
 */

/*jshint expr: false, unused: false*/
/*global describe, it, before, after */
'use strict';
var should = require('should');


var zibaseClient = require('../lib/zibase/zibaseClient');

var lib = zibaseClient();

describe('Test address decode/parse :', function() {

    it('should be able to parse an IP address', function () {

       (lib.dot2num('192.168.0.1')).should.be.exactly(3232235521);
    });

    it('should be able to decode an IP address', function () {

        (lib.num2dot(3232235521)).should.be.exactly('192.168.0.1');
    });


});

describe('Test get local IP address :', function() {

    it('should not be empty', function () {

        (lib.getIPAddress()).should.not.be.exactly('0.0.0.0');

    });
});

