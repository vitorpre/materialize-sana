
function cortarImagemMatriz( objDataImagem , porcentagemBorda , tamanhoMatrizX , tamanhoMatrizY ) {

  var larguraIndividual = objDataImagem.width / tamanhoMatrizX ;
  var alturaIndividual = objDataImagem.height / tamanhoMatrizY ;
  var borda = larguraIndividual * ( porcentagemBorda * 0.01 ) ;

  var larguraSemBorda = larguraIndividual - ( 2 * borda ) ;
  var alturaSemBorda = alturaIndividual - ( 2 * borda ) ;

  var dataImagensCortadas = new Array() ;

  for (var y = 1 ; y <= tamanhoMatrizY ; y++ ) {
    for (var x = 1 ; x <= tamanhoMatrizX ; x++ ) {

      var dataImagemIndividual = Object.assign( {} , objDataImagem ) ;

      offsetX = ( ( x - 1 ) * larguraIndividual ) + borda  ;
      offsetY = ( ( y - 1 ) * alturaIndividual ) + borda  ;

      dataImagemIndividual.x += offsetX ;
      dataImagemIndividual.y += offsetY ;
      dataImagemIndividual.width = larguraSemBorda ;
      dataImagemIndividual.height = alturaSemBorda ;
      

      dataImagensCortadas.push( dataImagemIndividual ) ;

    }
  }

  return dataImagensCortadas ;

}



$(document).ready(function(){

	$('.parallax').parallax();

  $("#cortar").on("click" , function(){

    var dataImagemCortada = cropper.getData() ;

    var dataImagensCortadas = cortarImagemMatriz( dataImagemCortada , 6 , 3 , 2 ) ; 

    cropper.setAspectRatio( null ) ;

    for (var i = 1 ; i <= dataImagensCortadas.length ; i++) {

      cropper.setData( dataImagensCortadas[ i - 1 ] ) ;

      var croppedCanvas = cropper.getCroppedCanvas() ;
      
      $(croppedCanvas).addClass("teste") ;

      var linha = Math.ceil( i / 3 ) ;

      var div = $("#rowImagemCortada" + linha ) ;

      if( div[0] == undefined ) {
        div = document.createElement('div');
        $( div ).attr( "id" , "rowImagemCortada" + linha ) ;
      }

      $( div ).append( croppedCanvas ) ;

      $("#imagemCortada").append( div ) ;
    }

    cropper.setAspectRatio( 3 / 2 ) ;
    cropper.setData( dataImagemCortada ) ;

    $('#modal1').modal() ;
    $('#modal1').modal( 'open' ) ;

    console.log( $('#modal1')) ;

    // var dt = result.toDataURL('image/png');

  }) ;

	const image = document.getElementById('crop');
	const preview = document.getElementById('preview');
	
	var cropper = new Cropper( image , {
  aspectRatio: 3 / 2,
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
  preview: preview ,
  checkCrossOrigin: true , 
}) ;

	
});