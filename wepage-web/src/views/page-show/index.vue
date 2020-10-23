<script lang="tsx">
import Vue from "vue";
import { mapStateTyped } from "@/types/store";
import { AppConfig } from "@/types/appConfig";
export default Vue.extend({
  data() {
    return {
      unit: "px",
      fontSize: 100,
      pageConfig: null
    };
  },
  created() {
    if (this.isRem) {
      document.documentElement.style.fontSize = this.fontSize + "px";
    }
    this.getPageConfig();
  },
  beforeDestroy() {
    if (this.isRem) {
      document.documentElement.style.fontSize = "14px";
    }
  },
  computed: {
    isRem(): boolean {
      return this.unit === "rem";
    },
    ...mapStateTyped(["appConfig"])
  },
  watch: {
    "$route.params.pageId"() {
      this.getPageConfig();
    }
  },
  methods: {
    getPageConfig(): any {
      if (this.$route.params.pageId == "1") {
        import("@/mock/page1").then(res => {
          console.log("res", res);
          this.pageConfig = res.default as any;
          (this.pageConfig as any).children = (this.pageConfig as any).children.concat(JSON.parse(JSON.stringify(this.appConfig.appComponents)));
        });
      } else if (this.$route.params.pageId == "2") {
        import("@/mock/page2").then(res => {
          console.log("res", res);
          this.pageConfig = res.default as any;
          (this.pageConfig as any).children = (this.pageConfig as any).children.concat(JSON.parse(JSON.stringify(this.appConfig.appComponents)));
        });
      }
    }
  },
  render(h) {
    if (this.pageConfig === null) return <div></div>;
    const pageConfig = this.pageConfig as any;
    const { unit, isRem } = this;
    const px2rem = px => px / this.fontSize;

    if (isRem) {
      pageConfig.width = px2rem(pageConfig.width);
      pageConfig.height = px2rem(pageConfig.height);
      pageConfig.children.forEach(comp => {
        comp.config.x = px2rem(comp.config.x);
        comp.config.y = px2rem(comp.config.y);
        comp.config.width = px2rem(comp.config.width);
        comp.config.height = px2rem(comp.config.height);
      });
    }

    const compList = this.$compList;
    // TODO: 这里采用的是定位， 后期可考虑改成transform，或做成可配置的
    return (
      <div class="view-port" key={this.$route.params.pageId}>
        <div
          class="page-content"
          style={{
            width: pageConfig.width + unit,
            height: pageConfig.height + unit
          }}
        >
          {pageConfig.children &&
            pageConfig.children.map((comp, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: comp.config.x + unit,
                    top: comp.config.y + unit,
                    width: comp.config.width + unit,
                    height: comp.config.height + unit,
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
});
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
