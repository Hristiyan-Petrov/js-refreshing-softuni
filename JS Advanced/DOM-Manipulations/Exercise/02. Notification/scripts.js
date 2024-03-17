function notify() {
    let notificationContainer = document.getElementById('notification');
    let message = document.querySelector('#message');
    notificationContainer.style.display = 'block';
    notificationContainer.textContent = message.value;

    if (notificationContainer.style.display === 'block') {
        setTimeout(() => {
            notificationContainer.style.display = 'none';
        }, 2000);
    }
    message.value = '';
}