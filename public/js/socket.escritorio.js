//este archivo lo consume escritorio.html


// Comando para establecer la conexion Activo Activo,, el archivo escritorio.html es de donde importa la libreria para hacer uso de io()
var socket = io();

//vamos atraer los parametros que viene por url 
var searchParams = new URLSearchParams(window.location.search);

//si el escritorio no existe vamos salir de esa pagina
if(!searchParams.has('escritorio')){
  window.location = 'index.html';
  throw new Error('El escritorio es necesario')
};

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
//gracias a jquery podemos hacer uso de los id del escritorio.html con $('h1')
$('h1').text('Escritorio ' + escritorio);

//vamos a escuchar el evento click del escritorio.html
$('button').on('click', function(){

  //envia la accion a el archivo socket.js
  socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
    
    //esta condicion viene del archivo ticket-control.js, como un return
    if( resp === 'No hay tickets' ){
      label.text(resp);
      alert(resp);
      return;//este return para que no ejecute mas
    }
    
    //gracias a jquery le damos el valor a label mediante .text y se vea en el escritorio.html
    label.text('Ticket ' + resp.numero)
  
  })

});