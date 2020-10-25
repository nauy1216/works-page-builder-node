<script lang="tsx">
import Vue from "vue";
import { mapStateTyped } from "@/types/store";
import { PageConfig } from "@/types/page";
export default Vue.extend({
  data() {
    return {
      top: 10,
      isFullScreen: false
    };
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig"]),
    ...mapStateTyped("editor", ["editorConfig"])
  },
  methods: {
    handleMouseMove(ev) {
      if (ev.clientY < 60) {
        this.top = 10;
      } else {
        this.top = -100;
      }
    },
    save() {
      console.log("pageConfig", JSON.parse(JSON.stringify(this.pageConfig)));
      const config: PageConfig = JSON.parse(JSON.stringify(this.pageConfig));
      config.children.forEach(child => {
        child.config.active = false;
      });
      this.$ajax("postJson", this.$api.pageEdit, {
        appId: this.$route.query.appId,
        pageId: this.$route.query.pageId,
        config
      }).then(res => {
        console.log(res);
        this.$message.success("操作成功");
      });
    },
    handleScale(num) {
      this.editorConfig.zoom += num;
      this.editorConfig.zoom = Math.max(0, this.editorConfig.zoom);
      this.editorConfig.zoom = Math.min(10, this.editorConfig.zoom);
    },
    requestFullScreen() {
      if (this.isFullScreen) {
        document.exitFullscreen();
        this.isFullScreen = false;
      } else {
        document.documentElement.requestFullscreen();
        this.isFullScreen = true;
      }
    },
    preview() {
      this.$router.push("/pageShow");
    },
    changeDragMode() {
      this.editorConfig.dragMode = !this.editorConfig.dragMode;
    }
  },
  render() {
    const { top, save, handleScale, requestFullScreen, preview, changeDragMode } = this;
    return (
      <div class="top-tool" style={{ top: top + "px" }}>
        <el-button-group>
          <el-button onClick={save}>保存</el-button>
          <el-button onClick={preview}>预览</el-button>
          <el-button onClick={requestFullScreen}>{this.isFullScreen ? "退出全屏" : "全屏"}</el-button>
          <el-button onClick={changeDragMode}>拖拽模式{this.editorConfig.dragMode ? <i class="el-icon-check"></i> : null}</el-button>
          <el-button onClick={() => handleScale(0.1)}>
            <i class="el-icon-zoom-in"></i>
          </el-button>
          <el-button onClick={() => handleScale(-0.1)}>
            <i class="el-icon-zoom-out"></i>
          </el-button>
          <el-button>
            <el-dropdown trigger="click">
              <span style="font-size:12px; line-height: 12px;">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  nativeOnClick={() => {
                    this.editorConfig.showLeftTool = !this.editorConfig.showLeftTool;
                  }}
                >
                  显示左侧工具栏
                  {this.editorConfig.showLeftTool && <i class="el-icon-check"></i>}
                </el-dropdown-item>
                <el-dropdown-item
                  nativeOnClick={() => {
                    this.editorConfig.showRightTool = !this.editorConfig.showRightTool;
                  }}
                >
                  显示右侧工具栏
                  {this.editorConfig.showRightTool && <i class="el-icon-check"></i>}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
        </el-button-group>
      </div>
    );
  }
});
</script>
<style scoped lang="scss">
.top-tool {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-radius: 2px;
  .el-dropdown {
    line-height: 12px !important;
  }
}
</style>
