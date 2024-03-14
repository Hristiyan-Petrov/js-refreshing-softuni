function toggle() {
    let contentElement = document.getElementById('extra');
    let buttonElement = document.querySelector('.head .button');

    if (contentElement.style.display !== 'block') {
        contentElement.style.display = 'block';
    } else {
        contentElement.style.display = 'none';
    }

    buttonElement.innerHTML = buttonElement.innerHTML === 'More' ? 'Less' : 'More';        
}