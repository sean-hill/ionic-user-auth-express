// User Model

var mongoose = require('mongoose');
var crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

   email: { type: String, lowercase: true, trim: true, index: true, required: true, unique: true }

   , hash: String

   , salt: String

   , name: { first: String, last: String }

   , authToken: { type: String, required: true }

   , utilityProviders: []

});

// Virtual method for getting a full name
UserSchema.virtual('name.full').get(function () {
	return this.name.first + ' ' + this.name.last;
});

// Virtual method for password getting and setting
UserSchema.virtual('password')
	.get(function() {
    	return this.hash;
	})
	.set(function(password) {
	    this.salt = this.makeSalt();
	    this.hash = this.encryptPassword(password);
	})
;

// Schema methods
UserSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.password;
    },

    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }

};

// Unique field plugin (makes better error messages)
UserSchema.plugin(uniqueValidator, { message: 'Sorry, someone is already using {VALUE} for their {PATH}.'})

module.exports = mongoose.model('User', UserSchema);