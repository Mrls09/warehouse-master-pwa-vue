<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl text-center font-extrabold text-gray-900 mb-8">Tus Compras</h1>
    
    <div v-if="data.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Tarjeta por cada movimiento -->
      <div 
        v-for="movement in data" 
        :key="movement.uid" 
        class="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
        
        <!-- Información Principal -->
        <div>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-800">Última Modificación</h2>
            <p class="text-sm text-gray-500">{{ formatDate(movement.lastModified) }}</p>
          </div>
          <div class="flex items-center justify-between mt-2">
            <span class="flex items-center text-sm text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {{ movement.products.length }} Productos
            </span>
          </div>
        </div>
        
        <!-- Botón para ver detalles -->
        <button 
          @click="openModal(movement)" 
          class="mt-4 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
          Ver Detalles
        </button>
      </div>
    </div>
    
    <!-- Mensaje cuando no hay movimientos -->
    <div v-else class="flex justify-center items-center h-64">
      <p class="text-lg text-gray-600">No has realizado ninguna compra todavía.</p>
    </div>
    
    <!-- Modal -->
    <transition name="fade">
      <div 
        v-if="selectedMovement" 
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        
        <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl mx-auto p-6 relative">
          <!-- Header del Modal -->
          <div class="flex justify-between items-center border-b pb-3">
            <h2 class="text-2xl font-bold text-gray-800">Detalles de la Compra</h2>
            <button 
              @click="closeModal" 
              class="text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Contenido del Modal -->
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Observaciones:</h3>
            <p class="text-sm text-gray-500">
              {{ selectedMovement.observations || 'Sin comentarios' }}
            </p>

            <!-- Lista de productos -->
            <div class="border-t my-4"></div>
            <h4 class="text-md font-semibold text-gray-800 mb-2">Productos:</h4>
            <div class="overflow-y-auto max-h-80">
              <ul>
                <li 
                  v-for="product in selectedMovement.products" 
                  :key="product.uid" 
                  class="mb-4">
                  <p><strong>Nombre:</strong> {{ product.product.name }}</p>
                  <p><strong>Precio:</strong> ${{ product.product.price }}</p>
                  <p><strong>Proveedor:</strong> {{ product.product.supplier.name }}</p>
                  <p><strong>Cantidad:</strong> {{ product.quantity }}</p>
                  <p><strong>Expira el:</strong> {{ new Date(product.product.expirationDate).toLocaleDateString() }}</p>
                  <div class="border-t my-4"></div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Total y botón de cerrar -->
          <div class="flex justify-between items-center mt-6">
            <span class="font-semibold text-gray-800">Total: ${{ calculateTotal().toFixed(2) }}</span>
            <button 
              @click="closeModal" 
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getMovements } from "@/services/ServicesServices";

export default {
  data() {
    return {
      data: [],
      selectedMovement: null,
    };
  },
  async mounted() {
    await this.loadMovements();
  },
  methods: {
    async loadMovements() {
      try {
        const movements = await getMovements();
        this.data = (movements || []).sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
      } catch (error) {
        console.error("Error al cargar los movimientos:", error);
      }
    },
    openModal(movement) {
      this.selectedMovement = movement;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedMovement = null;
      document.body.style.overflow = '';
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    calculateTotal() {
      if (!this.selectedMovement) return 0;
      return this.selectedMovement.products.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0);
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
