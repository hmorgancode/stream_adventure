'use strict';

//Apparently it didn't want you to create the server, so, this was never used.
//aaaaand it might not even work, but this is the gist of things.

var http = require('http');
var fs = require('fs');
var websocket = require('websocket-stream');
var Stream = require('stream');

var server = http.createServer(function(req, res) {
  res.end('I wonder if this shows up?\n');
});

var wss = websocket.createServer({server: server}, handle);

function handle(stream) {
  stream.end('hello\n');
}

server.listen(8099);