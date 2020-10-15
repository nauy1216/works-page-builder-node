<template>
  <div
    class="view-port"
    ref="viewport"
    @dragover="handlePageDrageover"
    @drop="handlePageDrop"
  >
    <div
      class="page-content"
      ref="pageContent"
      :style="{
        transform: `translate(${scrollLeft + 'px'}, ${scrollTop + 'px'})`,
        width: pageConfig.width + 'px',
        height: pageConfig.height + 'px',
        background: createBackground(editorConfig.gridX, editorConfig.gridY)
      }"
    >
      <vue-draggable-resizable
        v-for="(comp, index) in pageConfig.children"
        :key="createVdrKey(comp, index)"
        :style="{
          zIndex: comp.config.zIndex
        }"
        :x="comp.config.x"
        :y="comp.config.y"
        :w="comp.config.width"
        :h="comp.config.height"
        :parent="true"
        :debug="false"
        :active.sync="comp.config.active"
        :isConflictCheck="false"
        :snap="true"
        :snapTolerance="10"
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
            :key="createCompKey(comp)"
            v-bind="comp.data"
          ></component>
        </div>
      </vue-draggable-resizable>
    </div>
    <ContextMenu :options="componentMenu" ref="contextMenu"></ContextMenu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";
import { mapState, mapMutations } from "vuex";
import ContextMenu from "./ContextMenu.vue";
import { PageComponentOptionsConfig } from "@/types/page";

const defaultConfig: PageComponentOptionsConfig = {
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  zIndex: 0,
  lockAspectRatio: true
};

export default Vue.extend({
  components: {
    ContextMenu
  },
  data() {
    return {
      compList,
      componentMenu: [] as any,
      isStartMove: false,
      scrollLeft: 0, // 页面横向滚动距离
      scrollTop: 0,
      startX: 0,
      startY: 0,
      viewportWidth: 0, // 编辑器视口宽度
      viewportHeight: 0 // 编辑器视口高度
    };
  },
  created() {
    this.addMoveEvent();
    this.setContextMenuList();
  },
  computed: {
    ...mapState(["pageConfig", "editorConfig", "dragComp"])
  },
  methods: {
    ...mapMutations(["setActiveComp", "addComponent", "removeComponent"]),
    createVdrKey(comp, index) {
      return (
        comp.name +
        "-" +
        index +
        this.pageConfig.width +
        "-" +
        this.pageConfig.height
      );
    },
    createCompKey(comp) {
      return comp.config.width + "-" + comp.config.height;
    },
    createBackground(x, y) {
      return `linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${x}px ${x}px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${y}px ${y}px`;
    },
    handleDrag(comp, left, top) {
      comp.config.x = left;
      comp.config.y = top;
    },
    handleResize(comp, left, top, width, height) {
      comp.config.x = left;
      comp.config.y = top;
      comp.config.width = width;
      comp.config.height = height;
    },
    handleDragStart() {
      //   console.log("handleDragStart", comp);
    },
    handleResizeStart() {
      //   console.log("handleResizeStart", comp);
    },
    handleDeactivated() {
      //   this.setActiveComp(null);
    },
    handleActivated(comp) {
      this.setActiveComp(comp);
    },
    handleDragStop() {
      //   console.log("handleDragStop", this.$refs.comp, index);
    },
    handleResizeStop() {
      //   console.log("handleResizeStop", this.$refs.comp, index);
    },
    handlePageDrageover(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    // 从组件列表拖拽组件释放
    handlePageDrop(event) {
      const comp = this.dragComp as any;
      if (comp && comp.extendOptions) {
        // 设置组件所在位置
        const rect = event.target.getBoundingClientRect();
        let config = JSON.parse(JSON.stringify(comp.extendOptions.config));
        config.x = event.clientX - rect.left + event.target.scrollLeft;
        config.y = event.clientY - rect.top + event.target.scrollTop;
        config = Object.assign({}, defaultConfig, config);
        console.log("增加组件", ((window as any).comp = comp));

        // 设置默认属性
        const data = {};
        const props = comp.extendOptions.props;
        props &&
          Object.keys(props).forEach(key => {
            if (typeof props[key].default == "function") {
              data[key] = props[key].default();
            } else {
              data[key] = props[key].default;
            }
          });

        this.addComponent({
          name: comp.extendOptions.name,
          alias: comp.extendOptions.config.alias,
          component: comp,
          config,
          data
        });
      }
    },
    // 右键菜单
    handleContextMenu(event, comp) {
      event.preventDefault();
      event.stopPropagation();
      (this.$refs.contextMenu as any).show(event.clientX, event.clientY, comp);
    },
    // 设置右键菜单列表
    setContextMenuList() {
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
    // 视口增加拖动事件
    addMoveEvent() {
      const handlePageMouseDown = ev => {
        if (ev.target.className.indexOf("page-content") > -1) {
          this.isStartMove = true;
          this.startX = ev.clientX;
          this.startY = ev.clientY;
        }
      };

      const handlePageMouseUp = () => {
        this.isStartMove = false;
      };

      const handlePageMouseMove = ev => {
        if (this.isStartMove) {
          const rect = (this.$refs
            .viewport as HTMLElement).getBoundingClientRect();
          this.viewportWidth = rect.width;
          this.viewportHeight = rect.height;
          this.scrollLeft += ev.clientX - this.startX;
          this.scrollTop += ev.clientY - this.startY;
          this.scrollLeft = Math.min(0, this.scrollLeft);
          this.scrollTop = Math.min(0, this.scrollTop);
          this.scrollLeft = Math.max(
            -(this.pageConfig.width - this.viewportWidth),
            this.scrollLeft
          );
          this.scrollTop = Math.max(
            -(this.pageConfig.height - this.viewportHeight),
            this.scrollTop
          );
          this.startX = ev.clientX;
          this.startY = ev.clientY;
        }
      };

      document.body.addEventListener("mousedown", handlePageMouseDown);
      document.body.addEventListener("mousemove", handlePageMouseMove);
      document.body.addEventListener("mouseup", handlePageMouseUp);
      this.$once("hook:beforeDestroy", () => {
        document.body.removeEventListener("mousedown", handlePageMouseDown);
        document.body.removeEventListener("mousemove", handlePageMouseMove);
        document.body.removeEventListener("mouseup", handlePageMouseUp);
      });
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
