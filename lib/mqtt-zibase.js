/**
 * Created by sguilly on 21/11/14.
 */

console.log('load mqtt-zibase');


//var EventEmitter = require('events').EventEmitter,
//  util = require('util');

var zibaseClient = require('./zibase/zibaseClient');
var mqttClient = require('./mqtt/mqttClient');

var bunyan = require('bunyan');

var logger = require('ido4pro-logger');

function Bridge(opts) {

  if (!(this instanceof Bridge)) {
    return new Bridge(opts);
  }

  this.options = opts;

   this.log = logger;


  this.mqttClient = mqttClient(opts);
  this.zibaseClient = zibaseClient(opts);

  //EventEmitter.call(this);
}

//util.inherits(Bridge, EventEmitter);


Bridge.prototype.open = function () {

  var that = this;
  this.log.trace('connect to ' + this.options.zibase.ip + '/' + this.options.zibase.port);

  var connection = this.zibaseClient.getConnection();

  connection.on("message", function (msg, rinfo) {

    that.log.trace(rinfo);

    msg = msg.slice(70);

    msg = msg.toString();

    that.log.trace(msg);

    //this.emit('message',msg);

    var event = that.zibaseClient.parseMessage(msg);

    that.log.info(event);

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
