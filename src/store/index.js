import cesiumMarker from './marker/index'
import cesiumDrawHandler from './drawViewer/index'

const components = [
    cesiumMarker,
    cesiumDrawHandler
    
]

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    components.map(component => {
        Vue.component(component.name, component)
    })
}

/** 支持使用标签方式引入 */
if (typeof window != 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}