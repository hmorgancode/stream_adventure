'use strict';

//creates a pipeline from a list of streams. The first is exposed as writable,
//and the last is exposed as readable.
var combine = require('stream-combiner');
var split = require('split');
var through2 = require('through2');
var gzip = require('zlib').createGzip();

module.exports = function() {

  var genres = [];
  var currentGenre = '';

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
        genres[genres.length] = {name: chunk.name, books: []};
        done();
      } else {
        genres[genres.length - 1].books.push(chunk.name);
        done();
      }
    },function(done) {
      var that = this;
      genres.forEach(function(genre) {
        that.push(JSON.stringify(genre));
        that.push('\n');
      });
      done();
    });

  return combine(split('\n'), group, gzip);
};


//Later: Update so that it pushes each genre as it completes.
//That way, in the End function, you only have to push the last one.
