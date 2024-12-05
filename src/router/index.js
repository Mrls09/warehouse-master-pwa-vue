import Vue from "vue";
import VueRouter from "vue-router";
import { useAuthStore } from "@/stores";


Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history", base: import.meta.env.BASE_URL, routes: [{
        path: "/", redirect: "/home/inicio",
    }, {
        path: "/admin",
        meta: { roles: ['ADMIN'] },
        name: "admin",
        component: () => import("../components/admin/components/SidebarNavbar.vue"),
        children: [{
            path: "/", name: "dashboard", component: () => import("../components/admin/Dashboard.vue"),
        },
        ],
    }, {
        path: "/home",
        name: "home",
        component: () => import("../components/cliente/components/Home.vue"),
        redirect: "/home/inicio",
        children: [{
            path: "/home/servicios/",
            name: "serviciosCliente",
            component: () => import("../components/cliente/components/Servicios.vue"),
        }, {
            path: "/home/inicio/",
            name: "inicio",
            component: () => import("../components/public/Landing-pages/LandingPage.vue"),
        }, {

            path: "/home/perfil/",
            meta: { auth: true },
            name: "perfil",
            component: () => import("../components/cliente/components/Profile.vue")


        },
        {

            path: "/home/compras/",
            meta: { auth: true },
            name: "compras",
            component: () => import("../components/cliente/components/Compras.vue"),
        }, {
            meta: { auth: false },
            path: "/home/login/", name: "login", component: () => import("../components/public/Login.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({ name: 'perfil' });
                } else {
                    next();
                }
            },
        }, {
            meta: { auth: false },
            path: '/home/registro/', name: 'registrarse', component: () => import('../components/public/Register.vue'),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({ name: 'perfil' });
                } else {
                    next();
                }
            },
        }, {

            path: "/restablecer/correo/",
            meta: { auth: false },
            name: "restablecerCorreo",
            component: () => import("../components/public/Restablecer.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({ name: 'inicio' });
                } else {
                    next();
                }
            },
        }, {
            path: "/restablecer/",
            meta: { auth: false },
            name: "restablecerConfirmar",
            component: () => import("../components/public/RestablecerConfirmar.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({ name: 'inicio' });
                } else {
                    next();
                }
            },
        }, {
            path: "/home/carrito/",
            name: "carrito",
            component: () => import("../components/cliente/components/ShoppingCart.vue"),
        },


        ],
    }, {
        path: "/personal",
        meta: { roles: ['PERSONAL'] },
        name: "personalScreen",
        component: () => import("../components/personal/components/SidebarNavbar.vue"),
        children: [{
            path: "/", name: "eventos", component: () => import("../components/personal/components/Eventos.vue"),
        }, {
            path: "/personal/perfil",
            name: "perfilPersonal",
            component: () => import("../components/public/Profile.vue"),
        }],
    }, {
        path: "/404", name: "404", component: () => import("../components/public/error/ErrorPage.vue"),
    }, {
        path: "*", redirect: "/404",
    },],
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    let userRoles = [];
    if (auth.user?.usuarios?.roles) {
        userRoles = auth.user.usuarios.roles.map((role) => role.nombre);
    }
    if (to.matched.some((record) => record.meta?.auth)) {
        if (!auth.user) {
            auth.returnUrl = to.fullPath;
            return next({ name: "inicio" });
        }
    }
    if (to.matched.some((record) => record.meta?.roles)) {
        try {
            if (!to.matched.some((record) => userRoles.some(role => record.meta.roles.includes(role)))) {
                return next({ name: "404" });
            }
        } catch (e) {
            return next({ name: "404" });
        }
    }
    next();
});
export default router;
