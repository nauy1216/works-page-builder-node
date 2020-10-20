import { mapMutations, mapState } from "vuex";
import { State, Mutations } from "../store";

type PickState<U, T extends keyof U> = () => Pick<U, T>[T];

// ==================== mapStateTyped ===================
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
type CustomVue = Vue & Record<string, any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R
  ? () => R
  : never;

interface MapperForState {
  <
    Map extends Record<
      string,
      (this: CustomVue, state: State, getters: any) => any
    > = {}
  >(
    map: Map
  ): { [K in keyof Map]: InlineComputed<Map[K]> };
}

type ComputedFunc<T extends keyof State> = PickState<State, T>;
interface StateMapper {
  <Key extends keyof State>(map: Key[]): { [K in Key]: ComputedFunc<K> };
  <Map extends Record<string, keyof State>>(map: Map): {
    [K in keyof Map]: ComputedFunc<Map[K]>;
  };
}

let _mapStateTyped: MapperForState & StateMapper;

if (process.env.NODE_ENV === "production") {
  _mapStateTyped = mapState;
} else {
  _mapStateTyped = function(...args: any[]) {
    // @ts-ignore
    const res = mapState(...args) as any;
    return res;
  };
}

export const mapStateTyped = _mapStateTyped;

// ==================== mapMutationsTyped ===================
/**
 TODO: 暂时仅支持
 ...mapMutationsTyped(["addComponent", "setEditorConfig"])
 */
type PickMutation<U, T extends keyof U> = Pick<U, T>[T];
type ParamsType<T> = T extends (p1, ...p2: infer V) => void ? V : any[];
type MutationFunc<T extends keyof Mutations> = (
  ...p: ParamsType<PickMutation<Mutations, T>>
) => void;

interface MutationMapper {
  <Key extends keyof Mutations>(map: Key[]): { [K in Key]: MutationFunc<K> };
  <Map extends Record<string, keyof Mutations>>(map: Map): {
    [K in keyof Map]: MutationFunc<Map[K]>;
  };
}

let _mapMutationsTyped: MutationMapper;

if (process.env.NODE_ENV === "production") {
  _mapStateTyped = mapMutations;
} else {
  _mapMutationsTyped = function(...args: any[]) {
    // @ts-ignore
    const res = mapMutations(...args) as any;
    return res;
  };
}
// @ts-ignore
export const mapMutationsTyped = _mapMutationsTyped;
