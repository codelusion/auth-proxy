'use strict';

var connect = require('connect');
var bodyParser = require('body-parser');
var tokenAuth = require('./token-auth');
var httpProxy = require('http-proxy');
var http = require('http');

var PORT  = process.env.PORT || 3000;

var proxyServer = httpProxy.createProxyServer({ secure: false });

var app = connect();

app.use(bodyParser.json());
app.use(tokenAuth.authenticate);
app.use(function(req, res) {
    proxyServer.web(req, res, { target: 'https://aisaac01.imednet.com/api.php' });
});
http.createServer(app).listen(PORT);

console.log('Token Auth Server on: %j', PORT);


