<script lang="tsx">
import Vue from "vue";
import { PageConfig } from "@/types/page.ts";
import { mapStateTyped } from "@/types/store";

export default Vue.extend({
  data() {
    return {
      unit: "rem"
    };
  },
  created() {
    if (this.isRem) {
      document.documentElement.style.fontSize = "100px";
    }
  },
  beforeDestroy() {
    if (this.isRem) {
      document.documentElement.style.fontSize = "14px";
    }
  },
  computed: {
    ...mapStateTyped(["pageConfig"]),
    isRem(): boolean {
      return this.unit === "rem";
    }
  },
  render(h) {
    const pageConfig: PageConfig = JSON.parse(JSON.stringify(this.pageConfig));
    const { unit, isRem } = this;
    const px2rem = px => px / 100;

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
    return (
      <div class="view-port">
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
