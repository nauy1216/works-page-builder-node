<script lang="tsx">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  render() {
    return <router-view />;
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
