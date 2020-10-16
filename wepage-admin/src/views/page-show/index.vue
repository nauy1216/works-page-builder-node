<script lang="tsx">
import { PageConfig } from "@/types/page.ts";
import _compList from "@/lib/index";
import { mapState } from "vuex";
export default {
  created() {
    console.log("pageConfig", this.pageConfig);
  },
  computed: {
    ...mapState(["pageConfig"])
  },
  render(h) {
    const pageConfig: PageConfig = this.pageConfig;
    const compList = _compList;
    return (
      <div class="view-port">
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
                    height: comp.config.height + "px",
                    zIndex: comp.config.zIndex
                  }}
                >
                  {h(compList[comp.name], {
                    key: comp.name + index,
                    props: {
                      ...comp.data
                    }
                  })}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.view-port {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .page-content {
    position: relative;
    zoom: 1;
  }
}
</style>
