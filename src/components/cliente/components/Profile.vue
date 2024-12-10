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
                <v-list-item-title class="font-weight-bold">
                  Nombre Completo:
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ usuario.name }}
                  <v-btn icon color="blue" @click="editName" class="ml-2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  Correo Electrónico:
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ usuario.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <!-- Botón de Cerrar Sesión estilizado -->
        <v-btn class="custom-btn" color="red" text @click="signOut">
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

    <!-- Modal para editar nombre -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Editar Nombre</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newName"
            label="Nuevo Nombre"
            outlined
            autofocus
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="editDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveName">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { useAuthStore } from "@/stores";
import { showNotification } from "@/utils/notification"; // Importar la función showNotification

export default {
  data() {
    return {
      usuario: {
        name: "",
        email: "",
      },
      editDialog: false, // Controla la visibilidad del modal
      newName: "", // Almacena el nuevo nombre
      handleOnlineListener: null, // Listener para conexión
    };
  },
  methods: {
    async signOut() {
      const authStore = useAuthStore();
      authStore.logout();
    },
    async getUserData() {
      let user = localStorage.getItem("user");
      if (user) {
        try {
          user = JSON.parse(user);
          console.log("UID:", user.uid); // Verifica el valor de uid
          this.usuario = user; // Asigna los datos al objeto usuario
        } catch (error) {
          console.error("Error al obtener uid:", error);
        }
      } else {
        console.log("Usuario no encontrado en localStorage");
      }
    },
    editName() {
      this.newName = this.usuario.name; // Rellenar el campo con el nombre actual
      this.editDialog = true; // Abrir el modal
    },
    async saveName() {
      if (this.newName.trim() !== "") {
        this.usuario.name = this.newName; // Actualiza el nombre localmente
        this.editDialog = false; // Cierra el modal

        const payload = { ...this.usuario, name: this.newName };

        if (navigator.onLine) {
          try {
            const authStore = useAuthStore();
            await authStore.updateUserData(payload);
          } catch (error) {
            console.error("Error al actualizar el nombre:", error);
            showNotification("error", "No se pudo actualizar el nombre");
          }
        } else {
          try {
            const offlineRequest = {
              _id: new Date().toISOString(), // Identificador único
              payload,
              sent: false,
            };
            await window.dbNombreUpdate.put(offlineRequest);
            showNotification("warning", "Sin conexión. Los cambios se enviarán automáticamente cuando vuelvas a estar en línea.");
          } catch (error) {
            console.error("Error al guardar la petición localmente:", error);
            showNotification("error", "No se pudo guardar la petición localmente");
          }
        }
      }
    },
    async sendPendingNameUpdates() {
      try {
        const requests = await window.dbNombreUpdate.allDocs({
          include_docs: true,
        });
        const pendingRequests = requests.rows.filter(
          (row) => !row.doc.sent
        );

        for (const request of pendingRequests) {
          try {
            const authStore = useAuthStore();
            await authStore.updateUserData(request.doc.payload);
            await window.dbNombreUpdate.remove(request.doc); // Eliminar con _id y _rev
            console.log(
              "Cambio pendiente procesado y eliminado:",
              request.doc._id
            );
          } catch (error) {
            console.error("Error al enviar la petición pendiente:", error);
          }
        }
      } catch (error) {
        console.error("Error al procesar peticiones pendientes:", error);
      }
    },
  },
  mounted() {
    this.getUserData();

    if (navigator.onLine) {
      this.sendPendingNameUpdates();
    }

    const handleOnline = async () => {
      await this.sendPendingNameUpdates();
    };

    window.addEventListener("online", handleOnline);
    this.handleOnlineListener = handleOnline;
  },
  beforeUnmount() {
    if (this.handleOnlineListener) {
      window.removeEventListener("online", this.handleOnlineListener);
    }
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

/* Estilo personalizado para los botones */
.custom-btn {
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.custom-btn:hover {
  transform: scale(1.05);
}

.custom-btn:focus {
  outline: none;
}
</style>
