const { defineConfig } = require("@vue/cli-service");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const theme = "default";
module.exports = defineConfig({
  outputDir: "dist",
  transpileDependencies: true,
  lintOnSave: true,
  assetsDir: 'theme',
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: `theme/${theme}.css`,
        // chunkFilename: `css/[name].${conf.version}.css`
      })

    ]

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
    sourceMap: false,
    // css预设器配置项
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: {
    //   //一种方式，打包后的css 会带版本号，不改变文件名的。
    //   filename: 'theme/[name].css'
    // }
  },
});
