<template>
  <div :style="{ left: x + 'px', top: y + 'px', position: 'fixed' }">
    <el-dropdown trigger="click" @command="handleCommand">
      <span ref="trigger" class="trigger"></span>
      <el-dropdown-menu slot="dropdown">
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
import { mapMutationsTyped } from "@/types/store";
export interface MenuCommand {
  command: string;
  name: string;
  handle: (comp: any) => void;
}
interface Data {
  x: number;
  y: number;
  component: Vue | null;
}
interface Props {
  options: MenuCommand[];
}
export default Vue.extend<Data, {}, {}, Props>({
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [] as MenuCommand[]
    }
  },
  data(): Data {
    return {
      x: 0,
      y: 0,
      component: null
    };
  },
  methods: {
    ...mapMutationsTyped("page", ["removeComponent", "addComponent"]),
    show(x: number, y: number, component: Vue) {
      this.x = x;
      this.y = y;
      this.component = component;
      (this.$refs.trigger as HTMLElement).click();
    },
    handleCommand(command: string) {
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
  z-index: 1000;
}
</style>
