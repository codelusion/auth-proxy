'use strict';

var cluster = require('cluster');
var os      = require('os');

var authProxy = require('./auth-proxy');

var numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // Master:
    for (var i = 0; i < numCPUs; ++i) {
        cluster.fork();
    }
} else {
    authProxy.run({
        targetDomain:'https://aisaac01.imednet.com/',
        targetPath: 'api.php',
        proxyPort: 3000
    });
}