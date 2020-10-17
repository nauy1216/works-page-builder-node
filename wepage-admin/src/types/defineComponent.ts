import Vue from "vue";
import { ThisTypedComponentOptionsWithRecordProps } from "vue/types/options";

type DefaultData<V> =  object | ((this: V) => object);
type DefaultProps = Record<string, any>;
type DefaultMethods<V> =  { [key: string]: (this: V, ...args: any[]) => any };
type DefaultComputed = { [key: string]: any };

type ThisTypedWithVuex<
  Data,
  Methods,
  Computed,
  Props,
  VuexState,
  V extends Vue = Vue
> = ThisTypedComponentOptionsWithRecordProps<
  V,
  Data,
  Methods,
  Computed,
  Props
> &
  ThisType<VuexState> | undefined;

export default function defineComponent<
  VuexState,
  Data = DefaultData<Vue>,
  Methods = DefaultMethods<Vue>,
  Computed = DefaultComputed,
  Props = DefaultProps,
  V extends Vue = Vue
>(options?: ThisTypedWithVuex<VuexState, Data, Methods, Computed, Props, V>) {
  return Vue.extend<Data, Methods, Computed, Props>(options as any);
}
