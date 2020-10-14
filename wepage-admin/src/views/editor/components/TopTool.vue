<template>
  <div class="top-tool" :style="{ top: top + 'px' }">
    <el-button>保存</el-button>
    <el-button>预览</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      top: -100
    };
  },
  mounted() {
    // document.addEventListener("mousemove", this.handleMouseMove);
  },
  beforeDestroy() {
    // document.removeEventListener("mousemove", this.handleMouseMove);
  },
  methods: {
    handleMouseMove(ev) {
      if (ev.clientY < 60) {
        this.top = 0;
      } else {
        this.top = -100;
      }
    }
  }
});
</script>
<style scoped lang="scss">
.top-tool {
  position: fixed;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60px;
  background-color: #ffffff;
}
</style>
