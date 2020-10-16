<template>
  <el-form label-position="right" label-width="100px">
    <el-form-item
      v-for="(prop, key) in activeCompProps"
      :key="key"
      :label="prop.label"
    >
      <component
        :is="prop.inputComponent"
        v-model="activeComp.data[key]"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapState(["pageConfig", "editorConfig", "activeComp"]),
    // 当前活动组件的属性
    activeCompProps() {
      return this.activeComp && this.activeComp.component.extendOptions.props;
    }
  }
});
</script>

<style></style>
