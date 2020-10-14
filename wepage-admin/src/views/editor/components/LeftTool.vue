<template>
  <div class="left-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件列表" name="1">
        <div
          v-for="comp in compList"
          :key="comp.name"
          class="left-tool-item"
          @click="handleClick(comp)"
        >
          <i :class="comp.extendOptions.config.icon"></i
          >{{ comp.extendOptions.config.alias }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";
import { mapMutations } from "vuex";

export default Vue.extend({
  props: {
    msg: {
      type: Number,
      default: 0,
      label: "msg"
    }
  },
  data() {
    return {
      compList,
      activeName: "1"
    };
  },
  methods: {
    ...mapMutations(["addComponent", "setActiveComp"]),
    handleClick(comp) {
      this.addComponent({
        name: comp.extendOptions.name,
        alias: comp.extendOptions.config.alias,
        component: comp,
        config: JSON.parse(JSON.stringify(comp.extendOptions.config)),
        data: {}
      });
      console.log(comp.extendOptions);
    }
  }
});
</script>
<style scoped lang="scss">
.left-tool {
  padding: 20px;
}
.left-tool-item {
  margin: 10px 0;
  padding: 20px;
  text-align: left;
  &:hover {
    background-color: red;
  }
}
</style>
