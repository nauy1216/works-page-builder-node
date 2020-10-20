<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-button @click="showAddDialog">新增图层</el-button>
    </div>
    <el-tree :data="treeData" node-key="id" :expand-on-click-node="false">
      <div
        style="flex: 1 1 100%; display: flex; justify-content: space-between; align-items: center;"
        slot-scope="{ node, data }"
      >
        <span>{{ node.label }}</span>
        <span style="float: right;">
          <el-button
            v-if="isDeactive(node, data)"
            type="text"
            size="mini"
            @click="() => active(data, node)"
          >
            激活
          </el-button>
          <el-button
            v-else-if="isActive(node, data)"
            type="text"
            size="mini"
            @click="() => deactive(node)"
          >
            取消激活
          </el-button>
          <el-button
            v-if="node.level === 1"
            type="text"
            size="mini"
            @click="() => (data.data.show = !data.data.show)"
          >
            {{ data.data.show ? "隐藏" : "显示" }}
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(data, node)">
            删除
          </el-button>
        </span>
      </div>
    </el-tree>
    <Dialog ref="dialog"></Dialog>
  </div>
</template>

<script lang="tsx">
import Vue from "vue";
import { mapMutationsTyped, mapStateTyped } from "@/types/store";
import { PageLyout, PageComponentOptions } from "@/types/page";
import Dialog, { DialogType } from "@/components/Dialog.vue";
import { uuid } from "@/utils";
type TreeNode = {
  id: string;
  label: string;
  data: PageLyout | PageComponentOptions;
  children: TreeNode[];
};
export default Vue.extend({
  components: {
    Dialog
  },
  data() {
    return {
      formData: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入图层名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapStateTyped(["pageConfig", "activeComp", "activeLayout"]),
    treeData(): TreeNode[] {
      const treeData: TreeNode[] = [];

      const LayoutMap = {};
      let temp;
      for (const layout of this.pageConfig.layouts) {
        temp = {
          id: layout.id,
          label: layout.name,
          data: layout,
          children: []
        };
        treeData.push(temp);
        LayoutMap[layout.id] = temp;
      }

      for (const child of this.pageConfig.children) {
        LayoutMap[child.layoutId].children.push({
          id: child.id,
          label: child.alias,
          data: child,
          children: []
        });
      }
      return treeData;
    }
  },
  methods: {
    ...mapMutationsTyped([
      "removeComponent",
      "setActiveComp",
      "addLayout",
      "removeLayout",
      "setActiveLayout"
    ]),
    isActive(node, data) {
      if (node.level === 1) {
        return this.activeLayout && data.id == this.activeLayout.id;
      } else {
        return this.activeComp && data.id == this.activeComp.id;
      }
    },
    isDeactive(node, data) {
      if (node.level === 1) {
        return !this.activeLayout || data.id !== this.activeLayout.id;
      } else {
        return !this.activeComp || data.id !== this.activeComp.id;
      }
    },
    remove(data: TreeNode, node) {
      if (node.level === 1) {
        this.removeLayout(data.id);
      } else {
        this.removeComponent(data.id);
      }
    },
    active(data: TreeNode, node) {
      if (node.level === 1) {
        this.setActiveLayout(data.id);
      } else {
        this.setActiveComp(data.id);
      }
    },
    deactive(node) {
      if (node.level === 1) {
        this.setActiveLayout(null);
      } else {
        this.setActiveComp(null);
      }
    },
    showAddDialog() {
      ((this.$refs.dialog as any) as DialogType).show({
        title: "新增图层",
        renderContent: () => (
          <div>
            <el-form
              ref="form"
              {...{ props: { model: this.formData } }}
              rules={this.rules}
              label-width="80px"
            >
              <el-form-item label="名称" prop="name">
                <el-input vModel={this.formData.name}></el-input>
              </el-form-item>
            </el-form>
          </div>
        ),
        confirm: close => {
          (this.$refs.form as any).validate(valid => {
            if (valid) {
              this.addLayout({
                id: uuid(),
                name: this.formData.name,
                zIndex: 0,
                show: true,
                mode: "position"
              });
              close();
            }
          });
        }
      });
    }
  }
});
</script>

<style></style>
