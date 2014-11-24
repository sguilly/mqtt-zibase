/**
 * Created by sguilly on 21/11/14.
 */

var ZibaseClient = module.exports;

ZibaseClient.parseMessage = function (msg) {

  var event = {};
  var match;

  this.log.trace(msg);

  match = msg.match(/<id>(.+?)<\/id>/);

  if (match) {
    event.id = match[1];
    event.date = new Date();
  }
  else {
    return;
  }

  match = msg.match(/<tem>(.+?)<\/tem>/);

  if (match) {
    event.tem = parseFloat(match[1]);
  }

  match = msg.match(/<hum>(.+?)<\/hum>/);

  if (match) {
    event.hum = parseFloat(match[1]);
  }

  match = msg.match(/<kwh>(.+?)<\/kwh>/);

  if (match) {
    event.kwh = parseFloat(match[1]);
  }

  match = msg.match(/<w>(.+?)<\/w>/);

  if (match) {
    event.w = parseFloat(match[1]);
  }

  match = msg.match(/<flag1>(.+?)<\/flag1>/);

  if (match) {
    event.alarm = true;
  }

  if (event.id) {
    return event;
  }


  return;
};
