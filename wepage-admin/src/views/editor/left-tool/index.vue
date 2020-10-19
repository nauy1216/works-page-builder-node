<template>
  <div class="left-tool" :style="{width: width + 'px'}">
    <vue-draggable-resizable           
      :x="0"
      :y="0"
      :w="width"
      :maxWidth="500"
      :minWidth="250"
      :draggable="false"
      :handles="['mr']"
      :active="true"
      :prevent-deactivation="true"
      class="left-tool-vdr"
      @resizing="handleResize">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件列表" name="1">
        <div calss="left-tool-list">
          <div
            v-for="(comp, index) in $compList"
            :key="comp.name + index"
            class="left-tool-item"
            draggable="true"
            @dragstart.stop="handleDragStart($event, comp)"
            @dragend.stop="handleDragEnd($event, comp)"
          >
            <i :class="comp.extendOptions.config.icon" class="icon"></i>
            <span class="name">{{ comp.extendOptions.config.alias }}</span>
          </div>
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
    </vue-draggable-resizable>
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
      activeName: "1",
      width: 250,
      height: 400
    };
  },
  methods: {
    ...mapMutations(["addComponent", "setActiveComp", "setDragComp"]),
    handleDragStart(event, comp) {
      this.setDragComp(comp);
    },
    handleDragEnd() {
      this.setDragComp(null);
    },
    handleResize(left, top, width) {
      this.width = width
    }
  }
});
</script>
<style scoped lang="scss">
.left-tool-vdr {
  box-sizing: border-box;
  padding: 20px;
  height: 100% !important;
  &::before {
    display: none;
  }
}
/deep/.handle-mr {
  width: 4px !important;
  height: 40px !important;
  background: rgb(64, 158, 255) !important;
}
.left-tool-list {
  display: flex;
  flex-wrap:wrap;
}
.left-tool-item {
  width: 100px;
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
