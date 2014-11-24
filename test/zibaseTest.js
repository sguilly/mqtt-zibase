/**
 * Created by sguilly on 21/11/14.
 */

/*jshint expr: true, unused: false*/
/*global describe, it, before, after, not */
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
      level: config.debugLevel,
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

describe('Parse msg', function() {

  it('should return an object', function () {

    var msgPower = "Received radio ID (<rf>433Mhz OWL</rf> Noise=<noise>2190</noise> Level=<lev>5.0</lev>/5 <dev>High-Power Measure</dev> Ch=<ch>2</ch> Total Energy=<kwh>2419.9</kwh>kWh Power=<w>500</w>W Batt=<bat>Ok</bat>): <id>WS134494</id>";
    var obj = lib.parseMessage(msgPower);

    lib.log.trace(obj);

    obj.id.should.be.exactly('WS134494');
    obj.kwh.should.be.exactly(2419.9);
    obj.w.should.be.exactly(500);

    var msgAlarm = "Received radio ID (<rf>868Mhz </rf> Noise=<noise>2362</noise> Level=<lev>5.0</lev>/5  <dev>Remote Control</dev>  Flags= <flag1>Alarm</flag1>  Batt=<bat>Ok</bat>): <id>VS3181560866</id>";

    obj = lib.parseMessage(msgAlarm);

    obj.id.should.be.exactly('VS3181560866');
    obj.alarm.should.be.exactly(true);

    var msgTempHum = "Received radio ID (<rf>433Mhz Oregon</rf> Noise=<noise>2208</noise> Level=<lev>3.1</lev>/5 <dev>THGx8x0</dev> Ch=<ch>1</ch> T=<tem>+19.4</tem>C (+66.9F) Humidity=<hum>64</hum>%  Batt=<bat>Ok</bat>): <id>OS4196979713</id>";

    obj = lib.parseMessage(msgTempHum);

    obj.id.should.be.exactly('OS4196979713');
    obj.tem.should.be.exactly(19.4);
    obj.hum.should.be.exactly(64);

    var wrongMsg = "Wrong message";

    obj = lib.parseMessage(wrongMsg);

    should(obj).not.be.ok;



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


