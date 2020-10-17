// 必须引入vue, 如果没有引入相当于重新定义了一个interface Vue
import Vue from "vue";
import { PageComponentOptionsConfig } from "@/types/page";
import {CustomVueConstructor} from "@/types/store"

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
    } & PageComponentOptionsConfig;
  }
}
