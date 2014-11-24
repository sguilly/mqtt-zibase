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
  this.log = bunyan.createLogger(this.options.logger);
}

MqttClient.prototype.open = function () {

  if (client) {
    this.log.trace('client mqtt exist');
    return client;
  }

  client = mqtt.createClient(this.options.mqtt.port, this.options.mqtt.ip, {
    clean: false,
    encoding: 'utf8',
    clientId: this.options.mqtt.clientId
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
    that.log.error('client undefined !!!');
    throw new Error('client undefined');
  }

  client.publish(this.options.mqtt.topic, JSON.stringify(obj), {qos: 1, retain: false}, function () {
    that.log.trace('publish : call callback');
    if(callback)
    {
      callback();
    }
  });

};

module.exports = MqttClient;



