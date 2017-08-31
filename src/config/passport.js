var passport = require('passport');

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    //This is used to bundle our user up into the session to store for later
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    //What passport is using to pull the user out of the session
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    
    require('./strategies/local.strategy')();
};
