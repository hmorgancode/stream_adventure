'use strict';

//creates a pipeline from a list of streams. The first is exposed as writable,
//and the last is exposed as readable.
var combine = require('stream-combiner');
var split = require('split');
var through2 = require('through2');
var gzip = require('zlib').createGzip();

module.exports = function() {
  var currentGenre;

  //read newline-separated json
  //(each chunk will become a separate js object)
  //split(JSON.parse, null, {trailing: false}),
  //var split = Split('\n');

  //group books into genres,
  var group = through2(function(chunk, enc, done) {
      if(chunk.length === 0)
        return done();

      chunk = JSON.parse(chunk);
      if (chunk.type === 'genre') {
        if (currentGenre) {
          this.push(JSON.stringify(currentGenre) + '\n');
        }
        currentGenre = {name: chunk.name, books: []};
        done();
      } else {
        currentGenre.books.push(chunk.name);
        done();
      }
    },function(done) {
      if (currentGenre) {
        this.push(JSON.stringify(currentGenre) + '\n');
      }
      done();
    });

  return combine(split('\n'), group, gzip);
};
