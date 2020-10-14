<template>
  <div class="editor">
    <TopTool class="top"></TopTool>
    <LeftTool class="left"></LeftTool>
    <div class="view-port">
      <PageContent></PageContent>
    </div>
    <RightTool class="right"></RightTool>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LeftTool from "./components/LeftTool.vue";
import RightTool from "./components/RightTool.vue";
import TopTool from "./components/TopTool.vue";
import PageContent from "./components/PageContent.vue";
export default Vue.extend({
  components: {
    TopTool,
    LeftTool,
    RightTool,
    PageContent
  }
});
</script>
<style scoped lang="scss">
.editor {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    width: 200px;
  }
  .left,
  .right,
  .top {
    box-shadow: 0 0 4px 0px #e0e0e0;
  }
  .view-port {
    flex: 1 1 960px;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    .page-content {
      position: relative;
    }
  }
}
</style>
