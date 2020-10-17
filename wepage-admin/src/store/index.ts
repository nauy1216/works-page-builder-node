import Vue, {VueConstructor} from "vue";
import Vuex, { MutationTree } from "vuex";
import { PageConfig, EditorConfig, PageComponentOptions } from "@/types/page";
// import { State } from "@/types/store";
Vue.use(Vuex);

export type CustomVueConstructor = VueConstructor & Record<string, any>
type PureComp = CustomVueConstructor | null
type PageComp = PageComponentOptions | null
export interface State {
    dragComp: PureComp;
    activeComp: PageComp;
    pageConfig: PageConfig;
    editorConfig: EditorConfig;
}

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

const _mutations = {
    setActiveComp(state: State, comp: PageComp) {
      state.activeComp = comp;
    },
    setDragComp(state: State, comp: PureComp) {
      state.dragComp = comp;
    },
    addComponent(state: State, comp: PageComp) {
        if (comp) {
            state.pageConfig.children.push(comp);
            state.activeComp = comp;
        }
    },
    removeComponent(state: State, comp: PageComp) {
      if (!comp) return 
      const index = state.pageConfig.children.indexOf(comp);
      if (index > -1) {
        if (state.activeComp === comp) {
          state.activeComp = null;
        }
        state.pageConfig.children.splice(index, 1);
      }
    },
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