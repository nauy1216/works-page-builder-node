<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { mapMutationsTyped } from "@/types/store";
export default {
  created() {
    this.getAppConfig();
  },
  methods: {
    ...mapMutationsTyped(["setAppConfig"]),
    getAppId() {
      console.log("appId === ", location.pathname.slice(1));
      return location.pathname.slice(1);
    },
    getAppConfig() {
      this.getAppId();
      import("@/mock/appconfig").then(res => {
        const appConfig = res.default;
        this.setAppConfig(appConfig);

        if (appConfig.pages.length > 0) {
          this.$router.replace("/page/" + appConfig.pages[0].id);
        } else {
          this.$message.error("应用未配置页面");
        }
      });
    }
  }
};
</script>

<style lang="scss"></style>
