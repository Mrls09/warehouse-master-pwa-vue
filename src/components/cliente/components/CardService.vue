<template>
  <v-card :loading="loading" class="mx-auto my-4 animate__animated animate__rubberBand" max-width="300">
    <template v-slot:progress>
      <v-progress-linear color="blue" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img :src="product.qrCode" height="auto" alt="Imagen del producto" />

    <v-card-title class="text-h6">{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="my-2 font-weight-black">
        <strong>Precio:</strong> ${{ formatPrice(product.price) }}
      </div>
      <div class="my-2 text-caption">
        <strong>Proveedor:</strong> {{ product.supplier?.name || 'No especificado' }}
      </div>
      <div class="my-2 text-caption">
        <strong>Categoría:</strong> {{ product.category?.name || 'No especificada' }}
      </div>
      <div class="text-caption">
        <strong>Descripción:</strong> {{ product.description || 'Sin descripción' }}
      </div>
    </v-card-text>

    <v-divider class="mx-2"></v-divider>

    <v-btn color="deep-purple lighten-2" text @click="showElementos">
      Ver elementos del paquete
    </v-btn>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="agregarProducto">
        Agregar al carrito
      </v-btn>
    </v-card-actions>

    <!-- Snackbar para mostrar las notificaciones -->
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
    };
  },
  methods: {
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
          product._rev = existingProduct._rev;  // Guardar la revisión más reciente
          // Si el producto ya existe, actualiza la cantidad
          product.quantity = existingProduct.quantity + 1;

          // Actualizar el producto en la base de datos
          await window.dbCarrito.put(product);
          this.showNotification("success", "El producto ya estaba en el carrito. Cantidad actualizada.");

        } catch (error) {
          // Si no se encuentra el producto, lo agregamos
          if (error.name === 'not_found') {
            await window.dbCarrito.put(product);
            this.showNotification("success", "Producto agregado al carrito.");
          } else {
            throw error; // Si el error no es 'not_found', lo lanzamos
          }
        }

      } catch (error) {
        // Manejo del error específico de conflicto
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
    },

    showElementos() {
      // Aquí puedes agregar la lógica para mostrar los elementos del paquete, si es necesario.
    }
  },
};
</script>

<style scoped>
/* El estilo permanece igual */
.shopping-cart {
  padding: 20px;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: gray;
}

.cart-items ul {
  list-style: none;
  padding: 0;
}

.cart-items li.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}

.item-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 15px;
}

.product-name h3 {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.product-name p {
  font-size: 14px;
  color: gray;
}

.quantity-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  width: 40px;
}

.quantity-btn:hover {
  background-color: #0056b3;
}

.quantity-btn:focus {
  outline: none;
}

.quantity-display {
  font-size: 18px;
  margin: 0 15px;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.cart-total {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

.clear-cart-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

.clear-cart-btn:hover {
  background-color: darkred;
}
</style>
