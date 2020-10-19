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
      <el-tab-pane label="页面结构" name="2">
        <CompTree></CompTree>
      </el-tab-pane>
      <el-tab-pane label="页面" name="3">
        <PageOperate></PageOperate>
      </el-tab-pane>
      <el-tab-pane label="代码" name="4">
        <CodeOperate></CodeOperate>
      </el-tab-pane>
      <el-tab-pane label="编辑器" name="5">
        <EditorOperate></EditorOperate>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import CompTree from "../components/comp-tree.vue";
import PageOperate from "../components/page-operate.vue";
import CodeOperate from "../components/code-operate.vue";
import EditorOperate from "../components/editor-operate.vue";

export default Vue.extend({
  components: {
    CompTree,
    PageOperate,
    CodeOperate,
    EditorOperate
  },
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
/deep/.code {
  textarea {
    min-height: 50vh !important;
  }
}
</style>
