<template>
  <div class="shopping-cart max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl ">
    <div class="flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h1 class="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
    </div>

    <!-- Empty Cart State -->
    <div v-if="cart.products.length === 0" class="text-center py-10 bg-gray-100 rounded-lg">
      <p class="text-gray-500 text-xl">El carrito está vacío</p>
    </div>

    <!-- Cart Items -->
    <div v-else class="space-y-4">
      <div 
        v-for="(item, index) in cart.products" 
        :key="index" 
        class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      >
        <!-- QR Code -->
        <div class="w-24 h-24 mr-4 flex-shrink-0">
          <img 
            :src="item.product.qrCode" 
            alt="Product QR" 
            class="w-full h-full object-cover rounded-md"
          />
        </div>
        
        <!-- Product Information -->
        <div class="flex-grow">
          <h3 class="text-xl font-semibold text-gray-800">
            {{ item.product.name }}
          </h3>
          <p class="text-gray-600">
            Proveedor: {{ item.product.provider }}
          </p>
          <p class="text-gray-500 text-sm">
            {{ item.product.description }}
          </p>
        </div>
        
        <!-- Actions -->
        <div class="flex flex-col items-end space-y-2">
          <!-- Quantity Controls -->
          <div class="flex items-center space-x-2">
            <button 
              @click="decrementQuantity(item.product._id)"
              class="bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="font-bold text-gray-700">
              {{ item.quantity }}
            </span>
            <button 
              @click="incrementQuantity(item.product._id)"
              class="bg-green-100 text-green-600 rounded-full p-1 hover:bg-green-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <!-- Price and Remove -->
          <div class="flex items-center space-x-2">
            <p class="font-semibold text-blue-600">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
            <button 
              @click="removeProduct(item.product._id)"
              class="text-red-500 hover:text-red-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Total and Actions -->
    <div class="mt-6 bg-gray-100 p-4 rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <span class="text-xl font-bold text-gray-800">Total:</span>
        <span class="text-2xl font-bold text-blue-600">
          ${{ cart.total.toFixed(2) }}
        </span>
      </div>

      <!-- Observations -->
      <div v-if="cart.products.length > 0" class="mt-4">
        <label 
          for="observations" 
          class="block text-gray-700 font-semibold mb-2"
        >
          Observaciones
        </label>
        <textarea
          id="observations"
          v-model="observations"
          rows="4"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition"
          placeholder="Puedes escribir referencias, instrucciones o comentarios adicionales aquí."
        ></textarea>
      </div>

      <!-- Cart Actions -->
      <div class="flex justify-between mt-6 space-x-4">
        <button 
          @click="clearCart"
          class="flex-grow bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Vaciar carrito
        </button>
        <button 
          @click="comprarCart"
          class="flex-grow bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { createMovement } from "@/services/ServicesServices";
import { showNotification } from "@/utils/notification";
import { useAuthStore } from "@/stores";

export default {
  name: "ShoppingCart",
  setup() {
    const cart = reactive({
      products: [],
      total: 0,
    });

    const observations = ref("");

    const calculateTotal = () => {
      cart.total = cart.products.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    };

    const loadCart = async () => {
      try {
        const result = await window.dbCarrito.allDocs({ include_docs: true });
        cart.products = result.rows.map((row) => ({
          product: row.doc,
          quantity: row.doc.quantity || 1,
        }));
        calculateTotal();
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    const incrementQuantity = async (uid) => {
      const item = cart.products.find((item) => item.product._id === uid);
      if (item) {
        item.quantity += 1;
        item.product.quantity = item.quantity;
        console.log(item);
        await window.dbCarrito.put(item.product);
        calculateTotal();
      }
    };

    const decrementQuantity = async (uid) => {
      const item = cart.products.find((item) => item.product._id === uid);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.product.quantity = item.quantity;
        await window.dbCarrito.put(item.product);
        calculateTotal();
      } else if (item) {
        await removeProduct(uid);
      }
    };

    const removeProduct = async (uid) => {
      const index = cart.products.findIndex((item) => item.product._id === uid);
      if (index !== -1) {
        await window.dbCarrito.remove(cart.products[index].product);
        cart.products.splice(index, 1);
        calculateTotal();
      }
    };

    const clearCart = async () => {
      try {
        const allDocs = await window.dbCarrito.allDocs();
        const deleteOps = allDocs.rows.map((row) =>
          window.dbCarrito.remove(row.id, row.value.rev)
        );
        await Promise.all(deleteOps);
        cart.products = [];
        calculateTotal();
      } catch (error) {
        console.error("Error al vaciar el carrito:", error);
      }
    };

    const comprarCart = async () => {
      const { user } = useAuthStore();
      const isLoggedIn = !!user?.token;
      if (!isLoggedIn) {
        showNotification(
          "warning",
          "Inicia sesión para proceder con tu compra."
        );
        return;
      }
      if (cart.products.length === 0) {
        showNotification("warning", "El carrito está vacío.");
        return;
      }

      const payload = {
        products: cart.products.map((item) => ({
          product: { uid: item.product._id },
          quantity: item.quantity,
        })),
        status: "EXIT",
        observations: observations.value,
      };

      try {
        const result = await createMovement(payload);
        if (result) {
          await clearCart();
        } else {
          await storeOfflineOrder(payload);
          showNotification(
            "warning",
            "Sin conexión. La orden se guardará para envío posterior."
          );
          clearCart();
        }
      } catch (error) {
        console.error("Error en comprarCart:", error);
        await storeOfflineOrder(payload);
        showNotification(
          "error",
          "Error al procesar la compra. Intenta de nuevo."
        );
      }
    };

    const storeOfflineOrder = async (payload) => {
      try {
        const newOrder = {
          _id: new Date().toISOString(),
          payload: payload,
          sent: false,
        };
        await window.dbComprarCarrito.put(newOrder);
        await window.dbMovimientos.put({
          ...payload,
          _id: newOrder._id,
        });
      } catch (error) {
        console.error("Error al guardar la orden offline:", error);
      }
    };

    let isSendingOrders = false;

    const sendPendingOrders = async () => {
      if (isSendingOrders) return;
      isSendingOrders = true;

      try {
        const orders = await window.dbComprarCarrito.allDocs({
          include_docs: true,
        });
        const pendingOrders = orders.rows.filter(
          (row) => !row.doc.sent && !row.doc.sending
        );

        for (const order of pendingOrders) {
          try {
            order.doc.sending = true;
            await window.dbComprarCarrito.put(order.doc);

            const result = await createMovement(order.doc.payload);
            if (result) {
              await window.dbComprarCarrito.remove(
                order.doc._id,
                order.doc._rev
              );
              console.log(
                "Orden enviada y eliminada correctamente:",
                order.doc._id
              );
            }
          } catch (error) {
            console.error(
              "Error al procesar la orden:",
              error,
              "ID:",
              order.doc._id
            );
          }
        }
      } catch (error) {
        console.error("Error al procesar órdenes pendientes:", error);
      } finally {
        isSendingOrders = false;
      }
    };

    const checkOnlineStatus = async () => {
      if (navigator.onLine) {
        await sendPendingOrders();
      }
    };

    onMounted(() => {
      loadCart();
      checkOnlineStatus(); // Verificar órdenes pendientes al montar el componente
      window.removeEventListener("online", checkOnlineStatus);
      window.addEventListener("online", checkOnlineStatus);
    });

    window.addEventListener("online", checkOnlineStatus);

    return {
      cart,
      observations,
      incrementQuantity,
      decrementQuantity,
      removeProduct,
      clearCart,
      comprarCart,
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

.comprar-cart-btn {
  margin-top: 20px;
  padding: 10px 70px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
}

.comprar-cart-btn:hover {
  background-color: darkgreen;
}

/* Estilos para el textarea de observaciones */
.observations-section {
  margin-top: 20px;
}

.observations-textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 16px;
  line-height: 1.5;
  background-color: #f9f9f9;
  margin-top: 8px;
}

.observations-textarea:focus {
  outline: none;
  border-color: #007bff;
  background-color: #fff;
}

/* Custom button styles */
.custom-btn {
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.custom-btn:hover {
  background-color: #333;
  transform: scale(1.05);
}

.custom-btn:focus {
  outline: none;
}
</style>