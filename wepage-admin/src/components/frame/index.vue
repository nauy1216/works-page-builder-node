<template>
  <div class="app-frame">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default Vue.extend({
  components: {
    vHead,
    vSidebar
  },
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  created() {
    this.$eventBus.$on("collapse-content", msg => {
      this.collapse = msg;
    });
  }
});
</script>
<style scoped lang="scss">
.app-frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding: 20px;
    box-sizing: border-box;
    transition: left 0.3s ease-in-out;
    background: #f0f0f0;
    .content {
      width: auto;
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;
      background: #ffffff;
    }
  }
  .content-collapse {
    left: 65px;
  }
}
</style>
