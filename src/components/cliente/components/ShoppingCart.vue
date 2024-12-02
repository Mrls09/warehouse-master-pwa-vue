<template>
  <div class="shopping-cart">
    <h1>Carrito de Compras</h1>
    <div v-if="cart.length === 0" class="empty-cart">
      <p>El carrito está vacío.</p>
    </div>
    <div v-else class="cart-items">
      <ul>
        <li v-for="(item, index) in cart" :key="index" class="cart-item">
          <div class="item-info">
            <div class="product-name">
              <h3>{{ item.product.name }}</h3>
              <p>Proveedor: {{ item.product.supplier }}</p>
            </div>
            <p>Cantidad: {{ item.quantity }}</p>
            <p>Precio: ${{ (item.product.price || 0).toFixed(2) }}</p>
            <p>{{ item.product.description }}</p>
          </div>
          <div class="item-actions">
            <div class="qr-code">
              <img :src="item.product.qrCode" alt="QR Code" />
            </div>
            <div class="quantity-actions">
              <button @click="incrementQuantity(item._id)" class="quantity-btn">+</button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button @click="decrementQuantity(item._id)" class="quantity-btn">-</button>
            </div>
            <button @click="removeProduct(item._id)" class="remove-btn">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-total">
      <p>Total: ${{ total.toFixed(2) }}</p>
    </div>
    <button @click="clearCart" class="clear-cart-btn">Vaciar carrito</button>

    <!-- Snackbar para mostrar notificaciones -->
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";

export default {
  name: "ShoppingCart",

  setup() {
    const cart = reactive([]);
    const snackbar = reactive({
      visible: false,
      message: "",
      color: "",
    });

    const loadCart = async () => {
      try {
        const allDocs = await window.db.allDocs({ include_docs: true });
        cart.splice(0, cart.length, ...allDocs.rows.map((row) => row.doc));
      } catch (error) {
        showNotification("error", "Error al cargar el carrito.");
      }
    };

    const incrementQuantity = async (id) => {
      try {
        const doc = await window.db.get(id);
        doc.quantity += 1;
        await window.db.put(doc);
        await loadCart();
        showNotification("success", "Cantidad incrementada.");
      } catch (error) {
        showNotification("error", "Error al incrementar cantidad.");
      }
    };

    const decrementQuantity = async (id) => {
      try {
        const doc = await window.db.get(id);
        if (doc.quantity > 1) {
          doc.quantity -= 1;
          await window.db.put(doc);
          await loadCart();
          showNotification("success", "Cantidad reducida.");
        } else {
          await removeProduct(id);
        }
      } catch (error) {
        showNotification("error", "Error al decrementar cantidad.");
      }
    };

    const removeProduct = async (id) => {
      try {
        const doc = await window.db.get(id);
        await window.db.remove(doc);
        await loadCart();
        showNotification("success", "Producto eliminado.");
      } catch (error) {
        showNotification("error", "Error al eliminar producto.");
      }
    };

    const clearCart = async () => {
      try {
        const allDocs = await window.db.allDocs({ include_docs: true });
        for (const row of allDocs.rows) {
          await window.db.remove(row.doc);
        }
        cart.splice(0, cart.length); // Vaciar el array local
        showNotification("success", "Carrito vaciado.");
      } catch (error) {
        showNotification("error", "Error al vaciar el carrito.");
      }
    };

    const showNotification = (type, message) => {
      snackbar.message = message;
      snackbar.color = type === "success" ? "green" : "red";
      snackbar.visible = true;
    };

    const total = computed(() =>
      cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    );

    onMounted(async () => {
      await loadCart();
    });

    return {
      cart,
      total,
      incrementQuantity,
      decrementQuantity,
      removeProduct,
      clearCart,
      snackbar,
    };
  },
};
</script>

<style scoped>
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
  flex: 2;
  padding-right: 20px;
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

.item-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.qr-code img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
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
