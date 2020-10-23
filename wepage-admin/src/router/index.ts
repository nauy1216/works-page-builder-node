import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Editor from "../views/editor/index.vue";
import PageShow from "../views/page-show/index.vue";
import Frame from "@/components/frame/index.vue";
import AppManage from "@/views/app-manage/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/appManage",
    component: Frame,
    meta: { title: "" },
    children: [
      {
        path: "/appManage",
        name: "AppManage",
        component: AppManage
      }
    ]
  },
  {
    path: "/editor",
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
    component: () => import(/* webpackChunkName: "about" */ "../views/test/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
