'use strict';
var config = require('./config');
var mongoose = require('mongoose');
var db = config.db.local;
//var db = config.db.remote;
if (db.user) {
    mongoose.connect('mongodb://' +
        db.user + ':' +
        db.password + '@' +
        db.server + ':' +
        db.port + '/' +
        db.database
    );
} else {
    mongoose.connect('mongodb://' +
        db.server + ':' +
        db.port + '/' +
        db.database
    );
}

var Token = mongoose.model('Token', {
	study: String,
	resource: String,
	clientId: String,
	clientSecret: String,
	expires: Date
	});

module.exports.locate = function locate(data, callback) {
    data.expires = { $gt: Date.now() };
    Token.findOne(data, function (err, token) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, token);
        }
    });
};