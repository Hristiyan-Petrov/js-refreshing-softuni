function addItem() {
    let newItemTextElement = document.getElementById('newItemText');
    let newItemValueElement = document.querySelector('#newItemValue');

    let menuSelectElement = document.getElementById('menu');
    let optionElement = document.createElement('option');
    optionElement.value = newItemValueElement.value;
    optionElement.innerHTML = newItemTextElement.value;

    menuSelectElement.appendChild(optionElement);

    newItemTextElement.value = '';
    newItemValueElement.value = '';
}