
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $eventBus: Vue;
    $compList: { [key: string]: CustomVueConstructor };
  }
}
declare module "vue/types/options" {
  interface PropOptions {
    label?: string; // 属性名称，用于展示
    inputComponent?: string; // 用于编辑该属性的组件
  }
  interface ComponentOptions<V extends Vue> {
    config?: {
      alias: string; // 组件名称
      icon: string; // 组件图标
      [key: string]: any
    };
  }
}
