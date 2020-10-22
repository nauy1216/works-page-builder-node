<template>
  <el-form label-position="right" label-width="100px">
    <el-form-item v-for="(prop, key) in activeCompProps" :key="key" :label="prop.label">
      <component :is="prop.inputComponent" v-model="activeComp.data[key]"></component>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapStateTyped } from "@/types/store";
export default Vue.extend({
  computed: {
    ...mapStateTyped("page", ["pageConfig", "activeComp"]),
    ...mapStateTyped("editor", ["editorConfig"]),
    // 当前活动组件的属性
    activeCompProps() {
      return this.activeComp && this.$compList[this.activeComp.name].extendOptions.props;
    }
  }
});
</script>

<style></style>
