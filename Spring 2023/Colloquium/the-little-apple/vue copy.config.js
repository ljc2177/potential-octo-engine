const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === "production" ? "/the-little-apple/" : "/",
  devServer: {
    allowedHosts: 'all',
    // overlay: {
    //   warnings: false,
    //   errors: true
    // }
    client: {
      webSocketURL: 'wss://localhost:8080/'
    },
  },
  transpileDependencies: true
})