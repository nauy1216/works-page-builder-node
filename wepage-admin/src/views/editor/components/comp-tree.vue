<template>
  <el-tree :data="treeData" node-key="id">
    <div
      style="flex: 1 1 100%; display: flex; justify-content: space-between; align-items: center;"
      slot-scope="{ node, data }"
    >
      <span>{{ node.label }}</span>
      <span style="float: right;">
        <el-button v-if="!activeComp || data.id !== activeComp.id" type="text" size="mini" @click="() => active(data)">
          激活
        </el-button>
        <el-button v-else-if="activeComp && data.id == activeComp.id" type="text" size="mini" @click="() => deactive(data)">
          取消激活
        </el-button>
        <el-button type="text" size="mini" @click="() => remove(data)">
          删除
        </el-button>
      </span>
    </div>
  </el-tree>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutationsTyped, mapStateTyped } from "@/types/store";

type TreeNode = {
  id: string;
  label: string;
  children: TreeNode[];
}
export default Vue.extend({
  computed: {
    ...mapStateTyped(["pageConfig", "activeComp"]),
    treeData(): TreeNode[] {
      const treeData: TreeNode[] = [];
      for (const child of this.pageConfig.children) {
        treeData.push({
          id: child.id,
          label: child.alias,
          children: []
        });
      }
      return treeData;
    }
  },
  methods: {
    ...mapMutationsTyped(["removeComponent", "setActiveComp"]),
    remove(data: TreeNode) {
      this.removeComponent(data.id)
    },
    active(data: TreeNode) {
      this.setActiveComp(data.id)
    },
    deactive() {
      this.setActiveComp(null)
    }
  }
});
</script>

<style></style>
