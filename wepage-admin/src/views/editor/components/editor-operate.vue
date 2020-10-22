<template>
  <div>
    <el-button @click="handleEditorCodeChange" style="margin-bottom: 10px;">提交</el-button>
    <el-input type="textarea" v-model="editorCode" class="code"></el-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapStateTyped, mapMutationsTyped } from "@/types/store";
export default Vue.extend({
  data() {
    return {
      editorCode: ""
    };
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig", "activeComp"]),
    ...mapStateTyped("editor", ["editorConfig"])
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
    ...mapMutationsTyped("page", ["addComponent", "setPageConfig"]),
    ...mapMutationsTyped("editor", ["setEditorConfig"]),

    handleEditorCodeChange() {
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

<style lang="scss" scoped>
/deep/.code {
  textarea {
    min-height: calc(60vh - 150px) !important;
  }
}
</style>
