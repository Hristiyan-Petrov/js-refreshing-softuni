function solve() {
    let articleElement = document.getElementById('exercise').firstElementChild;
    let inputField = articleElement.firstElementChild;
    let buttonElement = articleElement.lastElementChild;

    buttonElement.addEventListener('click', function () {
        let studentName = inputField.value;
        let firstLetterCapital = studentName.substring(0, 1).toUpperCase();
        // if (studentName === '') {
        //     alert('Enter valid name');
        //     return;
        // }

        let oListElement = document.querySelector('#exercise div ol');
        let positionInAlphabet = firstLetterCapital.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

        Array.from(oListElement.children).forEach((el, i) => {
            if (i + 1 === positionInAlphabet) {

                if (!el.innerHTML) {
                    el.innerHTML = firstLetterCapital + studentName.substring(1);
                } else {
                    el.innerHTML += `, ${firstLetterCapital + studentName.substring(1)}`;
                }
            }
        });

        inputField.value = '';
    });

}