<template>
  <el-tree :data="treeData" @node-click="handleNodeClick">
    <div style="flex: 1 1 100%; display: flex; justify-content: space-between; align-items: center;" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span style="float: right;">
        <el-button type="text" size="mini" @click="() => active(data)">
          选中
        </el-button>
        <el-button type="text" size="mini" @click="() => remove(node, data)">
          删除
        </el-button>
      </span>
    </div>
  </el-tree>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    ...mapState(["pageConfig"]),
    treeData() {
      console.log("===========", this.pageConfig.children);
      const treeData = [];
      for (const child of this.pageConfig.children) {
        treeData.push({
          label: child.alias,
          children: []
        });
      }
      return treeData;
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log("handleNodeClick", data);
    },
    remove() {
      console.log("remove");
    },
    active() {
      console.log("active");
    }
  }
});
</script>

<style></style>
