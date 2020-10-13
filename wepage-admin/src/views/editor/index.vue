<template>
  <div class="editor">
    <Left class="left"></Left>
    <div class="content">
      <vue-draggable-resizable
        :w="400"
        :h="400"
        :parent="true"
        :debug="false"
        :min-width="200"
        :min-height="200"
      >
        <p>vue-draggable-resizable</p>
      </vue-draggable-resizable>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Left from "./components/left.vue";
@Component({
  components: {
    Left
  }
})
export default class Index extends Vue {
  private x = 0;
  private y = 0;
  private width = 0;
  private height = 0;

  onDrag(data: any) {
    console.log("onDrag", data);
  }
  onResize() {
    console.log();
  }
}
</script>
<style scoped lang="scss">
.editor {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    width: 200px;
  }
  .left {
    background-color: #e0e0e0;
  }
  .content {
    position: relative;
    background-color: #aaaaaa;
    flex: 1 1 960px;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .right {
    background-color: #e0e0e0;
  }
}
.vdr {
  border: 1px dashed black;
}
</style>
