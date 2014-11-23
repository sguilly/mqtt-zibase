/**
 * Created by sguilly on 21/11/14.
 */

var mqttZibase = require('../lib/mqtt-zibase');


var bridge = mqttZibase();

bridge.open('192.168.0.18','188.213.25.148',3001);

//bridge.zibase.on("message", function (msg, rinfo) {
//    msg = msg.slice(70).toString();
//
//    console.log('>>'+msg);
//
//});
//
//console.log('mqtt part');
//bridge.broker.subscribe('test', {qos:0});
//
//bridge.broker.on('message',function(topic,message)
//{
//    console.log(topic);
//    console.log(message);
//
//});
//
//console.log('try publish');
//bridge.broker.publish('test', 'testQOS0', {qos:0, retain: false}, function()
//{
//    console.log('event publish');
//});

//var zibase = require('../lib/zibase');
//var mqtt = require('../lib/mqtt');
//
//
//var clientMqtt = mqtt.clientMqtt('188.213.25.148',1883);
//
//clientMqtt.subscribe('test', {qos:0});
//
//clientMqtt.on('message',function(topic,message)
//{
//    console.log(topic);
//    console.log(message);
//
//});
//
//clientMqtt.publish('test', 'testQOS0', {qos:0, retain: false}, function()
//{
//
//});
//
//zibase.subscribe('192.168.0.18');
//zibase.serverUDP.on("message", function (msg, rinfo) {
//    msg = msg.slice(70).toString();
//
//    console.log('>>'+msg);
//
//});

