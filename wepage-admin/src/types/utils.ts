import { ExtendedVue } from "vue/types/vue";
export type ComponentInstance<T> = T extends ExtendedVue<
  infer Instance,
  infer Data,
  infer Methods,
  infer Computed,
  infer Props
>
  ? Instance & Data & Methods & Computed & Props
  : any;

export type ExportPublicProps<
  T extends ExtendedVue<any, any, any, any, any>,
  U extends keyof ComponentInstance<T>
> = Pick<ComponentInstance<T>, U>;
