/*
 * @Author: zhangb
 * @Date: 2023-05-23 14:18:59
 * @E-mail: zhangb@geovis.com.cn
 * @LastModifiedBy: zhangb
 * @LastEditTime: 2023-05-23 15:56:34
 * @Desc: 
 */
const fs = require('fs')
const path = require('path')
const buildDir = path.join(__dirname, 'dist');
const assets = 'theme';
function remove(url) {
  // 读取原路径
  const STATUS = fs.statSync(url);
  // 如果原路径是文件
  if (STATUS.isFile()) {
    //删除原文件
    fs.unlinkSync(url);

    //如果原路径是目录
  } else if (STATUS.isDirectory()) {
    //如果原路径是非空目录,遍历原路径
    //空目录时无法使用forEach
    fs.readdirSync(url).forEach(item => {
      //递归调用函数，以子文件路径为新参数
      remove(`${url}/${item}`);
    });
    //删除空文件夹
    fs.rmdirSync(url);
  };
}

function release() {
  fs.stat(buildDir, function(err, stat) {
    if (!err) {
      remove(buildDir);
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(path.join(buildDir, assets));
    fs.mkdirSync(path.join(buildDir, assets, 'img'));
    //   copy(distDir, buildDir);
    //   walkFiles(cssDir);
  });
}
release()

