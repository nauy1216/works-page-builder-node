<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapMutationsTyped, mapStateTyped } from "@/types/store";
import { getAppId, getPageId } from "@/utils/app";
export default Vue.extend({
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

    getAppConfig() {
      const appId = getAppId();
      const pageId = getPageId();
      this.$ajax("get", this.$api.getAppConfig, {
        appId
      }).then(res => {
        debugger;
        console.log("res", res);
        const appConfig = res.data;
        this.setAppConfig(appConfig);
        if (appConfig.pages.length > 0 && !pageId) {
          this.$router.replace("/page/" + appConfig.pages[0].id);
        }
      });
    }
  }
});
</script>

<style lang="scss"></style>
