/**
 * Created by sguilly on 21/11/14.
 */

console.log('load mqtt-zibase');


var EventEmitter = require('events').EventEmitter,
  util = require('util');

var zibaseClient = require('./zibase/zibaseClient');
var mqttClient = require('./mqtt/mqttClient');

var bunyan = require('bunyan');


function Bridge(opts) {

  if (!(this instanceof Bridge)) {
    return new Bridge(opts);
  }

  this.options = opts;

  this.log = bunyan.createLogger(opts.logger);

  this.mqttClient = mqttClient(opts);
  this.zibaseClient = zibaseClient(opts);

  EventEmitter.call(this);
}

util.inherits(Bridge, EventEmitter);


Bridge.prototype.open = function () {

  var that = this;
  this.log.trace('connect to ' + this.options.zibase.ip + '/' + this.options.zibase.port);

  var connection = this.zibaseClient.getConnection();

  connection.on("message", function (msg, rinfo) {

    that.log.trace(rinfo);

    msg = msg.slice(70);

    msg = msg.toString();


    //this.emit('message',msg);

    var event = that.zibaseClient.parseMessage(msg);

    that.log.trace(event);

    if (event) {
      that.mqttClient.push(event, function () {
        that.log.trace('event publish');
      });
    }

  });

  this.zibaseClient.subscribe(this.options);


  this.mqttClient.open();

  process.on('SIGINT', function () {
    that.zibaseClient.log.info("Caught interrupt signal");

    that.zibaseClient.unsubscribe();

    that.mqttClient.close();

    setTimeout(function() {
      process.exit();
    },1000);

  });

};


module.exports = Bridge;

//var _ = require('underscore');
//var request = require("request");
//var S = require('string');
//var config = require('./config')
//
//var clientIp = getIPAddress();
//var zibaseIp = config.zibaseIp ;
//
//var moment = require('moment');
//var dateFormat = "MMM DD YYYY HH:mm:ss";
//
//var debug = config.debug || false;
//
//

//
//var mqtt = require('mqtt')
//clientMqtt = mqtt.createClient(1883, '188.213.25.148',{clean:false,encoding:'utf8', clientId: 'producer'});
//
//clientMqtt.on('disconnect', function(packet) {
//    console.log('MQTT server disconnect !!!');
//    console.log(packet);
//    console.log();
//
//});
//
//clientMqtt.on('error', function(err) {
//    console.log('MQTT server error !!!');
//    console.log(err);
//    console.log();
//
//});
//

//
////console.log(b);
////console.log(b.toString('hex', 0, b.length));
//
//server.on("error", function (err) {
//    console.log("Server error:\n" + err.stack);
//    server.close();
//});
//
//server.on("message", function (msg, rinfo) {
//    var date = moment();
//
//
//
//    msg = msg.slice(70);
//    msg = msg.toString();
//
//    parseMessage(msg);
//
//    console.log(msg);
//    console.log();
////
////    if (S(msg).contains('SCENARIO')) {
////
////        var id= msg.replace(/\w* SCENARIO: (\d*)(.*)/,'$1');
////        id = parseInt(id);
////        if (id  && scenarios[id]) {
////
////                msg = msg + ' ' + scenarios[id].name;
////        }
////
////    } else {
////
////        var id = S(msg).between('<id>', '</id>').s;
////        if (probes[id]) {
////            msg = msg.replace(/<id>(.*)<\/id>/g, probes[id].name + ' ($1)');
////        } else if (sensors[id]) {
////            msg = msg.replace(/<id>(.*)<\/id>/g, sensors[id].name + ' ($1)');
////        } else if (actuators[id]) {
////            msg = msg.replace(/<id>(.*)<\/id>/g, actuators[id].name + ' ($1)');
////        }
////    }
////
////
////    if (!debug) {
////        msg = msg.replace(/<(?:.|\n)*?>/gm, ''); // delete all html tags
////    }
////    console.log(date.format(dateFormat) + " " + msg);
//});
//

//

//
//
//
//

//

//
