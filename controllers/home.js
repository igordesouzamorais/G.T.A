module.exports = function(app) {
  var HomeController = {
    index: function(req, res) {
      res.render('index', {user:req.user});
    },
    mapa: function(req, res) {
    	res.render('mapa', {user:req.user});
    },
    login: function (req, res){
      res.render('login',{message: req.flash('message')});
    },
    logout: function (req, res){
      req.logout();
      res.redirect('/');
    },
    signup: function (req, res) {
      res.render('signup',{message: req.flash('message')});
    }
  };

  return HomeController;

};