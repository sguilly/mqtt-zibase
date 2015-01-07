/**
 * Created by sguilly on 21/11/14.
 */

var mqtt = require('mqtt');

console.log('Start Consumer');

var consumer = mqtt.createClient(1883, '188.213.25.148', {clean: false, encoding: 'utf8', clientId: 'consumerTest'});

consumer.subscribe('mqtt-zibase/#', {qos: 1});

consumer.on('message',function(topic,message)
{
    console.log(topic);
    console.log(message);
});

