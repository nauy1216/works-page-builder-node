import { PageConfig, EditorConfig, PageComponentOptions } from "./page";
import { mapState } from "vuex";
import Vue, {VueConstructor} from "vue";
export interface State {
  dragComp: CustomVueConstructor | null;
  activeComp: PageComponentOptions | null;
  pageConfig: PageConfig;
  editorConfig: EditorConfig;
}
export type CustomVueConstructor = VueConstructor & Record<string, any>

type CustomVue = Vue & Record<string, any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R
  ? () => R
  : never;

/**
  使用方式, 
  // TODO 暂时没有支持命名空间， 后续有时间再支持
  computed: {
    ...mapStateTyped({
      myPageConfig: "pageConfig"
    }),
    ...mapStateTyped["editorConfig"]
    ...mapStateTyped({
      showLeftTool(state): boolean {
        return state.editorConfig.showLeftTool;
      },
      showRightTool(state): boolean {
        return state.editorConfig.showRightTool;
      }
    })
  }
*/
interface MapperForState {
  <Map extends Record<string, (this: CustomVue, state: State, getters: any) => any> = {}>(
    map: Map
  ): { [K in keyof Map]: InlineComputed<Map[K]> };
}

type PickState<T extends keyof State> = Pick<State, T>[T];
type ComputedFunc<T extends keyof State> = () => PickState<T>;
interface Mapper {
  <Key extends keyof State>(map: Key[]): { [K in Key]: ComputedFunc<K> };
  <Map extends Record<string, keyof State>>(map: Map): { [K in keyof Map]: ComputedFunc<Map[K]> };
}

export const mapStateTyped: MapperForState & Mapper = function(...args: any[]) {
  // @ts-ignore 这里调用vuex提供的接口，ts报错不用理会
  const res = mapState(...args) as any;
  return res
};
