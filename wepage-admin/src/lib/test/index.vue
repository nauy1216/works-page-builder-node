<template>
  <div class="test">
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
      default: "hello",
      label: "消息"
    }
  }
});
</script>
<style scoped lang="scss">
.test {
  border: 1px solid red;
}
</style>
