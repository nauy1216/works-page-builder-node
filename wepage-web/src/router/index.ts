import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageShow from "../views/page-show/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/pageShow",
    name: "PageShow",
    component: PageShow
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/test1.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
