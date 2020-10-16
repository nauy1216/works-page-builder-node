<script lang="tsx">
import { PageConfig } from "@/types/page.ts";
import _compList from "@/lib/index";
import { mapState } from "vuex";
export default {
//   created() {},
  computed: {
    ...mapState(["pageConfig"])
  },
  render(h) {
    const pageConfig: PageConfig = this.pageConfig;
    const compList = _compList;
    return (
      <div
        class="page-content"
        style={{
          width: pageConfig.width + "px",
          height: pageConfig.height + "px"
        }}
      >
        {pageConfig.children &&
          pageConfig.children.map((comp, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: comp.config.x + "px",
                  top: comp.config.y + "px",
                  width: comp.config.width + "px",
                  height: comp.config.width + "px",
                  zIndex: comp.config.zIndex
                }}
              >
                {h(compList[comp.name], {
                  props: {
                    ...comp.data
                  }
                })}
              </div>
            );
          })}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.view-port {
  .page-content {
    border: 1px solid rgb(64, 158, 255);
    position: relative;
    zoom: 1;
  }
}
</style>
