// 必须引入vue, 如果没有引入相当于重新定义了一个interface Vue
import Vue from "vue";
import { PageComponentOptionsConfig } from "@/types/page";
declare module "vue/types/vue" {
  interface Vue {
    $eventBus: Vue;
  }
}
declare module "vue/types/options" {
  interface PropOptions {
    label: string;
  }
  interface ComponentOptions<V extends Vue> {
    config?: {
      alias: string; // 组件名称
      icon: string; // 组件图标
    } & PageComponentOptionsConfig;
  }
}
