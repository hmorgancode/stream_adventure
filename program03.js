'use strict';

var fs = require('fs');
var through = require('through2');

var upperCaseTransform = through(write, end);
//If 'write' is not specified, it passes input to output unmodified
//If 'end' is not specified, it calls this.push(null) to close
//  the output side when the input ends.

//Called for every buffer of available input
function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next(); //We're ready to receive the next chunk
}
//Called when there is no more data
function end(done) {
  done();
}

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);
