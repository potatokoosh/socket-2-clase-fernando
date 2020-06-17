const fs = require('fs');//para grabar el archivo data.json

class Ticket {//Ticket no se exports, por que solo se usa aqui
  //logica de que numero de ticket va a ser atendido por que escritorio
  constructor(numero , escritorio) {

    this.numero = numero;
    this.escritorio = escritorio;

  }

}

class TicketControl {

  constructor() {

    this.ultimo = 0;
    this.hoy = new Date().getDate();//trae la fecha actual
    this.tickets = [];//este arreglo va a tener todos los tickets que no han sido atendidos
    this.ultimos4 = [];

    let data = require('../data/data.json');

    //console.log(data);
    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;//cambiamos el valor de ultimo con el que inicia el constructor
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    }else{
      this.reiniciarConteo();
    }

  }

  siguiente() {
    this.ultimo += 1;

    //el segundo argumento es null por que no se sabe aun cual es el escritorio que lo va a atender al ticket, 
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();

    return `Ticket ${this.ultimo}`;
    
  }

  getUltimoTicket(){
    return `Ticket ${this.ultimo}`
  }

  getUltimos4(){
    return this.ultimos4;
  }

  //esta funcion es para asignar un escritorio a cada ticket
  atenderTicket( escritorio ) {

    if(this.tickets.length === 0 ){
      return 'No hay tickets';//si no hay tickets aqui muere la funcion
    }

    let numeroTicket = this.tickets[0].numero;//quiero el numero de la posicion 0
    this.tickets.shift(); //shift borra el primer elemento del array tickets, por que se va a atender

    //atenderTicket queda como objeto {numero: numeroTicket, escritorio: viene por parametro}
    let atenderTicket = new Ticket(numeroTicket, escritorio)

    //unshift hace que cada objeto de atenderTickets nuevo se posicione en posicion [0],dentro del arreglo ultimos4, y vaya corriendo los demas objetos a posiciones [1], [2], etc
    this.ultimos4.unshift( atenderTicket );

    //con splice permite borrar los objetos que superen el length de 4,, osea borra el ultimo
    if ( this.ultimos4.length > 4 ) {
      this.ultimos4.splice(-1,1);//borra el ultimo
    }

    console.log('Ultimos 4 ');
    console.log(this.ultimos4);

    this.grabarArchivo();

    return atenderTicket;

  }


  reiniciarConteo() {
    //vamos a reinicializar los datos dentro del archivo data.json
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    this.grabarArchivo();
    
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,//tickets es un array[]
      ultimos4: this.ultimos4
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString)
    
  }

}

module.exports = {
  TicketControl
}