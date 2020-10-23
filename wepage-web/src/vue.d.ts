declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue-draggable-resizable-gorkys" {}
declare module "v-charts" {}
declare module "throttle-debounce" {
  // TODO: 这里暂时所有参数声明为any，有时间再改
  export function debounce(...args: any[]): any;
  export function throttle(...args: any[]): any;
}
