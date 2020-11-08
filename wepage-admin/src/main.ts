import Vue from "vue";
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
import compList from "wepage-components";
import apis from "@/api";
import ajax from "@/utils/ajax";

Object.keys(compList).forEach(comp => {
  if (typeof compList[comp] != "function") {
    compList[comp] = Vue.extend(compList[comp]);
  }
});

Vue.prototype.$compList = compList;
Vue.prototype.$api = apis;
Vue.prototype.$ajax = ajax;

Vue.component("vue-draggable-resizable", VueDraggableResizable);

Vue.use(ElementUI, {
  size: "mini"
});

// import VCharts from "v-charts";
// Vue.use(VCharts as PluginObject<null>);

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
