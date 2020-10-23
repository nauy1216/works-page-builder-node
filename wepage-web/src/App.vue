<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { mapMutationsTyped, mapStateTyped } from "@/types/store";
export default {
  created() {
    this.getAppConfig();
    this.addEvent();
  },
  computed: {
    ...mapStateTyped(["isFrame"])
  },
  methods: {
    ...mapMutationsTyped(["setAppConfig"]),
    addEvent() {
      if (this.isFrame) {
        window.top.postMessage(
          {
            from: "wepage-web",
            type: "wepage",
            data: "我是 wepage-web"
          },
          "*"
        );

        window.addEventListener("message", e => {
          if (e.data.from === "wepage-admin") {
            console.log("接受iframe的消息", e.data);
          }
        });
      }
    },
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
