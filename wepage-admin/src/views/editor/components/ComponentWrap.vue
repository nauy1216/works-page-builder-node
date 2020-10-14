<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    const { config } = this;
    // todo
    // active.sync
    return (
      <vue-draggable-resizable
        w={config.width}
        h={config.height}
        parent={true}
        debug={false}
        min-width={config.width}
        min-height={config.height}
        prevent-deactivation={true} // 组件激活时点击外部将不会变成未激活状态
        draggable={false} // 组件不可拖动
        resizable={true} // 是否可缩放
      >
        {this.$slots.default}
      </vue-draggable-resizable>
    );
  }
});
</script>

<style lang="scss" scoped></style>
