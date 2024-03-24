function solve() {

    return {
        fighter: (name) => {
            let state = {
                name,
                health: 100,
                stamina: 100,
                fight: function () {
                    this.stamina--;
                    console.log(`${this.name} slashes at the foe!`);
                }
            }
            return state;
        },
        mage: (name) => {
            return {
                name,
                health: 100,
                mana: 100,
                cast: function (spell) {
                    this.mana--;
                    console.log(`${this.name} cast ${spell}`);
                }
            }
        }
    }
}

// function solve() {
    //     function heroCreator(name, type) {
        //         let hero = {
            //             name,
            //             health: 100
            //         };

//         if (type === 'mage') {
//             hero.mana = 100;
//             hero.cast = function (spell) {
//                 console.log(`${this.name} cast ${spell}`);
//                 this.mana--;
//             }
//         } else if (type === 'fighter') {
//             hero.stamina = 100;
//             hero.fight = function () {
//                 console.log(`${this.name} slashes at the foe!`);
//                 this.stamina--;
//             }
//         }

//         return hero;
//     }

//     return {
//         mage: name => heroCreator(name, 'mage'),
//         fighter: name => heroCreator(name, 'fighter')
//     }
// }


// Tests
let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball");  // Scorcher cast fireball
scorcher.cast("thunder");   // Scorcher cast thunder
scorcher.cast("light");    // Scorcher cast light

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight();    // Scorcher 2 slashes at the foe!

console.log(scorcher2.stamina);  // 99
console.log(scorcher.mana);  // 97