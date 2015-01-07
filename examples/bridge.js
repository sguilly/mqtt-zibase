/**
 * Created by sguilly on 21/11/14.
 */

var bunyan = require('bunyan');
var logger = bunyan.createLogger({name: "myapp"});

var mqttZibase = require('../lib/mqtt-zibase');

var opts = {
  zibase: {
    ip: '192.168.0.18',
    port: 17100 // tcp,

  },
  mqtt: {
    ip: 'x.x.x.148',
    port: 1883, // tcp
    topic: 'mqtt-zibase/ZiBASExxxx',
    clientId: 'ZiBASExxxxxx',
    username: 'zibaseToMqtt',
    password: 'xxxxx'
  },
  logger: logger // OPTIONAL
};

var bridge = mqttZibase(opts);

bridge.open();
