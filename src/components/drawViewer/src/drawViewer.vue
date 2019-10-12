<!--
@Author:zhangbo
@Date:2019-05-08 13:20:01
@E-mail:zhangb@geovie.com.cn
@Modify-Date:2019-9-24
-->
<template>
  <div class="markerPanel" v-show="isShow">
    <el-container>
      <el-header>
        标绘<span class="clostbtn" @click="isShow=false"></span>
      </el-header>
      <el-main>
        <el-button  class="marker-panel" :class="{'active-panel':!activeMode['marker']}"
                   @click="toggleClick('addMarker')"
                   title="标记地点">
        </el-button>
        <el-button  class="polyline-panel" :class="{'active-panel':!activeMode['polyline']}"
                   @click="toggleClick('addPolyline')"
                   title="绘线">
        </el-button>
        <el-button  class="polygon-panel" :class="{'active-panel':!activeMode['polygon']}"
                   @click="toggleClick('addPolygon')"
                   title="绘多边形">
        </el-button>
        <el-dropdown @command="handleCommand">
          <el-button class="import-panel" :class="{'active-panel':!activeMode['export']}"
                     title="导入"
          ><i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="umarker">标记</el-dropdown-item>
            <el-dropdown-item  command="uline">线</el-dropdown-item>
            <el-dropdown-item  command="ugon">多边形</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand">
          <el-button class="export-panel" :class="{'active-panel':!activeMode['export']}"
                     title="导出"
          ><i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="dmarker" >标记</el-dropdown-item>
            <el-dropdown-item  command="dline">线</el-dropdown-item>
            <el-dropdown-item  command="dgon">多边形</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<el-button  class="export-panel" :class="{'active-panel':!activeMode['export']}"-->
                   <!--type="info"-->
                   <!--@click="toggleMenu('export')"-->
                   <!--title="导出">-->
        <!--</el-button>-->
        <!--<div  class="show-drop-down" v-show="menuShow['export']">-->
          <!--<div class="drop-down-item"-->
               <!--v-for="(item, index) in menus"-->
               <!--:key="index"-->
               <!--@click="command(item.key)"-->
          <!--&gt;-->
            <!--{{item.value}}-->
          <!--</div>-->
        <!--</div>-->
        <el-button  class="remove-panel" :class="{'active-panel':!activeMode['remove']}"
                   @click="toggleClick('remove')"
                   title="一键删除">
        </el-button>
      </el-main>
    </el-container>
    <markerViewer ref="marker" :extendImage="markerExtend" :viewer="viewer"></markerViewer>
    <input type="file" v-show="false" @change="importfp"  id="graphicuploadhandler" accept=".geojson,.shp">
  </div>
</template>

<script>
  import markerViewer from '../../marker/src/marker'
  import {PolylineCollection,PolygonCollection} from "../../../js/drawHandler";
  import utils from '../../../js/utils'
  import Bus from '../../../js/Bus'

  export default {
    name:"cesiumDrawViewer",
    version:"2.0",
    data() {
      return {
        activeMode:{},
        isShow:true,
        plCollection:undefined,
        pgCollection:undefined,
        viewerMounted:false,
        menuShow:{},
        menus:[{'value':'标记','key':'marker'},{'value':'线','key':'polyline'},{'value':'多边形','key':'polygon'}],
        markerExtend:[]
      }
    },
    components:{markerViewer},
    props: {
      cesiumViewer:{

      },
      polylineNode:{
        default:false
      },
      polygonNode:{
        default:true
      },
      viewer:{
        required:true
      }
    },
    computed: {
    },
    mounted() {
      const self = this
      const viewer = self.viewer
      self.plCollection=new PolylineCollection(viewer)
      self.pgCollection=new PolygonCollection(viewer)
      Bus.$on('viewerMounted',function () {
        self.viewerMounted=true
      })
      this.$refs.marker.init(this.viewer,'single')
    },
    methods: {
      extendMarkImage(images){
        this.markerExtend=images
      },
      importfp(){
        const _this = this
        const evt = event ? event : window.event
        // const cvt = convertTool(_this.viewer)
        const files = evt.target.files,
          ext=files[0].name.split('.')[1]
        if(files.length==0){
          return
        }
        const reader = new FileReader();
        if(ext.toLowerCase()==='geojson'){
          reader.readAsText(files[0]);
          reader.onload=function () {
            _this[_this.upload2].import(JSON.parse(this.result))
            document.getElementById('graphicuploadhandler').value=""
          }
        }else if(ext.toLowerCase()==='shp'){
          const graphicJSON= {
            "type": "FeatureCollection",
            "name": files[0].name.split('.')[0],
            "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
            "features": []
          }
          utils.shp2GeoJSON(files[0]).then(res=>{
            graphicJSON.features.push(res)
            if(res.geometry.type==='Polyline'){
              _this.plCollection.import(graphicJSON)
            }else if(res.geometry.type==='Polygon'){
              _this.pgCollection.import(graphicJSON)
            }else{
              _this.$message.error('未知的几何类型')
            }
            document.getElementById('graphicuploadhandler').value=""
          })
        }


      },
      handleCommand(cmd){
        const self=this
        switch (cmd) {
          case 'umarker':
            Bus.$emit('importMarks')
            break
          case 'uline':
            self.upload2='plCollection'
            document.getElementById('graphicuploadhandler').click()
            break
          case 'ugon':
            self.upload2='pgCollection'
            document.getElementById('graphicuploadhandler').click()
            break
          case 'dmarker':
            self.$refs.marker.exportMarks()
            break
          case 'dline':
            self.plCollection.export()
            break
          case 'dgon':
            self.pgCollection.export()
            break
        }
      },
      toggleClick(event){
        this[event]()
      },
      addPolyline(){
        const lastPolygon=this.pgCollection.values.get('polygon'+(this.pgCollection.values.size-1))
        if(lastPolygon){
          lastPolygon.destroy()
        }
        this.$refs.marker.isDrawing=false
        // createCursor(this.viewer,'点击地图开始绘制')
        this.plCollection.add(this.polylineNode)
      },
      addPolygon(){
        const lastPolyline=this.plCollection.values.get('polyline'+(this.plCollection.values.size-1))
        if(lastPolyline){
          lastPolyline.destroy()
        }
        this.$refs.marker.isDrawing=false
        // createCursor(this.viewer,'点击地图开始绘制')
        this.pgCollection.add(this.polygonNode)
      },
      addMarker(){
        const lastPolygon=this.pgCollection.values.get('polygon'+(this.pgCollection.values.size-1))
        if(lastPolygon){
          lastPolygon.destroy()
        }
        const lastPolyline=this.plCollection.values.get('polyline'+(this.plCollection.values.size-1))
        if(lastPolyline){
          lastPolyline.destroy()
        }
        window.createCursor(this.viewer,'点击地图添加标记')
        this.$refs.marker.isDrawing=true
        // Bus.$emit('markerViewerInit',this.viewer,'single')
        // Bus.$emit('startPickMarker')
      },
      remove(){
        this.plCollection.remove()
        this.pgCollection.remove()
        this.$refs.marker.removeAll()
        // Bus.$emit('removeAllMarker')
      },
      export(){
      }


    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .clostbtn::after{
    content: '✖';
    float: right;
    margin-right: 10px;
  }
  .markerPanel{
    background-color: #FFFFFF;
    /*height: 100px;*/
    width: 320px;
    position: fixed;
    z-index: 999
  }
  .markerPanel .el-button{
    width:35px
  }
  .active-panel{
    border:none
  }
  .marker-panel{
    background: url("../../../../public/static/images/markers/markPanel/marker.png") no-repeat center;
  }
  .polyline-panel{
    background: url("../../../../public/static/images/markers/markPanel/polyline.png") no-repeat center;
  }
  .polygon-panel{
    background: url("../../../../public/static/images/markers/markPanel/polygon.png") no-repeat center;
  }
  .import-panel{
    background: url("../../../../public/static/images/markers/markPanel/upload.png") no-repeat center;
  }
  .export-panel{
    width: 180px;
    background: url("../../../../public/static/images/markers/markPanel/download.png") no-repeat center;
  }
  .remove-panel{
    background: url("../../../../public/static/images/markers/markPanel/remove.png") no-repeat center;
  }
  .el-button{
    margin-left: 8px
  }
  .el-header,.el-main{
    padding:0px;
    height: 30px!important;
    margin: 0px 0px 5px 5px!important;
  }
  .el-header{
    border-bottom: 1px solid #8c8c8c;
    padding-left: 10px;
  }
  .el-icon--right{
    // padding: 0px;
    // margin: 0px;
    // position: absolute;
    display: none!important
  }
</style>
