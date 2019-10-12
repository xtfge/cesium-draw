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
    <cesiumDrawViewer
      :viewer="viewer"
      v-if="viewerMounted"
      v-show="drawviewerShow"
      :polylineNode="false"
      :polygonNode="true"
      ref="draw"
    ></cesiumDrawViewer>
  </div>
</template>

<script>
import earthViewer from "@/examples/cesiumViewer";
import cesiumDrawViewer from "@/components/drawViewer/index";
import utils from "@/js/utils";
import { Polygon } from "@/components/commons";
const Bus = window.Bus;
export default {
  data() {
    return {
      drawHelper: "",
      viewerMounted: false,
      drawviewerShow: true
    };
  },
  components: {
    cesiumDrawViewer,
    earthViewer
  },
  props: {},
  computed: {},
  beforeMount() {
    const self = this;
    Bus.$on("viewerMounted", function() {
      self.viewerMounted = true;
    });
  },
  mounted() {
    const self = this;
    self.viewer = window.viewer;
    const imags = [
      "./static/images/markers/1.png",
      "./static/images/markers/2.png",
      "./static/images/markers/3.png",
      "./static/images/markers/4.png",
      "./static/images/markers/5.png",
      "./static/images/markers/6.png",
      "./static/images/markers/7.png",
      "./static/images/markers/8.png"
    ];
    this.$nextTick(()=>{
      this.$refs.draw.extendMarkImage(imags)
    })
    // new Polygon(self.viewer)
    // const pl=new Polyline(this.$store.state.earth)
    // const pg=new Polygon(this.$store.state.earth)
    // pl.initNodes()
    // pg.initNodes()
  },
  methods: {
    load(event) {
      const fileData = event.target.files[0];
      utils.shp2GeoJSON(fileData);
    }
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
