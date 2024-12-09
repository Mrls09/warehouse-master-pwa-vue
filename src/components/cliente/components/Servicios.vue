<template>
  <div>
    <!-- Contenedor de filtros -->
    <div class="filters-container">
      <v-select
        v-model="sortOrder"
        :items="sortOptions"
        label="Ordenar por"
        @input="filterServices"
        item-text="text"
        item-value="value"
        class="sort-select"
        style=" margin-top: 27px; margin-right: 10px;"
      ></v-select>
      <!-- Buscador -->
      <v-text-field
        v-model="searchQuery"
        label="Buscar producto"
        append-icon="mdi-magnify"
        single-line
        hide-details
        class="search-input"
        @input="filterServices"
      ></v-text-field>

      <!-- Filtro de ordenación -->
    </div>

    <!-- Mostrar productos -->
    <div class="card-container row">
      <v-progress-linear
        color="blue darken-2"
        height="5"
        indeterminate
        v-if="loading"
      ></v-progress-linear>
      <div
        class="card-item col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
        v-for="(item, index) in paginatedServices"
        :key="index"
      >
        <CardService :product="item" />
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-button custom-btn"
        :class="{ disabled: currentPage === 1 }"
      >
        <i class="fa fa-chevron-left"></i> Prev
      </button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-button custom-btn"
        :class="{ disabled: currentPage === totalPages }"
      >
        Next <i class="fa fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import CardService from "@/components/cliente/components/CardService.vue";
import { getProducts } from "@/services/ServicesServices";

export default {
  components: {
    CardService,
  },
  data() {
    return {
      services: [], // Todos los productos sin filtrar
      filteredServices: [], // Productos después del filtrado
      loading: false,
      currentPage: 1,
      itemsPerPage: 20,
      searchQuery: "", // Texto para búsqueda por nombre
      sortOrder: "", // Orden de los productos
      sortOptions: [
        { text: "De la A a la Z", value: "alphaAsc" },
        { text: "De la Z a la A", value: "alphaDesc" },
        { text: "Mayor a Menor Precio", value: "priceDesc" },
        { text: "Menor a Mayor Precio", value: "priceAsc" },
      ], // Opciones de ordenación
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredServices.length / this.itemsPerPage);
    },
    paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredServices.slice(start, end);
    },
  },
  methods: {
    async fetchServices() {
      this.loading = true;
      try {
        const response = await getProducts(); // Asegúrate de que getProducts devuelve el arreglo de servicios.

        if (Array.isArray(response)) {
          this.services = response;
          this.filteredServices = response; // Inicializa con todos los servicios
        } else {
          console.warn("Formato inesperado en los datos:", response);
          this.services = [];
          this.filteredServices = [];
        }
      } catch (error) {
        console.error("Error al obtener servicios:", error);
        this.services = [];
        this.filteredServices = [];
      } finally {
        this.loading = false;
      }
    },
    filterServices() {
      let filtered = this.services;

      // Filtrar por nombre
      if (this.searchQuery.trim()) {
        filtered = filtered.filter((service) =>
          service.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Ordenar según el criterio seleccionado
      if (this.sortOrder === "alphaAsc") {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name)); // Orden alfabético ascendente
      } else if (this.sortOrder === "alphaDesc") {
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name)); // Orden alfabético descendente
      } else if (this.sortOrder === "priceDesc") {
        filtered = filtered.sort((a, b) => b.price - a.price); // Precio de mayor a menor
      } else if (this.sortOrder === "priceAsc") {
        filtered = filtered.sort((a, b) => a.price - b.price); // Precio de menor a mayor
      }

      // Actualizar los productos filtrados
      this.filteredServices = filtered;
      this.currentPage = 1; // Restablece la página a la 1 después de filtrar
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.fetchServices(); // Llama a la API al montar el componente
  },
};
</script>

<style scoped>
.filters-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: auto;
}

.search-input {
  max-width: 300px;
  width: 100%;
  margin-right: 10px;
}

.sort-select {
  max-width: 200px;
  width: 100%;
}

.card-container {
  margin-top: 20px;
}

.card-item {
  flex: 1 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagination-button {
  background-color: #00308f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.pagination-button:hover:not(.disabled) {
  background-color: #333;
  transform: scale(1.05);
}

.pagination-button:focus {
  outline: none;
}

.pagination-button.disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.page-info {
  font-size: 16px;
  margin: 0 20px;
}

@media (max-width: 767px) {
  .pagination-button {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>
