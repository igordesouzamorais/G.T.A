module.exports = {
	isLoggedIn: function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	  		return next();

	    console.log('not logged');
	  	res.redirect('/login');
	}
}