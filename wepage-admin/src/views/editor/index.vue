<template>
  <div class="editor">
    <TopTool class="top"></TopTool>
    <LeftTool class="left" v-show="showLeftTool"></LeftTool>
    <RightTool class="right" v-show="showRightTool"></RightTool>
    <PageContent class="main"></PageContent>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LeftTool from "./components/LeftTool.vue";
import RightTool from "./right-tool/index.vue";
import TopTool from "./components/TopTool.vue";
import PageContent from "./components/PageContent.vue";

interface Computed {
  showLeftTool: boolean;
  showRightTool: boolean;
}

export default Vue.extend<{}, {}, Computed, {}>({
  components: {
    TopTool,
    LeftTool,
    RightTool,
    PageContent
  },
  computed: {
    showLeftTool() {
      return this.$store.state.editorConfig.showLeftTool;
    },
    showRightTool() {
      return this.$store.state.editorConfig.showRightTool;
    }
  }
});
</script>
<style scoped lang="scss">
.editor {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .left,
  .right {
    position: fixed;
    z-index: 200;
    width: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 4px 0px #e0e0e0;
  }
  .left {
    height: 60vh;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
  .right {
    height: 60vh;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
  .main {
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 40px);
    box-shadow: 0 0 4px 0 #e0e0e0;
  }
}
</style>
