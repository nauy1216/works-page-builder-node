const apis = {
  appAdd: "/apis/app/add",
  appList: "/apis/app/list",
  pageAdd: "/apis/page/add",
  pageList: "/apis/page/list",
  pageEdit: "/apis/page/edit",
  getPageConfig: "/apis/page/getConfig"
};

declare module "vue/types/vue" {
  interface Vue {
    $api: typeof apis;
  }
}

export default apis;
