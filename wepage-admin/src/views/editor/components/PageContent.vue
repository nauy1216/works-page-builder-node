<template>
  <div class="view-port"
    ref="viewport"
    @mousedown="handlePageMouseDown"
    @mouseup="handlePageMouseUp"
    @mousemove="handlePageMouseMove"
    @dragover="handlePageDrageover"
    @drop="handlePageDrop">
    <div
      class="page-content"
      ref="pageContent"
      :style="{
        transform: `translate(${scrollLeft+'px'}, ${scrollTop+'px'})`,
        width: pageConfig.width + 'px',
        height: pageConfig.height + 'px',
        background:
          'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px'
      }"
    >
      <vue-draggable-resizable
        v-for="(comp, index) in pageConfig.children"
        :key="
          comp.name + '-' + index + pageConfig.width + '-' + pageConfig.height
        "
        :x="comp.config.x"
        :y="comp.config.y"
        :w="comp.config.width"
        :h="comp.config.height"
        :parent="true"
        :debug="false"
        :z-index="comp.config.zIndex"
        :active.sync="comp.config.active"
        :isConflictCheck="false"
        :snap="true"
        :snapTolerance="10"
        @refLineParams="getRefLineParams"
        @dragging="(left, right) => handleDrag(comp, left, right)"
        @resizing="
          (left, top, width, height) =>
            handleResize(comp, left, top, width, height)
        "
        @deactivated="handleDeactivated(comp)"
        @activated="handleActivated(comp)"
        @dragstop="handleDragStop"
        @resizestop="handleResizeStop(index)"
        :on-drag-start="handleDragStart(comp)"
        :on-resize-start="handleResizeStart(comp)"
      >
        <div
          @contextmenu="handleContextMenu($event, comp)"
          :style="{
            width: comp.config.width + 'px',
            height: comp.config.height + 'px'
          }"
        >
          <component
            :is="compList[comp.name]"
            :key="comp.config.width + '-' + comp.config.height"
          ></component>
        </div>
      </vue-draggable-resizable>
      <!-- <span
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
      /> -->
    </div>
    <ContextMenu :options="componentMenu" ref="contextMenu"></ContextMenu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";
import { mapState, mapMutations } from "vuex";
import { EventType } from "@/types/const";
import ContextMenu from "./ContextMenu.vue";

export default Vue.extend({
  components: {
    ContextMenu
  },
  data() {
    return {
      compList,
      vLine: [],
      hLine: [],
      dragComponent: null,
      componentMenu: [] as any,
      isStartMove: false,
      scrollLeft: 0,
      scrollTop: 0,
      startX: 0,
      startY: 0,
      viewportWidth: 0,
      viewportHeight: 0,
    };
  },
  created() {
    this.$eventBus.$on(EventType.componentdragStart, comp => {
      this.dragComponent = comp;
    });
    this.componentMenu = [
      {
        command: "delete-component",
        name: "删除",
        handle: comp => {
          this.removeComponent(comp);
        }
      },
      {
        command: "copy-component",
        name: "复制",
        handle: comp => {
          const copy = JSON.parse(JSON.stringify(comp));
          copy.component = (comp as any).component;
          this.addComponent(copy);
        }
      }
    ];
  },
  computed: {
    ...mapState(["pageConfig"])
  },
  methods: {
    ...mapMutations(["setActiveComp", "addComponent", "removeComponent"]),
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
    handleResize(comp, left, top, width, height) {
      comp.config.x = left;
      comp.config.y = top;
      comp.config.width = width;
      comp.config.height = height;
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
    handleDragStop(index) {
      console.log("handleDragStop", this.$refs.comp, index);
    },
    handleResizeStop(index) {
      //   this.$refs.comp[index].$forceUpdate()
      console.log("handleResizeStop", this.$refs.comp, index);
    },
    handlePageDrageover(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handlePageDrop(event) {
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
      }
    },
    setDragComponent(comp) {
      this.dragComponent = comp;
    },
    // 右键菜单
    handleContextMenu(event, comp) {
      event.preventDefault();
      event.stopPropagation();
      (this.$refs.contextMenu as any).show(event.clientX, event.clientY, comp);
    },
    handlePageMouseDown(ev) {
        if (ev.target.className.indexOf("page-content")>-1 ) {
            this.isStartMove = true
            this.startX = ev.clientX
            this.startY = ev.clientY
        }
        console.log("handlePageMouseDown", ev, this.startX,this.startY )
    },
    handlePageMouseUp() {
        console.log("handlePageMouseUp")
        this.isStartMove = false
    },
    handlePageMouseMove(ev) {
        if (this.isStartMove) {
            const rect = (this.$refs.viewport as HTMLElement).getBoundingClientRect()
            this.viewportWidth = rect.width
            this.viewportHeight = rect.height
            this.scrollLeft += ev.clientX - this.startX;
            this.scrollTop += ev.clientY - this.startY;
            this.scrollLeft = Math.min(0, this.scrollLeft)
            this.scrollTop = Math.min(0, this.scrollTop)
            this.scrollLeft = Math.max(-(this.pageConfig.width - this.viewportWidth), this.scrollLeft)
            this.scrollTop = Math.max(-(this.pageConfig.height - this.viewportHeight), this.scrollTop)
            this.startX = ev.clientX
            this.startY = ev.clientY
        }
    }
  }
});
</script>

<style lang="scss" scoped>
.view-port {
  overflow: hidden;
  .page-content {
    position: relative;
    zoom: 1;
  }
}
</style>
<style lang="scss">
.vdr {
  .handle {
    z-index: 100;
  }
}
</style>
