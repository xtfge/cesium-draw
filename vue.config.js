/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-10 09:54:10
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-03-02 15:04:13
 * @Desc: 
 */
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const theme='default'
module.exports = {
  configureWebpack: {

    plugins: [

      new webpack.ProvidePlugin({

        $: "jquery",

        jQuery: "jquery",

        "windows.jQuery": "jquery"

      }),
      new MiniCssExtractPlugin({
        filename: `theme/${theme}.css`,
        // chunkFilename: `css/[name].${conf.version}.css`
      })

    ]

  },
  publicPath: process.env.NODE_ENV === 'development' ? './' : './',
  assetsDir: 'theme',
  lintOnSave: true,
  // 强制内联CSS
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/theme/${theme}.scss";
        `
      }
    },
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: {
    //   //一种方式，打包后的css 会带版本号，不改变文件名的。
    //   filename: 'theme/[name].css'
    // }

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
        //小于60k的文件强制内联
        options.limit = 60000
        options.name = 'theme/fonts/[name].[ext]'
        return options
      })
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')      
      .tap(options => Object.assign(options, { limit: 10000 }))
    config.resolve.alias
      .set('@', resolve('src'))
  }
};