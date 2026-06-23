const EventEmitter = require('events');
class TicketService extends EventEmitter { 
    buyTicket = (eventName, CustData) => {
        console.log(`Ticket purchased for ${eventName} by ${CustData}`);
        this.emit('ticketPurchased', { eventName, CustData });
    };
}
const tickets = new TicketService();
tickets.on('ticketPurchased', (data) => {
    console.log(`Sending email to ${data.CustData} for purchasing ${data.eventName}`);
});
tickets.buyTicket('Concert', 'example@example.com');