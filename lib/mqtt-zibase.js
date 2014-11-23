/**
 * Created by sguilly on 21/11/14.
 */

console.log('load mqtt-zibase');


var EventEmitter = require('events').EventEmitter,
    util = require('util');

var zibaseClient = require('./zibaseClient');
var mqttClient = require('./mqttClient');
var zibaseParser = require("./zibaseParser");


function Bridge () {

    if (!(this instanceof Bridge))
    {
        return new Bridge();
    }

    console.log("The Class Constructor Example");

    EventEmitter.call(this);
}

util.inherits(Bridge, EventEmitter);


Bridge.prototype.open = function(zibaseIp,brokerMqttIp, brokerMqttPort)
{
     console.log('connect to '+zibaseIp);


    zibaseClient.serverUDP.on("message", function (msg, rinfo) {
        msg = msg.slice(70);

        msg= msg.toString();

        console.log('>>'+msg);

        //this.emit('message',msg);

        var event = zibaseParser.parseMessage(msg);

        if(event)
        {
            mqttClient.push(event, function()
            {
                console.log('event publish');
            });
        }



    });

    zibaseClient.subscribe('192.168.0.18');

    mqttClient.open(brokerMqttIp,brokerMqttPort);

};



module.exports = Bridge;

//var _ = require('underscore');
//var request = require("request");
//var S = require('string');
//var config = require('./config')
//
//var clientIp = getIPAddress();
//var zibaseIp = config.zibaseIp ;
//
//var moment = require('moment');
//var dateFormat = "MMM DD YYYY HH:mm:ss";
//
//var debug = config.debug || false;
//
//

//
//var mqtt = require('mqtt')
//clientMqtt = mqtt.createClient(1883, '188.213.25.148',{clean:false,encoding:'utf8', clientId: 'producer'});
//
//clientMqtt.on('disconnect', function(packet) {
//    console.log('MQTT server disconnect !!!');
//    console.log(packet);
//    console.log();
//
//});
//
//clientMqtt.on('error', function(err) {
//    console.log('MQTT server error !!!');
//    console.log(err);
//    console.log();
//
//});
//

//
////console.log(b);
////console.log(b.toString('hex', 0, b.length));
//
//server.on("error", function (err) {
//    console.log("Server error:\n" + err.stack);
//    server.close();
//});
//
//server.on("message", function (msg, rinfo) {
//    var date = moment();
//
//
//
//    msg = msg.slice(70);
//    msg = msg.toString();
//
//    parseMessage(msg);
//
//    console.log(msg);
//    console.log();
////
////    if (S(msg).contains('SCENARIO')) {
////
////        var id= msg.replace(/\w* SCENARIO: (\d*)(.*)/,'$1');
////        id = parseInt(id);
////        if (id  && scenarios[id]) {
////
////                msg = msg + ' ' + scenarios[id].name;
////        }
////
////    } else {
////
////        var id = S(msg).between('<id>', '</id>').s;
////        if (probes[id]) {
////            msg = msg.replace(/<id>(.*)<\/id>/g, probes[id].name + ' ($1)');
////        } else if (sensors[id]) {
////            msg = msg.replace(/<id>(.*)<\/id>/g, sensors[id].name + ' ($1)');
////        } else if (actuators[id]) {
////            msg = msg.replace(/<id>(.*)<\/id>/g, actuators[id].name + ' ($1)');
////        }
////    }
////
////
////    if (!debug) {
////        msg = msg.replace(/<(?:.|\n)*?>/gm, ''); // delete all html tags
////    }
////    console.log(date.format(dateFormat) + " " + msg);
//});
//

//

//
//
//process.on('SIGINT', function () {
//    console.log("Caught interrupt signal");
//
//    var client = dgram.createSocket("udp4");
//    b.writeUInt16BE(22, 4); //command HOST UNREGISTERING (22)
//    console.log(b);
//    client.send(b, 0, b.length, 49999, zibaseIp, function (err, bytes) {
//        console.log("Unregistering...", bytes);
//        setTimeout(function () {
//            console.log("exit");
//            client.close();
//            process.exit()
//        }, 3000);
//    });
//});
//

//

//
