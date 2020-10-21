import { mapMutations, mapState } from "vuex";
import { State, Mutations } from "../store";
import { PageStoreType } from "../store/page";
import { EditorStoreType } from "../store/editor";

// 定义的模块在这里添加
type ModulesState = StateNamespace<"page", PageStoreType["state"]> 
  & StateNamespace<"editor", EditorStoreType["state"]>

type ModulesMutation = MutationNamespace<"page", PageStoreType["mutations"]> 
  & MutationNamespace<"editor", EditorStoreType["state"]> 

// ==================== mapStateTyped ===================
/**
  使用方式, 
  computed: {
    ...mapStateTyped("page", ["editorConfig"]),
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

type ComputedFunc<State, Prop extends keyof State> = () => Pick<
  State,
  Prop
>[Prop];
interface StateMapper {
  <Key extends keyof State>(map: Key[]): { [K in Key]: ComputedFunc<State, K> };
  <Map extends Record<string, keyof State>>(map: Map): {
    [K in keyof Map]: ComputedFunc<State, Map[K]>;
  };
}

type InferModuleSateType<T> = T extends (
  ...args: any[]
) => infer P
  ? P
  : T extends undefined
  ? any
  : T;

type StateNamespace<ModuleName, ModuleType> = <Key extends keyof ModuleType>(namespace: ModuleName, map: Key[]) => {
  [K in Key]: () => InferModuleSateType<Pick<ModuleType, K>[K]>;
}

interface StateMapperWithNamespace extends ModulesState {

}

const _mapStateTyped = mapState;
export const mapStateTyped: MapperForState &
  StateMapper &
  StateMapperWithNamespace =
  process.env.NODE_ENV === "production"
    ? _mapStateTyped
    : function(...args: any[]) {
        // @ts-ignore
        const res = _mapStateTyped(...args) as any;
        return res;
      };



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

type MutationNamespace<ModuleName, ModuleType> = <Key extends keyof ModuleType>(namespace: ModuleName, map: Key[]) => {
  [K in Key]: (...p: ParamsType<ModuleType[K]>) => void;
}

interface MutationMapperWithNamespace extends ModulesMutation {

}

const _mapMutationsTyped = mapMutations;
export const mapMutationsTyped: MutationMapper & MutationMapperWithNamespace =
  process.env.NODE_ENV === "production"
    ? _mapMutationsTyped
    : function(...args: any[]) {
        // @ts-ignore
        const res = _mapMutationsTyped(...args) as any;
        return res;
      };

// ==================== mapGetters ===================
// TODO： 后期有时间添加