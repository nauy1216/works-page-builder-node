<template>
  <el-form v-if="activeComp" label-position="right" label-width="100px">
    <el-form-item label="x(px)">
      <el-input-number
        :precision="2"
        :step="1"
        v-model.number="activeComp.config.x"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="y(px)">
      <el-input-number
        :precision="2"
        :step="1"
        v-model.number="activeComp.config.y"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="width(px)">
      <el-input-number
        :precision="2"
        :step="1"
        v-model.number="activeComp.config.width"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="height(px)">
      <el-input-number
        :precision="2"
        :step="1"
        v-model.number="activeComp.config.height"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="z-index(px)">
      <el-input-number
        :precision="0"
        :step="1"
        v-model.number="activeComp.config.zIndex"
      ></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapState(["pageConfig", "editorConfig", "activeComp"])
  }
});
</script>

<style></style>
