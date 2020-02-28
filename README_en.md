<!--
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2020-01-03 09:54:57
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 20:23:14
 * @Desc: Cesium基础标绘组件说明文档
 -->

## Cesium-Draw

This is a plug-in for basic plotting of cesium,which is developed based on Vue.
You can use it to plot basic graphics interactively.For examples point,polyline and polygon.

Key Features:
- Add marker,polyline,polygon,label,model with mouse.
- You can edit geometry which were added to cesium viewer by the plugin.
- Export and import.(json,Geojson,shp)
- Manager all geometry width layer manager.
### Install

```sh
npm i cesium-draw
```
### Usage
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
You must explicitly call the init function if you do not declare a Cesium Viewer in Vue data.
```js
const viewer=new Cesium.Viewer('map')
this.$refs.drawManager.init(viewer)
```

#### How to extend mark images
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
#### How to extend mark model
You must use `extendMarkerModel` define model which be used to mark,
otherwise,you can not mark with model.

e.g.
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
#### How to use your favorite theme
```js
import 'cesium-draw/dist/theme/default.css' 
```
or
```js
import 'cesium-draw/dist/theme/dark.css'
```

#### example
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
### Development
```sh
npm install
npm run build
```
### Display
![avatar](https://img-blog.csdnimg.cn/20200102184048249.gif)