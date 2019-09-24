/**
 @Author:zhangbo
 @Date:2019-04-21 21:45:28
 @E-mail:zhangb@geovie.com.cn
 */
window.UrlSetting={
  "manager":"http://192.168.48.233:9090"
}
const config={
  //默认底图，仅在IMAGE_URL未定义的情况下生效
  "DEFAULT_IMAGE": "static/tiles/{z}/{x}/{y}.jpg",
  //底图
  "IMAGE_URL": "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
  "LOGIN_URL":"http://127.0.0.1:8000/login",
  //叠加图层
  "OVERLAYERS": [
  "https://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8&ltype=11"
]
}

