import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
  PageConfig,
  EditorConfig,
  PureComp,
  PageComp,
  PageComponentOptions,
  PageLyout
} from "@/types/page";
import { uuid } from "@/utils";
import { debounce } from "throttle-debounce";
Vue.use(Vuex);

export interface State {
  dragComp: PureComp;
  activeComp: PageComp;
  activeLayout: PageLyout | null;
  pageConfig: PageConfig;
  editorConfig: EditorConfig;
}

type CompId = string;

const defaultLayout: PageLyout = {
  id: uuid(),
  name: "默认",
  zIndex: 0,
  show: true,
  mode: "position"
};

function getCompIndex(state: State, comp: PageComponentOptions | CompId) {
  if (!comp) return -1;
  let index = -1;
  if (typeof comp === "string") {
    index = state.pageConfig.children.findIndex(child => child.id === comp);
  } else {
    index = state.pageConfig.children.indexOf(comp);
  }
  return index;
}

function getCompById(state: State, id: CompId): PageComp {
  if (!id) {
    return null;
  }
  return state.pageConfig.children.find(child => child.id === id) as PageComp;
}

function getLayoutById(state: State, layoutId: string): PageLyout | null {
  if (!layoutId) {
    return null;
  }
  return state.pageConfig.layouts.find(
    child => child.id === layoutId
  ) as PageLyout;
}

function getLayoutIndex(state: State, layoutId: string) {
  if (!layoutId) return -1;
  return state.pageConfig.layouts.findIndex(child => child.id === layoutId);
}

const pageModule = {
  state: {
    dragComp: null, // 从组件列表中拖动的组件
    activeComp: null, // 当前激活的组件
    activeLayout: defaultLayout, // 当前激活的图层
    // 页面配置， 用于生成页面
    pageConfig: {
      id: uuid(),
      key: uuid(),
      alias: "测试",
      width: 1920,
      height: 1080,
      dragMode: false,
      // 图层
      layouts: [defaultLayout],
      children: []
    },
    // 编辑器设置
    editorConfig: {
      gridX: 20,
      gridY: 20,
      showScrollbar: true,
      parent: true,
      zoom: 1,
      showLeftTool: true,
      showRightTool: true
    }
  } as State,
  mutations: {
    setActiveComp(state: State, comp: PageComp | CompId) {
      let getComp: PageComp;
      if (typeof comp === "string") {
        getComp = getCompById(state, comp);
      } else {
        getComp = comp;
      }
      if (state.activeComp) {
        state.activeComp.config.active = false;
      }
      if (getComp) {
        getComp.config.active = true;
      }
      state.activeComp = getComp;
    },

    setDragComp(state: State, comp: PureComp) {
      state.dragComp = comp;
    },

    addComponent(this: Store<State>, state: State, comp: PageComponentOptions) {
      if (comp) {
        state.pageConfig.children.push(comp);
        this.commit("setActiveComp", comp);
      }
    },

    removeComponent(state: State, comp: PageComponentOptions | CompId) {
      if (!comp) return;
      const index = getCompIndex(state, comp);
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

    refreshComponent: debounce(300, function(
      state: State,
      comp: PageComponentOptions
    ) {
      comp.key = uuid();
    }) as (state: State, comp: PageComponentOptions) => void,

    clearAllComponent(state: State) {
      state.pageConfig.children = [];
    },

    refreshPage: debounce(300, function(state: State) {
      state.pageConfig.key = uuid();
    }) as (state: State) => void,

    setPageConfig(state: State, config: PageConfig) {
      state.pageConfig = config;
    },

    setEditorConfig(state: State, config: EditorConfig) {
      state.editorConfig = config;
    },

    setActiveLayout(
      this: Store<State>,
      state: State,
      layout: PageLyout | string | null
    ) {
      if (layout == null) {
        state.activeLayout = null;
      } else if (typeof layout === "string") {
        state.activeLayout = getLayoutById(state, layout);
      } else {
        state.activeLayout = layout;
      }
      this.commit("setActiveComp", null);
    },

    addLayout(this: Store<State>, state: State, layout: PageLyout) {
      if (layout) {
        state.pageConfig.layouts.push(layout);
        this.commit("setActiveLayout", layout);
      }
    },

    removeLayout(state: State, layoutId: string) {
      const index = getLayoutIndex(state, layoutId);
      if (index > -1) {
        state.pageConfig.layouts.splice(index, 1);
        state.pageConfig.children = state.pageConfig.children.filter(
          child => child.layoutId != layoutId
        );
      }
    }
  }
};
export type PageStoreType = typeof pageModule;
export default pageModule;
