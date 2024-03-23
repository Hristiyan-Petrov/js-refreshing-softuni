function solve() {
    let selectMenuTo = document.getElementById('selectMenuTo');
    let selectMenuFrom = document.getElementById('selectMenuFrom');

    let manageOptions = () => {
        let binaryOption = selectMenuTo.firstElementChild;
        binaryOption.innerHTML = 'Binary';
        binaryOption.value = 'binary';
        selectMenuTo.appendChild(binaryOption);

        let hexadecimalOption = document.createElement('option');
        hexadecimalOption.innerHTML = 'Hexadecimal';
        hexadecimalOption.value = 'hexadecimal';
        selectMenuTo.appendChild(hexadecimalOption);

        let decimalOption = document.createElement('option');
        decimalOption.innerHTML = 'Decimal';
        decimalOption.value = 'decimal';
        selectMenuTo.appendChild(decimalOption)

        let binaryOption2 = binaryOption.cloneNode(true);
        binaryOption2.removeAttribute('selected');
        selectMenuFrom.appendChild(binaryOption2);
        selectMenuFrom.appendChild(hexadecimalOption.cloneNode(true));
    }

    manageOptions();

    selectMenuFrom.addEventListener('change', function () {
        if (this.options.selectedIndex === 2) {
            console.log(document.querySelector('#container input').type);
            document.querySelector('#container input').setAttribute('type', 'text');
            console.log(document.querySelector('#container input').type);
        } else {
            document.querySelector('#container input').setAttribute('type', 'number');
        }
    });

    let button = document.querySelector('#container button');
    button.addEventListener('click', calculate);

    function calculate() {
        let input = document.querySelector('#container input').value;
        let convertFrom = selectMenuFrom.value;
        let convertTo = selectMenuTo.value;

        if (!input) {
            return;
        } else if (setNumberSystem(convertFrom) === 'hexadecimal') {
            const hexRegex = /^[0-9a-fA-F]+$/;
            if (!hexRegex.test(input)) {
                alert('This is not a valid Hexadecimal Number!')
            }
        }

        let result = parseInt(input, setNumberSystem(convertFrom)).toString(setNumberSystem(convertTo));
        appendResult(result);

        function appendResult(result) {
            let resultField = document.querySelector('footer input');
            resultField.value = result;
        }

        function setNumberSystem(format) {
            switch (format) {
                case 'decimal':
                    return 10;
                case 'hexadecimal':
                    return 16
                case 'binary':
                    return 2;
            }
        }
    }
}