<template>
  <div style="width: 100%; height: 100%" class="fullSize">
    <div class="full-container" :style="viewStyle" id="cesiumContainer"></div>
    <div id="loadingOverlay">
      <h1>Loading...</h1>
    </div>
    <cesium-draw
      :viewer="viewer"
      v-if="viewer"
      :extend-marker-image="images"
      :extend-marker-model="models"
    ></cesium-draw>
  </div>
</template>

<script>
import { markRaw } from "vue";
import CesiumDraw from "./components/cesiumDrawViewer.vue";
// import CesiumDraw from 'cesium-draw'
// import 'cesium-draw/dist/theme/default.css';
export default {
  name: "EarthViewer",
  viewerProperty: {},
  components: { CesiumDraw },
  props: {
    viewStyle: {},
    viewerProperty: {},
    dropBackground: {
      default: false,
    },
  },
  data() {
    return {
      viewer: null,
      images: ["./icons/1.png", "./icons/2.png", "./icons/3.png"],
      models: [
        {
          id: "model0",
          name: "木塔",
          thumb: "model/tower.png",
          url: "model/Wood_Tower.glb",
        },
        {
          id: "model1",
          name: "小黄鸭",
          url: "model/Duck.glb",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.viewerDefaultProperty = {
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      navigationHelpButton: false,
      baseLayerPicker: false,
      fullscreenElement: "cesiumContainer",
      fullscreenButton: false,
      shouldAnimate: true,
      infoBox: false,
      selectionIndicator: false,
      sceneModePicker: false,
      shadows: false,
      skyAtmosphere: false,
      imageryProvider: false,
    };

    for (let property in this.viewerProperty) {
      this.viewerDefaultProperty[property] = this.viewerProperty[property];
    }

    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      navigationHelpButton: false,
      baseLayerPicker: false,
      fullscreenElement: "cesiumContainer",
      fullscreenButton: false,
      shouldAnimate: true,
      infoBox: false,
      selectionIndicator: false,
      sceneModePicker: false,
      shadows: false,
      skyAtmosphere: false,
      baseLayer: Cesium.ImageryLayer.fromProviderAsync(
        Cesium.TileMapServiceImageryProvider.fromUrl(
          Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
        )
      ),
      // imageryProvider: false
    });
    this.viewer = markRaw(viewer);

    //清除cesium-widget-credits
    const credits = document.getElementsByClassName("cesium-widget-credits");
    credits[0].parentElement.removeChild(credits[0]);

    //禁止双击zoom
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    viewer.scene.postProcessStages.fxaa.enabled = false;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 15000000),
      duration: 0,
    });
    // viewer.scene.camera.setView({
    //   destination: new Cesium.Cartesian3(
    //     277096.634865404,
    //     5647834.481964232,
    //     2985563.7039122293
    //   ),
    //   orientation: {
    //     heading: 4.731089976107251,
    //     pitch: -0.32003481981370063
    //   }
    // });
  },
  methods: {},
};
</script>

<style scoped>
.fullSize,
.full-container {
  position: absolute;
  /*top: 0;*/
  /*left: 0;*/
  border: none;
  height: 100%;
  width: 100%;
  margin: 0px;
  display: inherit;
}
.doubleViewer {
  width: 50%;
}
/*#cesiumContainer {*/
/*overflow: hidden;*/
/*position: fixed;*/
/*background: url('../../static/images/sky.jpg') no-repeat;*/
/*margin: 0px;*/
/*background-size: cover;*/
/*}*/

#loadingOverlay {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  display: none;
}

#loadingOverlay h1 {
  text-align: center;
  position: relative;
  top: 50%;
  margin-top: -0.5em;
}

#mousePositionId {
  position: absolute;
  right: 30px;
  bottom: 50px;
  z-index: 100;
  font-size: 20px;
}
.layer-picker-class {
  float: right;
}
</style>
<style>
html {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
