module.exports = function (app) {

	var Mongoose = require('mongoose');

	var enderecoSchema = new Mongoose.Schema({
	  id_origen:{type: Number, required: true},
	  cliente: {type: String, required: true},
	  endereco: {type: String, required: true},
	  numero: {type: String, required: true},
	  bairro: {type: String, required: true},
	  cep: {type: String, required: true},
	  cidade: {type: String, required: true},
	  uf: {type: String, required: true},
	  observacao: {type: String, required: true},
	  data: {type: Date, required: true},
	  visitado:{default: false, required: true, type: String},
	  lat: String,
	  lng: String
	});

	return db.model('Endereco', enderecoSchema);
};
