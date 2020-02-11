<!--
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-09 19:43:05
 * @LastEditors  : zhangbo
 * @LastEditTime : 2020-01-02 19:07:11
 * @Desc: 
 -->
### Cesium-Draw
This is a Vue+Cesium project, which provides functions such as drawing and editing graphics as well as importing and exporting them.
Key Features ：
- Add markers, you can extend the markers style, edit and delete them.
- Interactive drawing of polyline and polygon openings allows editing and setting of nodes and their styles.
- Export and import.（json,Geojson,shp）

#### Install
```
npm install cesium-draw --save
```
#### Usage
```js
//you-component.js
<templete>
<div>
<div id='cesiumContainer'></div>
<cesiumDrawViewer :viewer="viewer"></cesiumDrawViewer>
</div>
</templete>
<script>
import cesiumDrawHandler from 'cesium-draw'
export default {
  name: "my-component",
  data(){

  },
  components:{cesiumDrawHandler},
  mounted(){
      this.viewer=new Cesium.Viewer('cesiumContainer')
  }

}
</script>
```
If you Cesium Viewer has not been declared in Vue's data,you need to explicitly call the init method.
```js
//you-component.js
<templete>
<div>
<div id='cesiumContainer'></div>
<cesiumDrawViewer ref='markerManager'></cesiumDrawViewer>
</div>
</templete>
<script>
import cesiumDrawHandler from 'cesium-draw'
export default {
  name: "my-component",
  components:{cesiumDrawHandler},
  mounted(){
      const viewer=new Cesium.Viewer('cesiumContainer')
      this.$refs.markerManager.init(viewer)
  }

}
</scrip
```
#### Development
```
npm install
npm start
```
#### Build
```
npm run build
```

### Blog
https://blog.csdn.net/xtfge0915/article/details/103809055

### example
![avatar](https://img-blog.csdnimg.cn/20200102184048249.gif)
