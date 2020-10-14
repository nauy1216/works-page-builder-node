import Vue from "vue";
import Vuex from "vuex";
import { PageConfig } from "@/types/page";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeComp: null, // 当前激活的组件
    pageConfig: {     
      alias: "",
      width: 1920,
      height: 1080,
      children: []
    } as PageConfig
  },
  mutations: {
    setActiveComp(state, comp) {
      state.activeComp = comp;
    },
    addComponent(state, comp) {
      state.pageConfig.children.push(comp);
      state.activeComp = comp
    },
    clearComponent(state) {
      state.pageConfig.children = [];
    }
  },
  actions: {},
  modules: {}
});
