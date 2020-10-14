<template>
  <div class="left-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件列表" name="1">
        <div
          v-for="(comp, index) in compList"
          :key="comp.name + index"
          class="left-tool-item"
          draggable="true"
          @dragstart="handleDragStart($event, comp)"
          @dragend="handleDragEnd($event, comp)"
        >
          <div slot="reference">
            <i :class="comp.extendOptions.config.icon"></i>
            {{ comp.extendOptions.config.alias }}
          </div>
          <!-- <el-popover placement="right" width="400" trigger="click">
            <div
              :style="{
                width: comp.extendOptions.config.width + 'px',
                height: comp.extendOptions.config.height + 'px'
              }"
            >
              <component :is="comp"></component>
            </div>
            <div slot="reference">
              <i :class="comp.extendOptions.config.icon"></i>
              {{ comp.extendOptions.config.alias }}
            </div>
          </el-popover> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="页面管理" name="2"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import compList from "@/lib/index.ts";
import { mapMutations } from "vuex";
import { EventType } from "@/types/const";

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
    handleDragStart(event, comp) {
      this.$eventBus.$emit(EventType.componentdragStart, comp);
    },
    handleDragEnd() {
      this.$eventBus.$emit(EventType.componentdragEnd);
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
    background-color: #e0e0e0;
  }
}
</style>
