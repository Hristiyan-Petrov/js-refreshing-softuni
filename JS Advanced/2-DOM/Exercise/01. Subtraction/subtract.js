function subtract() {
    let resultElement = document.querySelector('#wrapper #result');

    let num1 = Number(document.getElementById('wrapper').firstElementChild.value);
    let num2 = Number(document.getElementById('wrapper').firstElementChild.nextElementSibling.value);

    resultElement.innerHTML = num1 - num2;
}