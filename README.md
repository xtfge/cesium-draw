<!--
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2020-01-03 09:54:57
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-03-02 09:42:47
 * @Desc: Cesium基础标绘组件说明文档
 -->

## Cesium-Draw

基于Vue开发的Cesium基础标绘插件，支持交互式添加BillBoard、Polyline、Polygon、Label和Model

核心功能:
- 鼠标交互绘图
- 对于Billboard、Label、Model支持图标，名称的编辑，图标可以任意扩展.
- 对于Polyline和Polygon支持顶点、颜色等常见图形属性的编辑.
- 支持导入、导出功能
- 可以通过图层管理器管理通过该插件添加的所有图形.
### 安装

```sh
npm i cesium-draw
```
### 使用
```HTML
<template>
    <div id='map'></div>
    <cesium-draw ref='drwaManager' :viewer="viewer"></cesium-draw>
</template>
<script>
import {cesiumDrawViewer} from 'cesium-draw'
import 'cesium-draw/dist/theme/default.css'
//import 'cesium-draw/dist/theme/dark.css'
export default{
    name:'your-component',
    data(){
        return {
            viewer:null
        }
    }
    components:{cesium-draw},
    mounted(){
        this.viewer=new Cesium.Viewer('map')
    }
}
</script>
```
如果你没有将Cesium Viewer对象保存到Vue data中，你必须显式调用init函数初始化组件。
```js
const viewer=new Cesium.Viewer('map')
this.$refs.drawManager.init(viewer)
```

#### 怎么扩展标记图标
```html
<cesium-draw ref='drwaManager' :extendMarkerImage="images"></cesium-draw>
```
```js
data(){
    return{
        images:["./static/images/markers/1.png",
                "./static/images/markers/2.png",
                "./static/images/markers/3.png",
                "./static/images/markers/4.png",
                "./static/images/markers/5.png"
      ]
    }
}
```
#### 怎么使用模型标记
你必须通过`extendMarkerModel`属性定义用于标记的模型，才可以使用模型标记。

比如：
```html
<cesium-draw ref='drwaManager' :extendMarkerModel="model"></cesium-draw>
```
```js
data(){
    return{
        model:[
            { id: "model0", 
            name: "tower", 
            thumb:'thumb.png',
            url: "static/model/Wood_Tower.gltf" },
          { 
              id: "model1", 
              name: "people", 
              url: "static/model/Cesium_Man.gltf" }]
    }
}
```
#### 如何使用喜欢的主题
```js
import 'cesium-draw/dist/theme/default.css' 
```
或
```js
import 'cesium-draw/dist/theme/dark.css'
```
>更多主题敬请期待。
#### 示例
```HTML
<template>
    <div id='map'></div>
    <cesium-draw ref='drwaManager' :extendMarkerImage="images" :extendMarkerModel='model' ></cesium-draw>
</template>
<script>
import cesium-draw from 'cesium-draw'
//You can use theme
import 'cesium-draw/dist/theme/dark.css'
//import 'cesium-draw/dist/theme/default.css'
export default{
    name:'your-component',
    data(){
        return {
            images:["./static/images/markers/1.png",
                "./static/images/markers/2.png",
                "./static/images/markers/3.png",
                "./static/images/markers/4.png",
                "./static/images/markers/5.png"
                ],
            model:[
                { id: "model0", 
                name: "tower", 
                url: "static/model/Wood_Tower.gltf" },
                { 
                id: "model1", 
                name: "people", 
                url: "static/model/Cesium_Man.gltf"
                }]
        }
    }
    components:{cesium-draw},
    mounted(){
        const viewer=new Cesium.Viewer('map')
        this.$refs.drawManager.init(viewer)
    }
}
</script>
```
### 开发&打包
```sh
npm install
npm run build
```
### 打包成组件
```sh
npm run lib
```
### 效果
![avatar](https://img-blog.csdnimg.cn/20200102184048249.gif)