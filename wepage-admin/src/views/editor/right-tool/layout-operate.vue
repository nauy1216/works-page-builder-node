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
import { mapMutationsTyped, mapStateTyped } from "@/types/store";
export default Vue.extend({
  data() {
    return {
      preActiveComp: null
    }
  },
  computed: {
    ...mapStateTyped(["pageConfig", "editorConfig", "activeComp"])
  },
  watch: {
    activeComp: {
      handler(newVal, oldVal) {
        this.preActiveComp = oldVal
      }
    }
  },
  created() {
    // TODO： 刷新两次的问题
    this.$watch(() => {
      if (this.activeComp) {
        return this.activeComp.config.width + " " + this.activeComp.config.height
      }
      return null
    }, (newVal, oldVal) => {
      if (this.activeComp && oldVal && this.activeComp ) {
        this.refreshComponent(this.activeComp)
      }
    })
  },
  methods: {
    ...mapMutationsTyped(["refreshComponent"])
  }
});
</script>

<style></style>
