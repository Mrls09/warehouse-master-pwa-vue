<template>
  <div class="flex h-screen">
    <div
      class="hidden lg:flex w-1/2 items-center justify-center bg-fdoscuro text-fdoscuro"
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
              font-size="12.7"
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
      <div
        class="max-w-md w-full p-6"
        style="overflow-y: auto; max-height: calc(100vh - 4rem)"
      >
        <h1 class="text-3xl font-bold mb-6 text-black text-center lg:hidden">
          Wharehouse Store
        </h1>
        <h2
          class="text-3xl font-semibold mb-6 text-black text-center sm:text-2xl lg:text-3xl"
        >
          Registrate
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Bienvenido a Wharehouse Store, Crea una Cuenta para Continuar
        </h1>
        <v-form
          class="space-y-4"
          @submit.prevent="onSubmit"
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="nombreCompleto"
            :rules="nameRules"
            :counter="30"
            label="Nombre Completo"
            required
          ></v-text-field>
          <v-text-field
            for="email"
            id="correo"
            name="correo"
            v-model="correo"
            :rules="emailRules"
            label="Correo Electrónico"
            required
            counter
          ></v-text-field>

          <v-text-field
            v-model="contrasena"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[...passwordRules, rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            hint="La contraseña es requerida"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <div>
            <v-btn
              :loading="loading"
              type="submit"
              color="secondary"
              class="w-full bg-fdoscuro text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Registrarse
            </v-btn>
          </div>
        </v-form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            ¿Ya eres parte de warehouse?
            <a href="/home/login/" class="text-black hover:underline"
              >¡Inicia Sesión Aquí!</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores";
import UsersServices from "@/services/UsersServices";

export default {
  /*components: {
    Captcha: () => import("@/components/public/Captcha.vue"),
  },*/

  data() {
    return {
      valid: true,
      correo: "",
      nombreCompleto: "",
      show1: false,
      contrasena: "",
      solucion: "",
      loading: false,
      rules: {
        required: (value) => !!value || "la contraseña es requerida",
      },
      emailRules: [
        (v) => !!v || "El correo electronico es requerido",
        (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
          "El correo electronico tiene un formato incorrecto",
      ],
      nameRules: [
        (v) => !!v || "Nombre requerido",
        (v) =>
          v.length <= 30 || "El nombre debe de tener menos de 30 caracteres",
      ],
      passwordRules: [
        (v) => !!v || "la contraseña es requerida",
        (v) => (v && v.length >= 8) || "Minimo 8 caracteres",
        (v) => (v && /[A-Z]/.test(v)) || "Al menos una letra mayúscula",
        (v) => (v && /[a-z]/.test(v)) || "Al menos una letra minúscula",
        (v) => /\d/.test(v) || "Al menos un número",
        (v) => (v && !/\s/.test(v)) || "No espacios en blanco",
        (v) =>
          (v && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/.test(v)) ||
          "Al menos un caracter especial",
      ],
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let usuario = {
          uid: "string", // You might want to generate a unique ID here
          name: this.nombreCompleto,
          email: this.correo,
          password: this.contrasena,
          role: "CLIENT", // Updated role to CLIENT
        };
        const response = await UsersServices.insertPublic(usuario);
        if (response) {
          await useAuthStore().login(this.correo, this.contrasena);
          await this.$router.push("/home/perfil");
        }
        this.loading = false;
      }
    },
    ponerSolucion(solucion) {
      console.log(solucion);
      this.solucion = solucion;
    },
  },
  mounted() {},

  watch: {
    correo: function (val) {
      this.correo = val.toLowerCase();
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

/* Estilo para hacer invisible el scrollbar */
::-webkit-scrollbar {
  width: 0; /* Para Chrome, Safari, y Opera */
}

::-webkit-scrollbar-track {
  background: transparent; /* Para Chrome, Safari, y Opera */
}

::-webkit-scrollbar-thumb {
  background: transparent; /* Para Chrome, Safari, y Opera */
}
</style>
