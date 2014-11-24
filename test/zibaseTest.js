/**
 * Created by sguilly on 21/11/14.
 */

/*jshint expr: false, unused: false*/
/*global describe, it, before, after */
'use strict';

var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var should = require('should');
var config = require('./config.js');

var zibaseClient = require('../lib/zibase/zibaseClient');

var opts = {
  logger: {
    name: 'myapp',
    streams: [{
      level: 'error',
      type: 'raw',
      stream: prettyStdOut
    }]
  },
  zibase: {
    ip: '192.168.0.18',
    port: 17100 // tcp,

  }
};

var lib = zibaseClient(opts);

describe('Create subscribe buffer :', function() {

    it('check buffer', function () {



        var buf = new Buffer(70);

        buf[0] = 90;
        buf[1] = 83;
        buf[2] = 73;
        buf[3] = 71;
        buf[4] = 0;
        buf[5] = 13;
        buf[6] = 0;
        buf[7] = 0;
        buf[8] = 0;
        buf[9] = 0;
        buf[10] = 0;
        buf[11] = 0;
        buf[12] = 0;
        buf[13] = 0;
        buf[14] = 0;
        buf[15] = 0;
        buf[16] = 0;
        buf[17] = 0;
        buf[18] = 0;
        buf[19] = 0;
        buf[20] = 0;
        buf[21] = 0;
        buf[22] = 0;
        buf[23] = 0;
        buf[24] = 0;
        buf[25] = 0;
        buf[26] = 0;
        buf[27] = 0;
        buf[28] = 0;
        buf[29] = 0;
        buf[30] = 0;
        buf[31] = 0;
        buf[32] = 0;
        buf[33] = 0;
        buf[34] = 0;
        buf[35] = 0;
        buf[36] = 0;
        buf[37] = 0;
        buf[38] = 0;
        buf[39] = 0;
        buf[40] = 0;
        buf[41] = 0;
        buf[42] = 0;
        buf[43] = 0;
        buf[44] = 0;
        buf[45] = 0;
        buf[46] = 0;
        buf[47] = 0;
        buf[48] = 0;
        buf[49] = 0;
        buf[50] = 192;
        buf[51] = 168;
        buf[52] = 0;
        buf[53] = 1;
        buf[54] = 0;
        buf[55] = 0;
        buf[56] = 66;
        buf[57] = 204;
        buf[58] = 0;
        buf[59] = 0;
        buf[60] = 0;
        buf[61] = 0;
        buf[62] = 0;
        buf[63] = 0;
        buf[64] = 0;
        buf[65] = 0;
        buf[66] = 0;
        buf[67] = 0;
        buf[68] = 0;
        buf[69] = 0;

        var bufCreated = new Buffer(70);

        bufCreated = lib.getSubscribeBuffer('192.168.0.1');

        var same = true;

        for (var i = 0; i < 70; i++) {
            if (buf[i] !== bufCreated[i])
            {
                console.log(i+' '+buf[i]+'<>'+bufCreated[i]);
                same = false;
            }
        }

        same.should.be.exactly(true);

    });

});

describe('When subscribe to zibase gateway :'+config.zibaseIp+' (UDP connection)', function() {

    it('should receive : Zapi linked to host', function (done) {


        lib.subscribe(opts);
        lib.getConnection().on("message", function (msg, rinfo) {
            msg = msg.slice(70);
            var message = msg.toString();

            if(message.indexOf('Zapi linked to host') > -1)
            {
                done();

                lib.unsubscribe(config.zibaseIp);
            }

        });
    });


});


