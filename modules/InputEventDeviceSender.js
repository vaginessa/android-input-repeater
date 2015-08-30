"use strict";

var InputEvent = require('./InputEvent');
var adbBridge = require('./adbBridge');

var InputEventDeviceSender = function (deviceId) {
  this.deviceId = deviceId;
  this.shellProcess = adbBridge.execAsync('shell', deviceId);
};

InputEventDeviceSender.prototype.send = function (event) {
    var command = 'sendevent /dev/input/event' + event.type + ' ' + event.params.join(' ') + '\n';

    console.log(this.deviceId, '\t<', event);
    this.shellProcess.stdin.write(command);
};

module.exports = InputEventDeviceSender;