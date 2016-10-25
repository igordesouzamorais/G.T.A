module.exports = function(app) {

var home = app.controllers.home;
var passport = require('passport');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
    	return next();

    res.redirect('/login');
}

var isNotAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated())
        return next();

    res.redirect('/');
}

app.get('/',isAuthenticated, home.index);
app.get('/mapa',isAuthenticated, home.mapa);
app.get('/login', isNotAuthenticated, home.login);
app.post('/login', passport.authenticate('login', {
	successRedirect: '/', 
	failureRedirect: '/login',
	failureFlash : true
}));
app.get('/signup', home.signup);
app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true
  }));
app.get('/logout', home.logout);

};