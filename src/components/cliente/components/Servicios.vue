<template>
  <div>
    <!--<div class="flex justify-center items-center">
      <h1 class="text-2xl font-semibold text-gray-700">Servicios</h1>
    </div>-->
    <div class="card-container row">
      <v-progress-linear
          color="blue darken-2"
          height="5"
          indeterminate
          v-if="loading"
      ></v-progress-linear>
      <div class="card-item col-lg-3 col-md-4 col-sm-6 col-12 mb-4" v-for="(item, index) in services" :key="index">
        <CardService :product="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardService from "@/components/cliente/components/CardService.vue";
import { getProducts } from "@/services/ServicesServices";

export default {
  components: {
    CardService
  },
  data() {
    return {
      services: [], // Contendrá todos los servicios sin paginación
      loading: false,
    };
  },
  methods: {
    async fetchServices() {
      this.loading = true;
      try {
        const response = await getProducts(); // Asegúrate de que getProducts devuelve el arreglo de servicios.

        if (Array.isArray(response)) {
          this.services = response; // Los datos ya son un arreglo.
          this.filteredServices = [...this.services];
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
  },
  mounted() {
    this.fetchServices(); // Llama a la API al montar el componente
  }
}
</script>

<style scoped>
.card-container {
  margin-top: 20px;
}

.card-item {
  flex: 1 0 auto;
}
</style>
