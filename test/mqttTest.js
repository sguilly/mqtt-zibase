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
      level: config.debugLevel,
      type: 'raw',
      stream: prettyStdOut
    }]
  },
  mqtt: {
    ip: config.mqttBrokerIp,
    port: config.mqttBrokerPort, // tcp
    topic: config.mqttBrokerTopic,
    clientId : config.mqttIdClient
  }
};

var lib = clientMqtt(opts);
var client;

describe('When subscribe to the MQTT broker : ' + config.mqttBrokerIp + '/' + config.mqttBrokerPort, function () {

  it('should raise an error', function()
  {
    (function(){
      lib.push('testQOS1', {});
    }).should.throw();

  });

  it('should be able to connect to the broker', function (done) {
    client = lib.open();

    client.on('connect', function () {
      done();
    });

  });

  it('should be able to open twice', function () {
    (function(){
      client = lib.open();
    }).should.not.throw();

  });

  it('should subscribe, send a message and receive back the message (QOS0)', function (done) {


    client.subscribe(config.mqttBrokerTopic, {qos: 0});

    client.on('message', function (topic, message) {
      if (message === 'testQOS0') {
        done();
      }

    });

    client.publish(config.mqttBrokerTopic, 'testQOS0', {qos: 0, retain: false}, function () {

    });

    after(function () {
      client.unsubscribe(config.mqttBrokerTopic);
    });

  });

  it('should subscribe, send a message and receive back the message (QOS1)', function (done) {


    var publish = false;

    client.subscribe(config.mqttBrokerTopic, {qos: 1});

    client.on('message', function (topic, message) {

      lib.log.trace('receive '+message);

      var obj = JSON.parse(message);

      if (obj.test === 'testQOS1') {
        if(publish)
        {
          done();
        }
      }
    });

    lib.push({test:'testQOS1'}, function()
    {
      publish = true;
    });

    after(function () {
      client.unsubscribe(config.mqttBrokerTopic);

    });

  });

  it('close client', function (done) {


    lib.close();

    client.on('close', function (err) {
      done();
    });

  });

});


