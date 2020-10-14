<template>
  <div class="left-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件列表" name="1">
        <div
          v-for="(comp, index) in compList"
          :key="comp.name + index"
          class="left-tool-item"
          draggable="true"
          @click="handleClick(comp)"
          @dragstart="handleDragStart($event, comp)"
          @dragend="handleDragEnd($event, comp)"
        >
          <el-popover placement="right" width="400" trigger="click">
            <div
              :style="{
                width: comp.extendOptions.config.width + 'px',
                height: comp.extendOptions.config.height + 'px'
              }"
            >
              kkkk
              <component :is="comp"></component>
            </div>
            <div slot="reference">
              <i :class="comp.extendOptions.config.icon"></i>
              {{ comp.extendOptions.config.alias }}
            </div>
          </el-popover>
        </div>
      </el-tab-pane>
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
    handleClick(comp) {
      // this.addComponent({
      //   name: comp.extendOptions.name,
      //   alias: comp.extendOptions.config.alias,
      //   component: comp,
      //   config: JSON.parse(JSON.stringify(comp.extendOptions.config)),
      //   data: {}
      // });
      // console.log(comp.extendOptions);
    },
    handleDragStart(event, comp) {
      console.log("handleDragStart", event, comp);
      this.$eventBus.$emit(EventType.componentdragStart, comp);
    },
    handleDragEnd(event, comp) {
      console.log("handleDragEnd", event, comp);
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
