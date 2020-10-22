<template>
  <div :style="{ width: width + 'px', height: height + 'px' }" class="layout-position">
    <vue-draggable-resizable
      v-for="comp in components"
      :key="comp.key"
      :x="comp.config.x"
      :y="comp.config.y"
      :w="comp.config.width"
      :h="comp.config.height"
      :parent="editorConfig.parent"
      :debug="false"
      :active.sync="comp.config.active"
      :prevent-deactivation="true"
      :isConflictCheck="false"
      :snap="true"
      :snapTolerance="10"
      @dragging="(left, right) => handleDrag(comp, left, right)"
      @resizing="(left, top, width, height) => handleResize(comp, left, top, width, height)"
      @deactivated="handleDeactivated(comp)"
      @activated="handleActivated(comp)"
    >
      <div
        @contextmenu="handleComponentContextMenu($event, comp)"
        :style="{
          width: comp.config.width + 'px',
          height: comp.config.height + 'px'
        }"
      >
        <component :is="$compList[comp.name]" v-bind="comp.data"></component>
      </div>
    </vue-draggable-resizable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutationsTyped, mapStateTyped } from "@/types/store";
import { PageComponentOptions } from "@/types/page";
export default Vue.extend({
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig"]),
    ...mapStateTyped("editor", ["editorConfig"]),
    components(): PageComponentOptions[] {
      const showLayouts = this.pageConfig.layouts.filter(lay => lay.show).map(lay => lay.id);
      return this.pageConfig.children.filter(comp => showLayouts.indexOf(comp.layoutId) > -1);
    }
  },
  methods: {
    ...mapMutationsTyped("page", ["refreshComponent", "setActiveComp"]),
    handleDrag(comp, left, top) {
      comp.config.x = left;
      comp.config.y = top;
    },
    handleResize(comp, left, top, width, height) {
      comp.config.x = left;
      comp.config.y = top;
      comp.config.width = width;
      comp.config.height = height;
      this.refreshComponent(comp);
    },
    handleDeactivated() {
      //   this.setActiveComp(null);
    },
    handleActivated(comp) {
      this.setActiveComp(comp);
    },
    handleComponentContextMenu($event, comp) {
      this.$emit("contextmenu", $event, comp);
    }
  }
});
</script>

<style lang="scss" scoped>
.layout-position {
  pointer-events: none;
  & * {
    pointer-events: all;
  }
}
</style>
