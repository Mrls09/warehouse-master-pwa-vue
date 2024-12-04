<template>
  <div>
    <h1>Compras</h1>
  </div>
</template>

<script>
import axiosClient from '@/path/to/axiosClient'; // Ensure this path is correct
import { showNotification } from '@/path/to/correct/notification'; // Ensure this path is correct

export default {
  data() {
    return {};
  },
  methods: {
    async getMyMovements() {
      try {
        const response = await axiosClient.get(`/movements/`);
        console.log(response.data);
        return response.data;
      } catch (error) {
        showNotification("error", "Error al obtener tus compras");
      }
    }
  },
  mounted() {
    this.getMyMovements();
  },
};
</script>

<style scoped>
</style>
