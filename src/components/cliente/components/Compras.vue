<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl text-center font-bold text-gray-800 mb-6">Movimientos</h1>
    <div v-if="data.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card por cada movimiento -->
      <div 
        v-for="movement in data" 
        :key="movement.uid" 
        class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
        
        <!-- Título del movimiento -->
        <div>
          <h2 class="text-lg font-bold text-gray-800">Movimiento {{ movement.uid }}</h2>
          <p class="text-sm text-gray-500 capitalize">Estado: {{ movement.status }}</p>
        </div>

        <!-- Botón para abrir el modal -->
        <button 
          @click="openModal(movement)" 
          class="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Ver Detalles
        </button>
      </div>
    </div>

    <!-- Mensaje cuando no hay movimientos -->
    <div v-else class="text-center text-gray-500">
      <p>No hay movimientos registrados.</p>
    </div>

    <!-- Modal para mostrar detalles -->
    <div 
      v-if="selectedMovement" 
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-6 w-11/12 max-w-2xl">
        <!-- Header del modal -->
        <div class="flex justify-between items-center border-b pb-3">
          <h2 class="text-xl font-bold">Detalles del Movimiento</h2>
          <button 
            @click="closeModal" 
            class="text-red-500 hover:text-red-700 transition duration-300">
            ✕
          </button>
        </div>

        <!-- Contenido del modal -->
        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Observaciones:</h3>
          <p class="text-sm text-gray-500">
            {{ selectedMovement.observations || 'Sin comentarios' }}
          </p>
          <!-- Barra separadora -->
          <div class="border-t my-4"></div>
          <h4 class="text-md font-semibold text-gray-800 mb-2">Productos:</h4>
          <!-- Contenedor con scroll -->
          <div class="overflow-y-auto max-h-80"> <!-- Contenedor desplazable -->
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
                <!-- Barra separadora -->
                <div class="border-t my-4"></div>
              </li>
            </ul>
          </div>
          <!-- Barra separadora -->
          <div class="border-t my-4"></div>
        </div>

        <!-- Botón para cerrar -->
        <div class="mt-6 text-right">
          <!-- Total -->
            <div class="flex justify-between items-center mt-4">
              <span class="font-semibold text-gray-800">Total: ${{ calculateTotal().toFixed(2) }}</span>
            </div>
          <button 
            @click="closeModal" 
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            Aceptar
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getMovements } from "@/services/ServicesServices";  // Importa la función de obtener movimientos

export default {
  data() {
    return {
      data: [], // Aquí se guardarán los movimientos obtenidos
      selectedMovement: null, // Movimiento seleccionado para el modal
    };
  },
  async mounted() {
    await this.loadMovements();
  },
  methods: {
    async loadMovements() {
      try {
        const movements = await getMovements(); // Llamamos a la función que obtiene los movimientos
        this.data = movements || []; // Guardamos los movimientos obtenidos en el estado 'data'
      } catch (error) {
        console.error("Error al cargar los movimientos:", error);
      }
    },
    openModal(movement) {
      this.selectedMovement = movement;
    },
    closeModal() {
      this.selectedMovement = null;
    },// Función para calcular el total
    calculateTotal() {
      if (!this.selectedMovement) return 0; // Si no hay movimiento seleccionado, retornamos 0

      return this.selectedMovement.products.reduce((total, product) => {
        return total + (product.product.price * product.quantity); // Calculamos el precio total por producto
      }, 0);
    },
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
  