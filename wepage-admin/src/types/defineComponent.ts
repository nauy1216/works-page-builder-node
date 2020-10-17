import Vue from "vue";
import { ComponentOptions, PropValidator } from "vue/types/options";
// import { State } from "./store";

type DataDef<Data, Props, V> = Data | ((this: Readonly<Props> & V) => Data);
export type RecordPropsDefinition<T> = {
  [K in keyof T]: PropValidator<T[K]>;
};
type CombinedVueInstance<
  Instance extends Vue,
  Data,
  Methods,
  Computed,
  Props,
  CompThisType
> = Data & Methods & Computed & Props & Instance & CompThisType;
type ThisTypedWithInterface<
  CompThisType,
  Data,
  Methods,
  Computed,
  Props,
  V extends Vue = Vue
> = object &
  ComponentOptions<
    V,
    DataDef<Data, Props, V>,
    Methods,
    Computed,
    RecordPropsDefinition<Props>,
    Props
  > &
  ThisType<
    CombinedVueInstance<
      V,
      Data,
      Methods,
      Computed,
      Readonly<Props>,
      CompThisType
    >
  >;

interface BaseCompThisType {
  data?: { [key: string]: any };
  props?: { [key: string]: any };
  methods?: { [key: string]: Function };
  computed?: { [key: string]: any };
}

// type PickState<T extends string> = Pick<State, T>;

export default function defineComponent<
  CompThisType extends BaseCompThisType,
  V extends Vue = Vue
>(
  options?: ThisTypedWithInterface<
    CompThisType,
    CompThisType["data"],
    CompThisType["methods"],
    CompThisType["computed"],
    CompThisType["props"],
    V
  >
) {
  return Vue.extend(options as any);
}
