import cesiumDrawViewer from './src/drawViewer'

// 为组件添加 install 方法，用于按需引入
cesiumDrawViewer.install = function (Vue) {
    Vue.component(cesiumDrawViewer.name, cesiumDrawViewer)
}

export default cesiumDrawViewer