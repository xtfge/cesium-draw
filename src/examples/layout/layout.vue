<!--
@Author:zhangbo
@Date:2019-05-15 09:21:08
@E-mail:zhangb@geovie.com.cn
-->
<template>
  <div>
    <earthViewer></earthViewer>
    <!-- <cesiumMarkerViewer :viewer="viewer" v-if="viewerMounted"></cesiumMarkerViewer> -->
    <!--<editViewer></editViewer>-->
    <!-- <cesiumDrawViewer
      :viewer="viewer"
      v-if="viewerMounted"
      v-show="drawviewerShow"
      :polylineNode="false"
      :polygonNode="true"
      ref="draw"
    ></cesiumDrawViewer>-->
    <cesiumDrawViewer :extendMarkerImage="imags"></cesiumDrawViewer>
  </div>
</template>

<script>
import earthViewer from "@/examples/cesiumViewer";
import cesiumDrawViewer from '@/components/cesiumDrawViewer'
const Cesium = window.Cesium;
export default {
  data() {
    return {
      drawHelper: "",
      viewerMounted: false,
      drawviewerShow: true,
      imags : [
      "./static/images/markers/1.png",
      "./static/images/markers/2.png",
      "./static/images/markers/3.png",
      "./static/images/markers/4.png",
      "./static/images/markers/5.png",
      "./static/images/markers/6.png",
      "./static/images/markers/7.png",
      "./static/images/markers/8.png",
       "./static/images/markers/5.png",
      "./static/images/markers/6.png"
    ],
    model:[{ id: "model0", name: "木塔", url: "static/model/Wood_Tower.gltf" },
          { id: "model1", name: "人", url: "static/model/Cesium_Man.gltf" }]
      
    };
  },
  components: {
    earthViewer,
    cesiumDrawViewer,
  },
  props: {},
  computed: {},
  beforeMount() {
  },
  mounted() {
    // self.viewer = window.cesiumViewer;
    const viewer =  window.cesiumViewer;
    const tileset=new Cesium.Cesium3DTileset({
      url:'static/Photogrammetry/tileset.json'
    })
    tileset.readyPromise.then(t=>{
      viewer.scene.primitives.add(t)
      viewer.camera.viewBoundingSphere(t.boundingSphere)
    })
  },
  methods: {
  },
  watch: {}
};
</script>

<style scoped>
</style>
<style>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #e0e0e0;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px; /*滚动条的背景区域的圆角*/
  background-color: #a1a1a1; /*滚动条的背景颜色*/
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e0e0e0; /*滚动条的背景颜色*/
}
#toolbar {
  width: 100px;
  height: 200px;
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: whitesmoke;
}
.toolbar {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 100;
}
.toolbar .el-button {
  background-color: #ffffff00;
  border: 0px;
  margin-left: 0px;
}
</style>
