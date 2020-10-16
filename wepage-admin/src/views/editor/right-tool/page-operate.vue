<template>
  <el-form label-position="right" label-width="100px">
    <el-form-item label="页面名称">
      <el-input v-model.number="pageConfig.alias"></el-input>
    </el-form-item>
    <el-form-item label="页面宽度(px)">
      <el-input-number
        v-model.number="pageConfig.width"
        :precision="2"
        :step="1"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="页面高度(px)">
      <el-input-number
        v-model.number="pageConfig.height"
        :precision="2"
        :step="1"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="网格宽度(px)">
      <el-input-number
        v-model.number="editorConfig.gridX"
        :precision="0"
        :step="1"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="网格高度(px)">
      <el-input-number
        v-model.number="editorConfig.gridY"
        :precision="0"
        :step="1"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="缩放">
      <el-input-number
        v-model.number="editorConfig.zoom"
        :min="1"
        :max="10"
        :precision="0"
        :step="1"
      ></el-input-number>
    </el-form-item>
    <!-- <el-form-item label="显示滚动条">
            <el-switch v-model="editorConfig.showScrollbar"> </el-switch>
          </el-form-item> -->
    <el-form-item label="不超出画布">
      <el-switch v-model="editorConfig.parent"> </el-switch>
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
