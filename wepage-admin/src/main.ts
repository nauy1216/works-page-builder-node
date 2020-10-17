import Vue, { PluginObject } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./style/reset.scss";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import compList from "@/lib/index.ts";
import {apis} from "@/api"

Vue.prototype.$compList = compList;
Vue.prototype.$api = apis;
declare module "vue/types/vue" {
  interface Vue {
    $api: typeof apis;
  }
}
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
