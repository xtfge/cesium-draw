/**
 @Author:zhangbo
 @Date:2019-03-13 21:18:48
 @E-mail:zhangb@geovie.com.cn
 @LastEditors:zhangbo
 @Last Modified time:2019-03-13 21:18:48
 */
import $ from "jquery";

const Cesium = window.Cesium;
/**
 * Cesium坐标转换工具
 */
const CVT = (function() {
  function _() {}
  _.cartesian2Pixel = function(cartesian, viewer) {
    return Cesium.SceneTransforms.wgs84ToWindowCoordinates(
      viewer.scene,
      cartesian
    );
  };
  _.pixel2Cartesian = function(pixel, viewer) {
    if (viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider) {
      return _.pixel2Cartesian1(pixel, viewer);
    } else {
      return _.pixel2Cartesian2(pixel, viewer);
    }
  };
  /**
   * 二维坐标，没有添加地形数据时调用
   */
  _.pixel2Cartesian1 = function(pixel, viewer) {
    const cartesian = viewer.camera.pickEllipsoid(
      pixel,
      viewer.scene.globe.ellipsoid
    );
    return cartesian;
  };
  /**
   * 三维坐标，添加地形数据时调用
   */
  _.pixel2Cartesian2 = function(pixel, viewer) {
    const ray = viewer.camera.getPickRay(pixel);
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    return cartesian;
  };
  _.cartesian2Radians = function(cartesian, viewer) {
    const ellipsoid = viewer.scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84;
    const cartographic = Cesium.Cartographic.fromCartesian(
      cartesian,
      ellipsoid
    );
    const lon = cartographic.longitude;
    const lat = cartographic.latitude;
    const height = cartographic.height;
    return { lon, lat, height };
  };
  _.cartesian2Degrees = function(cartesian, viewer) {
    const coords = _.cartesian2Radians(cartesian, viewer);
    const lon = Cesium.Math.toDegrees(coords.lon);
    const lat = Cesium.Math.toDegrees(coords.lat);
    const height = coords.height;
    return { lon, lat, height };
  };
  _.degrees2Cartesian = function(position) {
    const cartesian = Cesium.Cartesian3.fromDegrees(
      position.lon,
      position.lat,
      position.height
    );
    return cartesian;
  };
  _.radians2Cartesian = function(position) {
    return Cesium.Cartesian3.fromRadians(
      position.lon,
      position.lat,
      position.height
    );
  };
  _.pixel2Degrees = function(pixel, viewer) {
    const cartesian = _.pixel2Cartesian(pixel, viewer);
    if (Cesium.defined(cartesian)) {
      return _.cartesian2Degrees(cartesian, viewer);
    }
    return undefined;
  };
  _.pixel2Radians = function(pixel, viewer) {
    const cartesian = _.pixel2Cartesian(pixel, viewer);
    if (Cesium.defined(cartesian)) {
      return _.cartesian2Radians(cartesian, viewer);
    }
    return undefined;
  };
  _.toDegrees = function(position, viewer) {
    if (position instanceof Cesium.Cartesian3) {
      return _.cartesian2Degrees(position, viewer);
    } else if (position instanceof Cesium.Cartesian2) {
      return _.pixel2Degrees(position, viewer);
    }
  };
  _.toRadians = function(position, viewer) {
    if (position instanceof Cesium.Cartesian3) {
      return _.cartesian2Radians(position, viewer);
    } else if (position instanceof Cesium.Cartesian2) {
      return _.pixel2Radians(position, viewer);
    }
  };
  _.toPixel = function(position, viewer) {
    if (position instanceof Cesium.Cartesian) {
      return _.cartesian2Pixel(position, viewer);
    }
  };
  return _;
})();
/**
 *
 * @param {*} container 要移到的元素
 * @param {*} target 监听鼠标事件的元素，一般是标题栏
 */
function moveDiv(container, target) {
  if (!$("#" + container)) {
    throw new Error("请指定要操作的元素");
  }
  if (!target) {
    target = container;
  }
  $("#" + target).mousedown(function(
    e //e鼠标事件
  ) {
    $("#" + target).css("cursor", "move"); //改变鼠标指针的形状
    // let offset = $("#" + container).offset(); //DIV在页面的位置
    let offset = $("#" + container).position(); //DIV在页面的位置
    let x = e.pageX - offset.left; //获得鼠标指针离DIV元素左边界的距离
    let y = e.pageY - offset.top; //获得鼠标指针离DIV元素上边界的距离
    $(document).bind("mousemove", function(
      ev //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
    ) {
      $("#" + target).css("cursor", "move");
      $("#" + container).stop(); //加上这个之后
      let _x = ev.pageX - x; //获得X轴方向移动的值
      let _y = ev.pageY - y; //获得Y轴方向移动的值
      $("#" + container).animate({ left: _x + "px", top: _y + "px" }, 10);
    });
  });
  $(document).mouseup(function() {
    $("#" + target).css("cursor", "default");
    $(this).unbind("mousemove");
  });
}
/**
 * 获得当前视野范围
 * @param {Viewer} viewer
 */
function currentExtent(viewer) {
  // 范围对象
  const extent = {};

  // 得到当前三维场景
  const scene = viewer.scene;

  // 得到当前三维场景的椭球体
  const ellipsoid = scene.globe.ellipsoid;
  const canvas = scene.canvas;

  // canvas左上角
  const car3_lt = viewer.camera.pickEllipsoid(
    new Cesium.Cartesian2(0, 0),
    ellipsoid
  );

  // canvas右下角
  const car3_rb = viewer.camera.pickEllipsoid(
    new Cesium.Cartesian2(canvas.width, canvas.height),
    ellipsoid
  );

  // 当canvas左上角和右下角全部在椭球体上
  if (car3_lt && car3_rb) {
    const carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
    const carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
    extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
    extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
    extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
    extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
  }

  // 当canvas左上角不在但右下角在椭球体上
  else if (!car3_lt && car3_rb) {
    let car3_lt2 = null;
    let yIndex = 0;
    do {
      // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
      yIndex <= canvas.height ? (yIndex += 10) : canvas.height;
      car3_lt2 = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(0, yIndex),
        ellipsoid
      );
    } while (!car3_lt2);
    const carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
    const carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
    extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
    extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
    extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
    extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
  }

  // 获取高度
  extent.height = Math.ceil(viewer.camera.positionCartographic.height);
  return extent;
}
/**
 * 获得当前视野中心
 * @param {*} viewer
 */
const viewCenter = (
  viewer,
  inWorldCoordinates = true,
  result = new Cesium.Cartesian3()
) => {
  const scene = viewer.scene;
  const camera = viewer.camera;
  const unprojectedScratch = new Cesium.Cartographic();
  const rayScratch = new Cesium.Ray();

  if (scene.mode === Cesium.SceneMode.MORPHING) {
    return undefined;
  }

  // TODO bug when tracking: if entity moves the current position should be used and not only the one when starting orbiting/rotating
  // TODO bug when tracking: reset should reset to default view of tracked entity

  if (Cesium.defined(viewer.trackedEntity)) {
    result = viewer.trackedEntity.position.getValue(
      viewer.clock.currentTime,
      result
    );
  } else {
    rayScratch.origin = camera.positionWC;
    rayScratch.direction = camera.directionWC;
    result = scene.globe.pick(rayScratch, scene, result);
  }

  if (!Cesium.defined(result)) {
    return undefined;
  }

  if (
    scene.mode === Cesium.SceneMode.SCENE2D ||
    scene.mode === Cesium.SceneMode.COLUMBUS_VIEW
  ) {
    result = camera.worldToCameraCoordinatesPoint(result, result);

    if (inWorldCoordinates) {
      result = scene.globe.ellipsoid.cartographicToCartesian(
        scene.mapProjection.unproject(result, unprojectedScratch),
        result
      );
    }
  } else {
    if (!inWorldCoordinates) {
      result = camera.worldToCameraCoordinatesPoint(result, result);
    }
  }

  return result;
};
const saveCurViewerImage = (viewer, filename) => {
  viewer.render();
  if (!filename || filename == "") {
    filename = new Date().toLocaleString() + ".png";
  }
  const ext = filename.split(".")[1];
  downloadFile(filename, viewer.scene.canvas.toDataURL("image/%s" % ext));
};
const downloadFile = (fileName, content) => {
  //下载文件
  let aLink = document.createElement("a");
  let blob = base64ToBlob(content); //new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  function base64ToBlob(code) {
    //base64转blob
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
};
const errroCatch = function(e, callback) {
  if (e.response) {
    callback(e.response.data);
  } else if (e.request) {
    callback(e.request);
  } else {
    callback(e.message);
  }
};
class CursorTip {
  constructor(text, id, viewer) {
    const tooltip = document.createElement("div");
    tooltip.id = id || "cursor-tip";
    tooltip.className = "cursor-tip-class";
    tooltip.innerHTML = text;
    document.body.appendChild(tooltip);
    this.ele = tooltip;
    this._visible = true;
    const self = this;
    if (viewer instanceof Cesium.Viewer) {
      viewer.screenSpaceEventHandler.setInputAction(e => {
        self.updatePosition(e.endPosition);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  }
  updatePosition(pixel) {
    this.ele.style.left = pixel.x + 10 + "px";
    this.ele.style.top = pixel.y + 10 + "px";
  }
  updateText(text) {
    this.ele.innerHTML = text;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    if (v) {
      this.ele.style.display = "block";
    } else {
      this.ele.style.display = "none";
    }
  }
}
export {
  moveDiv,
  errroCatch,
  currentExtent,
  viewCenter,
  saveCurViewerImage,
  downloadFile,
  CVT,
  CursorTip
};
export default {
  moveDiv,
  errroCatch,
  currentExtent,
  viewCenter,
  saveCurViewerImage,
  downloadFile,
  CVT,
  CursorTip
};
