'use strict';

var ws = require('websocket-stream');
var stream = ws('ws://localhost:8099');

stream.end('hello\n');

//stream.write('hello\n'); would have worked instead
