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
    async login(email, password) {
      try {
        const userInfo = await fetchClient.post(`${baseUrl}/`, { email, password });
        if (userInfo.data) {
          showNotification("success", "Bienvenido");
          localStorage.setItem("user", JSON.stringify(userInfo.data));
          this.user = userInfo.data;
        } else {
          showNotification("error", "Usuario o contraseña incorrectos");
        }
      } catch (e) {
        console.error(e);
        showNotification("error", "Usuario o contraseña incorrectos");
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/home/login");
    },
  },
});


//
