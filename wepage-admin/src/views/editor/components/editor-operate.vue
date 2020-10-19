<template>
  <div>
    <el-button @click="handleEditorCodeChange" style="margin-bottom: 10px;"
      >提交</el-button
    >
    <el-input type="textarea" v-model="editorCode" class="code"></el-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { mapStateTyped } from "@/types/store";
export default Vue.extend({
  data() {
    return {
      editorCode: ""
    };
  },
  computed: {
    ...mapStateTyped(["pageConfig", "editorConfig", "activeComp"]),
    // 当前活动组件的属性
    activeCompProps() {
      return this.activeComp && this.$compList[this.activeComp.name];
    }
  },
  watch: {
    editorConfig: {
      handler(this: any) {
        this.editorCode = JSON.stringify(this.editorConfig, null, 2);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations(["addComponent", "setPageConfig", "setEditorConfig"]),

    handleEditorCodeChange(this: any) {
      try {
        const config = JSON.parse(this.editorCode);
        this.setEditorConfig(config);
      } catch {
        this.$message.error("json解析错误");
      }
    }
  }
});
</script>

<style></style>
