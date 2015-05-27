'use strict';

var fs = require('fs');
var through = require('through2');
var split = require('split');

var upperCaseTransform = through(write, end);
//If 'write' is not specified, it passes input to output unmodified
//If 'end' is not specified, it calls this.push(null) to close
//  the output side when the input ends.

var caps = false;

//Called for every buffer of available input
function write(buffer, encoding, next) {
  if (caps) {
    this.push(buffer.toString().toUpperCase());
  }
  else {
    this.push(buffer.toString().toLowerCase());
  }
  this.push('\n');
  caps = !caps;
  next(); //We're ready to receive the next chunk
}
//Called when there is no more data
function end(done) {
  done();
}

process.stdin.pipe(split()).pipe(upperCaseTransform).pipe(process.stdout);
