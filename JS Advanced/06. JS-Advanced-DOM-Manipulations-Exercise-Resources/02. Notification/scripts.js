function notify() {
    let notificationContainer = document.getElementById('notification');
    let message = document.querySelector('#message').value;
    notificationContainer.textContent = message;

    let notificationContainerStyle = window.getComputedStyle(notificationContainer);
    notificationContainer.style.setProperty('display', 'block');

    if (notificationContainerStyle.display == 'block') {
        setTimeout(() => {
            notificationContainer.style.setProperty('display', 'none');
        }, '2000');
    }

}