//este archivo lo consume publico.html


// Comando para establecer la conexion Activo Activo,, el archivo publico.html es de donde importa la libreria para hacer uso de io()
var socket = io();

//por medio de jquery, llamamos a los id de publico.html $(#'')
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]


//estadoActual viene de socket.js
socket.on('estadoActual', function(data) {
  
  //console.log(data);
  actualizaHTML(data.ultimos4);//aqui traemos el valor de ultimos4 para que la function actualizaHTML los pueda usar

})

//estadoActual viene de socket.js
socket.on('ultimos4', function(data) {
  
  console.log(data);

  //cada ves que se llame esta socket va a sonar este audio
  var audio = new Audio('audio/new-ticket.mp3');
  audio.play();

  actualizaHTML(data.ultimos4);//aqui traemos el valor de ultimos4 para que la function actualizaHTML los pueda usar

})

//la data tiene el arreglo ultimos4, y en socket.on traemos ese array
function actualizaHTML( ultimos4 ){
  
  //el siclo for recorre el arreglo de ultimos4 y mediante la function text, permite asignar en el html el valor de numero y escritorio que estan dentro de ultimos4
  for(var i=0; i <= ultimos4.length -1; i++){

    lblTickets[i].text('Ticket ' + ultimos4[i].numero);
    lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
  }

}