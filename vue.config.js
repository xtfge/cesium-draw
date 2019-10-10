const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  // 强制内联CSS
  productionSourceMap: false,
  css: { extract: false },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
};