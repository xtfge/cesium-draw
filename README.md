<!--
 * @Author: zhangbo
 * @E-mail: xtfge_0915@163.com
 * @Date: 2020-01-03 09:54:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-27 10:27:38
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
    <div>
     <div id='map'></div>
     <cesium-draw ref='drwaManager' :viewer="viewer"></cesium-draw>
    </div>
</template>
<script>
import cesiumDraw from 'cesium-draw'
import 'cesium-draw/dist/theme/default.css'
//import 'cesium-draw/dist/theme/dark.css'
export default{
    name:'your-component',
    data(){
        return {
            viewer:null
        }
    }
    components:{cesiumDraw},
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
  <div>
   <div id='map'></div>
   <cesium-draw ref='drwaManager' :extendMarkerImage="images" :extendMarkerModel='model' ></cesium-draw>
 </div>
</template>
<script>
import cesiumDraw from 'cesium-draw'
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
    components:{cesiumDraw},
    mounted(){
        const viewer=new Cesium.Viewer('map')
        this.$refs.drawManager.init(viewer)
    }
}
</script>
```
### Methods
- `getById(gvid)` 根据id返回图形要素
### Events
事件|说明|回调
---|---|---
deleteEvent|要素删除事件|参数为删除要素的id
locateEvent|要素定位事件|定位要素的id
editEvent|要素编辑事件|要素的id
renameEvent|要素重命名事件|两个参数,依次为要素id,要素更新前的名称
selectEvent|checkbox点击事件|两个参数,依次为要素id,checkbox状态
closeEvent|标绘面板关闭事件|无
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
![avatar](https://img-blog.csdnimg.cn/2020041719034414.gif)
