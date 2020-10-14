<template>
  <div class="view-port" @dragover="handlePageDrageover" @drop="handlePageDrop">
    <div
      class="page-content"
      :style="{
        width: pageConfig.width + 'px',
        height: pageConfig.height + 'px',
        background:
          'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px'
      }"
    >
      <vue-draggable-resizable
        v-for="(comp, index) in pageConfig.children"
        :key="comp.name + index"
        :x="comp.config.x"
        :y="comp.config.y"
        :w="comp.config.width"
        :h="comp.config.height"
        :parent="true"
        :debug="false"
        :min-width="comp.config.width"
        :min-height="comp.config.height"
        :z-index="comp.config.zIndex"
        :active.sync="comp.config.active"
        :grid="[20, 20]"
        :isConflictCheck="true"
        :snap="true"
        :snapTolerance="10"
        @refLineParams="getRefLineParams"
        @dragging="(left, right) => handleDrag(comp, left, right)"
        @resizing="handleResize"
        @deactivated="handleDeactivated(comp)"
        @activated="handleActivated(comp)"
        @dragstop="handleDragStop"
        @resizestop="handleResizeStop"
        :on-drag-start="handleDragStart(comp)"
        :on-resize-start="handleResizeStart(comp)"
      >
        <div
          :style="{
            width: comp.config.width + 'px',
            height: comp.config.height + 'px'
          }"
        >
          <component :is="compList[comp.name]"></component>
        </div>
      </vue-draggable-resizable>
      <span
        class="ref-line v-line"
        v-for="(item, index) in vLine"
        v-show="item.display"
        :key="index"
        :style="{
          left: item.position,
          top: item.origin,
          height: item.lineLength
        }"
      />
      <span
        class="ref-line h-line"
        v-for="(item, index) in hLine"
        v-show="item.display"
        :key="index"
        :style="{
          top: item.position,
          left: item.origin,
          width: item.lineLength
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";
import { mapState, mapMutations } from "vuex";
import { EventType } from "@/types/const";

export default Vue.extend({
  data() {
    return {
      active: false,
      compList,
      vLine: [],
      hLine: [],
      dragComponent: null
    };
  },
  created() {
    this.$eventBus.$on(EventType.componentdragStart, comp => {
      this.dragComponent = comp;
    });
  },
  watch: {
    active() {
      console.log(this.active);
    }
  },
  computed: {
    ...mapState(["pageConfig"])
  },
  methods: {
    ...mapMutations(["setActiveComp", "addComponent"]),
    // 辅助线回调事件
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    },
    handleDrag(comp, left, top) {
      console.log("onDrag", left, top);
      comp.config.x = left;
      comp.config.y = top;
    },
    handleResize(left, top, width, height) {
      console.log(left, top, width, height);
    },
    handleDragStart(comp) {
      console.log("handleDragStart", comp);
    },
    handleResizeStart(comp) {
      console.log("handleResizeStart", comp);
    },
    handleDeactivated() {
      //   this.setActiveComp(null);
    },
    handleActivated(comp) {
      this.setActiveComp(comp);
    },
    handleDragStop() {
      console.log("handleDragStop");
    },
    handleResizeStop() {
      console.log("handleResizeStop");
    },
    handlePageDrageover(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handlePageDrop(event) {
      console.log("handlePageDrop", event.clientX, event.clientY);
      const comp = this.dragComponent as any;
      if (comp && comp.extendOptions) {
        const rect = event.target.getBoundingClientRect();
        const config = JSON.parse(JSON.stringify(comp.extendOptions.config));
        config.x = event.clientX - rect.left + event.target.scrollLeft;
        config.y = event.clientY - rect.top + event.target.scrollTop;
        this.addComponent({
          name: comp.extendOptions.name,
          alias: comp.extendOptions.config.alias,
          component: comp,
          config,
          data: {}
        });
        console.log(comp.extendOptions);
      }
    },
    setDragComponent(comp) {
      this.dragComponent = comp;
    }
  }
});
</script>

<style lang="scss" scoped>
.view-port {
  overflow: auto;
  .page-content {
    position: relative;
  }
}
</style>
