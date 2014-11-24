/**
 * Created by sguilly on 21/11/14.
 */
var mqtt = require('mqtt');
var bunyan = require('bunyan');


var client;

function MqttClient(opts) {

  if (!(this instanceof MqttClient)) {
    return new MqttClient(opts);
  }

  this.options = opts;
}

MqttClient.prototype.open = function () {

  if (client) {
    this.log.trace('client mqtt exist');
    return client;
  }

  this.log = bunyan.createLogger(this.options.logger);

  client = mqtt.createClient(this.options.mqtt.port, this.options.mqtt.ip, {
    clean: false,
    encoding: 'utf8',
    clientId: 'mqtt-zibase'
  });

  return client;
};

MqttClient.prototype.close = function () {

  client.end();
};

MqttClient.prototype.push = function (obj, callback) {

  var that = this;

  that.log.trace('push');
  if (!client) {
    that.log.trace('client undefined !!!');
    return;
  }

  client.publish('mqtt-zibase', JSON.stringify(obj), {qos: 1, retain: false}, function () {
    that.log.trace('call callback');
    callback();
  });

};

module.exports = MqttClient;



