<template>
  <v-container class="py-12">
    <v-card elevation="5" class="mx-auto" max-width="800">
      <!-- Título y botón de cerrar sesión -->
      <v-card-title class="d-flex justify-space-between align-center">
        <h2 class="mb-0">Mi perfil</h2>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Datos del usuario -->
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Nombre completo:</v-list-item-title
                >
                <v-list-item-subtitle>{{ usuario.name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Correo electrónico:</v-list-item-title
                >
                <v-list-item-subtitle>{{ usuario.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Rol:</v-list-item-title
                >
                <v-list-item-subtitle>{{ usuario.role }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-divider class="my-4"></v-divider>

      <!-- Pie de página -->
      <v-card-subtitle class="text-center">
        <small>
          Tus datos en <strong>warehouse</strong> son completamente privados y
          seguros. Respetamos tu privacidad en todo momento.
        </small>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores";
import UsersServices from "@/services/UsersServices";

export default {
  data() {
    return {
      usuario: {}, // Los datos del usuario se almacenan aquí
    };
  },
  methods: {
    signOut() {
      const authStore = useAuthStore();
      authStore.logout();
    },
    async getUserData() {
      try {
        const data = await UsersServices.getMyUser(); // Solicita los datos del usuario
        this.usuario = data; // Asigna la información al objeto usuario
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
  },
  mounted() {
    this.getUserData(); // Carga los datos al montar el componente
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.v-container {
  background-color: #f9f9f9;
}

.v-card-title h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.v-list-item-title {
  font-size: 1rem;
}

.v-list-item-subtitle {
  font-size: 0.9rem;
  color: #424242;
}
</style>
