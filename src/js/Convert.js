/**
 @Author:zhangbo
 @Date:2019-03-13 13:26:58
 @E-mail:zhangb@geovie.com.cn
 @Last Modified by:zhangbo
 @Last Modified time:2019-03-13 13:26:58
 */
import Cesium from 'cesium/Cesium'

//屏幕坐标转世界坐标
const screen_to_world=(position,viewer)=>{
  return viewer.scene.globe.pick(viewer.camera.getPickRay(position),viewer.scene);
}
const screen_to_world_2D=(position,viewer)=>{
  // let cartographic, lon, lat, results = [];
  // positions.forEach(function (pt) {
  //   cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pt);
  //
  //   if (cartographic) {
  //     lon = Cesium.Math.toDegrees(cartographic.longitude);
  //     lat = Cesium.Math.toDegrees(cartographic.latitude);
  //     results.push({lon: lon, lat: lat, height: cartographic.height});
  //   }
  // });
  // return results;
  return viewer.camera.pickEllipsoid(position, viewer.scene.globe.ellipsoid);//viewer.scene.globe.ellipsoid.cartesianToCartographic(position);
  //
}

const world_to_cartesian3=(position)=>{
  return Cesium.Cartographic.fromCartesian(position)
}
const world_to_screen=(position,viewer)=>{
  return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene,position)
}
//世界坐标转经纬度
const world_to_latlon=(position,viewer)=>{
  const ellipsoid=viewer.scene.globe.ellipsoid;
  const cartographic=world_to_cartesian3(position)//ellipsoid.cartesianToCartographic(position);
  const lat=Cesium.Math.toDegrees(cartographic.latitude);
  const lng=Cesium.Math.toDegrees(cartographic.longitude);

  const alt=cartographic.height;
  return {lat:lat,lon:lng,height:alt}
}
const world_to_radian=(position,viewer)=>{
  const ellipsoid=viewer.scene.globe.ellipsoid;
  const cartographic=ellipsoid.cartesianToCartographic(position);
  return {lat:cartographic.latitude,lon:cartographic.longitude,height:cartographic.height}
}
const world_to_radian2=(position,viewer)=>{
  const cartographic=Cesium.Cartographic.fromCartesian(position)
  const h=get_height_from_world(position,viewer)
  return {lat:cartographic.latitude,lon:cartographic.longitude,height:h}
}
const get_height_from_world=(position,viewer)=>{
  return viewer.scene.globe.getHeight(Cesium.Cartographic.fromCartesian(position))
}
function convertTools(viewer) {
  const covtools=new Object()
  covtools.viewer=viewer
  covtools.screenWorld=(pick1)=>{
    return screen_to_world(pick1,viewer)
  }
  covtools.worldCartesian3=function(worldPosition){
    return world_to_cartesian3(worldPosition)
  }
  covtools.worldLatLon=function (worldPositon) {
    return world_to_latlon(worldPositon,viewer)
  }
  covtools.pickLatLon=function (positon) {
    const worldposition=screen_to_world_2D(positon,viewer)

    if(Cesium.defined(worldposition)){
      const latlon= world_to_latlon(screen_to_world_2D(positon,viewer),viewer)
      latlon.height=this.viewer.camera.positionCartographic.height
      return latlon
    }else{
      return null
    }
    return world_to_latlon(positon,viewer)
  }
  covtools.worldScreen=function(worldposition){
    return world_to_screen(worldposition,viewer)
  }
  covtools.worldRadian=function (worldPosition) {
    return world_to_radian(worldPosition,viewer)
  }
  covtools.worldRadian2=function (worldPosition) {
    return world_to_radian2(worldPosition,viewer)
  }
  covtools.screenWorld2D=function (worldPosition) {
    return screen_to_world_2D(worldPosition,viewer)
  }
  covtools.getHeight=function (worldPosition ) {
    return get_height_from_world(worldPosition)
  }
  return covtools
}
export default convertTools
export {screen_to_world,world_to_latlon,screen_to_world_2D,world_to_radian,world_to_radian2,get_height_from_world,world_to_cartesian3}
