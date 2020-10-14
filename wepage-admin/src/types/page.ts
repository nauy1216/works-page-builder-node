export declare interface PageConfig {
  alias: string; // 页面别名
  width: number; // 页面设计稿宽度
  height?: number; // 页面设计稿高度
  children: PageComponentOptions[]; // 页面组件
}

export declare interface PageComponentOptions {
  name: string; // 组件名称
  alias: string; // 组件别名， 用于展示
  component?: Vue; // 组件构造函数，可选
  config: PageComponentOptionsConfig; // 组件配置对象用于组件布局
  data: Record<string, any>; // 组件内部定义的属性
}

export declare interface PageComponentOptionsConfig {
  x: number; // 组件左上角在页面的x坐标
  y: number; // 组件左上角在页面的x坐标
  width: number; // 组件的宽度
  height: number; // 组件的高度
  minWidth?: number; // 组件的最小宽度
  minHeight?: number; // 组件的最小高度
  maxWidth?: number; // 组件的最大宽度
  maxHeight?: number; // 组件的最大高度
}
