// Used when an auth token is required for a route

var	passport = require("passport");
var path = require('path');
var BearerStrategy = require("passport-http-bearer").Strategy;
var User = require(path.resolve(__dirname, '../../models/user-model'));

// Use Bearer Strategy as authentication
passport.use(new BearerStrategy(
    function(token, done) {
        User.findOne({ authToken: token }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));

module.exports = {
    protect: passport.authenticate('bearer', { session: false })
}