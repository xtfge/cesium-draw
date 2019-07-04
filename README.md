>这是一个Vue+Cesium的项目，主要功能包括点、线、面的标绘及编辑。

详情如下 ：
- 添加标记，提供多种图标选择、添加完成后右击可编辑,支持自定义图标
- 线、多边形绘制，可以编辑节点和属性信息
- 导入导出功能（json,Geojson,shp）

使用说明

依次输入以下命令运行该项目：

npm install

npm start

或着你也可以把它添加到自己的项目使用：

1.你可以把components和js文件夹中的文件全部拷贝到自己的项目，然后引入drawViewer组件
```js
import drawViewer from '@/components/drawViewer'
```
2.把drawViewer添加到conponents

3.在<template></template>标签中添加drawViewer
```js
<draw-viewer :polylineNode="false" :polygonNode="true"></draw-viewer>
```
此外，如果你没有使用Vue框架，并不影响核心功能drawHandler的使用,只需要在options中添加editPanel为false即可,当然你需要手动删除
drawHandler文件中关于editPanel文件的引用

```js
import {Polyline,Polygon} from "@/js/drawHandler";
const viewer=new Cesium.Viewer('container')
const options=Polyline.defaultStyle()
options.editPanel=false
const pl=new Polyline(viewer,options)
pl.initNodes()//如果要显示顶点
```
### 效果
![avatar](https://img-blog.csdnimg.cn/20190524155136375.gif)
![avatar](https://img-blog.csdnimg.cn/20190524155207442.gif)
