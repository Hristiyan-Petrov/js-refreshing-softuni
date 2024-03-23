function manageTickets(ticketsData, sortCriteria) {

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let tickets = [];

    ticketsData.forEach(ticket => {
        // let [destination, price, status] = ticket.split('|');
        // let currentTicket = new Ticket(destination, Number(price), status);

        tickets.push(new Ticket(...ticket.split('|')));
    });

    // return tickets.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
    
    console.log(tickets.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria])));

    // let sortedTickets = 

    //     forEach(x => {
    //     console.log(x[sortCriteria]);
    // })

}

manageTickets(
    ['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'price'

)