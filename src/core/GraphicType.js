/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-12-17 18:35:25
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-18 18:47:08
 * @Desc: 定义几何图形类型
 */
const GraphicType=(function(){
    function _(){

    }
    _.MARKER=0
    _.POINT=5
    _.POLYLINE=1
    _.POLYGON=2
    _.LABEL=3
    _.MODEL=4
    return _
})()
export default GraphicType