import cesiumMarker from './src/marker'

// 为组件添加 install 方法，用于按需引入
cesiumMarker.install = function (Vue) {
    Vue.component(cesiumMarker.name, cesiumMarker)
}

export default cesiumMarker