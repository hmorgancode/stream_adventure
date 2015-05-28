'use strict';

var unzip = require('zlib').createGunzip();
var crypto = require('crypto');
var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var through = require('through');
var parser = require('tar').Parse();

//For each file within the tar
parser.on('entry', function(entry) 
{
  if(entry.type !== 'File') {
    return;
  }
  //Create a hash and pipe it to the print function
  entry.pipe(crypto.createHash('md5', {encoding: 'hex'}))
       .pipe(through(function(chunk, enc, done) {
          this.queue(chunk.toString() + ' ' + entry.path + '\n');
        }))
       .pipe(process.stdout);
});

process.stdin.pipe(decipher).pipe(unzip).pipe(parser);
