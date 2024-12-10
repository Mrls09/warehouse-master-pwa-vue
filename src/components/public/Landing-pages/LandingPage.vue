<template>
  <div class="landing-page">
    <!-- Carousel Section -->
    <div class="carousel-container animate__animated animate__fadeInLeft">
      <v-carousel cycle>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" reverse-transition="fade-transition"
          transition="fade-transition"></v-carousel-item>
      </v-carousel>
    </div>

    <!-- Main Content -->
    <div class="main-content py-12">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-extrabold mb-4 text-white">Bienvenido a Warehouse</h2>
        <p class="text-xl mb-6 text-white opacity-80">Tu tienda en línea con el mejor servicio de paquetería.</p>
        <v-divider class="my-6"></v-divider>
        <p class="text-lg text-white opacity-90">Descubre una amplia variedad de productos y disfruta de nuestro servicio de entrega rápida y segura.</p>
      </div>

      <!-- CTA Section -->
      <div class="cta bg-deepRedAccent py-8 mt-8">
        <div class="container mx-auto text-center">
          <h3 class="text-3xl font-semibold mb-4 text-white">¡Haz tu pedido ahora!</h3>
          <p class="text-lg mb-6 text-white">Aprovecha nuestras ofertas y compra en un solo clic.</p>

        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="container mx-auto py-12">
        <div class="text-center">
          <h3 class="text-3xl font-bold mb-4 text-white">Lo que nuestros clientes dicen</h3>
          <v-divider class="my-6"></v-divider>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Testimonial Card -->
            <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
              <p class="text-lg mb-4">"Warehouse tiene una increíble variedad de productos y su servicio de entrega es rápido y confiable."</p>
              <p class="font-semibold">- María Sánchez</p>
            </div>
            <!-- Testimonial Card -->
            <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
              <p class="text-lg mb-4">"¡Excelente servicio! Encontré todo lo que necesitaba y la entrega fue muy rápida."</p>
              <p class="font-semibold">- Juan Pérez</p>
            </div>
            <!-- Testimonial Card -->
            <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
              <p class="text-lg mb-4">"La experiencia de compra en Warehouse es excepcional. ¡Muy recomendado!"</p>
              <p class="font-semibold">- Ana Martínez</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->

    </div>
    <div>
      
      <footer class="bg-gray-900 py-8">
      <div class="container mx-auto text-center text-white">
        <p class="text-lg font-semibold">Información de contacto:</p>
        <p class="mt-2">
          Dirección: Av. Plan de Ayala 123, Cuernavaca, Morelos
        </p>
        <p>Teléfono: (123) 456-7890</p>
        <p>Email: contacto@warehouse.com</p>
      </div>
    </footer>


    </div>
  </div>
</template>

<script>
import banquete1 from '@/assets/images/paqueteria/landingimg1.jpg';
import banquete2 from '@/assets/images/paqueteria/landingimg2.jpg';
import banquete3 from '@/assets/images/paqueteria/landingimg3.jpg';
import banquete4 from '@/assets/images/paqueteria/landingimg4.jpg';
import banquete5 from '@/assets/images/paqueteria/landingimg5.jpg';

export default {
  name: 'LandingPage',
  data() {
    return {
      items: [
        { src: banquete1 },
        { src: banquete2 },
        { src: banquete3 },
        { src: banquete4 },
        { src: banquete5 },
      ],
    };
  },
};
</script>

<style scoped>
.landing-page {
  background: linear-gradient(135deg, #701332, #BB5E7D); /* Fondo degradado */
}

.carousel-container {
  width: 100%;
}

.main-content {
  background-color: #4B0019; /* Fondo rojo oscuro */
}

.cta {
  background-color: #701332; /* Fondo rojo acentuado para la CTA */
}

.testimonial-card {
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.testimonial-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.v-divider {
  border-color: #BB5E7D;
}

footer {
  background-color: #333;
}

footer p {
  margin: 5px 0;
}

footer .font-semibold {
  font-weight: 600;
}
</style>
