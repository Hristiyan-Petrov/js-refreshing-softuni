// Implemented the `dispatchNotificationEvent` method in the `Register` component to create and dispatch the custom event on the `NotificationComponent` instance, ensuring proper event propagation.

// This method creates a custom event 'showNotification' with the provided message and type, and dispatches it on the NotificationComponent instance to trigger the notification display

export const dispatchNotificationEvent = (message, type) => {
    const notificationComponent = document.querySelector('notification-component');
    const notificationEvent = new CustomEvent('showNotification', {
        detail: {
            message,
            type
        },
        bubbles: true, // Add this option to allow event bubbling
        composed: true // Add this option to allow event propagation across Shadow DOM boundaries
    });
    notificationComponent.dispatchEvent(notificationEvent);
}