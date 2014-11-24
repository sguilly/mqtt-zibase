/**
 * Created by sguilly on 21/11/14.
 */

var bunyan = require('bunyan');
var conflate = require('conflate');
var fs = require('fs');

var dgram = require('dgram');
var serverUDP = dgram.createSocket("udp4");


var zibaseIp = '0.0.0.0';

function ZibaseClient(opts) {

  if (!(this instanceof ZibaseClient)) {
    return new ZibaseClient(opts);
  }

  this.options = opts;

  var files = fs.readdirSync(__dirname + '/modules/');
  for (var i = 0; i < files.length; i++) {
    if (files[i].match(/.*\.js/)) {
      var mod = require('./modules/' + files[i]);
      conflate(ZibaseClient.prototype, mod);
    }
  }


}

ZibaseClient.prototype.getConnection = function () {
  return serverUDP;
};

ZibaseClient.prototype.subscribe = function (opts) {

  this.log = bunyan.createLogger(opts.logger);

  var that = this;

  zibaseIp = opts.zibase.ip;
  zibasePort = opts.zibase.port | 17100;

  var b = new Buffer(70);

  b = this.getSubscribeBuffer(this.getIPAddress());

//    console.log('Send subscription by UDP');
//    console.log(zibaseIp);
//    console.log(b);

  var clientUDP = dgram.createSocket("udp4");

  clientUDP.send(b, 0, b.length, 49999, zibaseIp, function (err) {

    //TODO : implement err
    if (err) {
      that.log.err(err);
      throw err;

    }

    clientUDP.close();
  });

  serverUDP.on("error", function (err) {
    that.log.err(err);
    serverUDP.close();
  });

  serverUDP.on("listening", function () {
    var address = serverUDP.address();
    that.log.trace("Server listening " + address.address + ":" + address.port);
  });

  serverUDP.on("message", function (msg) {
    msg = msg.slice(70);
    msg = msg.toString();

  });

  serverUDP.bind(zibasePort, this.getIPAddress());

};


ZibaseClient.prototype.unsubscribe = function () {
  var that = this;
  var b = new Buffer(10);

  b.writeUInt16BE(22, 4); //command HOST UNREGISTERING (22)

  var clientUDP = dgram.createSocket("udp4");

  clientUDP.send(b, 0, b.length, 49999, zibaseIp, function (err) {
    if (err) {
      that.log.error(err);

    }

    clientUDP.close();
  });


};


ZibaseClient.prototype.getSubscribeBuffer = function (ip) {

  var b = new Buffer(70);
  b.fill(0);
  b.write('ZSIG\0', 0/*offset*/);
  b.writeUInt16BE(13, 4); //command HOST REGISTERING (13)
  b.writeUInt32BE(this.dot2num(ip), 50); //Ip address
  b.writeUInt32BE(0x42CC, 54); // port 17100 0x42CC

  return b;

};

module.exports = ZibaseClient;


