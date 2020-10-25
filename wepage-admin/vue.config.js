/* eslint-disable */
const path = require("path");
module.exports = {
  devServer: {
    port: "8001",
    proxy: {
      "/apis": {
        target: "http://localhost:3000",
        ws: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack(config) {
    config.resolve.alias["wepage-components"] = path.resolve(process.cwd(), "../wepage-components");
  }
};
