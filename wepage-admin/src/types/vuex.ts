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

interface MapperForState<T> {
  <
    Map extends Record<
      string,
      (this: CustomVue, state: T, getters: any) => any
    > = {}
  >(
    map: Map
  ): { [K in keyof Map]: InlineComputed<Map[K]> };
}

type ComputedFunc<State, Prop extends keyof State> = () => Pick<
  State,
  Prop
>[Prop];
interface StateMapper<State> {
  <Key extends keyof State>(map: Key[]): { [K in Key]: ComputedFunc<State, K> };
  <Map extends Record<string, keyof State>>(map: Map): {
    [K in keyof Map]: ComputedFunc<State, Map[K]>;
  };
}

type InferModuleSateType<T> = T extends (...args: any[]) => infer P
  ? P
  : T extends undefined
  ? any
  : T;

export type StateNamespace<ModuleName, ModuleType> = <
  Key extends keyof ModuleType
>(
  namespace: ModuleName,
  map: Key[]
) => {
  [K in Key]: () => InferModuleSateType<Pick<ModuleType, K>[K]>;
};

export type MapStateTyped<State> = MapperForState<State> & StateMapper<State>;

// ==================== mapMutationsTyped ===================
/**
 TODO: 暂时仅支持
 ...mapMutationsTyped(["addComponent", "setEditorConfig"])
 */
type PickMutation<U, T extends keyof U> = Pick<U, T>[T];
type ParamsType<T> = T extends (p1, ...p2: infer V) => void ? V : any[];
type MutationFunc<Mutations, T extends keyof Mutations> = (
  ...p: ParamsType<PickMutation<Mutations, T>>
) => void;

interface MutationMapper<Mutations> {
  <Key extends keyof Mutations>(map: Key[]): {
    [K in Key]: MutationFunc<Mutations, K>;
  };
  <Map extends Record<string, keyof Mutations>>(map: Map): {
    [K in keyof Map]: MutationFunc<Mutations, Map[K]>;
  };
}

export type MutationNamespace<ModuleName, ModuleType> = <
  Key extends keyof ModuleType
>(
  namespace: ModuleName,
  map: Key[]
) => {
  [K in Key]: (...p: ParamsType<ModuleType[K]>) => void;
};

// type MutationMapperWithNamespace = ModulesMutation;

export type MapMutationsTyped<T> = MutationMapper<T>;

// ==================== mapGetters ===================
// TODO： 后期有时间添加
