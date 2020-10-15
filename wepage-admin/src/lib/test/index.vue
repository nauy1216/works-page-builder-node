<template>
  <div class="test" :style="{ background: color }">
    <p>【msg】 {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Test",
  config: {
    alias: "测试",
    icon: "el-icon-star-on",
    x: 0,
    y: 0,
    width: 200,
    height: 100
  },
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
  }
});
</script>
<style scoped lang="scss">
.test {
  width: 1920px;
  box-sizing: border-box;
  background: red !important;
}
</style>
