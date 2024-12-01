<template>
  <div class="shopping-cart">
    <h1>Carrito de Compras</h1>
    <div v-if="cart.products.length === 0" class="empty-cart">
      <p>El carrito está vacío.</p>
    </div>
    <div v-else class="cart-items">
      <ul>
        <li v-for="(item, index) in cart.products" :key="index" class="cart-item">
          <div class="item-info">
            <div class="product-name">
              <h3>{{ item.product.name }}</h3>
              <p>Proveedor: {{ item.product.provider }}</p>
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
              <button @click="incrementQuantity(item.product.uid)" class="quantity-btn">+</button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button @click="decrementQuantity(item.product.uid)" class="quantity-btn">-</button>
            </div>
            <button @click="removeProduct(item.product.uid)" class="remove-btn">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-total">
      <p>Total: ${{ total.toFixed(2) }}</p>
    </div>
    <button @click="clearCart" class="clear-cart-btn">Vaciar carrito</button>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart.store";
import { computed } from "vue";

export default {
  setup() {
    const cartStore = useCartStore();

    const cart = computed(() => cartStore.cart);
    const total = computed(() => cartStore.getTotal());

    const incrementQuantity = (uid) => {
      const product = cartStore.cart.products.find(
        (item) => item.product.uid === uid
      );
      if (product) {
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cartStore.cart));
      }
    };

    const decrementQuantity = (uid) => {
      const product = cartStore.cart.products.find(
        (item) => item.product.uid === uid
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cartStore.cart));
      } else if (product) {
        cartStore.substractStuff(uid);
      }
    };

    const removeProduct = (uid) => {
      cartStore.substractStuff(uid);
    };

    const clearCart = () => {
      cartStore.deleteAll();
    };

    return {
      cart,
      total,
      incrementQuantity,
      decrementQuantity,
      removeProduct,
      clearCart,
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
