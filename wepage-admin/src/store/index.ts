import Vue from "vue";
import Vuex, { MutationTree, Store } from "vuex";
import { PageConfig, EditorConfig, PureComp, PageComp, PageComponentOptions } from "@/types/page";
import {uuid} from "@/utils"
import { debounce } from "throttle-debounce"
Vue.use(Vuex);

export interface State {
    dragComp: PureComp;
    activeComp: PageComp;
    pageConfig: PageConfig;
    editorConfig: EditorConfig;
}

type CompId = string

const state: State = {
    dragComp: null, // 从组件列表中拖动的组件
    activeComp: null, // 当前激活的组件
    // 页面配置， 用于生成页面
    pageConfig: {
      alias: "",
      width: 1920,
      height: 1080,
      children: []
    },
    // 编辑器设置
    editorConfig: {
      gridX: 20,
      gridY: 20,
      showScrollbar: false,
      parent: true,
      zoom: 1,
      showLeftTool: true,
      showRightTool: true
    }
}

function getCompIndex(comp: PageComponentOptions | CompId) {
  if (!comp) return -1
  let index = -1
  if (typeof comp === "string") {
    index = state.pageConfig.children.findIndex((child) => child.id === comp)
  } else {
    index = state.pageConfig.children.indexOf(comp);
  }
  return index
}

function getCompById(state: State, id: CompId): PageComp | undefined {
  if (!id) {
    return null
  }
  return state.pageConfig.children.find(child => child.id === id)
}

const _mutations= {
    setActiveComp(state: State, comp: PageComp | CompId) {
      let getComp
      if (typeof comp === "string") {
        getComp = getCompById(state, comp)
      } else {
        getComp = comp
      }
      if (state.activeComp) {
        state.activeComp.config.active = false
      }
      if (getComp) {
        getComp.config.active = true
      }
      state.activeComp = getComp;
    },
    setDragComp(state: State, comp: PureComp) {
      state.dragComp = comp;
    },
    addComponent(this: Store<State>, state: State, comp: PageComponentOptions) {
      if (comp) {
        state.pageConfig.children.push(comp);
        this.commit("setActiveComp", comp)
      }
    },
    removeComponent(state: State, comp: PageComponentOptions | CompId) {
      if (!comp) return 
      const index = getCompIndex(comp)
      if (index > -1) {
        if (typeof comp === "string") {
          if (state.activeComp && state.activeComp.id === comp) {
            state.activeComp = null;
          }
        } else {
          if (state.activeComp && state.activeComp.id === comp.id) {
            state.activeComp = null;
          }
        }
        state.pageConfig.children.splice(index, 1);
      }
    },
    refreshComponent: debounce(300, function(state: State, comp: PageComponentOptions) {
      comp.key = uuid()
    }) as (state: State, comp: PageComponentOptions) => void,
    clearAllComponent(state: State) {
      state.pageConfig.children = [];
    },
    setPageConfig(state: State, config: PageConfig) {
      state.pageConfig = config;
    },
    setEditorConfig(state: State, config: EditorConfig) {
      state.editorConfig = config;
    }
}
export type Mutations = typeof _mutations
const mutations: MutationTree<State> = _mutations

const store = new Vuex.Store<State>({
  state,
  mutations,
  actions: {},
  modules: {}
});

export default store