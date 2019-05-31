<!--
@Author:zhangbo
@Date:2019-03-13 13:10:34
@E-mail:zhangb@geovie.com.cn
@Last Modified by:zhangbo
@Last Modified time:2019-03-13 13:10:34
-->
<!--
Author:zhangbo
Date:2019/3/10 19:34
E-mail:zhangb@geovie.com.cn
-->
<template>
  <div id="markerContainer">
    <div id="createPanel" v-show="isShow" :style="{left:position.x+'px',top:position.y+'px'}">
      <el-container v-show="!selectPanel">
        <el-header>添加标记<span class="closebtn" id="closespan" @click="isShow=false"></span></el-header>
        <el-container>
          <el-container>
            <el-main>名称：
              <el-input v-model="markName" autofocus="true" ref="nameinput" @keyup.enter.native="update" id="input_markname"></el-input>
              <br>
              备注：
              <el-input v-model="markRemark" type="textarea"></el-input>
            </el-main>
            <el-aside>
              &nbsp;<img :src="defaultImage"><br/>
              <a href="#" id="imageC" @click="changeImage" style="margin-left: 10px" v-if="images.length>0">更换</a>
            </el-aside>
          </el-container>
          <el-footer>
            <el-button type="danger" id="cancelbtn" plain size="mini" @click="cancelMark">删除</el-button>
            <el-button type="primary" plain size="mini" id="submitbtn" @click="update">确定</el-button>
          </el-footer>
        </el-container>
      </el-container>
      <el-container v-show="selectPanel">
        <img v-for="img in images" :src="img" @click="changeHandler(img)">
      </el-container>
      <!--<i class="el-icon-caret-bottom"></i>-->
    </div>
    <contextMenuViewer ref="contextMenu" :contextMenuItems="contextMenu"></contextMenuViewer>
    <input type="file" v-show="false" @change="importMarks" id="uploadhandler" accept=".json">
    <!--<div class="crusor-tip" v-if="!isShow&&isDrawing"-->
      <!--:style="{left:scenePos.x,top:scenePos.y}">-->
      <!--&lt;!&ndash;单击地图添加标记&ndash;&gt;-->
    <!--</div>-->

  </div>
</template>

<script>
  import convertTool from "@/js/Convert";
  import contextMenuViewer from './contextmenu'
  import {saveAs} from 'file-saver';

  export default {
    data() {
      return {
        msg: '',
        tipPos: {x: 0, y: 0},
        scenePos: '',
        isShow: false,
        billboards: undefined,
        labels: undefined,
        selectedObj: '',
        tipShow: false,
        curIndex: null,
        isDrawing: false,
        curLat: 0,
        curLon: 0,
        curText: '',
        contextMenu: {},
        activeMark: null,
        markName: '',
        markRemark: '',
        images: [],
        defaultImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAfCAYAAAAIjIbwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAK8AAACvAAsAdHPAAAAB3RJTUUH4wEJAy0MN7YNKwAAA05JREFUSMeV1suLHFUUx/FPVVc/ZpKJozhKYkSQxOATBDdKkLgQRaKooP+DgijoTnDjNsYXIhoiCMa3ohJQEEnEiJsg+EhcRHzHiQmYOM6ju2aqr4uqmtzuTJvJ2TRV95xv/c7j3tuJyqa3bxVZhptwF27BRkxgFkexHx/hS+R10Pq9B0CyAvBKPIJ7caHR9jc+xDP4NgYnQ8DbsbMCr9Z+xKOV8uU0a7sVu7FhOKoIQb8fpGmikSTDy5uwC33sjaGb8FQMDJjLF83kubwoFP2gkSRajYaJdtPaVkuEvwg78BMOp0jxIK6NlZ2YWzA9O2eml+stFZb6fb2iMJPnjs3OOz43r+iHWPEWPIQsw3W4b6ADC10nu926kzM4iN+wMeGGfgiTp7o9CabWjMeK78GrGW6L055bXHSq26sfj+AxfIoFdJQjtgNX/dPLjTeb1raatf/FuCPDtqoEYDZfVIQgYR6Px11FFx9XvdhThDAxm+cxFLalysEG/RDkRVE//lApLD2/OhQH7lPNZl709cNAbTekmFzueKDoh7pGx5Vql4EReAF/JVgKZ0DXpcpGgDQhS1OVy6U4D/bfeLX4F+twWVD6p4OzO59WzSg7nSTaWSMekfvrhwhIuYWvgXajMQw9klb1WS7kRKupmabQxBN4GJdgHOvxAJ5EO0sT69qtGBiwL5nevnWzcntdUa+c7PacmJuvy7CEnzFdjczl1QdNjY+5YKwTQ3/BnXX6e+KVyXbL1Jrxur5ZYDNuDmwJNLM0NTU+ZrLTNmRv4vt67+/G3bi+ru35nbaxLDOb53pFuU2zNNVuNKxtNXWybBh4GC9x+kA5imeVp83yJHeyhk42JiCEIEkSZ5xRpRV4vkr/9E7Ce6Jhjy1BOhoIn1epg7S+ApRXxU6ccm42ELd+74EBpZR3z1vnCH1/OMO0pg/V5tdVAv9U9iKPOekKjofw8iqhr+Dr4ZfL0Eht7XzwLMDv4o/H8QNKo4Vjyqs3HwFcwnP4fQVBK6Zf2wf4ZMTaPrw9KvAMaPTVOTyNk0Mu/ypHaGYllWdTCl/g9aF37+Cz/wtaETo0Yi8oTyn4o6rl4iiVq1FKeVe9qPwHsgvfnC1gJHRIxRt4F6+NWB+w/wD3vCGsfC8xrQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMS0wOVQwMzo0NToxMiswODowMKswftkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMDlUMDM6NDU6MTIrMDg6MDDabcZlAAAAQ3RFWHRzb2Z0d2FyZQAvdXNyL2xvY2FsL2ltYWdlbWFnaWNrL3NoYXJlL2RvYy9JbWFnZU1hZ2ljay03Ly9pbmRleC5odG1svbV5CgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMjMzz/MXEAAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxNTifzIcaAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1NDY5NzY3MTKeBuyKAAAAEnRFWHRUaHVtYjo6U2l6ZQAxMDM4M0L7qH+sAAAAYnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L25ld3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL2ZpbGVzLzExOC8xMTg1NjU4LnBuZzaDG7oAAAAASUVORK5CYII=',
        selectPanel: false,
        viewer: ''
      }
    },
    computed: {
      handler() {
        if (Cesium.defined(this.viewer)) {
          return new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
        }
      },
      position() {
        const x = this.scenePos.x > 170 ? this.scenePos.x - 170 : this.scenePos.x + 10
        const y = this.scenePos.y > 210 ? this.scenePos.y - 180-60 : this.scenePos.y + 50
        return {x: x, y: y}
      }
    },
    components: {
      contextMenuViewer
    },
    props:{
      extendImage:{
      }
    },
    directives: {
      vfocus(el) {
        el.focus()
      }

    },
    mounted() {
      const _this = this
      _this.contextMenu = {
        '编 辑': _this.edit,
        '删 除': _this.drop
      }
      _this.images=[_this.defaultImage,..._this.extendImage]

      _this.viewer=_this.$store.state.earth
      _this.billboards = _this.viewer.scene.primitives.add(new Cesium.BillboardCollection())
      _this.labels = _this.viewer.scene.primitives.add(new Cesium.LabelCollection())
      Bus.$on('drawingStop', _this.stopDrawing)
      //Bus.$emit('markerViewerInit')
      //初始化markerViewer
      Bus.$on('markerViewerInit', _this.init)
      //注销markerViewer
      Bus.$on('markerViewerDestroy', _this.destroy)
      //一键删除
      Bus.$on('removeAllMarker', _this.removeAll)
      //开始标记
      Bus.$on('startPickMarker', function () {
        _this.isDrawing = true
      })
      //停止标记
      Bus.$on('stopPickMarker', function () {
        _this.isDrawing = false
      })
      //编辑标记
      // Bus.$on('updateMark', function (text) {
      //   for (let i = 0; i < _this.labels.length; i++) {
      //     if (_this.labels.get(i).id == _this.$store.state.id) {
      //       _this.labels.get(i).text = text
      //     }
      //   }
      // })
      // //删除标记
      // Bus.$on('removeMark', function (id) {
      //   for (let i = 0; i < _this.billboards.length; i++) {
      //     if (_this.billboards.get(i).id === id) {
      //       _this.billboards.remove(_this.billboards.get(i))
      //       _this.labels.remove(_this.labels.get(i))
      //     }
      //   }
      // })
      // //编辑没有完全添加的标记，更换标记图标后触发该事件
      // Bus.$on('updateLastMark', function () {
      //   _this.defaultImage = _this.$store.state.defaultImage
      //   _this.billboards.get(_this.billboards.length - 1).image = _this.defaultImage
      // })
      // //取消添加
      // Bus.$on('removeLastMark', function () {
      //   _this.billboards.remove(_this.billboards.get(_this.billboards.length - 1))
      //   _this.labels.remove(_this.labels.get(_this.labels.length - 1))
      // })
      Bus.$on('exportMarks', _this.exportMarks)
      Bus.$on('importMarks', function () {
        document.getElementById('uploadhandler').click()
      })
    },
    methods: {
      /**
       * 气泡显隐控制
       * @param evt Marker对象
       * @returns {*}
       */
      tipLoad(evt) {
        const _this = this
        const viewer = _this.viewer
        const cvt = convertTool(viewer)
        const objs = viewer.scene.drillPick(evt.position)
        if (Cesium.defined(objs)) {
          for (let obj in objs) {
            if (objs[obj].primitive instanceof Cesium.Billboard) {
              for (let i = 0; i < _this.billboards.length; i++) {
                if (_this.billboards.get(i) == objs[obj].primitive) {
                  _this.activeMark = _this.billboards.get(i)
                  const latlon = cvt.worldLatLon(objs[obj].primitive.position)
                  _this.curLat = latlon.lat.toFixed(3)
                  _this.curLon = latlon.lon.toFixed(3)
                  _this.curText = _this.labels.get(i).text
                  const pos = cvt.worldScreen(objs[obj].primitive.position)
                  const popdiv = document.getElementById('popContainer')
                  if (_this.tipPos.x - pos.x + _this.tipPos.y - pos.y == 0) {
                    _this.tipPos = cvt.worldScreen(objs[obj].primitive.position)
                    if (popdiv) {
                      document.body.removeChild(popdiv)
                    } else {
                      _this.createPopPanel()
                    }
                  } else {
                    _this.tipPos = cvt.worldScreen(objs[obj].primitive.position)
                    if (popdiv) {
                      document.body.removeChild(popdiv)
                    }
                    _this.createPopPanel()
                  }
                  return {name: _this.curText, lat: _this.curLat, lon: _this.curLon}
                }
              }
            }
          }
        }
        return false
      },
      /**
       * marker导出到json
       */
      exportMarks() {
        const marks = []
        if(this.billboards.length==0){
          this.$message.error('没有添加标记')
          Bus.$emit('toggleClick')
          return
        }
        for (let i = 0; i < this.billboards.length; i++) {
          const mark = {}
          mark['position'] = this.billboards.get(i).position
          mark['image'] = this.billboards.get(i).image
          mark['id'] = this.billboards.get(i).id
          mark['text'] = this.labels.get(i).text
          marks.push(JSON.stringify(mark))
        }
        const blob = new Blob(marks, {type: ""});
        saveAs(blob, "marks.json");
        Bus.$emit('toggleClick')
      },
      /**
       * 从json导入标记
       */
      importMarks() {
        const _this = this
        const evt = event ? event : window.event
        const cvt = convertTool(_this.viewer)
        const files = evt.target.files,
          reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function () {
          //读取完成后，数据保存在对象的result属性中
          const res = this.result
          let mark
          const arr = res.split('}{')
          arr.map(r => {
            if (r[0] != "{") {
              r = "{" + r
            }
            if (r[r.length - 1] != '}') {
              r = r + "}"
            }
            mark=JSON.parse(r)
            _this.billboards.add({
              id: mark.id,
              position: new Cesium.Cartesian3(mark.position.x, mark.position.y, mark.position.z),
              image: mark.image
            })
            _this.labels.add({
              position: new Cesium.Cartesian3(mark.position.x, mark.position.y, mark.position.z),
              id: mark.id,
              text: mark.text,
              font: '24px sans-serif',
              fillColor: Cesium.Color.BLACK,
              outlineWidth: 5,
              outlineColor: Cesium.Color.WHITE,
              pixelOffset: new Cesium.Cartesian2(20, 20),
              style: Cesium.LabelStyle.FILL_AND_OUTLINE
            })
          })
          Bus.$emit('toggleClick')
          document.getElementById('uploadhandler').value = ""
          //定位到添加的标记
          // _this.$store.state.earth.camera.setView({
          //   destination: _this.billboards.get(0).position
          // })
          //self.modelStyle = JSON.parse(this.result)
          //const keys = Object.keys(self.modelStyle)
        }
      },
      changeImage() {
        const self = this
        self.selectPanel = true
        // self.$nextTick(e=>{
        //   self.$refs['nameinput'].$el.children[0].focus();
        // })
      },
      changeHandler(id) {
        this.defaultImage = id
        // this.$store.state.defaultImage = this.defaultImage
        //确定要更改图标的对象
        const index=Cesium.defined(this.curIndex)?this.curIndex:this.billboards.length - 1
        // this.billboards.get(this.billboards.length - 1).image = this.defaultImage
        this.billboards.get(index).image=this.defaultImage
        // obj.image=this.defaultImage
        this.selectPanel = false
        // Bus.$emit('updateLastOLMark')
      },
      cancelMark() {
        this.isShow = false
        const index=Cesium.defined(this.curIndex)?this.curIndex:this.billboards.length - 1
        this.billboards.remove(this.billboards.get(index))
        this.labels.remove(this.labels.get(index))
        // Bus.$emit('removeLastOLMark')
      },
      init(viewer,mode) {
        const _this = this
        _this.viewer = viewer
        const cvt = convertTool(viewer)
        //_this.isShow=true
        //气泡跟随地图
        _this.viewer.scene.postRender.addEventListener(function (e) {
          if (_this.activeMark) {
            const pos = cvt.worldScreen(_this.activeMark.position)
            if (document.getElementById('popContainer')) {
              document.getElementById('popContainer').style.left = pos.x - 100 - 7 + 'px'
              document.getElementById('popContainer').style.top = pos.y - 100 + 'px'
            }
          }
        })
        //Bus.$emit('initOlMarker', _this.$store.state.olMap)
        _this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
        _this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
        _this.handler.setInputAction(evt => {
          //移除右键菜单重新初始化
          Bus.$emit('contextMenuHide')
          const e = window.event,//event|| window.event,
            target = e.target || e.srcElement;
          const marker_message = _this.tipLoad(evt)
          if (marker_message) {
            return marker_message
          }
          //如果开始标记
          if (!_this.isDrawing) {
            return
          }
          //如果点击对象是地球
          if (target && target.tagName == 'CANVAS' && target.parentElement.className == 'cesium-widget') {
            _this.scenePos = evt.position
            _this.add()
            Bus.$emit('toggleClick')
            const cvt = convertTool(viewer)
            const pos = cvt.pickLatLon(this.scenePos)
            // Bus.$emit('addOlMarker', {x: pos.lon, y: pos.lat}, false, _this.$store.state.id)
            _this.msg = ''
            if(mode=='single'){
              Bus.$emit('stopPickMarker')
            }
            // _this.$refs.msg_input.focus()
          } else {

          }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        _this.handler.setInputAction((evt) => {
          // _this.tipShow=false
          // _this.isShow=false
          if (document.getElementById('tooltip')) {
            document.body.removeChild(document.getElementById('tooltip'))
          }
          Bus.$emit('contextMenuHide')
          const objs = viewer.scene.drillPick(evt.position)
          if (Cesium.defined(objs)) {
            for (let obj in objs) {
              if (objs[obj].primitive instanceof Cesium.Billboard) {
                _this.selectedObj = objs[obj]
                createContextMenu()
                _this.$refs.contextMenu.setPosition(evt.position)
                break;
              }

            }
          } else {
            Bus.$emit('contextMenuHide')
          }

          //_this.drop()
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      },
      createPopPanel() {
        const popdiv = document.createElement('div')
        popdiv.id = 'popContainer'
        popdiv.style.left = parseFloat(this.tipPos.x) - 100 - 7 + 'px'
        popdiv.style.top = parseFloat(this.tipPos.y) - 40 + 'px'
        const txtdiv = document.createElement('span')
        txtdiv.innerText = "名称:" + this.curText
        const latdiv = document.createElement('span')
        latdiv.innerText = "纬度:" + this.curLat
        const londiv = document.createElement('span')
        londiv.innerText = "经度:" + this.curLon
        const arrow = document.createElement('div')
        arrow.className = 'arrow'
        popdiv.appendChild(txtdiv)
        popdiv.appendChild(document.createElement('br'))
        popdiv.appendChild(latdiv)
        popdiv.appendChild(document.createElement('br'))
        popdiv.appendChild(londiv)
        popdiv.appendChild(document.createElement('br'))
        popdiv.appendChild(arrow)
        this.popDiv = popdiv
        document.body.appendChild(this.popDiv)

      },
      /**
       * 添加标记，当监听到鼠标单击事件后调用该方法
       * @param input 是否显示编辑界面，默认显示
       */
      add(input = true) {
        const _this = this
        if(document.getElementById('cursortip')){
          document.body.removeChild(document.getElementById('cursortip'))
        }
        // if (this.$store.state.defaultImage) {
        //   this.defaultImage = this.$store.state.defaultImage
        // }
        // _this.$store.state.defaultImage = _this.defaultImage

        const cvt = convertTool(_this.viewer)
        // _this.isShow=true
        _this.tipShow = false
        _this.id = "marker" + Math.round(Math.random() * 10000)
        _this.billboards.add({
          id: _this.id,
          position: cvt.screenWorld(_this.scenePos),
          image: _this.defaultImage
        })
        _this.labels.add({
          position: cvt.screenWorld(_this.scenePos),
          id: _this.id,
          text: '',
          font: '24px sans-serif',
          fillColor: Cesium.Color.BLACK,
          outlineWidth: 5,
          outlineColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(20, 20),
          style: Cesium.LabelStyle.FILL_AND_OUTLINE
        })
        this.markName = ""
        if (input) {
          //_this.createInput()
          _this.isShow = true
          //显示编辑界面
        }

      },
      /**
       * 更新标记文字内容
       * @param text
       */
      update: function () {
        const newtext = this.markName
        if (this.curIndex == undefined) {
          this.curIndex = this.labels.length - 1
        }
        this.labels.get(this.curIndex).text = newtext
        this.isShow = false
        this.markName = ""
        this.curIndex = undefined
        //this.removeInput()
      },
      drop() {
        const _this = this
        const popdiv = document.getElementById('popContainer')
        if (popdiv) {
          document.body.removeChild(popdiv)
        }
        if (!Cesium.defined(_this.selectedObj)) {
          return
        }
        const obj = _this.selectedObj
        for (let index = 0; index < _this.billboards.length; index++) {

          if (_this.billboards.get(index) == obj.primitive) {
            _this.labels.remove(_this.labels.get(index))
            break
          }
        }
        Bus.$emit('olRemoveMarker', obj.primitive.id)
        _this.billboards.remove(obj.primitive)
        _this.menuShow = false
        _this.selectedObj = undefined
      },
      edit() {
        const _this = this
        if (!Cesium.defined(_this.selectedObj)) {
          return
        }
        const obj = _this.selectedObj
        _this.isShow = true
        //_this.createInput()
        for (let index = 0; index < _this.billboards.length; index++) {

          if (_this.billboards.get(index) === obj.primitive) {
            _this.curIndex = index
            break
          }
        }
        _this.markName=_this.labels.get(this.curIndex).text
        // _this.$store.state.id = obj.id
        _this.menuShow = false
        _this.selectedObj = undefined
      },
      removeAll() {
        this.billboards.removeAll()
        this.labels.removeAll()
        //this.removeInput()
        this.isShow = false
        const popdiv = document.getElementById('popContainer')
        if (popdiv) {
          document.body.removeChild(popdiv)
        }
      },
      /**
       * 设置编辑界面的位置，使其跟随鼠标
       * @param event
       * @returns {{x: number, y: number}}
       */
      getPosition(event) {

        // if(!_this.menuShow){
        //   return
        // }
        let x, y
        if (event.x > 120) {
          x = event.x - 110
        } else {
          x = event.x + 10
        }
        if (event.y > 70) {
          y = event.y - 60
        } else {
          y = event.y + 10
        }
        return {x: x, y: y}

      },

      destroy() {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
        // this.handler.destroy()
        if (Cesium.defined(this.labels)) {
          this.labels.removeAll()
          this.labels.destroy()
        }
        if (Cesium.defined(this.billboards)) {
          this.billboards.removeAll()
          this.billboards.destroy()
        }
        this.viewer = undefined

      }
    },
    watch:{
      isShow(n,o){//不生效求解决
        const self=this
        if(n){
          self.$nextTick(e=>{
            self.$refs['nameinput'].$el.children[0].focus();
          })
        }
      }
    }
  }
</script>

<style>
  #msg1, .msg {
    width: 150px;
    height: 30px;
    position: fixed;
  }

  #submit1, .submit {
    position: fixed;
    height: 34px;
    width: 34px;

  }

  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 3px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 0px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .form-control:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
  }

  .form-control::-moz-placeholder {
    color: #999;
    opacity: 1;
  }

  .form-control:-ms-input-placeholder {
    color: #999;
  }

  .form-control::-webkit-input-placeholder {
    color: #999;
  }

  .btn-primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }

  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 0px;
  }

  #menu {
    position: fixed;
    width: 100px;
    height: 70px;
    border: 2px solid #b7b1a3;
    background-color: #ffffff;
    text-align: left;
  }

  #menu > div > a, #menu > div > a:visited {
    font-size: 14px;
    text-decoration: none;
    color: #000000;
  }

  #menu > div {
    width: 80px;
    height: 30px;
    line-height: 30px;
    vertical-align: center;
    padding-left: 20px;
    padding-top: 0px;
  }

  #menu > div:hover {
    background-color: #E5E5E5;
  }

  #popContainer {
    width: 200px;
    height: 70px;
    position: fixed;
    color: white;
    background-color: #636363;
    text-align: left;
    padding-left: 10px;
    padding-top: 5px;
    border-radius: 5px 5px 5px 5px;
    visibility: visible;
  }

  .arrow {
    position: absolute;
    top: 70px;
    left: 95px;
    width: 0px;
    height: 0px;
    border-width: 10px;
    border-style: solid;
    border-color: #636363 transparent transparent transparent;
  }

  #createPanel {
    left: 0px;
    top: 0px;
    width: 340px;
    height: 210px;
    position: fixed;
    border: 1px solid #b7b1a3;
    background-color: whitesmoke;
  }

  #createPanel .el-input {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-top: 0px;
    width: 80%;
    margin-bottom: 30px !important;
    margin-left: 0px !important;
  }

  #createPanel .el-button {
    display: inline-block;
    margin-top: 20px;
    margin-right: 20px;
    float: right;
  }

  #createPanel .el-header {
    height: 30px !important;
    line-height: 30px;
  }

  #createPanel .closebtn:after {
    content: '✖';
    float: right;
  }

  #createPanel .closebtn:hover {
    color: deepskyblue;
  }

  #createPanel .el-footer {
    padding-right: 20%;
  }

  #createPanel .el-textarea {
    width: 80%;
  }

  #createPanel .el-aside {
    width: 20% !important;
    padding-left: 10px;
    text-align: left;
    line-height: 20px;
  }

  #createPanel .el-main {
    width: 70%;
    padding-left: 10px !important;
  }

  #createPanel .el-main {
    padding: 0px 0px 0px 0px;
  }

  #createPanel img {
    margin-top: 8px;
    margin-left: 5px;
  }

  .crusor-tip {
    width: 200px;
    height: 30px;
    line-height: 30px;
    vertical-align: center;
    border: 1px solid #E5E5E5;
    color: white;
    background-color: #00000099;
    position: fixed;
  }
</style>

