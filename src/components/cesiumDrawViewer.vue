<!--
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-12-19 12:37:53
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 18:44:03
 * @Desc: cesium标绘面板
 -->
<template>
  <div id="drawtoolPanel" v-show="visible">
    <el-container>
      <el-header id="drawtoolHead">
        <span>基础标绘</span>
        <span class="closebtn iconfont icondelete" @click="$emit('closeEvent')"></span>
        <!-- <span class="clostbtn" @click="measurePanelShow=false"></span> -->
      </el-header>
      <el-main class="graphic-draw-main">
        <ul>
          <li>
            <i
              class="iconfont iconmarker icon-class"
              title="添加标记"
              :class="{'selected-graphic':menuSelected['MARKER']}"
              @click="menuAction('MARKER')"
            ></i>
            <span
              @click="menuAction('MARKER')"
              :class="{'selected-graphic':menuSelected['MARKER']}"
            >标记</span>
          </li>
          <li>
            <i
              class="iconfont iconpolyline icon-class"
              title="添加线段"
              :class="{'selected-graphic':menuSelected['POLYLINE']}"
              @click="menuAction('POLYLINE')"
            ></i>
            <span
              @click="menuAction('POLYLINE')"
              :class="{'selected-graphic':menuSelected['POLYLINE']}"
            >折线</span>
          </li>
          <li>
            <i
              class="iconfont iconpolygon icon-class"
              title="添加多边形"
              :class="{'selected-graphic':menuSelected['POLYGON']}"
              @click="menuAction('POLYGON')"
            ></i>
            <span
              @click="menuAction('POLYGON')"
              :class="{'selected-graphic':menuSelected['POLYGON']}"
            >多边形</span>
          </li>
          <li>
            <i
              class="iconfont iconlabel icon-class"
              title="添加文字"
              :class="{'selected-graphic':menuSelected['LABEL']}"
              @click="menuAction('LABEL')"
            ></i>
            <span
              @click="menuAction('LABEL')"
              :class="{'selected-graphic':menuSelected['LABEL']}"
            >文字</span>
          </li>
          <li v-if="extendMarkerModel.length">
            <i
              class="iconfont iconmodel icon-class"
              title="添加模型"
              :class="{'selected-graphic':menuSelected['MODEL']}"
              @click="menuAction('MODEL')"
            ></i>
            <span
              @click="menuAction('MODEL')"
              :class="{'selected-graphic':menuSelected['MODEL']}"
            >模型</span>
          </li>
          <!-- <li>
            <i
              class="font-btn"
              title="添加文字"
              :class="{'font-selected':menuSelected['LABEL']}"
              @click="menuAction('LABEL')"
            ></i>
            <span @click="menuAction('LABEL')">文字</span>
          </li>-->
          <li>
            <i
              class="iconfont iconlayer icon-class"
              :class="{'selected-graphic':layerManagerVisible}"
              title="图层管理"
              @click="layerManagerVisible=!layerManagerVisible"
            ></i>
            <span
              :class="{'selected-graphic':layerManagerVisible}"
              @click="layerManagerVisible=!layerManagerVisible"
            >图层</span>
          </li>
        </ul>
      </el-main>
    </el-container>

    <div class="graphic-edit" v-show="editMode">
      <div class="marker-edit-class edit-class" v-show="menuSelected['MARKER']">
        <el-color-picker v-model="markerColor" id="markerColor" show-alpha size="mini"></el-color-picker>
        <el-select
          size="mini"
          v-model="fontSize"
          allow-create
          filterable
          title="字号"
          default-first-option
          placeholder="请选择"
        >
          <el-option v-for="item in fontSizeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>

        <el-popover placement="top" width="160" v-model="markerOptionsVisible">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请在此定义LabelGraphic"
            v-model="markerOption"
          ></el-input>

          <div style="text-align: right; margin: 0">
            <el-button
              size="mini"
              type="text"
              @click="markerOption='';markerOptionsVisible=false"
            >取消</el-button>
            <el-button type="primary" size="mini" @click="setLabel">确定</el-button>
          </div>
          <!-- <img
            slot="reference"
            src="~@/assets/images/icon/marker-ad.png"
            title="高级"
            height="24"
            width="24"
          />-->
        </el-popover>
      </div>
      <div class="polyline-edit-class edit-class" v-show="menuSelected['POLYLINE']">
        <el-color-picker title="颜色" id="lineColor" v-model="lineColor" show-alpha size="mini"></el-color-picker>
        <el-select
          size="mini"
          title="线宽"
          class="width-selector"
          v-model="lineWidth"
          allow-create
          filterable
          default-first-option
          placeholder="请选择"
        >
          <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select
          size="mini"
          class="style-selector"
          title="直线样式"
          v-model="lineStyle"
          default-first-option
          placeholder="请选择"
        >
          <el-option
            v-for="item in lineStyleList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          size="mini"
          title="直线类型"
          class="type-selector"
          v-model="graphicHeight"
          default-first-option
          placeholder="请选择"
        >
          <el-option
            v-for="item in heightList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="polygon-edit-class edit-class" v-show="menuSelected['POLYGON']">
        <el-color-picker
          title="填充色"
          id="polygonColor"
          v-model="polygonColor"
          show-alpha
          size="mini"
        ></el-color-picker>
        <el-select
          size="mini"
          title="多边形类型"
          class="type-selector"
          v-model="graphicHeight"
          default-first-option
          placeholder="请选择"
        >
          <el-option
            v-for="item in heightList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <i
          class="iconfont iconoutline border-btn"
          :class="{'outline-selected':outline}"
          title="边框"
          @click="outline=!outline"
        ></i>
        <el-color-picker
          title="边框充色"
          id="outlineColor"
          v-show="outline"
          v-model="outlineColor"
          show-alpha
          size="mini"
        ></el-color-picker>

        <el-select
          size="mini"
          title="边框宽度"
          v-show="outline"
          class="width-selector"
          v-model="outlineWidth"
          allow-create
          filterable
          default-first-option
          placeholder="请选择"
        >
          <el-option v-for="item in lineWidthList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="label-edit-class edit-class" v-show="menuSelected['LABEL']">
        <el-select
          v-model="fontFamily"
          class="font-selector"
          allow-create
          filterable
          size="mini"
          title="字体"
          default-first-option
          placeholder="请选择"
        >
          <el-option v-for="item in fontList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select
          size="mini"
          v-model="fontSize"
          class="size-selector"
          allow-create
          filterable
          title="字号"
          default-first-option
          placeholder="请选择"
        >
          <el-option v-for="item in fontSizeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-color-picker title="颜色" v-model="markerColor" id="labelColor" show-alpha size="mini"></el-color-picker>
      </div>
      <div class="model-edit-class edit-class" v-show="menuSelected['MODEL']">
        <el-popover
          placement="bottom"
          id="model-select"
          width="160"
          v-model="modelSelectPanelvisible"
        >
          <div class="model-select-panel">
            <img
              v-for="item in extendMarkerModel"
              :title="item.name"
              :key="item.id"
              @click="selectModel(item)"
              :src="modelThumb(item)"
              :onerror="defaultImage"
            />
          </div>
          <i
            class="iconfont icon-sanweimoxing model-selector-trigger"
            slot="reference"
            title="选择模型"
          ></i>
        </el-popover>
        <el-select
          v-model="modelMode"
          size="mini"
          title="模式"
          default-first-option
          placeholder="请选择"
        >
          <el-option
            v-for="item in modelModeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-color-picker title="颜色" id="modelColor" v-model="modelColor" show-alpha size="mini"></el-color-picker>
        <el-slider
          v-show="modelMode==='Mix'"
          title="混合度"
          v-model="modelMixed"
          :min="0"
          :max="1"
          :step="0.1"
          :show-tooltip="true"
        ></el-slider>
      </div>
    </div>
    <MarkerViewer
      ref="markerManager"
      @deleteEvent="deleteMarker"
      @editEvent="editMarker"
      @addEvent="addMarker"
      @updateEvent="updateMarker"
      :extendImage="extendMarkerImage"
    ></MarkerViewer>
    <layerManager
      ref="layerManager"
      @locate="locateGraphic"
      @edit="editGraphic"
      @delete="deleteGraphic"
      @rename="renameGraphic"
      @select="selectGraphic"
      @clear="clearGraphic"
      @close="closeLayerManager"
      @import="importGraphic"
      @export="exportGraphic"
      v-show="layerManagerVisible"
      class="layer-manager-class"
      :class="{'edit-layer-manager-class':editMode}"
    ></layerManager>
    <input
      type="file"
      v-show="false"
      @change="importfp"
      id="graphicuploadhandler"
      accept=".geojson, .shp"
    />
  </div>
</template>
<script>
import CesiumDrawing from "../core/CesiumDrawing";
import MarkerViewer from "../components/markerViewer";
import { CesiumPolygon } from "../core/Graphic";
import layerManager from "./layerManager";
import GraphicType from "../core/GraphicType";
import { open } from "shapefile";
import { moveDiv } from "@/js/utils";
import $ from "jquery";
let graphicManager = undefined;
const Cesium = window.Cesium;
const console = window.console;
export default {
  name: "cesiumDrawViewer",
  data() {
    return {
      visible: true,
      editMode: false,
      graphicType: undefined,
      menuSelected: {},
      layerManagerVisible: false,
      markerColor: "rgba(255, 255,255, 1)",
      fontSize: "28px",
      markerFont: "sans-serif",
      markerOptionsVisible: false,
      markerOption: "",
      lineColor: "rgba(247,224,32,1)",
      lineWidth: "3px",
      lineWidthList: [
        "1px",
        "2px",
        "3px",
        "4px",
        "5px",
        "6px",
        "8px",
        "10px",
        "12px"
      ],
      lineStyleList: [
        { value: "solid", name: "实线" },
        { value: "dash", name: "虚线" },
        { value: "glow", name: "发光线" },
        { value: "arrow", name: "箭头线" }
      ],
      lineStyle: "solid",
      graphicHeight: "GROUND_ADN_MODEL",
      //   lineHeight: "GROUND_ADN_MODEL",
      //   polygonHeight: "GROUND_ADN_MODEL",
      heightList: [
        { value: "GROUND_ADN_MODEL", name: "依附地形和模型" },
        { value: "GROUND", name: "依附地形" },
        { value: "MODEL", name: "依附模型" },
        { value: "NONE", name: "空间线" }
      ],
      outlineWidth: "3px",
      outlineColor: "rgba(247,224,32,1)",
      polygonColor: "rgba(247,224,32,0.5)",
      outline: true,
      imags: [
        "./static/images/markers/1.png",
        "./static/images/markers/2.png",
        "./static/images/markers/3.png",
        "./static/images/markers/4.png",
        "./static/images/markers/5.png",
        "./static/images/markers/6.png",
        "./static/images/markers/7.png",
        "./static/images/markers/8.png"
      ],
      fontSizeList: [
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "32px",
        "64px"
      ],
      fontList: ["sans-serif", "宋体"],
      fontFamily: "sans-serif",
      modelMode: "Highlight",
      modelModeList: [
        { value: "Highlight", name: "高亮" },
        { value: "Replace", name: "替换" },
        { value: "Mix", name: "混合" }
      ],
      modelColor: "#FFFFFF",
      modelMixed: 0.5,
      modelSelectPanelvisible: false,
      selectedModel: undefined
    };
  },
  computed: {
    defaultImage() {
      return 'this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1UlEQVQ4T6XTMWgUQRQG4P/N3gaRSBpBEAMqrldkYyXu5VCMChZBEDxOsDIgKKSyECxTWERIYe2hRdoLeKV2RhCymwhy3E48b087C7EQtRDj7vyyg3dKDGyI087MN/97MyP4zyFF+5vNpnPEP3neZGlNlFwBoU/53rnBvn+AsPP+AFRWgUFNKVwgcVCAp4C0lJu10lTNiTGdYLLcyhF52e3uG8lUDVRnDXhagEP5YkM2pia9la0Jw413nhhzKfC9BxaI4t4aII3A9x6FcXJbBGNFZQ3jG3Yk0snjYMK7EelkHsBGMOEt7xSI4oQSxr3lin+8ngPG4MV2sQdgGPdvCviQkFsV/1jDAmu6f6c0wqWfm5grAiKd1EE0IbiaJ7VApN+egcF+KHWiCNhamgVekW4a9xdE4dsAeK716F7jLkJUNXOzmWq5/GG7vlggn4ji5BkEqzngQDYpXARQtdcErKRje2aq4+PfbaOJKcC5G/hH20NgPU7uU/AjJT47wD0Ao3+fSMgTBXwlOPvnBcoSweu/E/SuUdRFQ7YdwD6QopEnIzBtgfV2t8ySM5sSH3cF2D7oZD4jvpSAy0Wn5/MEPgGoDz/T6us3hx231KVgYSeAbTAx/Qs/Rdq4fXky6QAAAABJRU5ErkJggg=="';
    }
  },
  props: {
    extendMarkerImage: {
      type: Array,
      default: function() {
        return [];
      }
    },
    extendMarkerModel: {
      type: Array,
      default: function() {
        return [];
      }
    },
    viewer: {}
  },
  components: {
    MarkerViewer,
    layerManager
  },
  mounted() {
    const self = this;
    moveDiv("drawtoolPanel", "drawtoolHead");
    this.$nextTick(() => {
      $("#drawtoolPanel .el-color-picker__icon").addClass("iconfont iconcolor");
    });
    document.addEventListener("addEvent", function(e) {
      self.pushLayerManaer(e.detail.gvtype, e.detail.gvid, e.detail.gvname);
    });
    document.addEventListener("stopEdit", function() {
      self.menuSelected = {};
      self.editMode = false;
      self.cesiumViewer.scene.globe.depthTestAgainstTerrain =
        self._depthTestAgainstTerrain;
    });
    document.addEventListener("startEdit", function(e) {
      self.menuSelected = {};
      self.menuSelected[e.detail.graphicType] = true;
      self.setControlByEvent(e);
      self.editMode = true;

      if (/.*MODEL.*/.test(self.graphicHeight)) {
        self.cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
      }
    });
    document.addEventListener("destroyEvent", function(e) {
      //   self.menuSelected = {};
      //   self.editMode = false;
      self.$refs.layerManager.drop(e.detail.gvid);
      self.cesiumViewer.scene.globe.depthTestAgainstTerrain =
        self._depthTestAgainstTerrain;
    });
    if (this.viewer instanceof Cesium.Viewer) {
      this.init(this.viewer);
    } else if (window.viewer instanceof Cesium.Viewer) {
      this.init(window.viewer);
    }
    this.$nextTick(() => {
      self.syncColor("markerColor", self.markerColor);
      self.syncColor("lineColor", self.lineColor);
      self.syncColor("polygonColor", self.polygonColor);
    });
  },
  methods: {
    init(viewer) {
      if (viewer instanceof Cesium.Viewer == false) {
        throw new Error("viewer 不是一个有效的Cesium Viewer对象");
      }
      this._depthTestAgainstTerrain =
        viewer.scene.globe.depthTestAgainstTerrain;
      this.$refs.markerManager.init(viewer);
      graphicManager = new CesiumDrawing(viewer);
      this.selectedModel = this.extendMarkerModel.length
        ? this.extendMarkerModel[0].url
        : undefined;
      this.cesiumViewer = viewer;
    },
    syncColor(parent, color) {
      const parents = [parent];
      //marker和label共用同一种颜色
      if (parent === "labelColor") {
        parents.push("markerColor");
      } else if (parent === "markerColor") {
        parents.push("labelColor");
      }
      const eles = $(
        ".el-color-picker__icon,.el-icon-arrow-down,.iconfont icon-seban"
      );
      for (let e of eles) {
        const target = $(e)
          .parent()
          .parent();
        if (target.length > 0 && parents.includes(target[0].id)) {
          $(e).css("color", color);
        }
      }
    },
    pushLayerManaer(type, id, name) {
      this.$refs.layerManager.insertLayer(type, id, name);
    },
    dropLayerManager(id) {
      console.log(id);
    },
    modelThumb(item) {
      if (item.thumb) {
        return item.thumb;
      }
      return this.defaultImage;
    },
    selectModel(item) {
      this.selectedModel = item.url;
      this.modelSelectPanelvisible = false;
      this.$refs.markerManager.setModel({ uri: item.url });
    },
    setControlByEvent(e) {
      if (e.detail.graphicType === "POLYGON") {
        const material = e.detail.material;
        const outlineColor = e.detail.outlineColor;
        if (material) {
          this.polygonColor = `rgba(${material.red * 255},${material.green *
            255},${material.blue * 255},${material.alpha})`;
        }
        this.outline = e.detail.outline;
        if (outlineColor) {
          this.outlineColor = `rgba(${outlineColor.red *
            255},${outlineColor.green * 255},${outlineColor.blue * 255},${
            outlineColor.alpha
          })`;
        }
        this.outlineWidth = e.detail.outlineWidth;
        this.graphicHeight = e.detail.heightReference;
      } else if (e.detail.graphicType === "POLYLINE") {
        this.graphicHeight = e.detail.heightReference;
        this.lineWidth = e.detail.width;
        const plmaterial = e.detail.material;
        if (plmaterial instanceof Cesium.PolylineDashMaterialProperty) {
          this.lineStyle = "dash";
        } else if (plmaterial instanceof Cesium.PolylineGlowMaterialProperty) {
          this.lineStyle = "glow";
        } else if (plmaterial instanceof Cesium.PolylineArrowMaterialProperty) {
          this.lineStyle = "arrow";
        } else {
          this.lineStyle = "solid";
        }
        this.lineColor = `rgba(${plmaterial.getValue().color.red *
          255},${plmaterial.getValue().color.green *
          255},${plmaterial.getValue().color.blue * 255},${
          plmaterial.getValue().color.alpha
        })`;
      }
    },
    stopOthers() {
      //   this.menuSelected = {};
      //   const manager = graphicManager.editManager;
      //   manager && manager.destroy();
      this.$refs.markerManager.stopPick();
      graphicManager.destroyManager();
      graphicManager.editManager = undefined;
    },
    setLabel() {
      let option;
      try {
        option = eval("(" + this.markerOption + ")");
        this.$refs.markerManager.setLabel(option);
      } catch (err) {
        console.log(err);
      }
      this.markerOptionsVisible = false;
    },
    updateMarker(gvid, gvname) {
      if (gvid) {
        gvname = gvname || "未命名";
        this.$refs.layerManager.rename(null, gvid, gvname);
      }
      this.editMode = false;
      this.menuSelected = {};
    },
    addMarker(gvid, gvname, gvtype) {
      this.pushLayerManaer(gvtype, gvid, gvname);
      if (gvtype === GraphicType.MODEL) {
        this.editMode = false;
        this.menuSelected = {};
      }
    },
    closeLayerManager() {
      this.layerManagerVisible = false;
    },
    exportGraphic(type) {
      if (type === "MARKER" || type === "LABEL") {
        this.$refs.markerManager.export(type);
      } else {
        graphicManager.export(type);
      }
    },
    importGraphic() {
      document.getElementById("graphicuploadhandler").click();
    },
    importfp() {
      const self = this;
      const evt = event ? event : window.event;
      // const cvt = convertTool(_this.viewer)
      const files = evt.target.files,
        ext = files[0].name.split(".")[1];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      if (ext.toLowerCase() === "geojson") {
        reader.readAsText(files[0]);
        reader.onload = function() {
          // _this[_this.upload2].import(JSON.parse(this.result));
          if (!this.result) {
            return;
          }
          try {
            const features = JSON.parse(this.result).features;
            for (let feat of features) {
              if (feat.geometry.type.toUpperCase() === "POINT") {
                self.$refs.markerManager.import(feat);
              } else {
                graphicManager.import(feat);
              }
            }
          } catch (e) {
            console.log(e);
          }
          document.getElementById("graphicuploadhandler").value = "";
        };
      } else if (ext.toLowerCase() === "shp") {
        reader.readAsArrayBuffer(files[0]);
        reader.onload = function() {
          open(this.result)
            .then(source =>
              source.read().then(function log(result) {
                if (result.done) return false;
                const feat = result.value;
                if (feat.geometry.type === "Point") {
                  self.$refs.markerManager.import(feat);
                } else {
                  graphicManager.import(feat);
                }
                return source.read().then(log);
              })
            )
            .catch(error => console.error(error.stack));
        };
        document.getElementById("graphicuploadhandler").value = "";
      }
    },
    editMarker(type) {
      this.editMode = true;
      // this.stopOthers();
      if (graphicManager.editManager) {
        graphicManager.editManager.stopEdit();
        graphicManager.editManager = undefined;
      }
      this.menuSelected = {};
      this.menuSelected[type] = true;
    },
    clearGraphic() {
      this.$refs.markerManager.removeAll();
      graphicManager.removeAll();
    },
    deleteMarker(id) {
      this.menuSelected["MARKER"] = false;
      this.editMode = false;
      this.$refs.layerManager.drop(id);
    },
    locateGraphic(id) {
      if (graphicManager.graphicManager.has(id)) {
        const manager = graphicManager.graphicManager.get(id);
        manager.zoomTo();
      } else {
        this.$refs.markerManager.zoomTo(id);
      }
    },
    editGraphic(id) {
      if (graphicManager.graphicManager.has(id)) {
        // const manager = graphicManager.graphicManager.get(id);
        graphicManager.edit(id);
      } else {
        this.$refs.markerManager.edit(id);
      }
    },
    selectGraphic(id, state) {
      if (id === "marker") {
        this.$refs.markerManager.select(GraphicType.MARKER, undefined, state);
      } else if (id === "label") {
        this.$refs.markerManager.select(GraphicType.LABEL, undefined, state);
      } else if (id === "model") {
        this.$refs.markerManager.select(GraphicType.MODEL, undefined, state);
      } else if (id === "polyline") {
        graphicManager.select(GraphicType.POLYLINE, undefined, state);
      } else if (id === "label") {
        graphicManager.select(GraphicType.POLYGON, undefined, state);
      } else {
        if (graphicManager.graphicManager.has(id)) {
          graphicManager.select(undefined, id, state);
        } else {
          this.$refs.markerManager.select(undefined, id, state);
        }
      }
    },
    deleteGraphic(id) {
      if (graphicManager.graphicManager.has(id)) {
        const manager = graphicManager.graphicManager.get(id);
        manager.destroy();
        graphicManager.graphicManager.delete(id);
      } else {
        this.$refs.markerManager.drop(id);
      }
      // this.$refs.layerManager.deleteNode(id)
    },
    renameGraphic(id, name) {
      const attr = /(.*?)</g.exec(name);
      name = /(.*?)</g.test(name) ? attr[1] : name;
      if (name === "未命名") {
        name = "";
      }
      if (graphicManager.has(id)) {
        graphicManager.rename(id, name);
      } else {
        this.$refs.markerManager.rename(id, name);
      }
    },
    menuAction(menu) {
      const graphic = ["MARKER", "POLYLINE", "POLYGON", "LABEL", "MODEL"];
      const bool = this.menuSelected[menu];
      this.menuSelected = {};
      graphicManager.tip.visible = false;
      if (bool) {
        this.menuSelected[menu] = false;
      } else {
        this.menuSelected[menu] = true;
      }

      if (graphic.includes(menu)) {
        if (this.graphicType === menu) {
          this.editMode = !this.editMode;
        } else {
          this.editMode = true;
        }
        this.graphicType = menu;
      } else {
        this.editMode = false;
      }
      this.stopOthers(menu);
      if (/.*MODEL*/.test(this.graphicHeight)) {
        if (!["MARKER", "LABEL", "MODEL", "LAYER"].includes(menu))
          //依附模型
          //几何图形要依附于模型必须开启depthTestAgainstTerrain
          this.cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
      } else {
        //viewer.scene.globe.depthTestAgainstTerrain = this._depthTestAgainstTerrain;
      }
      switch (menu) {
        case "MARKER":
          if (this.editMode) {
            this.$refs.markerManager.pick("marker");
          } else {
            this.$refs.markerManager.cancelMark();
          }
          break;
        case "POLYLINE":
          this.heightList[3].name = "空间线";
          if (this.editMode) {
            graphicManager.heightReference = this.graphicHeight;
            graphicManager.material = Cesium.Color.fromCssColorString(
              this.lineColor
            );
            graphicManager.createPolyline();
          } else {
            graphicManager.destroyManager();
          }

          break;
        case "POLYGON":
          this.heightList[3].name = "空间面";
          if (this.editMode) {
            //   this.lineHeight=undefined
            graphicManager.heightReference = this.graphicHeight;
            const option = CesiumPolygon.defaultStyle;
            option.outline = this.outline;
            option.outlineColor = Cesium.Color.fromCssColorString(
              this.outlineColor
            );
            option.outlineWidth = parseInt(this.outlineWidth);
            // option.color = Cesium.Color.fromCssColorString(this.polygonColor);
            graphicManager.material = Cesium.Color.fromCssColorString(
              this.polygonColor
            );
            graphicManager.style = option;
            graphicManager.createPolygon();
          } else {
            graphicManager.destroyManager();
          }

          break;
        case "LABEL":
          if (this.editMode) {
            this.$refs.markerManager.pick("label");
          } else {
            this.$refs.markerManager.cancelMark();
          }
          break;
        case "MODEL":
          if (this.editMode) {
            if (this.extendMarkerModel.length < 1) {
              this.editMode = false;
              throw new Error("没有可用的模型");
            }
            this.$refs.markerManager.setModel({ uri: this.selectedModel });
            this.$refs.markerManager.pick("model");
          } else {
            this.$refs.markerManager.cancelMark();
          }
      }
    },
    setLineMaterial(material, color) {
      switch (material) {
        case "solid":
          graphicManager.material = color;
          break;
        case "dash":
          graphicManager.material = new Cesium.PolylineDashMaterialProperty({
            color: color
          });
          break;
        case "glow":
          graphicManager.material = new Cesium.PolylineGlowMaterialProperty({
            color: color
          });
          break;
        case "arrow":
          graphicManager.material = new Cesium.PolylineArrowMaterialProperty(
            color
          );
          break;
      }
    }
  },
  watch: {
    fontSize(n) {
      n = parseInt(n);
      if (isNaN(n)) {
        n = "18";
      }
      n = n + "px";
      // console.log(this.$refs.markerManager.getFont())
      const fontFamily = this.menuSelected["MARKER"]
        ? this.markerFont
        : this.fontFamily;

      this.$refs.markerManager.setFont(n + " " + fontFamily);
    },
    markerColor(n) {
      if (!n) {
        return;
      }
      this.$refs.markerManager.setColor(Cesium.Color.fromCssColorString(n));
      this.syncColor("markerColor", n);
    },
    graphicHeight(n) {
      if (n === undefined) {
        return;
      }
      // if (/.*MODEL*/.test(n)) {
      //   //依附模型
      //   cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
      // } else {
      //   cesiumViewer.scene.globe.depthTestAgainstTerrain = this._depthTestAgainstTerrain;
      // }
      graphicManager.heightReference = n;
    },
    lineColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      const matrial = graphicManager.editManager.material;
      let materialStyle = "solid";
      if (matrial instanceof Cesium.PolylineDashMaterialProperty) {
        materialStyle = "dash";
      } else if (matrial instanceof Cesium.PolylineGlowMaterialProperty) {
        materialStyle = "glow";
      } else if (matrial instanceof Cesium.PolylineArrowMaterialProperty) {
        materialStyle = "arrow";
      }
      //   matrial.color = Cesium.clone(color);
      this.setLineMaterial(materialStyle, color);
      this.syncColor("lineColor", n);
    },
    lineStyle(n) {
      if (!this.lineColor) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(this.lineColor);
      this.setLineMaterial(n, color);
    },
    lineWidth(n) {
      let width = parseInt(n);
      if (isNaN(width)) {
        width = 3;
      }
      graphicManager.style = { width: width };
    },
    outline(n) {
      if (n) {
        graphicManager.editManager.createOutline();
        const color = Cesium.Color.fromCssColorString(this.outlineColor);
        const width = parseInt(this.outlineWidth) || 3;
        graphicManager.editManager.outline = n;
        graphicManager.style = {
          outline: true,
          outlineWidth: width,
          outlineColor: color
        };
      } else {
        graphicManager.editManager.removeOutline();
      }
    },
    polygonColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      graphicManager.material = color;
      this.syncColor("polygonColor", n);
    },
    outlineColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      graphicManager.style = { outlineColor: color };
      this.syncColor("outlineColor", n);
    },
    outlineWidth(n) {
      const width = parseInt(n) || 3;
      graphicManager.style = { outlineWidth: width };
    },
    fontFamily(n) {
      let size = parseInt(this.fontSize);
      if (isNaN(size)) {
        size = "18";
      }
      size = size + "px";
      // console.log(this.$refs.markerManager.getFont())

      this.$refs.markerManager.setFont(size + " " + n);
    },
    modelColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      this.$refs.markerManager.setModel({ color: color });
      this.syncColor("modelColor", n);
    },
    modelMode(n) {
      const mode = Cesium.ColorBlendMode[n.toUpperCase()];
      this.$refs.markerManager.setModel({ mode: mode });
    },
    modelMixed(n) {
      this.$refs.markerManager.setModel({ mixed: n });
    }
  }
};
</script>
<style lang="scss" scoped>
#drawtoolPanel {
  position: fixed;
  width: $draw-panel-width;
  top: 10px;
  right: 10px;
  height: 85px;
  right: 7px;
  border-radius: $b-radius;
  /* border: 1px solid #01c5fd;
  box-shadow: 0 0 5px rgba(1, 197, 253, 0.75); */
  z-index: 10;
  border-radius: $b-radius;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  font-size: $font-size;
}
.layer-manager-class {
  width: 400px;
  position: absolute;
  top: 90px;
}
.edit-layer-manager-class {
  top: 140px;
}
.graphic-edit {
  width: 100%;
  height: 52px;
  line-height: 52px;
  position: absolute;
  background: $bg-color;
  color: $color;
}
#clostbtn:after {
  content: "\E6DB";
}
.el-container {
  width: 400px;
  height: 85px;
  color: $color;
  background: $bg-color;
  /* border: 1px solid #01c5fd;
  box-shadow: 0 0 5px rgba(1, 197, 253, 0.75); */
  z-index: 10;
}
.el-header {
  height: $title-height !important;
  line-height: $title-height !important;
  border-bottom: 1px solid $devision-color;
  padding: $padding;
  border-radius: $b-radius;
  span {
    margin: $item-margin;
    color: $color;
  }
}
.icon-class {
  color: $color;
}
.selected-graphic {
  color: $selected-color !important;
}
.graphic-draw-main {
  height: 52px;
  padding: $padding;
  // line-height: 60%;
  vertical-align: top;
  color: $color;
  border-radius: $b-radius;
  ul {
    cursor: default;
    border-radius: $b-radius;
    padding: 0;
    overflow: hidden;
    // border-bottom: 1px solid $devision-color;
    height: 43px;
    margin: 0;
    // margin-top: 0 0 5px 0;
    li {
      cursor: pointer;
      float: left;
      padding: 0 0 0;
      width: 65px;
      height: 100%;
      box-sizing: border-box;
      list-style: none;
      span {
        text-align: center !important;
      }
      &:hover {
        i {
          color: $hover-color;
        }
        span {
          color: $hover-color;
        }
      }
      i {
        display: block;
        height: 16px;
        width: 16px;
        background-size: contain;
        // vertical-align: middle;
        margin: 0 auto;
        margin-top: 8px;
      }
      span {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: block;
        text-align: center;
        color: $color;
        line-height: 22px;
      }
    }
  }
}

.el-main img {
  display: inline-block;
}
.edit-class {
  height: 52px;
  line-height: 52px;
  vertical-align: top;
  padding: 0 5px;
  border-top: 1px solid $devision-color;
  /deep/ .el-color-picker--mini {
    height: 28px;
    width: 28px;
  }
  /deep/ .el-color-picker__color {
    border: none;
    border-radius: $b-radius;
    display: inline;
  }
  /deep/ .el-color-picker__trigger {
    height: 28px;
    width: 28px;
    padding: 0px;
    border: 1px solid $color;
  }
  /deep/ .el-color-picker__color-inner {
    background-color: $bg-color !important;
    border-radius: $b-radius;
  }
  /deep/ .el-input__inner {
    background-color: $bg-color;
    border: 1px solid $color;
    color: $color;
  }
  /deep/ .el-color-picker__icon {
    line-height: 28px;
  }
  span {
    margin: $item-margin;
  }
  .el-select {
    vertical-align: top;
  }
  .el-color-picker {
    vertical-align: top;
    margin: 12px 5px;
  }
}
.marker-edit-class {
  .el-select {
    width: 80px;
    margin: $item-margin;
  }
  img {
    width: 24px;
    height: 24px;
    // margin-left: 10px;
  }
}
.polyline-edit-class {
  .width-selector {
    width: 70px;
    margin: $item-margin;
  }
  .style-selector {
    width: 80px;
    // left:60px;
    margin: $item-margin;
  }
  .type-selector {
    width: 140px;
    // left:120px;
    margin: $item-margin;
  }
}
.polygon-edit-class {
  .width-selector {
    width: 70px;
    margin: $item-margin;
  }
  .type-selector {
    width: 140px;
    // left:60px;
    margin: $item-margin;
  }
  .outline-selected {
    color: #ffffff;
  }
  .border-btn {
    border: 1px solid $color;
    width: 28px;
    height: 28px;
    display: inline-block;
    vertical-align: top;
    line-height: 28px;
    text-align: center;
    border-radius: $b-radius;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 12px 5px;
  }
}
.label-edit-class {
  span {
    margin: $item-margin;
  }
  .font-selector {
    width: 120px;
    margin: $item-margin;
  }
  .size-selector {
    width: 80px;
    margin: $item-margin;
  }
  img {
    width: 24px;
    height: 24px;
    margin: $item-margin;
  }
}
.model-edit-class {
  span {
    margin: $item-margin;
  }
  .model-selector-trigger {
    border: 1px solid $color;
    width: 28px;
    height: 28px;
    display: inline-block;
    vertical-align: top;
    line-height: 28px;
    text-align: center;
    border-radius: $b-radius;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 12px 5px;
  }
  .el-select {
    width: 100px;
    margin: $item-margin;
  }
  .el-button {
    height: 28px;
    line-height: 28px;
  }
  .el-slider {
    display: inline-block;
    margin: 0 15px;
    width: 100px;
    /deep/ .el-slider__runway {
      margin-bottom: 0px;
    }
  }
}
/deep/ .el-color-picker__trigger {
  // box-sizing: unset !important;
  display: block;
}
.el-main .el-radio {
  display: inline-block;
  margin: 5px;
}
</style>
<style lang='scss'>
.model-select-panel {
  display: block;
  width: 340px;
  height: 210px;
  img {
    width: 32px;
    height: 32px;
    margin: 5px;
  }
}
.el-popover {
  display: inline-table;
}
</style>
