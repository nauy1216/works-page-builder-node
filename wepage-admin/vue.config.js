module.exports = {
  devServer: {
    port: "8001",
    proxy: {
      "/api": {
        target: "",
        ws: false,
        changeOrigin: true
      }
    }
  }
  // configureWebpack(config) {
  //     console.log("config", config)
  // }
};
