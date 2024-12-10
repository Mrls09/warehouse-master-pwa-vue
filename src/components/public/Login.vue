<template>
  <div class="flex h-screen">
    <div
      class="hidden lg:flex w-1/2 items-center justify-center"
      style="background-color: #4b0019; color: #4b0019"
    >
      <div class="max-w-md text-center">
        <img
          class="fixed left-[7%] top-[15%] logo"
          src="../../assets/images/LogoWaterhouse2.png"
          alt="Logo"
        />
        <section class="rotate left-[7%] top-[15%]">
          <svg viewBox="0 0 100 100" class="">
            <path
              id="circlePath"
              fill="none"
              stroke-width="5"
              stroke="none"
              d="
          M 10, 50
          a 40,40 0 1,1 80,0
          a 40,40 0 1,1 -80,0
        "
            />
            <text
              stroke="black"
              stroke-width="0.45"
              id="text"
              font-family="monospace"
              font-size="12"
              font-weight="bolder"
              fill="#e2e2e2"
            >
              <textPath id="textPath" href="#circlePath">
                🚚 Rápidos 📦 Precisos 📋 Seguros
              </textPath>
            </text>
          </svg>
        </section>
      </div>
    </div>
    <!-- Right Pane -->
    <div class="w-full bg-gray-200 lg:w-1/2 flex items-center justify-center">
      <div class="max-w-md w-full p-6">
        <h1 class="text-3xl font-bold mb-6 text-black text-center lg:hidden">
          Wharehouse Store
        </h1>
        <h2
          class="text-3xl font-semibold mb-6 text-black text-center sm:text-2xl lg:text-3xl"
        >
          Iniciar Sesión
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Bienvenido a Wharehouse Store, Inicia Sesión para Continuar
        </h1>
        <v-form
          class="space-y-4"
          @submit.prevent="onSubmit"
          ref="form"
          v-model="valid"
        >
          <div>
            <v-text-field
              for="email"
              id="correo"
              name="correo"
              v-model="correo"
              :rules="emailRules"
              label="Correo Electrónico"
              required
            ></v-text-field>
          </div>

          <div>
            <v-text-field
              v-model="contrasenia"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="La Contraseña es Requerida"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </div>
          <div>
            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>
                ¿Olvidaste tu Contraseña?
                <a
                  href="./restablecer/correo/"
                  class="text-black hover:underline"
                  >¡Recupérala Aquí!</a
                >
              </p>
            </div>
            <!-- Botón de Iniciar Sesión estilizado -->
            <v-btn
              :loading="loading"
              type="submit"
              color="secondary"
              class="custom-btn w-full bg-fdoscuro text-white p-2 rounded-md"
            >
              Iniciar Sesión
            </v-btn>
          </div>
        </v-form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            ¿Aun no eres parte de Wharehouse Store?
            <a href="/home/registro/" class="text-black hover:underline"
              >¡Registrate Aquí!</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores";
import { showNotification } from "@/utils/notification";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      correo: "",
      contrasenia: "",
      emailRules: [
        (v) => !!v || "El correo electronico es requerido",
        (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
          "El Correo Electrónico tiene un formato incorrecto",
      ],
      passwordRules: [(v) => !!v || "la contraseña es requerida"],
      show1: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const authStore = useAuthStore();
        try {
          await authStore.login(this.correo, this.contrasenia);
          // Esperar la actualización del estado y luego navegar
          await this.$router.push("/home/inicio");
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.rotate {
  position: fixed;
  width: 30rem;
  animation: spin 50s linear infinite;
  padding: 20px;
}

.logo {
  margin-top: 7rem;
  margin-left: 7.5rem;
  height: 15rem;
  width: 15rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    /* Rotación inicial */
  }

  100% {
    transform: rotate(360deg);
    /* Rotación completa */
  }
}

/* Estilo personalizado para los botones */
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
