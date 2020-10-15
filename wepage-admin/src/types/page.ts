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
  active?: boolean; // 当前组件是否处于激活状态
  zIndex?: number; // 层级
  grid?: [number, number]; // 网格
  // parent?: boolean; // 设置为true后将无法在其父元素之外拖动或调整大小的组件
  lockAspectRatio?: boolean; // 用于在调整大小期间保持组件的宽高比
  isConflictCheck?: boolean; // 冲突检测
}

export declare interface EditorConfig {
  gridX: number; // 网格横向间隔
  gridY: number; // 网格纵向间隔
  showScrollbar: boolean; // 是否显示滚动条
  parent: boolean; // 设置为true后将无法在其父元素之外拖动或调整大小的组件
  zoom: number; // 放大
  showLeftTool: boolean;
  showRightTool: boolean;
}
