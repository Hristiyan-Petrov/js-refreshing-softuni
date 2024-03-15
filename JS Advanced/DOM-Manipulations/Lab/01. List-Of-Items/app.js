function addItem() {
    let inputElement = document.getElementById('newItemText');
    if (inputElement.value == '') return;

    let listElement = document.getElementById('items');
    let liElement = document.createElement('li');
    liElement.innerHTML = inputElement.value;
    listElement.appendChild(liElement);
    inputElement.value = '';
}