'use strict';

//A reimplementation of duplexer using the readable-stream API standard in node as of 0.10.
//(largely the same)
var duplexer = require('duplexer2');
var through = require('through2');

//counter: a readable stream
module.exports = function(counter) {
  var countryCounts = {};

  var countryCounter = through.obj(function(chunk, encoding, next) {
    if(countryCounts.hasOwnProperty(chunk.country)) {
      countryCounts[chunk.country]++;
    } else {
      countryCounts[chunk.country] = 1;
    }
    next();
  }, function(done) {    
    counter.setCounts(countryCounts);
    done();
  });
  
  return duplexer(countryCounter, counter);  
};
