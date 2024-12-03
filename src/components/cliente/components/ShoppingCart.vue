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
              <button @click="incrementQuantity(item.product._id)" class="quantity-btn">+</button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button @click="decrementQuantity(item.product._id)" class="quantity-btn">-</button>
            </div>
            <button @click="removeProduct(item.product._id)" class="remove-btn">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-total">
      <p>Total: ${{ cart.total.toFixed(2) }}</p>
    </div>
    <div class="quantity-actions">
      <button @click="clearCart" class="clear-cart-btn">Vaciar carrito</button>
      <br>
      <button @click="comprarCart" class="comprar-cart-btn">Comprar</button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { createMovement } from "@/services/ServicesServices";

export default {
  name: "ShoppingCart",
  setup() {
    // Definir cart como un objeto reactivo con productos y total
    const cart = reactive({
      products: [],
      total: 0, // Aseguramos que total esté inicialmente a 0
    });

    // Función para calcular el total del carrito
    const calculateTotal = () => {
      cart.total = cart.products.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    };

    // Cargar los productos del carrito desde la base de datos
    const loadCart = async () => {
      try {
        const result = await window.db.allDocs({ include_docs: true });
        cart.products = result.rows.map((row) => ({
          product: row.doc,
          quantity: row.doc.quantity || 1, // Si no hay cantidad, se asigna 1 por defecto
        }));
        calculateTotal(); // Recalcular el total después de cargar los productos
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    // Incrementar la cantidad de un producto
    const incrementQuantity = async (uid) => {
      const item = cart.products.find((item) => item.product._id === uid);
      if (item) {
        item.quantity += 1;
        item.product.quantity = item.quantity; // Actualizar la cantidad en el producto
        await window.db.put(item.product); // Guardar el cambio en la base de datos
        calculateTotal(); // Recalcular el total
      }
    };

    // Decrementar la cantidad de un producto
    const decrementQuantity = async (uid) => {
      const item = cart.products.find((item) => item.product._id === uid);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.product.quantity = item.quantity; // Actualizar la cantidad en el producto
        await window.db.put(item.product); // Guardar el cambio en la base de datos
        calculateTotal(); // Recalcular el total
      } else if (item) {
        await removeProduct(uid); // Eliminar producto si la cantidad es 1
      }
    };

    // Eliminar un producto del carrito
    const removeProduct = async (uid) => {
      const index = cart.products.findIndex((item) => item.product._id === uid);
      if (index !== -1) {
        await window.db.remove(cart.products[index].product); // Eliminar de la base de datos
        cart.products.splice(index, 1); // Eliminar del arreglo
        calculateTotal(); // Recalcular el total
      }
    };

    // Vaciar el carrito
    const clearCart = async () => {
      try {
        const allDocs = await window.db.allDocs();
        const deleteOps = allDocs.rows.map((row) => window.db.remove(row.id, row.value.rev));
        await Promise.all(deleteOps); // Eliminar todos los productos de la base de datos
        cart.products = []; // Vaciar el carrito
        calculateTotal(); // Recalcular el total
      } catch (error) {
        console.error("Error al vaciar el carrito:", error);
      }
    };

    //Realizar la Compra de los Productos
    const comprarCart = async () => {
  if (cart.products.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const payload = {
    products: cart.products.map((item) => ({
      product: { uid: item.product._id },
      quantity: item.quantity,
    })),
    status: "EXIT",
  };

  try {
    const result = await createMovement(payload);
    console.log("Respuesta del servidor:", result); // Para depuración
    if (result) {
      alert("Compra realizada con éxito.");
      await clearCart();
    }
  } catch (error) {
    alert("Error al realizar la compra. Por favor, intenta nuevamente.");
    console.error("Error al realizar el movimiento:", error);
  }
};



    // Cargar el carrito cuando el componente se monte
    onMounted(() => {
      loadCart();
    });

    return {
      cart,
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
</style>
