/**
 @Author:zhangbo
 @Date:2019-03-13 21:18:48
 @E-mail:zhangb@geovie.com.cn
 @Last Modified by:zhangbo
 @Last Modified time:2019-03-13 21:18:48
 */
const Cesium=window.Cesium
import { open } from 'shapefile'
/**
 * Cesium坐标转换工具
 */
const CVT = (function () {
  function _() {

  }
  _.cartesian2Pixel=function(cartesian,viewer){
    return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene,cartesian)
  }
  _.pixel2Cartesian = function (pixel, viewer) {
    const ray = viewer.camera.getPickRay(pixel)
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    return cartesian
  }
  _.cartesian2Radians = function (cartesian, viewer) {
    const ellipsoid = viewer.scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian, ellipsoid)
    const lon = cartographic.longitude
    const lat = cartographic.latitude
    const height = cartographic.height
    return { lon, lat, height }
  }
  _.cartesian2Degrees = function (cartesian, viewer) {
    const coords = _.cartesian2Radians(cartesian, viewer)
    const lon = Cesium.Math.toDegrees(coords.lon)
    const lat = Cesium.Math.toDegrees(coords.lat)
    const height = coords.height
    return { lon, lat, height }
  }
  _.degrees2Cartesian = function (position) {
    const cartesian = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height)
    return cartesian
  }
  _.radians2Cartesian = function (position) {
    return Cesium.Cartesian3.fromRadians(position.lon, position.lat, position.height)
  }
  _.pixel2Degress = function (pixel, viewer) {
    const cartesian = _.pixel2Cartesian(pixel, viewer)
    return _.cartesian2Degrees(cartesian, viewer)
  }
  _.pixel2Radians = function (pixel, viewer) {
    const cartesian = _.pixel2Cartesian(pixel, viewer)
    return _.cartesian2Radians(cartesian, viewer)
  }
  return _
})()
// const earthRadiusMeters = 6371000.0;
// const radiansPerDegree = Math.PI / 180.0;
// const degreesPerRadian = 180.0 / Math.PI;
/**
 * 返回两个点之间的距离
 * @param x {Cartesian3} 起始点的地理坐标
 * @param y {Cartesian3} 结束点的地理坐标
 * @returns {string} 两点之间的直线距离(m)
 */
function moveDiv(container) {
  let isDrag = false;
  let startPosition = {};
  let defaultPosition = {};
  container.addEventListener('mousedown', function (e) {
    isDrag = true;
    startPosition['x'] = e.x
    startPosition['y'] = e.y
    defaultPosition['x'] = parseFloat(container.style.left.replace('px', ""));
    defaultPosition['y'] = parseFloat(container.style.top.replace('px', ""))
  })
  container.addEventListener('mousemove', function (e) {
    if (isDrag) {
      const offsetX = startPosition.x - defaultPosition.x;
      const offsetY = startPosition.y - defaultPosition.y;
      container.style.left = (e.x - offsetX) + 'px'
      container.style.top = (e.y - offsetY) + 'px'
    }
  })
  container.addEventListener('mouseout', function () {
    isDrag = false
  });
  container.addEventListener('mouseup', function () {
    isDrag = false
  })
}
const getDistance = (x, y) => {
  const geodesic = new Cesium.EllipsoidGeodesic();
  geodesic.setEndPoints(x, y);
  const surfaceDist = Math.round(geodesic.surfaceDistance);
  return surfaceDist
}
/**
 * 计算空间距离
 * @param x {Cartesian3} 起始点的地理坐标
 * @param y {Cartesian3} 结束点的地理坐标
 * @returns {string} 两点之间的空间距离(m)
 */
const getSpaceDistance = (x, y) => {
  const surdis = getDistance(x, y)
  return Math.sqrt(Math.pow(surdis, 2) + Math.pow(x.height - y.height, 2));
}

function currentExtent(viewer) {
  // 范围对象
  const extent = {};

  // 得到当前三维场景
  const scene = viewer.scene;

  // 得到当前三维场景的椭球体
  const ellipsoid = scene.globe.ellipsoid;
  const canvas = scene.canvas;

  // canvas左上角
  const car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);

  // canvas右下角
  const car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);

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
      yIndex <= canvas.height ? yIndex += 10 : canvas.height;
      car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
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
const viewerCenter = (viewer) => {
  const viewCenter = new Cesium.Cartesian2(Math.floor(viewer.canvas.clientWidth / 2), Math.floor(viewer.canvas.clientHeight / 2));
  // Given the pixel in the center, get the world position
  const newWorldPosition = viewer.scene.camera.pickEllipsoid(viewCenter);
  return newWorldPosition
}
const saveCurViewerImage = (viewer, filename) => {
  viewer.render();
  if (!filename || filename == '') {
    filename = new Date().toLocaleString() + ".png"
  }
  const ext = filename.split(".")[1]
  downloadFile(filename, viewer.scene.canvas.toDataURL("image/%s" % ext));
}
const downloadFile = (fileName, content) => {//下载文件
  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); //new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click()
  function base64ToBlob(code) {//base64转blob
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}
const errroCatch = function (e, callback) {
  if (e.response) {
    callback(e.response.data)
  } else if (e.request) {
    callback(e.request)
  } else {
    callback(e.message)
  }
}
const shp2GeoJSON = function (filedata) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(filedata)
  return new Promise((resolve) => {
    reader.onload = function () {
      open(this.result)
        .then(source => source.read()
          .then(function log(result) {
            if (result.done) return false;
            resolve(result.value)
            console.log(result.value)
            return source.read().then(log);
          }))
        .catch(error => console.error(error.stack));
    }
  })
}
class CursorTip {
  constructor(text, id,viewer) {
    const tooltip = document.createElement("div");
    tooltip.id = id||"cursor-tip";
    tooltip.style.position = 'fixed'
    tooltip.style.border = '1px #b6aeae solid'
    tooltip.style.height = '30px'
    tooltip.style.lineHeight = '30px'
    tooltip.style.paddingLeft = '10px'
    tooltip.style.paddingRight = '20px'
    tooltip.style.backgroundColor = '#b6aeae'
    tooltip.style.color = '#FFF'
    tooltip.style.borderRadius = '6px 6px 6px 0px'
    tooltip.style.pointerEvents = 'none'
    tooltip.innerHTML = text;
    tooltip.style.zIndex=999
    tooltip.style.minWidth='280px'
    // if(oe){
    //   document.body.removeChild(oe)
    // }
    document.body.appendChild(tooltip);
    this.ele=tooltip
    this._visible=true
    const self=this
    if(viewer instanceof Cesium.Viewer){
      viewer.screenSpaceEventHandler.setInputAction(e=>{
        self.updatePosition(e.endPosition)
      },Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
  }
  updatePosition(pixel){
    this.ele.style.left=pixel.x + 10 + 'px';
    this.ele.style.top=pixel.y + 10 + 'px';
  }
  updateText(text){
    this.ele.innerHTML=text
  }
  get visible(){
    return this._visible
  }
  set visible(v){
    this._visible=v
    if(v){
      this.ele.style.display='block'
    }else{
      this.ele.style.display='none'
    }
  }
}
export {currentExtent, viewerCenter, saveCurViewerImage, downloadFile,CVT }
export default {
  moveDiv,
  errroCatch,
  getDistance,
  getSpaceDistance,
  currentExtent,
  viewerCenter,
  saveCurViewerImage,
  downloadFile,
  shp2GeoJSON,
  CVT,
  CursorTip
}
