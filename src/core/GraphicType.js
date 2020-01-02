/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-12-17 18:35:25
 * @LastEditors  : zhangbo
 * @LastEditTime : 2019-12-24 18:20:39
 * @Desc: 定义几何图形类型
 */
const GraphicType=(function(){
    function _(){

    }
    _.MARKER=0
    _.POINT=1
    _.POLYLINE=2
    _.POLYGON=3
    _.LABEL=4
    _.MODEL=5
    return _
})()
export default GraphicType