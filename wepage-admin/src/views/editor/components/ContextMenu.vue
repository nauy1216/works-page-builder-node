<template>
  <div :style="{ left: x + 'px', top: y + 'px', position: 'fixed' }">
    <el-dropdown trigger="click" @command="handleCommand">
      <span ref="trigger" class="trigger"></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="delete-component">删除</el-dropdown-item>
        <el-dropdown-item command="copy-component">复制</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
export default Vue.extend({
  data() {
    return {
      x: 0,
      y: 0,
      component: null
    };
  },
  methods: {
    ...mapMutations(["removeComponent", "addComponent"]),
    show(x: number, y: number, component: any) {
      this.x = x;
      this.y = y;
      this.component = component;
      (this.$refs.trigger as HTMLElement).click();
    },
    handleCommand(command) {
      switch (command) {
        case "delete-component": {
          this.removeComponent(this.component);
          break;
        }
        case "copy-component": {
          const comp = JSON.parse(JSON.stringify(this.component));
          comp.component = (this.component as any).component;
          this.addComponent(comp);
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.trigger {
  position: fixed;
  // width: 10px;
  // height: 10px;
  // background-color: red;
  z-index: 1000;
}
</style>
