'use strict';
var http = require('http');
var httpProxy = require('http-proxy');
var connect = require('connect');

var proxyServer = httpProxy.createProxyServer({ secure: false });
var app = connect();
var target = 'https://aisaac01.imednet.com';
var PORT = 3000;

app.use(function(req, res) {
    proxyServer.web(req, res, { target: target });
});
http.createServer(app).listen(PORT);

console.log('proxy listening on: %j pid(%j)', PORT, process.pid);
