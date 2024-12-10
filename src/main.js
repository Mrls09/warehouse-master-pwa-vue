import Vue from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'animate.css';
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'regenerator-runtime/runtime';
import { registerSW } from 'virtual:pwa-register'
import { showNotification } from './utils/notification';

const pinia = createPinia();

Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  layout: 'topRight'
})
Vue.use(VueSweetalert2)
Vue.use(pinia);
Vue.use(vuetify);


// Registra el Service Worker con  virtual:pwa-register
registerSW({
  immediate: true,
  onOfflineReady() {
    if (navigator.serviceWorker) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
    
    showNotification('info', 'La aplicación está lista para usarse sin conexión.');
  },
  onRegistered(r) {
    r && setInterval(() => { r.update(); }, 1800000); //Opcional, para verificar actualizaciones cada 30min
  }
});



new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App)
}).$mount('#app')



// Elimina el código anterior para registrar el service worker manualmente,
// ya que registerSW() lo hace automáticamente.