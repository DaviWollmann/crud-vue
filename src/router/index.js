import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/categorias",
    name: "Categories",
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/produtos",
    name: "Products",
    component: () => import("../views/Products.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  isAuthenticated: false,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !router.options.isAuthenticated) next({ name: 'Login' });
  else next();
})

export default router;
