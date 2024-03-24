// init(selector1, selector2, resultSelector) - initializes the object to work with the elements corresponding to the supplied selectors.
// add() - adds the numerical value of the element corresponding to selector1 to the numerical value of the element corresponding to selector2 and then writes the result in the element corresponding to resultSelector
// subtract() - subtracts the numerical value of the element corresponding to selector2 from the numerical value of the element corresponding to selector1 and then writes the result in the element corresponding to resultSelector


function solve(input) {

    const commands = () => {
        let sumButton = document.getElementById('sumButton');
        let subtractButton = document.getElementById('subtractButton');
        let resultFiel = document.getElementById('result');

        return {
            init: () => null,
            add: () => null,
            subtract: () => null
        }
    }


}