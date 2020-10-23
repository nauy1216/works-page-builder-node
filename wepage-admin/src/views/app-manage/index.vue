<template>
  <div class="app-manage">
    <div class="opera">
      <el-button @click="createApp">创建应用</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="appName" label="名称" width="180"> </el-table-column>
      <el-table-column prop="appType" label="类型" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="createPage(scope.row.id)">创建页面</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="tsx">
import { getDialog } from "@/components/Dialog";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      tableData: [
        {
          id: 0,
          appName: "测试",
          appType: "web",
          width: 1920,
          height: 1080
        }
      ],
      formData: {
        id: 0,
        appName: "",
        appType: "web"
      },
      rules: {}
    };
  },
  methods: {
    createApp() {
      getDialog()
        .show({
          title: "创建应用",
          renderContent: () => {
            return (
              <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
                <el-form-item label="应用名称" prop="name">
                  <el-input vModel={this.formData.appName}></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="name">
                  <el-input vModel={this.formData.appName}></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="name">
                  <el-input vModel={this.formData.appName}></el-input>
                </el-form-item>
              </el-form>
            );
          }
        })
        .then(() => {
          console.log("创建应用");
        });
    },
    createPage(appId) {
      this.$router.push("/editor?appId=" + appId);
    }
  }
});
</script>
<style scoped lang="scss">
.opera {
  margin: 20px;
}
</style>
