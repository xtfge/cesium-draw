/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-10 09:54:10
 * @LastEditors  : zhangbo
 * @LastEditTime : 2020-01-02 17:53:26
 * @Desc: 
 */
const path = require('path');
const webpack =require('webpack')


function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {

    plugins: [

      new webpack.ProvidePlugin({

        $: "jquery",

        jQuery: "jquery",

        "windows.jQuery": "jquery"

      })

    ]

  },
  publicPath: process.env.NODE_ENV === 'development' ? './' : '../dist',
  assetsDir: 'static',
  lintOnSave: true,
  // 强制内联CSS
  productionSourceMap: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/global.scss";
        `
      }
    },
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: false,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false
    // css预设器配置项

  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 100
        options.name = 'static/fonts/[name].[ext]'
        return options
      })
    config.resolve.alias
      .set('@', resolve('src'))
  }
};