<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="160"
    :maxRows="90"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[0, 0]"
    :autoSize="false"
    :verticalCompact="true"
    :responsive="false"
    :use-css-transforms="true"
    :useStyleCursor="false"
    @layout-created="layoutCreatedEvent"
    @layout-before-mount="layoutBeforeMountEvent"
    @layout-mounted="layoutMountedEvent"
    @layout-ready="layoutReadyEvent"
    @layout-updated="layoutUpdatedEvent"
  >
    <grid-item
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      :isDraggable="true"
      :isResizable="true"
      :static="false"
      dragIgnoreFrom=".disabled"
      @resize="resizeEvent"
      @move="moveEvent"
      @resized="resizedEvent"
      @moved="movedEvent"
    >
      <div style="width: 100%; height:100%; border: 1px solid red; box-sizing: border-box;">
        {{ item.i }}
      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import data from "./data";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      layout: data
    };
  },
  methods: {
    layoutCreatedEvent() {
      console.log("layoutCreatedEvent");
    },
    layoutBeforeMountEvent() {
      console.log("layoutBeforeMountEvent");
    },
    layoutMountedEvent() {
      console.log("layoutMountedEvent");
    },
    layoutReadyEvent() {
      console.log("layoutReadyEvent");
    },
    layoutUpdatedEvent() {
      console.log("layoutUpdatedEvent");
    },
    resizeEvent() {
      console.log("resizeEvent");
    },
    moveEvent() {
      console.log("moveEvent");
    },
    resizedEvent() {
      console.log("resizedEvent");
    },
    movedEvent() {
      console.log("movedEvent");
    }
  }
};
</script>

<style>
.vue-grid-item {
  background: #e0e0e0;
}
</style>
