var express = require('express');
var router = express.Router();
var Endereco = require('../models/endereco');

/*TELAS INICIAIS*/
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/mapa', function (req, res, next){
	res.render('mapa');
});

router.get('/login', function (req, res, next) {
	res.render('login');
});

router.get('/signup', function (req, res, next) {
	res.render('signup');
});

/*app.post('/login', passport.authenticate('login', {
	successRedirect: '/home', 
	failureRedirect: '/',
	failureFlash : true
}));*/

/*app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));
app.get('/logout', home.logout);*/



/*ROTAS DO MAPA*/
router.post('/upload', function (req, res, next) {
	var valor = req.body;
	Endereco.findOne({id_origen:valor.id_origen}, function(erro, resultado){
		console.log(resultado);
		//verifica se o endereco ja esta cadastrado no banco de dados, se nao estiver será feito o cadastro
		if(!resultado){
			var endereco = new Endereco;
			endereco.id_origen = valor.id_origen;
			endereco.cliente = valor.cliente;
			endereco.endereco = valor.endereco;
			endereco.numero = valor.numero;
			endereco.bairro = valor.bairro;
			endereco.cep = valor.cep;
			endereco.cidade = valor.cidade;
			endereco.uf = valor.uf;
			endereco.observacao = valor.observacao;
			endereco.data = valor.data;
			endereco.lat = valor.lat;
			endereco.lng = valor.lng;

			endereco.save(function(sucess, error){
			if (error) console.log(error);
			}); 
		}
	res.redirect('/mapa');
	});
});

router.get('/enderecos', function (req, res, next) {
	var d = new Date();
	var lista = [];

	//busca apenas os atendimentos para o dia atual
	Endereco.find(function(erro, valores){

	valores.forEach(function(valor, i){
	  //comparacao para ver se dia, mes ou ano sao iguais
	  if ((d.getDate() == valor.data.getDate()) && (d.getMonth() == valor.data.getMonth()) && (d.getFullYear() == valor.data.getFullYear()) && (valor.visitado == 'false')) {
	    lista.push(valor);
	  }
	});
	
	res.json(lista);
	});	
});
router.put('/atualiza/:id_endereco', function (req, res,next) {
	var id = req.body.id;
      var check = req.body.check;

	  Endereco.findOne({id_origen: id}, function (erro, valor) {
	    valor.visitado = check;
	    valor.save(function (sucess, erro) {
	      if (erro) console.log(erro);
	    });
	  });
      res.send('ok');
});

module.exports = router;
