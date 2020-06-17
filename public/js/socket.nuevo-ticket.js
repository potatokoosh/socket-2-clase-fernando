//este archivo lo consume nuevo-ticket.html


// Comando para establecer la conexion Activo Activo,, el archivo nuevo-ticket.html es de donde importa la libreria para hacer uso de io()
var socket = io();

//con jquery importo del dom el id "lblNuevoTicket" que tiene el archivo nuevo-ticket.html,, el # hace referencia al id
var label = $('#lblNuevoTicket');

//on,, son eventos para escuchar informacion
//aqui es importante utilizar una function normal por que no estamos en node
socket.on('connect', function(){
  console.log('Conectado al Servidor');
});

//socket.on ('disconnect'), es por si se pierde conecion con el servidor
socket.on('disconnect', function(){
  console.log('Desconectado del servidor');
});

socket.on('estadoActual', function( resp ){
  //este log se muestra en la consola de la web  
  console.log(resp);
  
  //actual viene del emit que socket.js de server
  //resp es la data que viene del emit de socket.js de server
  label.text(resp.actual);

})

//por jquery podemos hacer uso de $('') esa expresion para referirnos al boton que tiene el archivo nuevo-ticket.html
$('button').on('click', function(){//al escuchar el click que mande el emit al servidor

  //primer parametro es el evento que va a escuchar
  //segundo parametro es la data o info que quiero mandar, null indica que no mande nada
  //tercer parametro es el callback,, que ejecute una funcion si todo sale bien
  socket.emit('sigienteTicket', null, function(siguienteTicket){

    //remplazo el texto que tiene label 
    label.text(siguienteTicket)

  });  

});