const path = require("path");
module.exports = {
  devServer: {
    port: "8002",
    proxy: {
      "/api": {
        target: "",
        ws: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack(config) {
    config.resolve.alias["wepage-components"] = path.resolve(process.cwd(), "../wepage-components");
  }
};