'use strict';

var connect = require('connect');
var bodyParser = require('body-parser');
var tokenAuth = require('./token-auth');
var httpProxy = require('http-proxy');
var http = require('http');
var url = require('url');


module.exports.run = function(options) {

    var target = options.targetDomain;
    var path = options.targetPath;
    var PORT = options.proxyPort;


    var proxyServer = httpProxy.createProxyServer({ secure: false });
    var app = connect();

    app.use(bodyParser.json());
    app.use(tokenAuth.authenticate);
    app.use(function(req, res) {
        req.url = url.format({
            'query': {'study': req.token.study, 'resource' : req.token.resource, 'url':req.url },
            'pathname': path
        });
        proxyServer.web(req, res, { target: target });
    });
    http.createServer(app).listen(PORT);

    console.log('auth-proxy listening on: %j pid(%j)', PORT, process.pid);

};