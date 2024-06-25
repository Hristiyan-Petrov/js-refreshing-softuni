export const showNotification = (messages, type) => {
    const notification = document.querySelector('.notification-top-bar');

    if (messages && !Array.isArray(messages)) messages = [messages];

    notification.innerHTML += messages.map(message => `<p>${message}</p>`).join('')

    // remove old type classes if they exist
    // Array.from(notification.children).forEach(child => child.classList.remove('error', 'success'));

    if (type === 'success') {
        Array.from(notification.children).forEach(child => child.classList.add('success'));
    } else if (type === 'error') {
        Array.from(notification.children).forEach(child => child.classList.add('error'));
    }

    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
        notification.textContent = '';
    }, type === 'success' ? 3000 : 10000);
}