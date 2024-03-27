function createBaloonClasses() {

    let Balloon = function (color, gasWeight) {
        this.color = color;
        this.gasWeight = gasWeight;
    }

    // PartyBalloon definition by function constructor
    // let PartyBalloon = function (color, gasWeight, ribbonColor, ribbonWeigth) {
    //     Balloon.call(this, color, gasWeight);
    //     this.ribbonColor = ribbonColor;
    //     this.ribbonWeigth = ribbonWeigth;
    //     this.#ribbon = {
    //         color: this.ribbonColor,
    //         length: this.ribbonWeigth
    //     }
    // }
    // PartyBalloon.prototype = Object.create(Balloon.prototype);
    // Object.defineProperty(PartyBalloon.prototype, 'ribbon', { // This is the way of setting a getter in function constructor class
    //     get: function () {
    //         return this.#ribbon;
    //         // return {
    //             // color: this.ribbonColor,
    //             // length: this.ribbonWeigth
    //         // }
    //     }
    // });

    //PartyBalloon definition by class syntax

    class PartyBalloon extends Balloon {
        #ribbon;

        constructor(color, gasWeight, ribbonColor, ribbonWeigth) {
            super(color, gasWeight);
            this.ribbonColor = ribbonColor;
            this.ribbonWeigth = ribbonWeigth;
            this.#ribbon = {
                color: this.ribbonColor,
                length: this.ribbonWeigth
            }
        }

        get ribbon() {
            return this.#ribbon;
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        #text;

        constructor(color, gasWeight, ribbonColor, ribbonWeigth, text) {
            super(color, gasWeight, ribbonColor, ribbonWeigth);
            this.#text = text
        }

        get text() {
            return this.#text;
        }
    }

    return {
        Balloon: Balloon,
        PartyBalloon: PartyBalloon,
        BirthdayBalloon: BirthdayBalloon
    }
}

let classes = createBaloonClasses();

let test = new classes.PartyBalloon("Tumno-bqlo", 20.5, "Svetlo-cherno", 10.25);
let ribbon = test.ribbon;
console.log(ribbon);




// for (const key in pb) {
//     if (pb.hasOwnProperty(key)) {
//         // console.log(key);        
//     } else {
//         // console.log(key);
//     }
// }