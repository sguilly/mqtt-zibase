/**
 * Created by sguilly on 21/11/14.
 */
var mqtt = require('mqtt');


var client;

module.exports.open = function(ip,port)
{

    if(client)
    {
        console.log('client mqtt exist');
        return client;
    }

    client = mqtt.createClient(port, ip ,{clean:false,encoding:'utf8', clientId: 'mqtt-zibase'});

    return client;
};

module.exports.push = function(obj,callback)
{

    console.log('push');
    if(!client)
    {
        console.log('client undefined !!!');
        return;
    }

    client.publish('mqtt-zibase', JSON.stringify(obj), {qos:1, retain: false}, function()
    {
        console.log('call callback');
        callback();
    });


};



