import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

import ColecaoPage from "../pages/ColecaoPage.vue";
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/colecao",
    component: ColecaoPage,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
