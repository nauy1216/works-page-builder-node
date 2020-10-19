module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: '',
                ws: false,
                changeOrigin: true
            }
        }
    },
    // configureWebpack(config) {
    //     console.log("config", config)
    // }
}