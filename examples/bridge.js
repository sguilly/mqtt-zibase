/**
 * Created by sguilly on 21/11/14.
 */

var logger = require('ido4pro-logger');
logger.createLogger({name: "zibaseToMqtt", level: 'trace', console: true, path : __dirname});

var mqttZibase = require('../lib/mqtt-zibase');

var opts = {
  zibase: {
    ip: '192.168.0.18',
    port: 17100 // tcp,

  },
  mqtt: {
    ip : '188.213.25.148',
    port: 1883, // tcp
    topic: 'mqtt-zibase/ZiBASE0051b0',
    clientId : 'ZiBASE0051b0',
    username: 'zibaseToMqtt',
    password: '****'
  }
};

var bridge = mqttZibase(opts);

bridge.open();
