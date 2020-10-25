<template>
  <ve-ring :data="chartData"></ve-ring>
</template>

<script>
export default {
  name: "ChartRing",
  props: {
    msg: {
      type: String,
      inputComponent: "el-input",
      default: "hello",
      label: "消息"
    },
    color: {
      type: String,
      inputComponent: "el-color-picker",
      default: "#ffffff",
      label: "颜色"
    }
  },
  config: {
    alias: "环图",
    icon: "el-icon-star-on",
    x: 0,
    y: 0,
    width: 400,
    height: 200
  },
  data() {
    return {
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      }
    };
  }
};
</script>
