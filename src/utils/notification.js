import Vue from 'vue'
import 'vuejs-noty/dist/vuejs-noty.css'
export function showNotification(type, message) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Notificación", {
                body: message,
                icon: 'https://i.ibb.co/hLC5Lb6/Logo-Waterhouse144.png', 
                badge: 'https://i.ibb.co/hLC5Lb6/Logo-Waterhouse144.png' 
            });
        });
    }
    switch (type) {
        case 'success':
            Vue.noty.success(message);
            break;
        case 'error':
            Vue.noty.error(message);
            break;
        case 'warning':
            Vue.noty.warning(message);
            break;
        case 'info':
            Vue.noty.info(message);
            break;
        default:
            Vue.noty.info(message);
            break;
    }
}