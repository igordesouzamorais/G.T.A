module.exports = function (app){

var usuario       = app.models.user;
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, usuarionovo, password, done) {
    console.log(usuarionovo, password);
    // verifica no mongo se o nome de usuário existe ou não
    usuario.findOne({ 'username' :  usuarionovo },
      function(err, user) {
        console.log(user);
        // Em caso de erro, retorne usando o método done
        if (err){
          console.log(err);
          return done(err);
        }
        // Nome de usuário não existe, logar o erro & redirecione de volta
        if (!user){
          return done(null, false, req.flash('message', 'Usuário não encontrado.'));
        }
        // Usuário existe mas a senha está errada, logar o erro
        if (!isValidPassword(user, password)){
          return done(null, false, req.flash('message', 'Senha Inválida'));
        }
        // Tanto usuário e senha estão corretos, retorna usuário através 
        // do método done, e, agora, será considerado um sucesso
        return done(null, user);
      }
    );
}));

passport.use('signup', new LocalStrategy({
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, usuarionovo, pass, done) {
      findOrCreateUser = function(){
          // find a user in Mongo with provided username
          usuario.findOne({ 'username' :  usuarionovo }, function(err, user) {
              // In case of any error, return using the done method
              if (err){
                  console.log('Error in SignUp: '+err);
                  return done(err);
              }
              // already exists
              if (user) {
                  console.log('User already exists with username: '+username);
                  return done(null, false/*, req.flash('message','User Already Exists')*/);
              } else {
                  // if there is no user with that email
                  // create the user
                  var newUser = new app.models.user;

                  // set the user's local credentials
                  newUser.username = usuarionovo;
                  newUser.password = createHash(pass);

                  // save the user
                  newUser.save(function(err) {
                      if (err){
                          console.log('Error in Saving user: '+err);  
                          throw err;  
                      }
                      console.log('User Registration succesful');    
                      return done(null, newUser);
                  });
              }
          });
      };
      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
  })
);

// Generates hash using bCrypt
var createHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  usuario.findById(id, function(err, user) {
    done(err, user);
  });
});
}