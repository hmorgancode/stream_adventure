'use strict';

/*
Your program will get some html written to stdin. Convert all the inner html to
upper-case for elements with a class name of "loud",
and pipe all the html to stdout.

You can use `trumpet` and `through2` to solve this adventure.

With `trumpet` you can create a transform stream from a css selector:
*/

var trumpet = require('trumpet');
var tr = trumpet();
var through = require('through2');

var upperCaseTransform = through(write);
function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next(); //We're ready to receive the next chunk
}

//The Good Stuff:
process.stdin.pipe(tr).pipe(process.stdout);
var stream = tr.select('.loud').createStream(); //outputs all the inner html content at '.loud', i.e. <span class="loud">allofthis</span>
                                                //the data you write to it will appear as the new inner html content.
stream.pipe(upperCaseTransform).pipe(stream);
