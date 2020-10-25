const apis = {
  getAppConfig: "/apis/app/getAppConfig",
  getPageConfig: "/apis/page/getConfig"
};

declare module "vue/types/vue" {
  interface Vue {
    $api: typeof apis;
  }
}

export default apis;
