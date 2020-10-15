<template>
  <div class="right-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="布局" name="1">
        <el-form
          :model="test"
          v-if="activeComp"
          label-position="right"
          label-width="100px"
        >
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
      </el-tab-pane>
      <el-tab-pane label="属性" name="2">
        <div v-if="activeCompProps">
          <el-form :model="test" label-position="right" label-width="100px">
            <el-form-item
              v-for="(prop, key) in activeCompProps"
              :key="key"
              :label="prop.label"
            >
              <!-- <el-input v-model.number="activeComp.data[key]"></el-input> -->
              <component
                :is="prop.inputComponent"
                v-model="activeComp.data[key]"
              ></component>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="页面" name="3">
        <el-form :model="test" label-position="right" label-width="100px">
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
      </el-tab-pane>
      <el-tab-pane label="代码" name="4">
        <el-button @click="handleCodeChange" style="margin-bottom: 10px;"
          >提交</el-button
        >
        <el-input type="textarea" v-model="code" class="code"></el-input>
      </el-tab-pane>
      <el-tab-pane label="编辑器" name="5">
        <el-button @click="handleEditorCodeChange" style="margin-bottom: 10px;"
          >提交</el-button
        >
        <el-input type="textarea" v-model="editorCode" class="code"></el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
  data(): any {
    return {
      activeName: "1",
      test: {},
      code: "",
      editorCode: ""
    };
  },
  computed: {
    ...mapState(["pageConfig", "editorConfig", "activeComp"]),
    // 当前活动组件的属性
    activeCompProps() {
      return this.activeComp && this.activeComp.component.extendOptions.props;
    }
    // pageConfigCode: {
    //   get() {
    //     return JSON.stringify(this.pageConfig, null, 2);
    //   },
    //   set(val: string) {
    //     this.code = val;
    //   }
    // }
  },
  watch: {
    pageConfig: {
      handler(this: any) {
        this.code = JSON.stringify(this.pageConfig, null, 2);
      },
      deep: true,
      immediate: true
    },
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
    handleCodeChange(this: any) {
      try {
        const config = JSON.parse(this.code);
        (this as any).setPageConfig(config);
      } catch {
        this.$message.error("json解析错误");
      }
    },
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
<style scoped lang="scss">
.right-tool {
  padding: 20px;
}
/deep/.code {
  textarea {
    min-height: 50vh !important;
  }
}
</style>
