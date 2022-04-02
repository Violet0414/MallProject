const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//配置参数
/**
 * devServer.proxy 
 * 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请 求代理到 API 服务器
 */
 module.exports = {
  assetsDir: 'assets',
   //修改打包路径
  publicPath: process.env.NODE_ENV === 'production'? './': '/',
  //反向代理
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:8888/api',//
              // target:process.env.VUE_APP_BASE_URL,//
              ws: true,
              changeOrigin: true,
              pathRewrite:{           //重写路径
                  '^/api':''
              }
          },
      },
  }
 
}

