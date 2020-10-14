import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Editor from "../views/editor/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Editor",
    component: Editor
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../lib/chart-histogram/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
