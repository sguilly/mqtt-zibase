/**
 * Created by sguilly on 21/11/14.
 */


var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var mqttZibase = require('../lib/mqtt-zibase');

var opts = {
  logger: {
    name: 'mqtt-zibase-bridge',
    streams: [{
      level: 'info',
      type: 'raw',
      stream: prettyStdOut
    }]
  },
  zibase: {
    ip: '192.168.0.18',
    port: 17100 // tcp,

  },
  mqtt: {
    ip : '188.213.25.148',
    port: 3001, // tcp
    topic: 'mqtt-zibase/ZiBASE0051b0',
    clientId : 'ZiBASE0051b0'
  }
};

var bridge = mqttZibase(opts);

bridge.open();
