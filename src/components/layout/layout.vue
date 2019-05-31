<!--
@Author:zhangbo
@Date:2019-05-15 09:21:08
@E-mail:zhangb@geovie.com.cn
-->
<template>
  <div>
    <earthViewer></earthViewer>
    <!--<marker-panel :showLength="false" :showArea="false" v-if="viewerMounted"></marker-panel>-->
    <!--<editViewer></editViewer>-->
    <draw-viewer v-if="viewerMounted" v-show="drawviewerShow" :polylineNode="false" :polygonNode="true"></draw-viewer>
  </div>
</template>

<script>
  import earthViewer from '@/components/cesiumViewer'
  import drawViewer from '@/components/drawViewer'
  import {Polyline,Polygon} from '@/js/drawHandler'
  import utils from '@/js/utils'
  export default {
    data() {
      return {
        drawHelper:'',
        viewerMounted:false,
        drawviewerShow:true
      }
    },
    components:{drawViewer, earthViewer},
    props: {

    },
    computed: {},
    beforeMount(){
      const self = this
      Bus.$on('viewerMounted',function () {
        self.viewerMounted=true

      })
    },
    mounted() {
      const self = this
      // const pl=new Polyline(this.$store.state.earth)
      // const pg=new Polygon(this.$store.state.earth)
      // pl.initNodes()
      // pg.initNodes()
    },
    methods: {
      load(event){
        const fileData = event.target.files[0]
        utils.shp2GeoJSON(fileData)
      }
    },
    watch: {}
  }
</script>

<style scoped>
</style>
<style>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #E0E0E0;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 5px;  /*滚动条的背景区域的圆角*/
    background-color: #A1A1A1;/*滚动条的背景颜色*/
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 5px;  /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #E0E0E0;  /*滚动条的背景颜色*/
  }
  #toolbar{
    width: 100px;
    height: 200px;
    position: fixed;
    top:10px;
    left: 10px;
    background-color: whitesmoke;
  }
  .toolbar{
    position: absolute;
    top:50px;
    right:50px;
    z-index: 100;
  }
  .toolbar .el-button{
    background-color: #FFFFFF00;
    border:0px;
    margin-left: 0px;
  }
</style>
