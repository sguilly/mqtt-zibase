/*jshint expr: true*/
/*jshint expr: false, unused: false*/
/*global describe, it, before, after */
'use strict';

var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var config = require('./config.js');
var clientMqtt = require('../lib/mqtt/mqttClient');

var opts = {
  logger: {
    name: 'myapp',
    streams: [{
      level: 'error',
      type: 'raw',
      stream: prettyStdOut
    }]
  },
  mqtt: {
    ip : config.mqttBrokerIp,
    port: config.mqttBrokerPort // tcp
  }
};

var lib = clientMqtt(opts);
var client;

describe('When subscribe to the MQTT broker : '+config.mqttBrokerIp+'/'+config.mqttBrokerPort, function() {


    it('should be able to connect to the broker', function(done)
    {
      client = lib.open();

      client.on('connect', function() {
            done();
        });

    });

    it('should subscribe, send a message and receive back the message (QOS0)', function(done){


        client.subscribe(config.mqttBrokerTopic, {qos:0});

        client.on('message',function(topic,message)
        {
            if(message === 'testQOS0')
            {
                done();
            }

        });

        client.publish(config.mqttBrokerTopic, 'testQOS0', {qos:0, retain: false}, function()
        {

        });

        after(function()
        {
          client.unsubscribe(config.mqttBrokerTopic);
        });

    });

    it('should subscribe, send a message and receive back the message (QOS1)', function(done){


      client.subscribe(config.mqttBrokerTopic, {qos:1});

        client.on('message',function(topic,message)
        {
            if(message === 'testQOS1')
            {
                done();
            }
        });

      client.publish(config.mqttBrokerTopic, 'testQOS1', {qos:1, retain: false}, function()
        {

        });

        after(function()
        {
          client.unsubscribe(config.mqttBrokerTopic);
        });

    });

});
