'use strict';

var datastore = require('./datastore');

module.exports.authenticate = function validateAuthenticationToken(req, res, next) {
    if (req.headers['authorization']) {
        var accessTokenPair = req.headers['authorization'].replace('Bearer', '').trim().split(':');
        if (accessTokenPair && accessTokenPair.length === 2) {
            datastore.locate({clientId: accessTokenPair[0], clientSecret: accessTokenPair[1]}, function(err, token){
                if (err || !token) {
                    console.error(err);
                    notAuthorized(res);
                } else {
                    req.token = token;
                    next();
                }
            });
        } else
            notAuthorized(res)
    } else
        notAuthorized(res)
};

function notAuthorized(res) {
    res.writeHead(403, {'Content-type' : 'application/json'});
    res.end(JSON.stringify({'msg' :'Not Authorized'}));
}