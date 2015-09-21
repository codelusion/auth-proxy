'use strict';

var connect = require('connect');
var bodyParser = require('body-parser');
var tokenAuth = require('./token-auth');
var httpProxy = require('http-proxy');
var http = require('http');
var url = require('url');
var blacklist = require('./blacklist');


module.exports.run = function(options) {

    var target = options.targetDomain;
    var path = options.targetPath;
    var PORT = options.proxyPort;


    var proxyServer = httpProxy.createProxyServer({ secure: false });
    var app = connect();
    app.use(bodyParser.json());
    //middleware blacklist
    app.use(blacklist.block);
    //middleware token-auth
    app.use(tokenAuth.authenticate);
    app.use(function(req, res) {
        req.url = url.format({
            'query': {
                'study': req.token.study,
                'resource': req.token.resource,
                'clientId': req.token.clientId,
                'url': req.url,
                'ip': req.ip,
                'expires': String(req.token.expires)
            },
            'pathname': path
        });
        proxyServer.web(req, res, { target: target });
    });
    http.createServer(app).listen(PORT);

    console.log('auth-proxy listening on: %j pid(%j)', PORT, process.pid);

};