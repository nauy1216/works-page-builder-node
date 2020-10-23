import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageShow from "../views/page-show/index.vue";
import Frame from "@/components/frame/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Frame,
    children: [
      {
        path: "/page/:pageId",
        name: "PageShow",
        component: PageShow
      }
    ]
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

router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

export default router;
