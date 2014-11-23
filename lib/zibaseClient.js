/**
 * Created by sguilly on 21/11/14.
 */


var address = require('./address');

var dgram = require('dgram');
var serverUDP = dgram.createSocket("udp4");

var zibaseIp = '0.0.0.0';

module.exports.serverUDP = serverUDP;

module.exports.getSubscribeBuffer = function(ip)
{

    var b = new Buffer(70);
    b.fill(0);
    b.write('ZSIG\0', 0/*offset*/);
    b.writeUInt16BE(13, 4); //command HOST REGISTERING (13)
    b.writeUInt32BE(address.dot2num(ip), 50); //Ip address
    b.writeUInt32BE(0x42CC, 54); // port 17100 0x42CC

    return b;

};

module.exports.subscribe = function(ip)
{

    zibaseIp = ip;

    var b = new Buffer(70);

    b = this.getSubscribeBuffer(address.getIPAddress());

//    console.log('Send subscription by UDP');
//    console.log(zibaseIp);
//    console.log(b);

    var clientUDP = dgram.createSocket("udp4");

    clientUDP.send(b, 0, b.length, 49999, zibaseIp, function (err) {

        //TODO : implement err
        if(err)
        {
            console.log(err);
            throw err;

        }

        clientUDP.close();
    });

    serverUDP.on("error", function (err) {
//        console.log("Server error:\n" + err.stack);
        server.close();
    });

    serverUDP.on("listening", function () {
        var address = serverUDP.address();
//        console.log("Server listening " +
//            address.address + ":" + address.port);
    });

    serverUDP.on("message", function (msg, rinfo) {
        msg = msg.slice(70);
        msg = msg.toString();

    });

    serverUDP.bind(0x42CC, address.getIPAddress());

};

module.exports.unsubscribe = function(ip)
{
   var b = new Buffer(10);

    b.writeUInt16BE(22, 4); //command HOST UNREGISTERING (22)

    var clientUDP = dgram.createSocket("udp4");

    clientUDP.send(b, 0, b.length, 49999, zibaseIp, function (err, bytes) {
        clientUDP.close();
    });
}





