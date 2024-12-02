import { defineStore } from "pinia";
import { showNotification } from "@/utils/notification";
import { fetchClient } from "@/utils/fetch-client";
import router from "@/router";

const baseUrl = `/auth`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
        try {
            const userInfo = await fetchClient.post(`${baseUrl}/`, { email, password });
            if (userInfo.data) {
                showNotification('success', 'Bienvenido');
                // Guarda SOLO la información necesaria en localStorage (uid, por ejemplo)
                localStorage.setItem('user', JSON.stringify(userInfo.data));  
    
                // Accede directamente a la información necesaria desde userInfo.data
                this.usuario = userInfo.data; // Asigna la información al objeto usuario
                this.uid = userInfo.data.uid; // Si necesitas acceder rápidamente al uid
    
    
                let route = '/home/servicios/';
                this.returnUrl = route;
                await router.push(route);
            } else {
                showNotification('error', 'Usuario o contraseña incorrectos');
            }
        } catch (e) {
            console.error(e);
            showNotification('error', 'Usuario o contraseña incorrectos');
        }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/home/inicio");
      showNotification("success", "Sesión cerrada");
    },
  },
});

//
