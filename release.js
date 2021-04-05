const fs = require('fs')
const path = require('path')
const config = require('./vue.config.js')
const distDir = path.join(__dirname, config.outputDir);
const buildDir = path.join(__dirname, 'build');
const assets = config.assetsDir;
const cssDir = path.join(__dirname, 'build', assets);

function walkFiles(filePath) {
  let state = fs.statSync(filePath);
  if (state.isFile()) {
    //是文件
    if (/.*css$/.test(filePath)) {
      const css = readFile(filePath);
      writeFile(filePath, css);
    }
  } else if (state.isDirectory()) {
    //是文件夹
    //先读取
    let files = fs.readdirSync(filePath);
    files.forEach(file => {
      walkFiles(path.join(filePath, file));
    });
  }
}

function readFile(filename) {
  const data = fs.readFileSync(filename)
  const css = data.toString();
  const formatCss = css.replace(/theme/g, '/' + assets);
  return formatCss
}

function writeFile(filename, context) {
  fs.writeFileSync(filename, context);
}


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

function copy(originalUrl, targetUrl) {
  try {
    // 读取原路径
    const STATUS = fs.statSync(originalUrl);
    // 获得原路径的末尾部分
    // 此部分亦可通过path模块中的basename()方法提取
    const fileName = originalUrl.split("/")[originalUrl.split("/").length - 1];
    // 如果原路径是文件
    if (STATUS.isFile()) {
      // 在新目录中创建同名文件，并将原文件内容追加到新文件中
      fs.writeFileSync(`${targetUrl}/${fileName}`, fs.readFileSync(originalUrl));

      //如果原路径是目录
    } else if (STATUS.isDirectory()) {
      //在新路径中创建新文件夹
      // fs.mkdirSync(`${targetUrl}/${fileName}`);
      //如果原路径是非空目录,遍历原路径
      //空目录时无法使用forEach
      fs.readdirSync(originalUrl).forEach(item => {
        //更新参数，递归调用
        move(`${originalUrl}/${item}`, `${targetUrl}/${fileName}`);
      });
    }
  } catch (error) {
    console.log("路径" + "有误");
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
  // STATUS && remove(buildDir);
  // fs.mkdirSync(buildDir);
  // copy(distDir, buildDir)
  // walkFiles(cssDir);
}
release()
// fs.readFile('hello.txt', function(error, data) {
//   if (error) {
//     // 在这里就可以通过判断 error 来确认是否有错误发生
//     console.log('读取文件失败了')
//   } else {
//     // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
//     // 文件中存储的其实都是二进制数据 0 1
//     // 这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
//     // 但是无论是二进制01还是16进制，人类都不认识
//     // 所以我们可以通过 toString 方法把其转为我们能认识的字符
//     console.log(data.toString())
//   }
// })
