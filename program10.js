'use strict';

//duplexer(writable, readable) joins a writable stream and a readable stream
//into a single readable/writable duplex stream.
var duplexer = require('duplexer');

var spawn = require('child_process').spawn;

module.exports = function(cmd, args) {
  //spawn the process and return a single stream joining together stdin & stdout
  var newProcess = spawn(cmd, args);
  return duplexer(newProcess.stdin, newProcess.stdout);
};
