let inputElement = document.getElementById('newText');
inputElement.addEventListener('keydown', addItemWithEnter);

let addButton = inputElement.nextElementSibling;
addButton.addEventListener('mouseover', isPointer);
addButton.addEventListener('mouseout', removePointer);

function addItem() {
    if (inputElement.value == '') return;

    let listElement = document.getElementById('items');
    let liElement = document.createElement('li');
    liElement.innerHTML = inputElement.value;

    let deleteButton = document.createElement('span');
    deleteButton.innerHTML = ' [DELETE]';
    deleteButton.style.color = 'red';
    deleteButton.style.cursor = 'pointer';
    // deleteButton.addEventListener('mouseover', isPointer);
    // deleteButton.addEventListener('mouseout', removePointer);
    deleteButton.addEventListener('click', function deleteElement(e) {
        // console.log(e.target.parentElement);
        e.target.parentElement.remove();
    });


    liElement.appendChild(deleteButton);
    listElement.appendChild(liElement);
    inputElement.value = '';
}

function isPointer(e) {
    e.target.style.cursor = 'pointer';
}

function removePointer(e) {
    e.target.style.cursor = 'default';
}

function addItemWithEnter(e) {
    if (e.key === 'Enter') {
        addItem();
        e.target.blur();
    } else {
        return;
    }
}