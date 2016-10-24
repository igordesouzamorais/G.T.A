var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/mapa', function (req, res, next){
	res.render('mapa');
});

router.get('/login', function (req, res, next) {
	res.render('login');
});


/*app.post('/login', passport.authenticate('login', {
	successRedirect: '/home', 
	failureRedirect: '/',
	failureFlash : true
}));*/

router.get('/signup', function (req, res, next) {
	res.render('signup');
});

/*app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));
app.get('/logout', home.logout);*/

module.exports = router;
