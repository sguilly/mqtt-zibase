/**
 * Created by sguilly on 21/11/14.
 */

//var EventEmitter = require('events').EventEmitter,
//  util = require('util');

var zibaseClient = require('./zibase/zibaseClient');
var mqttClient = require('./mqtt/mqttClient');


function Bridge(opts) {

  if (!(this instanceof Bridge)) {
    return new Bridge(opts);
  }

  if (opts.logger) {
    this.log = opts.logger;
  }
  else {
    this.log = require('./logger');
  }


  this.mqttClient = mqttClient(opts);
  this.zibaseClient = zibaseClient(opts);

  this.options = opts;

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
