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
import { Commit, Dispatch } from "vuex/types/index";

type CustomVue = Vue & Record<string, any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R ? () => R : never;

type ComputedFunc<State, Prop extends keyof State> = () => Pick<State, Prop>[Prop];

type InferModuleSateType<T> = T extends (...args: any[]) => infer P ? P : T extends undefined ? any : T;

export interface MapStateTyped<State> {
  <Key extends keyof State>(map: Key[]): { [K in Key]: ComputedFunc<State, K> };
  <Map extends Record<string, keyof State>>(map: Map): {
    [K in keyof Map]: ComputedFunc<State, Map[K]>;
  };
  <Map extends Record<string, (this: CustomVue, state: State, getters: any) => any> = {}>(map: Map): {
    [K in keyof Map]: InlineComputed<Map[K]>;
  };
}

export interface StateWidthNamespace<ModuleName, ModuleType> {
  <Key extends keyof ModuleType>(namespace: ModuleName, map: Key[]): {
    [K in Key]: () => InferModuleSateType<Pick<ModuleType, K>[K]>;
  };

  <Map extends Record<string, (this: CustomVue, state: ModuleType, getters: any) => any> = {}>(namespace: ModuleName, map: Map): { [K in keyof Map]: InlineComputed<Map[K]> };

  <Map extends Record<string, keyof ModuleType>>(namespace: string, map: Map): { [K in keyof Map]: () => ModuleType[Map[K]] };
}

// ==================== mapMutationsTyped ===================
type PickMutation<U, T extends keyof U> = Pick<U, T>[T];
type ParamsType<T> = T extends (p1, ...p2: infer V) => void ? V : any[];
type MutationFunc<Mutations, T extends keyof Mutations> = (...p: ParamsType<PickMutation<Mutations, T>>) => void;

type InlineMethod<T extends (fn: any, ...args: any[]) => any> = T extends (fn: any, ...args: infer Args) => infer R ? (...args: Args) => R : never;

export interface MapMutationsTyped<Mutations> {
  <Key extends keyof Mutations>(map: Key[]): {
    [K in Key]: MutationFunc<Mutations, K>;
  };
  <Map extends Record<string, keyof Mutations>>(map: Map): {
    [K in keyof Map]: MutationFunc<Mutations, Map[K]>;
  };
  <Map extends Record<string, (this: CustomVue, commit: Commit, ...args: any[]) => any>>(map: Map): { [K in keyof Map]: InlineMethod<Map[K]> };
}

export interface MutatonsWidthNamespace<ModuleName, ModuleType> {
  <Key extends keyof ModuleType>(namespace: ModuleName, map: Key[]): {
    [K in Key]: (...p: ParamsType<ModuleType[K]>) => void;
  };
  <Map extends Record<string, keyof ModuleType>>(namespace: ModuleName, map: Map): {
    [K in keyof Map]: MutationFunc<ModuleType, Map[K]>;
  };
  <Map extends Record<string, (this: CustomVue, commit: Commit, ...args: any[]) => any>>(namespace: string, map: Map): { [K in keyof Map]: InlineMethod<Map[K]> };
}

// ==================== mapGetters ===================
type GettersType = { [key: string]: (...args: any[]) => any };
export interface MapGettersTyped<Getters extends GettersType> {
  <Key extends keyof Getters>(map: Key[]): { [K in Key]: () => ReturnType<Getters[Key]> };
  <Map extends Record<string, keyof Getters>>(map: Map): { [K in keyof Map]: () => ReturnType<Getters[Map[K]]> };
}
export interface GettersWithNamespace<ModuleName, ModuleType extends GettersType> {
  <Key extends keyof ModuleType>(namespace: ModuleName, map: Key[]): { [K in Key]: () => ReturnType<ModuleType[K]> };
  <Map extends Record<string, keyof ModuleType>>(namespace: ModuleName, map: Map): { [K in keyof Map]: () => ReturnType<ModuleType[Map[K]]> };
}

// ==================== mapActions ===================
// TODO： 这里使用了any, 后续完善
type ActionMethod = (...args: any[]) => Promise<any>;
export interface MapActionsTyped<Actions> {
  <Key extends keyof Actions>(map: Key[]): { [K in Key]: ActionMethod };
  <Map extends Record<string, keyof Actions>>(map: Map): { [K in keyof Map]: ActionMethod };
  <Map extends Record<string, (this: CustomVue, dispatch: Dispatch, ...args: any[]) => any>>(map: Map): { [K in keyof Map]: InlineMethod<Map[K]> };
}

export interface MapActionsWithNamespace<ModuleName, ModuleType> {
  <Key extends keyof ModuleType>(namespace: ModuleName, map: Key[]): { [K in Key]: ActionMethod };
  <Map extends Record<string, keyof ModuleType>>(namespace: string, map: Map): { [K in keyof Map]: ActionMethod };
  <Map extends Record<string, (this: CustomVue, dispatch: Dispatch, ...args: any[]) => any>>(namespace: string, map: Map): { [K in keyof Map]: InlineMethod<Map[K]> };
}
