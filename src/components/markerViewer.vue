<!--
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-12-18 10:32:33
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 13:48:29
 * @Desc: 包括点标绘、文字标绘、模型标绘
 -->
<template>
  <div id="markerContainer">
    <div
      id="createMerkerPanel"
      v-if="markMode==='marker'"
      v-show="visible"
      :style="{left:panelPosition().x+'px',top:panelPosition().y+'px'}"
    >
      <el-container v-show="!selectPanel">
        <el-header>
          <span>添加标记</span>
          <span class="closebtn iconfont icon-guanbi" @click="cancelMark"></span>
        </el-header>

        <el-container>
          <el-container>
            <el-main class="marker-main-class">
              名称：
              <el-input
                v-model="markName"
                ref="nameinput"
                @keyup.enter.native="update"
              ></el-input>
              <br />描述：
              <el-input v-model="markRemark" type="textarea"></el-input>
            </el-main>
            <el-aside>
              <img :src="selectedImage" />
              <br />
              <a href="#" id="imageC" @click="selectPanel=true">更换</a>
            </el-aside>
          </el-container>
          <el-footer>
            <el-button type="danger" id="cancelbtn" plain size="mini" @click="cancelMark">删除</el-button>
            <el-button type="primary" plain size="mini" id="submitbtn" @click="update">确定</el-button>
          </el-footer>
        </el-container>
      </el-container>
      <el-container v-show="selectPanel" class="image-list-class">
        <!-- <img :src="noImage" @click="changeHandler(undefined)"> -->
        <img v-for="(img,index) in images" :src="img" :key="index" @click="changeHandler(img)" />
      </el-container>
    </div>
    <div
      id="createLabelPanel"
      :style="{left:panelPosition().x+'px',top:panelPosition().y+'px'}"
      v-if="markMode==='label'"
      v-show="visible"
    >
      <el-input v-model="markName" @keypress.enter.native="update"></el-input>
      <el-button size="mini" @click="update">确定</el-button>
    </div>
    <input type="file" v-show="false" @change="importMarks" id="uploadhandler" accept=".json" />
  </div>
</template>
<script>
import { CesiumBillboard, CesiumLabel, CesiumModel } from "../core/Graphic";
import utils from "@/js/utils";
import GraphicType from "../core/GraphicType";
const Cesium = window.Cesium;
const defined = Cesium.defined;
const cvt = utils.CVT;
const LEFT_CLICK = Cesium.ScreenSpaceEventType.LEFT_CLICK;
const RIGHT_CLICK = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
const MOUSE_MOVE = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
let markerViewer, pickHandler, markerManager;
export default {
  name: "cesiumMarkerViewer",
  data() {
    return {
      visible: false,
      selectPanel: false,
      markName: "",
      markRemark: "",
      images: [],
      markMode: "marker",
      defaultImage: CesiumBillboard.defaultStyle.image,
      selectedImage: CesiumBillboard.defaultStyle.image,
      popWinPosition: undefined,
      markerOptions: {
        ...CesiumBillboard.defaultLabelStyle,
        ...CesiumModel.defaultStyle
      },
      markerid: undefined,
      noImage: CesiumBillboard.defaultStyle.image
    };
  },
  computed: {},
  components: {},
  props: {
    extendImage: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  directives: {
    focus: {
      bind: function(el) {
        el.focus();
      },
      updated: function(el) {
        el.focus();
      },
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted() {
    this.images = [this.defaultImage, ...this.extendImage];
    markerManager = new Map();

    this.selectedImage = this.defaultImage;
  },
  methods: {
    /**
     * 初始化
     * 创建markerViewer后必须调用该方法
     */
    init(viewer) {
      if (viewer instanceof Cesium.Viewer == false) {
        throw new Error("viewer 不是一个有效的Cesium Viewer对象");
      }
      markerViewer = viewer;
      // this.createContext();
      this.cursorTip = new utils.CursorTip(
        "左键标绘，右键结束.",
        "marker-tip",
        viewer
      );
      this.cursorTip.visible = false;
      if (viewer instanceof Cesium.Viewer === false) {
        throw new Error("viewer不是一个有效的Cesium Viewer对象.");
      }
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      const self = this;
      //气泡跟随地球移动
      viewer.scene.postRender.addEventListener(function() {
        if (defined(self.popWinPosition)) {
          const pos = cvt.cartesian2Pixel(self.popWinPosition, viewer);

          const ele = document.getElementById("popContainer");
          if (!ele) {
            return;
          }
          ele.style.left = pos.x - 100 - 2 + "px";
          ele.style.top = pos.y - 100 + "px";

          const curPos = self.popWinPosition;
          const cameraPos = viewer.camera.position;
          let n = viewer.scene.globe.ellipsoid.cartesianToCartographic(
            cameraPos
          ).height;
          const radius = viewer.scene.globe.ellipsoid.maximumRadius;
          //标记转到地球背面隐藏气泡
          if (
            !((n += 1 * radius),
            Cesium.Cartesian3.distance(curPos, cameraPos) > n)
          ) {
            ele.style.display = "block";
          } else {
            ele.style.display = "none";
          }
          // ele.style.display = "block";
        }
      });
      const showTip = function(e) {
        const obj = viewer.scene.pick(e.position);
        if (
          defined(obj) &&
          obj.id instanceof Cesium.Entity &&
          obj.id.gvtype === GraphicType.MARKER
        ) {
          //   self.popWinPosition = cvt.pixel2Cartesian(e.position, viewer);
          self.selectedMarker = markerManager.get(obj.id.gvid);
          if (self.popDiv) {
            self.destroyPopPanle();
          } else {
            self.createPopPanel();
          }
        } else {
          self.destroyPopPanle();
        }
      };

      handler.setInputAction(showTip, LEFT_CLICK);
    },
    /**
     * 开始拾取marker，调用该方法后开始监听鼠标单击，添加标记
     * @type {String}表示何种标记,marker:billboard，label:label,model:model
     * @mode {String} 如果mode不是single，将连续添加标记
     */
    pick(type = "marker", mode = "single") {
      this.markMode = type;
      const viewer = markerViewer;
      this.cursorTip.visible = true;
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      pickHandler = handler;
      const self = this;
      const id = this.generateId();

      const pick = function(e) {
        const cartesian = cvt.pixel2Cartesian(e.position, viewer);
        if (Cesium.defined(cartesian)) {
          // mp.position = cartesian;
          let marker;
          if (type === "marker") {
            marker = self.createMarker(cartesian);
          } else if (type === "label") {
            marker = self.createLabel(cartesian);
          } else if (type === "model") {
            marker = self.createModel(cartesian);
          } else {
            //默认marker
            marker = self.createMarker(cartesian);
          }
          self.visible = true;
          markerManager.set(id, marker);
          marker.gvid = id;
          // marker.gvname = "未命名" + viewer.entities.values.length;
          self.$emit("addEvent", marker.gvid, marker.gvname, marker.gvtype);
          self.selectedMarker = marker;
          self.activeMarker = marker;
          self.markerid = id;
          self.cursorTip.visible = false;
          if (type === "model") {
            self.activeMarker = undefined;
          }
          if (mode === "single") {
            handler.removeInputAction(LEFT_CLICK);
          }
        }
      };
      const cancel = function() {
        handler.removeInputAction(LEFT_CLICK);
        handler.removeInputAction(RIGHT_CLICK);
        handler.destroy();
        self.$emit("deleteEvent");
        self.cursorTip.visible = false;
        self.activeMarker = undefined;
        //handler=undefined
      };
      const updateTip = function(e) {
        self.cursorTip.updatePosition(e.endPosition);
      };
      handler.setInputAction(cancel, RIGHT_CLICK);

      handler.setInputAction(pick, LEFT_CLICK);
      handler.setInputAction(updateTip, MOUSE_MOVE);
    },
    createMarker(cartesian) {
      const mp = this.markerOptions;
      const marker = new CesiumBillboard(
        markerViewer,
        { position: cartesian, image: this.selectedImage },
        mp
      );
      return marker;
    },
    panelPosition() {
      if (this.activeMarker) {
        if (this.markMode === "marker") {
          const position = this.activeMarker.graphic.position.getValue();
          const pixel = cvt.cartesian2Pixel(position, markerViewer);
          const x = pixel.x > 170 ? pixel.x - 170 : pixel.x + 10;
          const y = pixel.y > 210 ? pixel.y - 240 : pixel.y + 50;
          return { x: x, y: y };
        } else {
          const position = this.activeMarker.graphic.position.getValue();
          const pixel = cvt.cartesian2Pixel(position, markerViewer);
          const x = pixel.x + 10;
          const y = pixel.y - 25;
          return { x: x, y: y };
        }
      } else {
        return { x: 0, y: 0 };
      }
    },
    createLabel(cartesian) {
      const options = this.markerOptions;
      options.position = cartesian;

      const marker = new CesiumLabel(markerViewer, options);
      return marker;
    },
    createModel(cartesian) {
      const options = this.markerOptions;
      options.position = cartesian;
      const marker = new CesiumModel(markerViewer, options);

      return marker;
    },
    removeEventListener() {
      if (pickHandler) {
        if (!pickHandler.isDestroyed()) {
          pickHandler.destroy();
          pickHandler.removeInputAction(LEFT_CLICK);
          pickHandler.removeInputAction(RIGHT_CLICK);
          pickHandler.removeInputAction(MOUSE_MOVE);
        }
      }
    },
    stopPick() {
      this.removeEventListener();
      if (this.activeMarker) {
        this.activeMarker.destroy();
        this.$emit("deleteEvent", this.activeMarker.gvid);
      }
      this.visible = false;
      this.activeMarker = undefined;
    },
    zoomTo(id) {
      if (markerManager.has(id)) {
        markerManager.get(id).zoomTo();
      }
    },
    edit(id) {
      if (markerManager.has(id)) {
        const mm = markerManager.get(id);
        this.activeMarker = markerManager.get(id);
        if (
          mm.gvtype === GraphicType.MARKER ||
          mm.gvtype === GraphicType.LABEL
        ) {
          this.markName = this.activeMarker.gvname;
          this.markRemark = this.activeMarker.description;
          this.visible = true;
        }
        // this.activeMarker.zoomTo();
        this.$emit("editEvent", this.activeMarker.type);
      }
    },
    drop(id) {
      const mm = markerManager.get(id);
      mm && mm.destroy();
      markerManager.delete(id);
    },
    rename(id, name) {
      const mm = markerManager.get(id);
      mm.gvname = name;
    },
    select(type, id, status) {
      if (defined(id)) {
        const manager = markerManager.get(id);
        if (defined(manager)) {
          manager.show = status;
        }
      }
      if (defined(type)) {
        const values = markerManager.values();
        for (let v of values) {
          if (v.gvtype === type) {
            v.show = status;
          }
        }
      }
    },
    destroyPopPanle() {
      if (this.popDiv) {
        this.$el.removeChild(this.popDiv);
        this.popDiv = undefined;
      }
    },
    createPopPanel() {
      if (!defined(this.selectedMarker)) {
        return;
      }
      if (this.popDiv) {
        this.destroyPopPanle();
      }
      const popdiv = document.createElement("div");
      popdiv.id = "popContainer";
      popdiv.className = "popWin-class";
      const position = this.selectedMarker.position;
      this.popWinPosition = position;
      const coord = cvt.cartesian2Degrees(position, markerViewer);
      popdiv.style.display = "none";
      const txtdiv = document.createElement("span");
      txtdiv.innerText = "名称:" + (this.selectedMarker.name || "未命名");
      const coordsdiv = document.createElement("span");
      coordsdiv.innerText =
        "纬度:" + coord.lon.toFixed(2) + "  纬度:" + coord.lat.toFixed(2);
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      const closebtn = document.createElement("span");
      closebtn.className = "iconfont icon-guanbi closebtn";
      const self = this;
      closebtn.onclick = function() {
        self.$el.removeChild(self.popDiv);
        self.popDiv = undefined;
      };
      popdiv.appendChild(closebtn);
      popdiv.appendChild(txtdiv);
      popdiv.appendChild(coordsdiv);
      popdiv.appendChild(arrow);
      this.popDiv = popdiv;
      this.$el.appendChild(this.popDiv);
    },
    import(feat) {
      if (feat.geometry.type.toUpperCase() !== "POINT") {
        throw new Error("无效的数据类型.");
      }
      const id = this.generateId();
      let marker;
      if (feat.properties.gvtype === GraphicType.LABEL) {
        const lopts = CesiumLabel.defaultStyle;
        lopts.position = Cesium.Cartesian3.fromDegrees(
          ...feat.geometry.coordinates
        );
        lopts.text = feat.properties.name;
        marker = new CesiumLabel(markerViewer, lopts);
      } else {
        const coord = {
          lon: feat.geometry.coordinates[0],
          lat: feat.geometry.coordinates[1],
          height: feat.geometry.coordinates[2]
        };
        marker = CesiumBillboard.fromDegrees(markerViewer, coord);
      }
      marker.gvname = feat.properties.name;
      marker.gvid = id;
      markerManager.set(id, marker);
      this.$emit(
        "addEvent",
        marker.gvid,
        marker.gvname || "未命名",
        marker.gvtype
      );
    },
    export(type) {
      const managers = markerManager.values();
      const json = {
        type: "FeatureCollection",
        name: "graphic",
        crs: {
          type: "name",
          properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
        },
        features: []
      };

      for (let m of managers) {
        if (m.type === type) {
          json.features.push(m.toGeoJson());
        }
      }
      const blob = new Blob([JSON.stringify(json)], { type: "" });

      window.saveAs(blob, type + parseInt(Cesium.getTimestamp()) + ".geojson");
    },
    setFont(font) {
      this.markerOptions.font = font;
      if (this.activeMarker) {
        this.activeMarker.font = font;
      }
    },
    getFont() {
      if (this.activeMarker) {
        return this.activeMarker.font;
      }
      return undefined;
    },
    setColor(color) {
      this.markerOptions.fillColor = color;
      if (this.activeMarker) {
        this.activeMarker.color = color;
      }
    },
    setLabel(option) {
      const keys = Object.keys(option);
      for (let key of keys) {
        this.markerOptions[key] = option[key];
      }
      // this.markerOptions=[...this.markerOptions,...option]
      if (this.activeMarker) {
        this.activeMarker.setLabel(this.markerOptions);
      }
    },
    setModel(options) {
      this.markerOptions = { ...this.markerOptions, ...options };
      if (this.activeMarker) {
        if (options.uri) {
          this.activeMarker.uri = options.uri;
        }
        if (options.color) {
          this.activeMarker.color = options.color;
        }
        if (options.mode != undefined) {
          this.activeMarker.model = options.mode;
        }
        if (options.mixed != undefined) {
          this.activeMarker.mixed = options.mixed;
        }
      }
    },
    removeAll() {
      const values = markerManager.values();
      for (let v of values) {
        v.remove();
        v.destroy();
      }
      markerManager.clear();
    },
    cancelMark() {
      this.activeMarker && this.activeMarker.destroy();
      this.activeMarker = undefined;
      this.visible = false;
      this.cursorTip.visible = false;
      this.$emit("deleteEvent", this.markerid);
      this.markName = "";
      this.markRemark = "";
      markerManager.delete(this.markerid);
      this.markerid = undefined;
      this.removeEventListener();
    },
    update() {
      //   this.activeMarker.updateImage(this.selectedImage);
      this.activeMarker.updateText(this.markName, this.markRemark);
      this.visible = false;
      this.cursorTip.visible = false;
      this.$emit(
        "updateEvent",
        this.activeMarker.gvid,
        this.activeMarker.gvname
      );
      this.markName = "";
      this.markRemark = "";
      this.activeMarker = undefined;
      this.removeEventListener();
    },
    changeHandler(img) {
      this.selectedImage = img;
      this.activeMarker.updateImage(this.selectedImage);
      this.selectPanel = false;
    },
    generateId() {
      return (
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        "-" +
        new Date().getTime() +
        "-" +
        Math.random()
          .toString()
          .substr(2, 5)
      );
    },
    importMarks() {}
  },
  watch: {
  }
};
</script>

<style lang='scss' scoped>
#msg1,
.msg {
  width: 150px;
  height: 30px;
  position: fixed;
}

#submit1,
.submit {
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
  color: $color;
  background-color: $bg-color;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: $b-radius;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.form-control::-moz-placeholder {
  color: $color;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: $color;
}

.form-control::-webkit-input-placeholder {
  color: $color;
}

.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.marker-main-class {
  color: $color;
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
  background-color: $bg-color;
  text-align: left;
}

#createMerkerPanel {
  /deep/ a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      font-size: 14px;
      text-decoration: none;
      color: $color;
    }
  }
  /deep/ .el-button--primary {
    span {
      color: #409eff !important;
    }
    &:hover {
      span {
        color: #ffffff !important;
      }
    }
  }
  /deep/ .el-button--danger {
    span {
      color: #f56c6c !important;
    }
    &:hover {
      span {
        color: #ffffff !important;
      }
    }
  }
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
  background-color: #e5e5e5;
}

.no-image-class {
  width: 24px;
  height: 24px;
  line-height: 24px;
}
#createMerkerPanel {
  left: 0px;
  top: 0px;
  width: 340px;
  height: 210px;
  position: fixed;
  border: 0px solid #b7b1a3;
  background-color: $bg-color;
  color: $color;
  .image-list-class {
    display: block;
    padding: 10px;
  }
}

#createMerkerPanel .el-input {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  margin-top: 0px;
  width: 78%;
  margin-bottom: 30px !important;
  margin-left: 0px !important;
}

#createMerkerPanel .el-button {
  display: inline-block;
  margin-top: 20px;
  margin-right: 20px;
  float: right;
}

#createMerkerPanel .el-header {
  height: 45px !important;
  line-height: 30px;
  color: $color;
  padding: $padding;
  span{
    margin:$item-margin;
    color:$color;
  }
}

#createMerkerPanel .el-footer {
  padding-right: 20%;
}

#createMerkerPanel .el-textarea {
  width: 78%;
}

#createMerkerPanel .el-aside {
  width: 20% !important;
  // padding-left: 10px;
  text-align: center;
  line-height: 20px;
  a {
    display: inline-block;
    width: 32px;
  }
}

#createMerkerPanel .el-main {
  width: 70%;
  padding-left: 10px !important;
}

#createMerkerPanel .el-main {
  padding: 0px 0px 0px 0px;
}

#createMerkerPanel img {
  margin-top: 8px;
  // width:32px;
  // height:32px;
  // margin-left: 5px;
}

.crusor-tip {
  width: 200px;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  border: 1px solid #e5e5e5;
  color: white;
  background-color: #00000099;
  position: fixed;
}
#createLabelPanel {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 320px;
  .el-input {
    display: inline-block;
    width: 200px;
    margin: 0 10px;
    vertical-align: middle;
    /deep/ .el-input__inner {
      background-color: $bg-color;
      border: 1px solid $border-color;
      border-radius: $b-radius;
      width: 199px;
      height: 38px;
      color: #ffffff;
    }
  }
  .el-button {
    display: inline-block;
    // width:60px;
    margin: 0 2px;
    width: 92px;
    height: 36px;
    background-color: $color;
    border: none;
    color: #ffffff;
    border-radius: $b-radius;
    vertical-align: middle;
  }
}
</style>

