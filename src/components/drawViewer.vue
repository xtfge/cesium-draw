<!--
@Author:zhangbo
@Date:2019-05-08 13:20:01
@E-mail:zhangb@geovie.com.cn
-->
<template>
  <div class="markerPanel" v-show="isShow">
    <el-container>
      <el-header>
        标绘<span class="clostbtn" @click="isShow=false"></span>
      </el-header>
      <el-main>
        <el-button v-on:click="" class="marker-panel" :class="{'active-panel':!activeMode['marker']}"
                   @click="toggleClick('addMarker')"
                   title="标记地点">
        </el-button>
        <el-button v-on:click="" class="polyline-panel" :class="{'active-panel':!activeMode['polyline']}"
                   @click="toggleClick('addPolyline')"
                   title="绘线">
        </el-button>
        <el-button v-on:click="" class="polygon-panel" :class="{'active-panel':!activeMode['polygon']}"
                   type="info"
                   @click="toggleClick('addPolygon')"
                   title="绘多边形">
        </el-button>
        <el-dropdown @command="handleCommand">
          <el-button class="import-panel" :class="{'active-panel':!activeMode['export']}"
                     type="info"
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
                     type="info"
                     title="导出"
          ><i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="dmarker" >标记</el-dropdown-item>
            <el-dropdown-item  command="dline">线</el-dropdown-item>
            <el-dropdown-item  command="dgon">多边形</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<el-button v-on:click="" class="export-panel" :class="{'active-panel':!activeMode['export']}"-->
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
        <el-button v-on:click="" class="remove-panel" :class="{'active-panel':!activeMode['remove']}"
                   type="info"
                   @click="toggleClick('remove')"
                   title="一键删除">
        </el-button>
      </el-main>
    </el-container>
    <markerViewer ref="marker" :extendImage="markerExtend"></markerViewer>
    <input type="file" v-show="false" @change="importfp"  id="graphicuploadhandler" accept=".geojson,.shp">
  </div>
</template>

<script>
  import markerViewer from '@/components/marker'
  import {Polyline,Polygon,polylineCollection,polygonCollection} from "@/js/drawHandler";
  import utils from '@/js/utils'

  export default {
    name:"markerPanel",
    data() {
      return {
        activeMode:{},
        isShow:true,
        plCollection:undefined,
        pgCollection:undefined,
        viewerMounted:false,
        menuShow:{},
        menus:[{'value':'标记','key':'marker'},{'value':'线','key':'polyline'},{'value':'多边形','key':'polygon'}],
        markerExtend:['static/images/markers/1.png',
          'static/images/markers/2.png',
          'static/images/markers/3.png',
          'static/images/markers/4.png',
          'static/images/markers/5.png',
          'static/images/markers/6.png',
          'static/images/markers/7.png',
          'static/images/markers/8.png']
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
      }
    },
    computed: {
      viewer() {
        if(this.$store.state.earth){
          return this.$store.state.earth
        }
        return this.cesiumViewer

      }
    },
    mounted() {
      const self = this
      const viewer = self.viewer
      self.plCollection=new polylineCollection(viewer)
      self.pgCollection=new polygonCollection(viewer)
      Bus.$on('viewerMounted',function () {
        self.viewerMounted=true
      })
      this.$refs.marker.init(this.viewer,'single')
    },
    methods: {
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
        this.plCollection.add(this.polylineNode)
      },
      addPolygon(){
        this.pgCollection.add(this.polygonNode)
      },
      addMarker(){
        createCursor(this.viewer,'点击地图添加标记')
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

<style scoped>
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
  }
  .markerPanel .el-button{
    width:35px
  }
  .active-panel{
    border:none
  }
  .marker-panel{
    background: url("../../static/images/markers/markPanel/marker.png") no-repeat center;
  }
  .polyline-panel{
    background: url("../../static/images/markers/markPanel/polyline.png") no-repeat center;
  }
  .polygon-panel{
    background: url("../../static/images/markers/markPanel/polygon.png") no-repeat center;
  }
  .import-panel{
    background: url("../../static/images/markers/markPanel/upload.png") no-repeat center;
  }
  .export-panel{
    width: 180px;
    background: url("../../static/images/markers/markPanel/download.png") no-repeat center;
  }
  .remove-panel{
    background: url("../../static/images/markers/markPanel/remove.png") no-repeat center;
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
  .el-dropdown>>>span{
    padding: 0px;
    margin: 0px;
    position: absolute;
  }
</style>
