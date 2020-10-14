<template>
  <div class="right-tool">
    <el-tabs v-model="activeName">
      <el-tab-pane label="布局" name="1">
        <el-form :model="test">
          <el-form-item label="x">
            <el-input v-model="activeComp.config.x"></el-input>
          </el-form-item>
          <el-form-item label="y">
            <el-input v-model="activeComp.config.y"></el-input>
          </el-form-item>
          <el-form-item label="width">
            <el-input v-model="activeComp.config.width"></el-input>
          </el-form-item>
          <el-form-item label="height">
            <el-input v-model="activeComp.config.height"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="属性" name="2">
        属性
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState,  mapMutations} from "vuex";

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
