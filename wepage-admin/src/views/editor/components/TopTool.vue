<script lang="tsx">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      top: 10
    };
  },
  computed: {
    ...mapState(["pageConfig"])
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
    handleScale() {
      console.log("pageConfig", JSON.parse(JSON.stringify(this.pageConfig)));
    }
  },
  render() {
    const { top, save, handleScale } = this;
    return (
      <div class="top-tool" style={{ top: top + "px" }}>
        <el-button-group>
          <el-button onClick={save}>保存</el-button>
          <el-button>预览</el-button>
          <el-button onClick={handleScale}>
            <i class="el-icon-zoom-in"></i>
          </el-button>
          <el-button>
            <i class="el-icon-zoom-out"></i>
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
}
</style>
