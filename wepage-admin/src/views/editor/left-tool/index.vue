<template>
  <div class="left-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件列表" name="1">
        <div
          v-for="(comp, index) in $compList"
          :key="comp.name + index"
          class="left-tool-item"
          draggable="true"
          @dragstart="handleDragStart($event, comp)"
          @dragend="handleDragEnd($event, comp)"
        >
          <i :class="comp.extendOptions.config.icon" class="icon"></i>
          <span class="name">{{ comp.extendOptions.config.alias }}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图层" name="2">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { mapMutations } from "vuex";

interface Data {
  activeName: string;
}

interface Methods {
  handleDragStart: (event: Event, comp: VueConstructor) => void;
  handleDragEnd: () => void;
  setDragComp: (comp: VueConstructor | null) => void;
}

export default Vue.extend<Data, Methods, {}, {}>({
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {
    ...mapMutations(["addComponent", "setActiveComp", "setDragComp"]),
    handleDragStart(event, comp) {
      this.setDragComp(comp);
    },
    handleDragEnd() {
      this.setDragComp(null);
    }
  }
});
</script>
<style scoped lang="scss">
.left-tool {
  padding: 20px;
}
.left-tool-item {
  width: 50%;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  text-align: left;
  &:hover {
    background-color: #e0e0e0;
  }
  .icon {
    margin-bottom: 10px;
    font-size: 30px;
    color: #666666;
  }
}
</style>
