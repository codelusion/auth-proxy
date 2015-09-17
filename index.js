'use strict';

var connect = require('connect');
var bodyParser = require('body-parser');
var tokenAuth = require('./token-auth');
var httpProxy = require('http-proxy');
var http = require('http');
var url = require('url');

var PORT  = process.env.PORT || 3000;

var proxyServer = httpProxy.createProxyServer({ secure: false });

var app = connect();

app.use(bodyParser.json());
app.use(tokenAuth.authenticate);
app.use(function(req, res) {
    req.url = url.format({'query': {'study': req.token.study, 'resource' : req.token.resource }, 'pathname': 'api.php'});
    proxyServer.web(req, res, { target: 'https://aisaac01.imednet.com/' });
});
http.createServer(app).listen(PORT);

console.log('auth-token-proxy listening on: %j', PORT);
