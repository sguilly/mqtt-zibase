/*jshint expr: true*/
/*jshint expr: false, unused: false*/
/*global describe, it, before, after */
'use strict';

var config = require('./config.js');


describe('When subscribe to the MQTT broker : '+config.mqttBrokerIp+'/'+config.mqttBrokerPort, function() {



    var clientMqtt;


    it('should be able to connect to the broker', function(done)
    {
        clientMqtt  = require('../lib/mqttClient').open(config.mqttBrokerIp,config.mqttBrokerPort);

        clientMqtt.on('connect', function() {
            done();
        });

    });

    it('should subscribe, send a message and receive back the message (QOS0)', function(done){


        clientMqtt.subscribe(config.mqttBrokerTopic, {qos:0});

        clientMqtt.on('message',function(topic,message)
        {
            if(message === 'testQOS0')
            {
                done();
            }

        });

        clientMqtt.publish(config.mqttBrokerTopic, 'testQOS0', {qos:0, retain: false}, function()
        {

        });

        after(function()
        {
            clientMqtt.unsubscribe(config.mqttBrokerTopic);
        });

    });

    it('should subscribe, send a message and receive back the message (QOS1)', function(done){


        clientMqtt.subscribe(config.mqttBrokerTopic, {qos:1});

        clientMqtt.on('message',function(topic,message)
        {
            if(message === 'testQOS1')
            {
                done();
            }
        });

        clientMqtt.publish(config.mqttBrokerTopic, 'testQOS1', {qos:1, retain: false}, function()
        {

        });

        after(function()
        {
            clientMqtt.unsubscribe(config.mqttBrokerTopic);
        });

    });

});