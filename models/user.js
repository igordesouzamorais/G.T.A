var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

var UsuarioSchema = mongoose.Schema({
    username:{type: String, required: true},
	password: {type: String, required: true}
});

UsuarioSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UsuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UsuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', UsuarioSchema);
