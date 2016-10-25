module.exports = function(app) {
  var enderecoController = {

    upload: function(req, res){
      var valor = req.body;
      var e = app.models.endereco;
      e.findOne({id_origen:valor.id_origen}, function(erro, resultado){
        //verifica se o endereco ja esta cadastrado no banco de dados, se nao estiver será feito o cadastro
        if(!resultado){
         var endereco = new app.models.endereco;
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
    },
    buscar: function (req, res){
      var e = app.models.endereco;
      var d = new Date();
      var lista = [];

      //busca apenas os atendimentos para o dia atual
      e.find(function(erro, valores){

        valores.forEach(function(valor, i){
          //comparacao para ver se dia, mes ou ano sao iguais
          if ((d.getDate() == valor.data.getDate()) && (d.getMonth() == valor.data.getMonth()) && (d.getFullYear() == valor.data.getFullYear()) && (valor.visitado == 'false')) {
            lista.push(valor);
          }
        });
        
        res.json(lista);
      });
    },
    atualizar: function (req, res) { //ao clicar no campo visitado nesta funcao é feito a atualizao no banco de dados para informar que o endereco já foi visitado ou nao de acordo com o status do checkbox
      var id = req.body.id;
      var check = req.body.check;

      var e = app.models.endereco;
      e.findOne({id_origen: id}, function (erro, valor) {
        valor.visitado = check;
        valor.save(function (sucess, erro) {
          if (erro) console.log(erro);
        });
      });
      res.send('ok');
    }
  };

  return enderecoController;

};