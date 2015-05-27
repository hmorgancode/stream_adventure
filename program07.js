'use strict';

/*
The `r` object that you get back from `request.post()` is a readable+writable
stream so you can pipe a readable stream into it (`src.pipe(r)`) and you can
pipe it to a writable stream (`r.pipe(dst)`).
*/

var request = require('request');
var reqPipe = request.post('http://localhost:8099');

process.stdin.pipe(reqPipe).pipe(process.stdout);
