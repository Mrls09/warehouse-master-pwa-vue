<template>
  <v-card :loading="loading" class="mx-auto my-4 card" max-width="300">
    <template v-slot:progress>
      <v-progress-linear color="blue" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img :src="product.qrCode" height="auto" alt="Imagen del producto" class="product-image" />

    <v-card-title class="text-h6">{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="my-2">
        <strong>Precio:</strong> ${{ formatPrice(product.price) }}
      </div>
      <div class="my-2">
        <strong>Proveedor:</strong> {{ product.supplier?.name || 'No especificado' }}
      </div>
      <div class="my-2">
        <strong>Categoría:</strong> {{ product.category?.name || 'No especificada' }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn class="custom-btn" color="deep-purple lighten-2" text @click="showDetails">Ver detalles</v-btn>
      <v-btn class="custom-btn" color="deep-purple lighten-2" text @click="agregarProducto">Agregar al carrito</v-btn>
    </v-card-actions>

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">{{ product.name }}</v-card-title>
        <v-card-text class="d-flex flex-column align-center">
          <v-img :src="product.qrCode" max-width="200" alt="Imagen del producto" class="product-image-modal" />
          <div class="info-modal mt-4">
            <div class="my-2">
              <strong>Precio:</strong> ${{ formatPrice(product.price) }}
            </div>
            <div class="my-2">
              <strong>Proveedor:</strong> {{ product.supplier?.name || 'No especificado' }}
            </div>
            <div class="my-2">
              <strong>Categoría:</strong> {{ product.category?.name || 'No especificada' }}
            </div>
            <div class="my-2">
              <strong>Descripción:</strong> {{ product.description || 'Sin descripción' }}
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn class="custom-btn" color="green" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "CardService",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        name: "Producto desconocido",
        price: 0,
        supplier: { name: "No especificado" },
        category: { name: "No especificada" },
        description: "Sin descripción",
        qrCode: "",
      }),
    },
  },
  data() {
    return {
      loading: false,
      snackbar: {
        visible: false,
        message: "",
        color: "",
      },
      dialog: false,
    };
  },
  methods: {
    showDetails() {
      this.dialog = true;
    },
    async agregarProducto() {
      this.loading = true;
      try {
        const product = {
          _id: this.product.uid,
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
          qrCode: this.product.qrCode,
          supplier: this.product.supplier?.name || 'No especificado',
          category: this.product.category?.name || 'No especificada',
          quantity: 1,
        };

        try {
          const existingProduct = await window.dbCarrito.get(product._id);
          product._rev = existingProduct._rev;
          product.quantity = existingProduct.quantity + 1;
          await window.dbCarrito.put(product);
          this.showNotification("success", "El producto ya estaba en el carrito. Cantidad actualizada.");
        } catch (error) {
          if (error.name === 'not_found') {
            await window.dbCarrito.put(product);
            this.showNotification("success", "Producto agregado al carrito.");
          } else {
            throw error;
          }
        }
      } catch (error) {
        if (error.status === 409) {
          console.error("Conflicto al actualizar el documento. Intentando resolver...");
          this.showNotification("error", "Conflicto al actualizar el producto.");
        } else {
          console.error("Error al agregar el producto al carrito:", error);
          this.showNotification("error", "Error al agregar el producto al carrito.");
        }
      } finally {
        this.loading = false;
      }
    },

    showNotification(type, message) {
      this.snackbar.message = message;
      this.snackbar.color = type === "success" ? "green" : "red";
      this.snackbar.visible = true;
    },

    formatPrice(price) {
      return price ? price.toFixed(2) : "0.00";
    }
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.v-card__text {
  text-align: left;
}

.v-divider {
  width: 100%;
}

.v-card__actions {
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.v-btn {
  margin: 10px;
}

.v-snackbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.v-progress-linear {
  width: 100%;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.product-image-modal {
  width: 200px;
  height: auto;
  border-radius: 12px;
}

.info-modal {
  text-align: left;
  width: 100%;
}

.custom-btn {
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.custom-btn:hover {
  background-color: #BB5E7D;
  color: white !important;
  transform: scale(1.05);
}

.custom-btn:focus {
  outline: none;
}

@media (min-width: 768px) {
  .card {
    max-width: 300px;
  }
}

@media (max-width: 767px) {
  .card {
    max-width: 100%;
  }
}
</style>
