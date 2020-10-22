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
import LeftTool from "./left-tool/index.vue";
import RightTool from "./right-tool/index.vue";
import TopTool from "./top-tool/index.vue";
import PageContent from "./page-content/inex.vue";
import { mapStateTyped, mapMutationsTyped } from "@/types/store";
export default Vue.extend({
  components: {
    TopTool,
    LeftTool,
    RightTool,
    PageContent
  },
  created() {
    // this.showLeftTool
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig"]),
    ...mapStateTyped("editor", {
      kk: "editorConfig"
    }),
    ...mapStateTyped("editor", {
      showLeftTool(state): boolean {
        return state.editorConfig.showLeftTool;
      },
      showRightTool(state): boolean {
        return state.editorConfig.showRightTool;
      }
    })
  },
  methods: {
    ...mapMutationsTyped("page", ["addComponent"])
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
    background-color: rgba(255, 255, 255, 0.9);
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
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
    box-shadow: 0 0 4px 0 #e0e0e0;
  }
}
</style>
