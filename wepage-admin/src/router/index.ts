import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Editor from "../views/editor/index.vue";
import PageShow from "../views/page-show/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Editor",
    component: Editor
  },
  {
    path: "/pageShow",
    name: "PageShow",
    component: PageShow
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
