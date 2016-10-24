// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var Usuario = require('../models/user');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'usuario', // login
        passwordField : 'senha', // senha
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, login, senha, done) {

        if (login)
            login = login.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            Usuario.findOne({ 'username' :  login }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Usuário não encontrado!'));

                if (!user.validPassword(senha))
                    return done(null, false, req.flash('loginMessage', 'Senha Inválida!'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });
    }));


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with login
        usernameField : 'usuario',
        passwordField : 'senha',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, login, password, done) {
        if (login)
            login = login.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                Usuario.findOne({ 'username' :  login }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that login
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That login is already taken.'));
                    } else {

                        // create the user
                        var newUser         = new Usuario();
                        newUser.username    = login;
                        newUser.password    = newUser.generateHash(password);
                    
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.username ) {
                // ...presumably they're trying to connect a local account
                var user            = req.user;
                user.username       = login;
                user.password       = user.generateHash(password);

                console.log(req.body);

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));
};