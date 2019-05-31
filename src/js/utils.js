/**
 @Author:zhangbo
 @Date:2019-03-13 21:18:48
 @E-mail:zhangb@geovie.com.cn
 @Last Modified by:zhangbo
 @Last Modified time:2019-03-13 21:18:48
 */

import Cesium from 'cesium/Cesium'
import {world_to_cartesian3,world_to_latlon} from "./Convert";
import XLSX from 'xlsx'
import axios from "axios";
import {open} from 'shapefile'


const earthRadiusMeters = 6371000.0;
const radiansPerDegree = Math.PI / 180.0;
const degreesPerRadian = 180.0 / Math.PI;
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
const getSpaceDisfromCartesian3Array=(positions)=>{
  let dist=0.0
  for(let i=0;i<positions.length-1;i++){
    dist+=getSpaceDistance(positions[i],positions[i+1])
  }
  return dist.toFixed(2)
}
const getSpaceDisfromArray=(positions)=>{
  const ct3=positions.map((x)=>{
    return world_to_cartesian3(x)
  })
  let dist=0.0
  for(let i=0;i<ct3.length-1;i++){
    dist+=getSpaceDistance(ct3[i],ct3[i+1])
  }
  return dist.toFixed(2)
}
/**
 * points 多边形的顶点坐标，形如[{lan:23,lon:99}]
 * 计算多边形面积
 */
const getArea = (points) => {
  const earthRadiusMeters = 6371000.0;
  const radiansPerDegree = Math.PI / 180.0;
  const degreesPerRadian = 180.0 / Math.PI;
  if(points.length<3){
    return 0
  }
  let totalAngle = 0;
  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length;
    let k = (i + 2) % points.length;
    totalAngle += Angle(points[i], points[j], points[k]);
  }
  const planarTotalAngle = (points.length - 2) * 180.0;
  let sphericalExcess = totalAngle - planarTotalAngle;
  if (sphericalExcess > 420.0) {
    totalAngle = points.length * 360.0 - totalAngle;
    sphericalExcess = totalAngle - planarTotalAngle;
  } else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
    sphericalExcess = Math.abs(360.0 - sphericalExcess);
  }
  return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
}

function Angle(p1, p2, p3) {
  const bearing21 = Bearing(p2, p1);
  const bearing23 = Bearing(p2, p3);
  let angle = bearing21 - bearing23;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
};

/*方向*/
function Bearing(from, to) {
  const lat1 = from.lat * radiansPerDegree;
  const lon1 = from.lon * radiansPerDegree;
  const lat2 = to.lat * radiansPerDegree;
  const lon2 = to.lon * radiansPerDegree;
  let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
  if (angle < 0) {
    angle += Math.PI * 2.0;
  }
  angle = angle * degreesPerRadian;
  return angle;
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
const viewerCenter=(viewer)=>{
  const viewCenter = new Cesium.Cartesian2(Math.floor(viewer.canvas.clientWidth / 2), Math.floor(viewer.canvas.clientHeight / 2));
  // Given the pixel in the center, get the world position
  const newWorldPosition = viewer.scene.camera.pickEllipsoid(viewCenter);
  return world_to_latlon(newWorldPosition,viewer)
}
const saveCurViewerImage=(viewer,filename)=>{
  viewer.render();
  if(!filename||filename==''){
    filename=new Date().toLocaleString()+".png"
  }
  const ext=filename.split(".")[1]
  downloadFile(filename, viewer.scene.canvas.toDataURL("image/%s" % ext));
}
const downloadFile=(fileName, content)=> {//下载文件
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
    return new Blob([uInt8Array], {type: contentType});
  }
}
export function JSON2Excel(data,filename) {
  let ws=XLSX.utils.json_to_sheet(data)
  let wb=XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");/* 生成xlsx文件 */
  XLSX.writeFile(wb, filename);
}
export function ajaxPromise(url,options={}){
  return new Promise((resolve,reject)=>{
    const defaultOptions= {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      outputFormat: 'application/json'
    }
    if(!options['typeName']){
      alert('typeName参数必须提供')
      return
    }
    for(let key in options){
      defaultOptions[key]=options[key]
    }
    let urlString=url+'?'
    for(let key in defaultOptions){
      urlString+=`&${key}=${defaultOptions[key]}`
    }
    axios.get(urlString).then(res=>{
      resolve(res)
    }).catch(e=>{
      reject(e)
    })
  })
}
//根据图片和文字绘制canvas
function drawCanvas(url='',text='',fontsize=14,bg=true){
  const canvas = document.createElement('canvas');      //创建canvas标签
  const ctx = canvas.getContext('2d');
  ctx.font = fontsize + "px Arial";
  canvas.width = ctx.measureText(text).width + fontsize * 0;//0.5      //根据文字内容获取宽度
  canvas.height = fontsize * 1.2; // fontsize * 1.5
  const img = new Image();
  img.src=url
  if(url==''){
    if(bg){
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      //设置线条颜色
      ctx.strokeStyle='#ADADAD';
      //设置线条宽度
      ctx.lineWidth=2;
      ctx.strokeRect(0,0,canvas.width,canvas.height);
    }
    ctx.fillStyle = "#000000";
    ctx.font ="italic  lighter"+ fontsize + "px Calibri,sans-serif";
    // ctx.shadowOffsetX = 1;    //阴影往左边偏，横向位移量
    // ctx.shadowOffsetY = 0;   //阴影往左边偏，纵向位移量
    // ctx.shadowColor = "#fff"; //阴影颜色
    // ctx.shadowBlur = 1; //阴影的模糊范围
    ctx.fillText(text, fontsize*1/4, fontsize*5/6);
    return [canvas.width,canvas]
  }
  return new Promise((resolve,reject)=>{
    img.onload = function(){
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0,0,120,60);
      ctx.fillStyle = "#00000099";
      ctx.drawImage(img, 0,0,32, 32);
      ctx.fillStyle = '#000';
      ctx.font = fontsize + "px Calibri,sans-serif";
      ctx.shadowOffsetX = 1;    //阴影往左边偏，横向位移量
      ctx.shadowOffsetY = 0;   //阴影往左边偏，纵向位移量
      ctx.shadowColor = "#fff"; //阴影颜色
      ctx.shadowBlur = 1; //阴影的模糊范围
      ctx.fillText(text, fontsize*7/4, fontsize*4/3);
      resolve(canvas)
    }
  })
  return canvas

}
const errroCatch=function (e,callback) {
  if(e.response){
    callback(e.response.data)
  } else if(e.request){
    callback(e.request)
  } else{
    callback(e.message)
  }
}
const shp2GeoJSON=function(filedata) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(filedata)
  return new Promise((resolve,reject)=>{
    reader.onload = function (e) {
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
export {getDistance, getSpaceDistance,getSpaceDisfromArray,getArea,currentExtent,viewerCenter,saveCurViewerImage,downloadFile}
export default {
  drawCanvas,
  moveDiv,
  errroCatch,
  getDistance,
  getSpaceDistance,
  getSpaceDisfromArray,
  getArea,
  currentExtent,
  viewerCenter,
  saveCurViewerImage,
  downloadFile,
  shp2GeoJSON
}
