// User Routes

var path = require('path');
var validator = require('validator');
var User = require(path.resolve(__dirname, '../../models/user-model'));
var ErrorMessages = require(path.resolve(__dirname, '../../util/error-messages'));
var AuthToken = require(path.resolve(__dirname, '../../util/application-auth/auth-token'));

exports.create = function(req, res) {

	var name = req.body.name
  	var email = req.body.email;
    var password = req.body.password;

    if (!name || !name.first || !name.last || !email || !password) {
        return res.status(400).json({ message: 'All those boxes need filling.' });
    }

    if(!validator.isEmail(email)) {
    	return res.status(400).json({ message: 'Sorry, but that\'s an invalid email.' });
    }

    email = email.toLowerCase();

    var user = new User({
        email: email
        , password: password
        , name: name
    });

    user.authToken = AuthToken.create(email, user._id);

    user.save(function(err, createdUser) {

        if (err) {
            
        	if (err.errors && err.errors.email) {
        		return res.status(400).json({ message: err.errors.email.message });
        	}
        	else {
        		console.log(err);
        		return res.status(500).json({ message: ErrorMessages.unknown });	
        	}

        } 
        else {

            return res.status(200).json(createdUser.toObject({ virtuals: true }));

        }

    });

};

exports.login = function(req, res) {

	var email = req.body.email;
    var password = req.body.password;

    if(!password || !email) {
        return res.status(400).json({ message: "We need both an email and password." });
    }

    email = email.toLowerCase();

    User.findOne({email: email}, function(err, user) {

        if (err) {
            return res.status(500).json({ message: ErrorMessages.unknown });
        }

        if (!user) {
            return res.status(400).json({ message: "Woops, wrong email or password." });
        }

        if (user.authenticate(password)) {

            var authToken = AuthToken.create(email, user._id);

            user.authToken = authToken;

            user.save(function(err) {

                if (err) {
                    return res.status(500).json({ message: ErrorMessages.unknown });
                } else {
                	return res.status(200).json({ message: "OK", authToken: authToken });
                }

            });

        } else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

    });

};

exports.get = function(req, res) {

	return res.status(200).json(req.user.toObject({ virtuals: true }));

};