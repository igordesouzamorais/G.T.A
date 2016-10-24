$(document).ready(function() {

	$('#caminho').val(getJsonStorage('json'));

	$('.button-collapse').sideNav({
        menuWidth: 220, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
  	);
  	
  	$(".voltar").on("click", function () {
  		$('.fechar').sideNav('hide');
  	});

  	$('#salvar').on("click", function (){
  		if ($("#caminho").val() != ""){
	  		setJsonStorage("json", $("#caminho").val());
	  		Materialize.toast('<span>Caminho Salvo com sucesso!</span>', 2000, 'salvou');
  		}
  		else{
  			alert("Você não colocou o caminho do JSON");
  			$('#caminho').val(getJsonStorage('json'));
  		}
  	});

	function setJsonStorage (chave, valor){
		localStorage.setItem(chave,valor);
	}

	function getJsonStorage (chave){
		if (localStorage.getItem(chave)){
			return localStorage.getItem(chave);
		}
	}
});
