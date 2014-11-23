/**
 * Created by sguilly on 21/11/14.
 */

var config = {};

config.mqttBrokerIp = '188.213.25.148';
config.mqttBrokerPort = '3001';

config.mqttBrokerTopic = 'mochaTest';

config.zibaseIp = '192.168.0.18'; // <- Enter LAN IP address

config.platform = 'zibase.net';
config.zibase = 'ZiBASE0051b0'; // <- Enter Main Identifier
config.token = '1834e9ead4'; // <- Enter Token
config.debug = true;

module.exports = config;
