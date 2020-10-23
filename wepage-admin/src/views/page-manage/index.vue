<template>
  <div class="app-manage">
    <div class="opera">
      <el-button @click="createApp">创建页面</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="pageName" label="名称" width="180"> </el-table-column>
      <el-table-column prop="pageType" label="类型" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editPage(scope.row.id)">编辑页面</el-button>
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
      tableData: [],
      formData: {
        appId: "",
        pageName: "",
        pageType: "web"
      },
      rules: {}
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    getPageList() {
      this.$ajax("get", this.$api.pageList, {
        appId: this.$route.query.appId
      }).then(res => {
        this.tableData = res.data;
      });
    },
    createApp() {
      getDialog()
        .show({
          title: "创建页面",
          renderContent: () => {
            return (
              <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
                <el-form-item label="页面名称" prop="pageName">
                  <el-input vModel={this.formData.pageName}></el-input>
                </el-form-item>
                <el-form-item label="页面类型" prop="pageType">
                  <el-input vModel={this.formData.pageType}></el-input>
                </el-form-item>
              </el-form>
            );
          }
        })
        .then(() => {
          this.formData.appId = this.$route.query.appId as any;
          this.$ajax("postJson", this.$api.pageAdd, this.formData).then(() => {
            this.$message.success("操作成功");
            this.getPageList();
          });
        });
    },
    editPage(pageId) {
      this.$router.push(`/editor?appId=${this.$route.query.appId}&pageId=` + pageId);
    }
  }
});
</script>
<style scoped lang="scss">
.opera {
  margin: 20px;
}
</style>
