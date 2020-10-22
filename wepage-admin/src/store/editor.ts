import { EditorConfig } from "@/types/page";

interface State {
  editorConfig: EditorConfig;
}

const defaultConfig: EditorConfig = {
  gridX: 20,
  gridY: 20,
  showScrollbar: true,
  parent: true,
  zoom: 1,
  showLeftTool: true,
  showRightTool: true
};

const editorModule = {
  namespaced: true,
  state: {
    // 编辑器设置
    editorConfig: defaultConfig
  } as State,
  mutations: {
    setEditorConfig(state: State, config: EditorConfig) {
      state.editorConfig = Object.assign({}, defaultConfig, config);
    }
  }
};
export type EditorStoreType = typeof editorModule;
export default editorModule;
