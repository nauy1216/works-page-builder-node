<template>
  <div :style="{ left: x + 'px', top: y + 'px', position: 'fixed' }">
    <el-dropdown trigger="click" @command="handleCommand">
      <span ref="trigger" class="trigger"></span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item command="delete-component">删除</el-dropdown-item>
        <el-dropdown-item command="copy-component">复制</el-dropdown-item> -->
        <el-dropdown-item
          v-for="command in options"
          :key="command.command"
          :command="command.command"
          >{{ command.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
export interface MenuCommand {
  command: string;
  name: string;
  handle: (comp: any) => void;
}
export default Vue.extend({
  props: {
    options: {
      type: Array,
      default: () => [] as MenuCommand[]
    } as any
  },
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
      for (const c of this.options as MenuCommand[]) {
        if (c.command === command) {
          c.handle(this.component);
          break;
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
