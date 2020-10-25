import Vue, { PluginObject } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./style/reset.scss";
import "./style/index.scss";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import compList from "@/lib";
import apis from "@/api";
import ajax from "@/utils/ajax";

Vue.prototype.$compList = compList;
Vue.prototype.$api = apis;
Vue.prototype.$ajax = ajax;
console.log("compList", compList);

Vue.component("vue-draggable-resizable", VueDraggableResizable);

Vue.use(ElementUI, {
  size: "mini"
});

import VCharts from "v-charts";
Vue.use(VCharts as PluginObject<null>);

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// // 在编辑器项目引入时
// if (window.top != window) {
//   window.top.postMessage(
//     {
//       from: "wepage-web",
//       type: "wepage",
//       data: page1
//     },
//     "*"
//   );

//   window.addEventListener("message", e => {
//     if (e.data.from === "wepage-admin") {
//       console.log("接受iframe的消息", e.data);
//     }
//   });
// }
