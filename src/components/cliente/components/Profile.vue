<template>
  <v-container class="py-12 d-flex justify-center">
    <v-card elevation="5" class="mx-auto text-center" max-width="600">
      <!-- Avatar -->
      <v-avatar size="120" class="mx-auto my-4">
        <img
          :src="'https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg'"
          alt="Avatar"
        />
      </v-avatar>

      <!-- Título y botón de cerrar sesión -->
      <v-card-title class="d-flex justify-center align-center">
        <h2 class="mb-0">Mi Perfil</h2>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Datos del usuario -->
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Nombre Completo:</v-list-item-title
                >
                <v-list-item-subtitle>
                  {{ usuario.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Correo Electrónico:</v-list-item-title
                >
                <v-list-item-subtitle>{{ usuario.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-btn color="red" text @click="signOut">
          <v-icon left>mdi-logout</v-icon>
          Cerrar Sesión
        </v-btn>
      </v-card-text>

      <v-divider class="my-4"></v-divider>

      <!-- Pie de página -->
      <v-card-subtitle class="text-center">
        <small>
          Tus datos en <strong>Warehouse</strong> son completamente privados y
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
      usuario: {
        name: "",
        email: "",
      }, // Los datos del usuario se almacenan aquí
    };
  },
  methods: {
    signOut() {
      const authStore = useAuthStore();
      authStore.logout();
    },
    async getUserData() {
      let user = localStorage.getItem("user");
      let uid;
      if (user) {
        try {
          user = JSON.parse(user);
          uid = user.uid;
          console.log("UID:", uid); // Verifica el valor de uid
          // ... usa uid aquí ...
        } catch (error) {
          console.error("Error al obtener uid:", error);
        }
      } else {
        console.log("Usuario no encontrado en localStorage");
      }
      console.log("Obteniendo datos del usuario...", user.user.uid);
      try {
        const data = await UsersServices.getMyUser(user.user.uid); // Solicita los datos del usuario
        this.usuario = data; // Asigna la información al objeto usuario
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
  },
  mounted() {
    this.getUserData(); // Carga los datos al montar el componentes
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.v-container {
  background-color: #f9f9f9;
}

.v-card {
  padding: 20px;
}

.v-avatar {
  border: 2px solid #e0e0e0;
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
