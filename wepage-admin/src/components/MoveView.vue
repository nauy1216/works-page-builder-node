<template>
  <div class="comp-viewport" :style="viewportStyle">
    <div
      :style="{
        width: contentWidth + 'px',
        height: contentHeight + 'px',
        transform: `translate(${scrollLeft + 'px'}, ${scrollTop + 'px'})`
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export declare interface Data {
  isStartMove: boolean;
  scrollLeft: number;
  scrollTop: number;
  startX: number;
  startY: number;
}
export default Vue.extend({
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    contentWidth: {
      type: Number,
      default: 0
    },
    contentHeight: {
      type: Number,
      default: 0
    }
  },
  data(): any {
    return {
      isStartMove: false,
      scrollLeft: 0, // 页面横向滚动距离
      scrollTop: 0,
      startX: 0,
      startY: 0
    };
  },
  computed: {
    viewportStyle() {
      if (this.width === undefined) {
        return {};
      }
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    }
  },
  created(this: any) {
    this.addMoveEvent();
  },
  methods: {
    // 视口增加拖动事件
    addMoveEvent(this: any) {
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
          this.scrollLeft += ev.clientX - this.startX;
          this.scrollTop += ev.clientY - this.startY;
          this.scrollLeft = Math.min(0, this.scrollLeft);
          this.scrollTop = Math.min(0, this.scrollTop);
          this.scrollLeft = Math.max(-(this.contentWidth - this.width), this.scrollLeft);
          this.scrollTop = Math.max(-(this.contentHeight - this.height), this.scrollTop);
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
.comp-viewport {
  overflow: hidden;
}
</style>
