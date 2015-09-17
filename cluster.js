'use strict';

var cluster = require('cluster');
var http    = require('http');
var os      = require('os');

var numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // Master:
    // Fork as many workers as you have CPU cores
    console.log('cores:' + numCPUs);
    for (var i = 0; i < numCPUs; ++i) {
        cluster.fork();
    }
} else {
    // Worker:
    // Spawn a HTTP server, sharing the same TCP connection
    console.log('spawn:' + process.pid);
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world");
    }).listen(process.env.PORT || 8000);
}