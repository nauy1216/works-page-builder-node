import { PageConfig, EditorConfig } from "./page";
export interface State {
  dragComp: Vue | null;
  activeComp: Vue | null;
  pageConfig: PageConfig;
  editorConfig: EditorConfig;
}
