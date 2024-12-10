import { defineStore } from "pinia";
import { showNotification } from "@/utils/notification";
import { fetchClient } from "@/utils/fetch-client";
import router from "@/router";

const baseUrl = `/auth`;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    async login(correo, contrasenia) {
      try {
        const response = await fetchClient.post(`${baseUrl}/`, {
          email: correo, // Cambié 'email' para que coincida con el parámetro
          password: contrasenia, // Cambié 'password' para que coincida con el parámetro
        });
        this.user = response.data.user; 
        this.user.token = response.data.token; // Asumo que el token viene en la respuesta
        localStorage.setItem("user", JSON.stringify(this.user)); // Almacena en localStorage
        // Aquí también podrías guardar el token de autenticación si es necesario
      } catch (error) {
        throw new Error("Error al iniciar sesión");
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/home/login");
    },

    async getUserData() {
      if (this.user && this.user.uid) {
        try {
          const data = await fetchClient.get(
            `/users/get-user-uid/${this.user.uid}`
          );
          this.user = data;
          // Actualiza también localStorage después de obtener los datos
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      }
    },

    async updateUserData(payload) {
      try {
        if (!navigator.onLine) {
          // Detecta si no hay conexión antes de realizar la petición
          showNotification(
            "warning",
            "Sin conexión a internet. Los cambios se enviarán automáticamente cuando vuelvas a estar en línea."
          );
          throw new Error("Sin conexión a internet");
        }
    
        const updatedUser = await fetchClient.put(`/users/update`, payload);
        this.user = { ...this.user, ...updatedUser.data }; // Actualiza los datos localmente
        localStorage.setItem("user", JSON.stringify(this.user)); // Guarda en localStorage
        showNotification("success", "Nombre actualizado correctamente");
        return updatedUser.data;
      } catch (error) {
        if (error.message === "Sin conexión a internet") {
          console.warn("Actualización de usuario pendiente por falta de conexión.");
        } else {
          showNotification("error", "Error al actualizar los datos del usuario. Inténtalo más tarde.");
          console.error("Error al actualizar los datos del usuario:", error);
        }
        throw error; // Lanza el error para manejarlo en el componente si es necesario
      }
    }
    
    
  },
});
