import Vue from "vue";
import Vuex from "vuex";
import { PageConfig, EditorConfig } from "@/types/page";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dragComp: null, // 从组件列表中拖动的组件
    activeComp: null, // 当前激活的组件
    // 页面配置， 用于生成页面
    pageConfig: {
      alias: "",
      width: 1920,
      height: 1080,
      children: []
    } as PageConfig,
    // 编辑器设置
    editorConfig: {
      gridX: 20,
      gridY: 20,
      showScrollbar: true,
      parent: true,
      zoom: 1
    } as EditorConfig
  },
  mutations: {
    setActiveComp(state, comp) {
      state.activeComp = comp;
    },
    setDragComp(state, comp) {
      state.dragComp = comp;
    },
    addComponent(state, comp) {
      state.pageConfig.children.push(comp);
      state.activeComp = comp;
    },
    removeComponent(state, comp) {
      const index = state.pageConfig.children.indexOf(comp);
      if (index > -1) {
        if (state.activeComp === comp) {
          state.activeComp = null;
        }
        state.pageConfig.children.splice(index, 1);
      }
    },
    clearAllComponent(state) {
      state.pageConfig.children = [];
    },
    setPageConfig(state, config) {
      state.pageConfig = config;
    },
    setEditorConfig(state, config) {
      state.editorConfig = config;
    }
  },
  actions: {},
  modules: {}
});
