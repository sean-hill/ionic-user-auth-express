// Auth token util

var uuid = require('node-uuid');
var jwt = require('jwt-simple');
var jwtKey = 'Doo ts doo ts dance party.';

exports.create = function(email, userId) {
    
    var userObject = {
        email: email,
        userId: userId,
        issuedAt: new Date(),
        entropy: uuid.v4()
    };

    return jwt.encode(userObject, jwtKey);
}
