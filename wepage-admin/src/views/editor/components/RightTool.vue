<template>
  <div class="right-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="布局" name="1">
        <el-form :model="test" v-if="activeComp">
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
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="属性" name="2">
        属性
      </el-tab-pane>
      <el-tab-pane label="页面" name="3">
        <el-form :model="test">
          <el-form-item label="页面名称">
            <el-input v-model.number="pageConfig.alias"></el-input>
          </el-form-item>
          <el-form-item label="页面宽度(px)">
            <el-input v-model.number="pageConfig.width"></el-input>
          </el-form-item>
          <el-form-item label="页面高度(px)">
            <el-input v-model.number="pageConfig.height"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="代码" name="4">
        代码
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
  data() {
    return {
      activeName: "1",
      test: {}
    };
  },
  computed: {
    ...mapState(["pageConfig", "activeComp"])
  },
  methods: {
    ...mapMutations(["addComponent"])
  }
});
</script>
<style scoped lang="scss">
.right-tool {
  padding: 20px;
}
</style>
