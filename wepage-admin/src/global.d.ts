// 必须引入vue, 如果没有引入相当于重新定义了一个interface Vue
import Vue from "vue";
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
      label: string;
      icon: string;
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }
}
