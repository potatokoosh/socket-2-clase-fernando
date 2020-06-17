const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

//on: evento que escucha informacion
io.on('connection', (client) => { 
    
  console.log('Usuario conectado');

  //emit: evento que envia informacion, para que el html lo escuche
  //este mensaje lo vemos en la consola web
  client.on('sigienteTicket', (data, callback) => {

    let siguiente = ticketControl.siguiente()

    console.log('Mensaje en terminal',siguiente);

    //llamando el callback le decimos al servidor que lo        ejecute la respuesta del emit que esta en socket.nuevo-ticket.js,, 
    callback(siguiente);

  });

  //emitir un evento 'estadoActual', la consola web queda con esta info
  client.emit('estadoActual', {  
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()    
  });
  
  client.on('atenderTicket', (data, callback) => {

    //logica, que si no viene el escritorio no se ejecute
    if(!data.escritorio){
        return callback({
            err: true,
            mensaje: 'El escritorio es necesario'
        })
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback( atenderTicket );// Aqui devolvemos el callback con atenderTicket para que se pueda hacer uso desde el frontend

    //actualizar/notificar cambios en los ultimos4
    //primer parametro es el nombre del emit,
    //segundo parametro es la data que enviamos
    //broadcast nos permite actualizar todas las sesiones que esten abiertas, osea que si hay mas ventanas, actualizaria todas las ventanas abiertas con la info de los ultimos4 turnos en atencion en la vista publico.html
    client.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimos4()
    });

  })

});