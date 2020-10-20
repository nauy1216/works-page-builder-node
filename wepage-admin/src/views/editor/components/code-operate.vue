<template>
  <div class="code-operate">
    <el-button @click="handleCodeChange" style="margin-bottom: 10px;"
      >提交</el-button
    >
    <el-input type="textarea" v-model="code" class="code"></el-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { mapStateTyped } from "@/types/store";
export default Vue.extend({
  data() {
    return {
      code: ""
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
    pageConfig: {
      handler(this: any) {
        this.code = JSON.stringify(this.pageConfig, null, 2);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations(["addComponent", "setPageConfig", "setEditorConfig"]),
    handleCodeChange(this: any) {
      try {
        const config = JSON.parse(this.code);
        (this as any).setPageConfig(config);
      } catch {
        this.$message.error("json解析错误");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.code-operate {
  height: 100%;
}
/deep/.code {
  textarea {
    min-height: calc(60vh - 150px) !important;
  }
}
</style>
