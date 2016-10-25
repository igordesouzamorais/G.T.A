 module.exports = function (app) {

	var Mongoose = require('mongoose');

	var userSchema = new Mongoose.Schema({
	  username:{type: String, required: true},
	  password: {type: String, required: true}
	});

	return db.model('User', userSchema);
};
