/**
 * Created by sguilly on 21/11/14.
 */

var mqtt = require('mqtt');

var consumer = mqtt.createClient(3001, '188.213.25.148',{clean:false,encoding:'utf8', clientId: 'consumerTest'});

consumer.subscribe('mqtt-zibase', {qos:0});

consumer.on('message',function(topic,message)
{
    console.log(topic);
    console.log(message);

});
