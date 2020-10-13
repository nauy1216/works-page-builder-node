<template>
  <div class="editor">
    <Left class="left"></Left>
    <div class="content">
      <vue-draggable-resizable
        v-for="(comp, index) in compList"
        :key="index"
        :w="comp.extendOptions.config.width"
        :h="comp.extendOptions.config.height"
        :parent="true"
        :debug="false"
        :min-width="comp.extendOptions.config.width"
        :min-height="comp.extendOptions.config.height"
      >
        <component :is="comp"></component>
      </vue-draggable-resizable>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Left from "./components/left.vue";
export default Vue.extend({
  components: {
    Left
  },
  data() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      compList: [] as Vue[]
    };
  },
  created() {
    this.$eventBus.$on("addComponent", comp => {
      this.compList.push(comp);
    });
  },
  methods: {
    onDrag(data: any) {
      console.log("onDrag", data);
    },
    onResize() {
      console.log();
    }
  }
});
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
