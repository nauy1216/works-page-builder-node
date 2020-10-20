const apis = {
    testApi:  "testApi",
    testApi1:  "testApi"
}

declare module "vue/types/vue" {
    interface Vue {
      $api: typeof apis;
    }
}

export default apis

