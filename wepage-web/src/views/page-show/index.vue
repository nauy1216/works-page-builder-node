<script lang="tsx">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      unit: "rem",
      fontSize: 100
    };
  },
  created() {
    if (this.isRem) {
      document.documentElement.style.fontSize = this.fontSize + "px";
    }
  },
  beforeDestroy() {
    if (this.isRem) {
      document.documentElement.style.fontSize = "14px";
    }
  },
  computed: {
    isRem(): boolean {
      return this.unit === "rem";
    }
  },
  render(h) {
    const pageConfig: any = JSON.parse(JSON.stringify({}));
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
