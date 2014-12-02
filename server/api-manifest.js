// Api Manifest

var express 	= require('express');
var apiManifest	= express.Router();

apiManifest.use('/user', require('./api/user/base-user-api'));

module.exports = apiManifest;