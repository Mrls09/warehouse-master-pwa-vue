import { defineStore } from 'pinia';
import { showNotification } from "@/utils/notification";

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart')) || { products: [], status: 'EXIT' },
        idPaquete: localStorage.getItem('idPaquete') || ''
    }),
    actions: {
        // Agregar un producto al carrito
        addStuff(nuevoProducto) {
            this.cart.products = [...this.cart.products, { product: { uid: nuevoProducto.uid }, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            showNotification('success', 'Producto añadido correctamente');
        },

        // Eliminar un producto del carrito
        substractStuff(uid) {
            this.cart.products = this.cart.products.filter((item) => item.product.uid !== uid);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            showNotification('success', 'Producto sustraído correctamente');
        },

        // Verificar si un producto está en el carrito
        isInCart(uid) {
            return this.cart.products.some(item => item.product.uid === uid);
        },

        // Obtener el total del carrito
        getTotal() {
            return this.cart.products.reduce((suma, item) => {
                return suma + (item.product.price * item.quantity);
            }, 0);
        },

        // Vaciar el carrito
        deleteAll() {
            this.cart = { products: [], status: 'EXIT' };
            this.idPaquete = '';
            localStorage.removeItem('idPaquete');
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        // Agregar un producto al carrito verificando duplicados
        setProducto(uid) {
            const producto = { uid }; // Ajustar si necesitas más propiedades del producto
            if (this.isInCart(uid)) {
                showNotification('info', 'El producto ya está en el carrito');
                return;
            }
            this.addStuff(producto);
        },
    }
});
