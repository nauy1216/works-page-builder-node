<script lang="tsx">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      top: 10,
      isFullScreen: false
    };
  },
  computed: {
    ...mapState(["pageConfig", "editorConfig"])
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
    }
  },
  render() {
    const { top, save, handleScale, requestFullScreen, preview } = this;
    return (
      <div class="top-tool" style={{ top: top + "px" }}>
        <el-button-group>
          <el-button onClick={save}>保存</el-button>
          <el-button onClick={preview}>预览</el-button>
          <el-button onClick={requestFullScreen}>
            {this.isFullScreen ? "退出全屏" : "全屏"}
          </el-button>
          <el-button onClick={() => handleScale(1)}>
            <i class="el-icon-zoom-in"></i>
          </el-button>
          <el-button onClick={() => handleScale(-1)}>
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
                    this.editorConfig.showLeftTool = !this.editorConfig
                      .showLeftTool;
                  }}
                >
                  显示左侧工具栏
                  {this.editorConfig.showLeftTool && (
                    <i class="el-icon-check"></i>
                  )}
                </el-dropdown-item>
                <el-dropdown-item
                  nativeOnClick={() => {
                    this.editorConfig.showRightTool = !this.editorConfig
                      .showRightTool;
                  }}
                >
                  显示右侧工具栏
                  {this.editorConfig.showRightTool && (
                    <i class="el-icon-check"></i>
                  )}
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
