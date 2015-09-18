'use strict';
var fs = require('fs');
var blacklistedIPs = [];
var BLACKLISTED = './blacklisted';

fs.watchFile(BLACKLISTED, function(c,p) { updateBlacklist(); });

module.exports.block = function blockIfBlacklisted(req, res, next) {
    var ip = getClientIp(req);
    for (var i in blacklistedIPs) {
        if (blacklistedIPs[i] === ip) {
            console.log("Blocked: " + ip + " " + req.url);
            accessDenied(res);
            return;
        }
    }
    next();
};

function updateBlacklist() {
    console.log('Updating blacklisted IPs....');
    blacklistedIPs = fs.readFileSync(BLACKLISTED, 'utf-8').split('\n')
        .filter(function(rx) { return rx.length });
    console.log(blacklistedIPs);
}

function accessDenied(res) {
    res.writeHead(403, {'Content-type' : 'application/json'});
    res.end(JSON.stringify({'msg' :'Access Denied'}));
}

var getClientIp = function(req) {
    return (req.headers["X-Forwarded-For"] ||
        req.headers["x-forwarded-for"] ||
        '').split(',')[0] ||
        req.client.remoteAddress;
};