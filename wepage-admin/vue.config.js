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
  }
  // configureWebpack(config) {
  //     console.log("config", config)
  // }
};
