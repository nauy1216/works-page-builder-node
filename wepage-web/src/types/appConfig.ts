export type AppConfig = {
  id: string;
  appName: string;
  appComponents: PageComponentOptions[];
  pages: {
    id: string;
    pageName: string;
  }[];
};

export interface PageComponentOptions {
  id: string;
  key: string;
  layoutId: string; // 所属图层
  name: string; // 组件名称
  alias: string; // 组件别名， 用于展示
  config: {
    x: number; // 组件左上角在页面的x坐标
    y: number; // 组件左上角在页面的x坐标
    width: number; // 组件的宽度
    height: number; // 组件的高度
    zIndex: number;
  }; // 组件配置对象用于组件布局
  data: Record<string, any>; // 组件内部定义的属性
}
