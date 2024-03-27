function solveClasses() {
    let Hall = function (capacity, name) {
        this.capacity = capacity;
        this.name = name;
        this.events = [];
    }

    Hall.prototype.hallEvent = function (title) {
        if (!this.events.includes(title)) {
            this.events.push(title);
            return 'Event is added.';
        } else {
            throw new Error('This event is already added!');
        }
    }

    Hall.prototype.close = function () {
        this.events.length = 0;
        return `${this.name} hall is closed.`;
    }

    Hall.prototype.toString = function () {
        let result = `${this.name} hall - ${this.capacity}`;

        if (this.events.length > 0) {
            result += `\nEvents: ${this.events.join(', ')}`;
        }
        return result;
    }

    // MovieTheater
    let MovieTheater = function (capacity, name, screenSize) {
        Hall.call(this, capacity, name);
        this.events = [];
        this.screenSize = screenSize;
    }

    Object.setPrototypeOf(MovieTheater.prototype, Hall.prototype);

    MovieTheater.prototype.close = function () {
        let result = Hall.prototype.toString.call(this);
        result += 'All screenings are over.';
        return result;
    }

    MovieTheater.prototype.toString = function () {
        let result = Hall.prototype.toString.call(this);
        result += `\n${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`;
        return result;
    }

    //ConcertHall 
    let ConcertHall = function (capacity, name) {
        Hall.call(this, capacity, name);
        this.events = [];
    }
    Object.setPrototypeOf(ConcertHall.prototype, Hall.prototype);

    ConcertHall.prototype.hallEvent = function (title, performers) {
        let result = Hall.prototype.hallEvent.call(this, title);
        // if (result === 'Event is added.') {
        //     this.performers = performers;
        // }

        if (result === 'Event is added.') {
            this.events = this.events.map(event => {
                if (event === title) {
                    // If the event is the one we just added, attach the performers to it
                    return { title: event, performers };
                }

                return event; // Otherwise, return the event as it is
            });
        }

        return result;
    }

    ConcertHall.prototype.close = function () {
        let result = Hall.prototype.close.call(this);
        this.performers.length = 0;
        result += `Аll performances are over.`;
        return result;
    }

    ConcertHall.prototype.toString = function () {
        
        
        let result = Hall.prototype.toString.call(this);
        if (this.performers.length > 0) {
            result += `\nPerformers: ${this.performers.join(', ')}.`;
        }
        return result;
        
        // // Call Hall's toString with ConcertHall's context
        // let output = Hall.prototype.toString.call(this);

        // // If there are any events
        // if (this.events.length > 0) {
        //     // Get all performers
        //     let allPerformers = this.events.flatMap(event => event.performers);

        //     // Add performers to the output
        //     output += '\nPerformers: ' + allPerformers.join(', ') + '.';
        // }
        // return output;
    }

    return {
        Hall,
        MovieTheater,
        ConcertHall
    }
}

let classes = solveClasses();
let concert = new classes.ConcertHall(5000, 'Diamond');
console.log(concert.hallEvent('The Chromatica Ball', ['LADY GAGA']));
console.log(concert.toString());
// console.log(concert.close());
// console.log(concert.toString());


