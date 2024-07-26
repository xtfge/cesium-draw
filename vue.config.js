const { defineConfig } = require("@vue/cli-service");
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const theme = "dark";
const plugins = [
  // new DefinePlugin({
  //   'window.Cesium': 'Cesium'
  // }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
      { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
      { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
      { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
    ]
  }),
  new DefinePlugin({
    CESIUM_BASE_URL: JSON.stringify('')
  })
]
const externals = {
}
if (process.env.NODE_ENV === 'production') {
  plugins.push(new MiniCssExtractPlugin({
    filename: `theme/${theme}.css`,
    // chunkFilename: `css/[name].${conf.version}.css`
  }))
  externals.cesium = 'Cesium';
}

module.exports = defineConfig({
  outputDir: "dist",
  transpileDependencies: true,
  lintOnSave: true,
  assetsDir: 'theme',
  configureWebpack: {
    plugins,
    externals

  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/css/theme/${theme}.scss";
      `,
      },
    },
    // 启用 CSS modules
    // modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false
    // css预设器配置项
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: {
    //   //一种方式，打包后的css 会带版本号，不改变文件名的。
    //   filename: 'theme/[name].css'
    // }
  }
});