<template>
  <div class="test" :style="{ background: color }">
    <p>【msg】 {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import defineComponent from "../defineComponent"
export default defineComponent({
  name: "Test",
  config: {
    alias: "测试",
    icon: "el-icon-star-on",
    x: 0,
    y: 0,
    width: 100,
    height: 100
  },
  created() {
      console.log("jjjjj")
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
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid red;
}
</style>
