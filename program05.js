'use strict';

//Here, we use concat to get the contents of an entire stream as a single buffer,
//so that we can perform an operation (reversal) that requires the entire buffer.

var fs = require('fs');
var concat = require('concat-stream');

//Called once the entire input has been received
function invert(body) {
  process.stdout.write(body.toString().split('').reverse().join(''));
  //(you could also just console.log)
}

process.stdin.pipe(concat(invert));
