/**
 @Author:zhangbo
 @Date:2019-05-21 15:32:46
 @E-mail:zhangb@geovie.com.cn
 */
import convertTool from '@/js/Convert'
import Cesium from 'cesium/Cesium'
import Vue from 'vue'
import editPanel from '@/components/editPanel'
import {saveAs} from 'file-saver'

class BaseGraphic{
  /**
   * 几何图形超类
   * @param viewer{Cesium.Viewer}
   * @param options{Object}
   */
  constructor(viewer,options,name=null){
    this.name=name?name:Math.round(Math.random()*1000)
    this.viewer=viewer
    this.options=options
    this.vm=new Map()
    //图形对象
    this.graphic=null
    this.positions=[]
    //图形顶点
    this.nodes=null
    //编辑模式
    this.editMode=false
    this.editPanel=null
    this.handler=new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    this.selectedHandler=new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    this.setNodeAction=undefined
    this.init()
  }
  initNodes(){
    this.nodes=[]
  }

  /**
   * 对象初始化，开始监听鼠标事件（单击、移到、双击、右击）
   */
  init(){
    const _this=this
    this.tip=createCursor(this.viewer,'单击继续，双击或右击结束')
    this.handler.setInputAction(e=> {
      _this.onClick(e)
      
    },DrawEvent.LEFT_CLICK());
    this.handler.setInputAction(e=> {
      const self=this
      self.onMove(e)
      
    },DrawEvent.MOUSE_MOVE());
    this.handler.setInputAction(e=> {
      //在MOUSE_MOVE中已添加该点
      // this.pushNode(e.position)
      this.destroy()
      this.onSelected()
      // this.create(this.positions)
      this.startEdit()
    },DrawEvent.RIGHT_CLICK());
    //Cesium在执行双击事件的时候会执行再次单击事件，因此双击结束会对最后一个点添加3次，建议右键结束
    this.handler.setInputAction(e=> {
      //this.create(this.positions)
      // this.pushNode(e.position)
      this.destroy()
      this.onSelected()
      this.startEdit()
    },DrawEvent.LEFT_DOUBLE_CLICK());

  }

  onClick(e){
    if(this.positions.length===0){
      // let dynamic=new Cesium.CallbackProperty(function () {
      //   return _this.positions
      // }, false)
      this.create(this.options,this.positions)
      this.pushNode(e.position)
    }
    this.pushNode(e.position)
  }
  onMove(e){
    const self=this
    const wp=Point.screenWorld(this.viewer,e.endPosition)
    if(Cesium.defined(wp)){
      if(this.positions.length>0){
        self.positions.pop()
        if(self.nodes){
          const node=self.nodes[self.nodes.length-1]
          self.nodes.pop()
          self.viewer.entities.remove(node)
        }
        self.pushNode(e.endPosition)
      }
    }
  }
  /**
   * 初始化图形属性编辑界面，否则将不能对图形属性信息进行编辑
   */
  initEditWindow(){
    const editContainer=document.createElement('div')
    editContainer.id='editContainer'
    document.body.appendChild(editContainer)
    const editPanelInstance=Vue.extend(editPanel)
    this.editPanel=new editPanelInstance().$mount('#editContainer')
    this.editPanel.graphic=this
    this.editPanel.node=this.nodes?true:false
  }
  getSelectedStyle(){
    let options
    switch (this.geomType.toLowerCase()) {
      case 'polyline':
        options=Polyline.selectedStyle()
        options.width=this.options.width
        return options
      case 'polygon':
        options=Polygon.selectedStyle()
        return options
    }
  }

  /**
   * 当前要素被选中
   */
  onSelected(){
    const _this=this
    this.selectedHandler.setInputAction(e=>{
      const obj=this.viewer.scene.pick(e.position)
      if(Cesium.defined(obj)&&obj.id){
        //高亮显示选中对象
        if(obj.id===_this.graphic&&!_this.editMode){
          _this.startEdit()
        }
      }
    },DrawEvent.LEFT_DOUBLE_CLICK())
    _this.selectedHandler.setInputAction(e=>{
      if(_this.graphic&&this.editMode){
        const obj=this.viewer.scene.pick(e.position)
        const nodes=_this.nodes?_this.nodes:_this.tmpNodes
        if(!(Cesium.defined(obj)&&obj.id&&(obj.id===_this.graphic||nodes.includes(obj.id)))||!Cesium.defined(obj)){
          _this.stopEdit()
          _this.selectedNode=null
        }else if(Cesium.defined(obj)&&obj.id&&nodes.includes(obj.id)){
          if(_this.selectedNode){
            _this.selectedNode.point['color']=Point.editStyle()['color']
          }
          obj.id.point['color']=Point.selectedStyle()['color']
          _this.selectedNode=obj.id
        }else if(Cesium.defined(obj)&&obj.id&&obj.id===_this.graphic){
          if(_this.selectedNode){
            _this.selectedNode.point['color']=Point.editStyle()['color']
          }
          _this.selectedNode=null
        }
      }
    },DrawEvent.LEFT_CLICK())
    _this.selectedHandler.setInputAction(e=>{
      const obj=this.viewer.scene.pick(e.position)
      if(_this.editMode){
        const nodes=_this.nodes?_this.nodes:_this.tmpNodes
        if(Cesium.defined(obj)&&obj.id&&nodes.includes(obj.id)){
          for(let p of _this.positions){
            //obj.id.position._value.x===p.x&&obj.id.position._value.y===p.y&&obj.id.position._value.z===p.z
            if(obj.id.position.getValue()===p){
              _this.selectedPosition=p
              _this.viewer.container.style.cursor="url(static/images/cursor.png),auto"
              _this.viewer.scene.screenSpaceCameraController.enableRotate = false
              
            }
          }
        }
      }
    },DrawEvent.LEFT_DOWN())
    _this.selectedHandler.setInputAction(e=>{
      if(_this.selectedPosition){
        const wp=Point.screenWorld(_this.viewer,e.endPosition)
        _this.selectedPosition.x=wp.x
        _this.selectedPosition.y=wp.y
        _this.selectedPosition.z=wp.z
        //不能这样赋值
        //_this.selectedPosition=wp
      }else if(!_this.editMode){
        const obj=_this.viewer.scene.pick(e.endPosition)
        if(Cesium.defined(obj)&&obj.id&&obj.id===_this.graphic){
          _this.tip=createCursor(_this.viewer,'双击要素编辑')
        }else{
          if(_this.tip){
            document.body.removeChild(_this.tip)
            _this.tip=null
          }
        }

      }
    },DrawEvent.MOUSE_MOVE())
    _this.selectedHandler.setInputAction(e=>{
      const wp=Point.screenWorld(_this.viewer,e.position)
      _this.selectedPosition=wp
      _this.selectedPosition=null
      _this.viewer.scene.screenSpaceCameraController.enableRotate = true
      _this.viewer.container.style.cursor='default'

    },DrawEvent.LEFT_UP())

  }

  /**
   * 开始编辑
   */
  startEdit(){
    if(!this.graphic){
      return
    }
    const _this=this
    _this.editMode=true
    this.tip=createCursor(this.viewer,'拖动节点编辑图形，按Delete键删除')
    // this.options=Polyline.selectedStyle()
    //如果顶点存在设置点的样式为编辑
    if(Array.isArray(_this.nodes)){
      const options=Point.editStyle()
      _this.setNodeStyle(options)
    }
    //如果顶点不存在添加临时顶点
    else{
      _this.tmpNodes=[]
      this.positions.map(p=>{
        const pt=new Point(_this.viewer,null,p,Point.editStyle())
        _this.tmpNodes.push(pt.graphic)
      })
    }
    //不生效
    // _this.graphic.material=Polyline.selectedStyle().material

    //打开编辑面板
    if(!this.editPanel){
      this.initEditWindow()
    }


    //删除当前对象，监听delete按键
    //寻求更好的方法
    window.graphic=this
    $(document).bind('keydown',_this.keyDown);
    // $(document).keydown(function (event) {
    //
    // })
  }
  /**
   * 停止编辑
   */
  stopEdit(){
    const _this=this
    _this.editMode=false
    // this.options=Polyline.defaultStyle()
    //如果添加了临时顶点，删除
    if(this.tmpNodes){
      for(let node of this.tmpNodes){
        _this.viewer.entities.remove(node)
      }
      this.tmpNodes=null
    }else{
      const options=Point.defaultStyle()
      _this.setNodeStyle(options)
    }
    if(Cesium.defined(this.setNodeAction)){
      _this.setNode(_this.setNodeAction)
    }
    //删除跟随鼠标的提示框
    if(_this.tip){
      document.body.removeChild(_this.tip)
      _this.tip=null
    }
    //销毁编辑窗口
    if(_this.editPanel){
      _this._destroyEditPanel()
    }
    //取消键盘事件监听
    $(document).unbind('keydown',_this.keyDown);
  }

  keyDown(event){
    const _this=window.graphic
    const e = event || window.event;
    const code = e.keyCode || e.which;
    if(code===46){//delete
      if(!_this.selectedNode){//否则删除整个对象
        _this._removeGraphic()
        _this._removeNodes()
        _this.deepDestroy()

      }else{//如果选中顶点则只删除该顶点
        // const pos=_this.selectedNode.point.position.getValue()
        for(let p of _this.positions){
          if(_this.selectedNode.position.getValue()===p){
            _this.positions.splice(_this.positions.indexOf(p),1)
            _this.viewer.entities.remove(_this.selectedNode)
          }
        }
        //_this.positions.splice(_this.positions.indexOf(_this.selectedPosition)-1,1)
      }
      _this.selectedNode=null
    }
  }
  /**
   * 设置顶点样式
   * @param options
   */
  setNodeStyle(options){
    if(!this.nodes)return
    const keys=Object.keys(options)
    for(let key of keys){
      for(let node of this.nodes){
        node.point[key]=options[key]
      }
    }
  }

  /**
   * 保存节点信息，每产生一个新的节点都应该调用该方法
   * @param pixel
   */
  pushNode(pixel){
    const wp=Point.screenWorld(this.viewer,pixel)
    if(Cesium.defined(wp)){
      // const p=this.positions[this.positions.length-1]
      // if(this.positions.length>2&&wp.x===p.x&&wp.y===p.y&&wp.z===p.z){
      //   return
      // }
      this.positions.push(wp)
      //是否保存顶点信息
      //如果要保存顶点信息应该在对象初始化之后调用initNodes方法
      if(Array.isArray(this.nodes)){
        const pt=new Point(this.viewer,null,wp)
        this.nodes.push(pt.graphic)
      }
    }
  }

  /**
   * 模拟事件监听
   * @param event
   * @param callback
   */
  on(event,callback){
    this.vm.set(event,callback)
  }
  emit(event,...args){
    if(!this.vm.has(event)){
      return
    }
    this.vm.get(event)(...args)

  }
  /**
   * 创建几何图形
   * @param positionData{Array}
   * @returns {*}
   */
  create(options,positionData) {
    let pos=new Cesium.CallbackProperty(function () {
      return positionData
    }, false)
    return pos
  }

  /**
   * 设置颜色
   * @param rgb{String}
   */
  setColor(rgb){
  }

  /**
   * 设置线宽
   * @param width
   */
  setWidth(width){
  }

  setNode(node){
    if(node&&!this.nodes){
      this.initNodes()
      for(node of this.positions){
        const pt=new Point(this.viewer,null,node)
        this.nodes.push(pt.graphic)
      }
    }else if(!node&&this.nodes){
      this._removeNodes()
      this.nodes=null
    }
  }
  /**
   * 缩放到该要素
   */
  zoomTo(){
    if(this.graphic){
      this.viewer.zoomTo(this.graphic)
    }
  }

  /**
   * 移除几何对象
   */
  _removeGraphic(){
    if(this.graphic){
      this.viewer.entities.remove(this.graphic)
      //this._removeNodes()
    }
  }

  /**
   * 移除顶点
   * @private
   */
  _removeNodes(){
    const nodes=this.nodes?this.nodes:this.tmpNodes
    if(nodes){
      for(let node of nodes){
        this.viewer.entities.remove(node)
      }
    }
  }

  /**
   * 移除该对象
   */
  remove(){
    this._removeGraphic()
    this._removeNodes()
    this.deepDestroy()
  }
  _destroyEditPanel(){
    if(this.editPanel){
      this.editPanel.$destroy()
      if(document.getElementById(this.name)){
        document.body.removeChild(document.getElementById(this.name))
      }
      this.editPanel=null
    }
  }

  /**
   * 注销该对象的绘图事件监听句柄
   */
  destroy(){
    this.handler.removeInputAction(DrawEvent.LEFT_DOUBLE_CLICK())
    this.handler.removeInputAction(DrawEvent.LEFT_CLICK())
    this.handler.removeInputAction(DrawEvent.RIGHT_CLICK())
    this.handler.removeInputAction(DrawEvent.MOUSE_MOVE())
    this.handler.destroy()
    if(document.getElementById('cursortip')){
      document.body.removeChild(document.getElementById('cursortip'))
      this.tip=null
    }

  }

  deepDestroy(){
    if(!this.handler.isDestroyed()){
      this.destroy()
    }
    if(this.selectedHandler&&!this.selectedHandler.isDestroyed()){
      this.selectedHandler.removeInputAction(DrawEvent.MOUSE_MOVE())
      this.selectedHandler.removeInputAction(DrawEvent.LEFT_DOWN())
      this.selectedHandler.removeInputAction(DrawEvent.LEFT_UP())
      this.selectedHandler.removeInputAction(DrawEvent.LEFT_DOUBLE_CLICK())
      this.selectedHandler.destroy()
    }
    this._destroyEditPanel()
    if(this.tip){
      document.body.removeChild(this.tip)
      this.tip=null
    }
    // if(this.tip){
    //   document.body.removeChild(this.tip)
    //   this.tip=null
    // }
    // if(this.tip){
    //   document.body.removeChild(this.tip)
    // }
    // this.graphic=null

  }
}

/**
 * 创建跟随鼠标的提示信息
 * @param text
 * @returns {HTMLElement}
 */
function createCursor(viewer,text) {
  if(document.getElementById('cursortip')){
    return document.getElementById('cursortip')
  }
  const tip=document.createElement('div')
  tip.id='cursortip'
  tip.style.position='absolute'
  tip.style.backgroundColor='#FFFFFF'
  tip.innerText=text
  tip.style.width='200px'
  tip.style.fontFamily='宋体'
  tip.style.fontSize='10px'
  tip.style.padding='5px'
  tip.style.color='#A8A8A8'
  document.body.appendChild(tip)
  document.body.addEventListener('mousemove',function (e) {
    if(document.getElementById('cursortip')){
      e.preventDefault()
      const div=document.getElementById('cursortip')
      if(e.target===viewer.canvas){
        div.style.display='block'
        div.style.left=e.offsetX+10+'px'
        div.style.top=e.offsetY+10+'px'
      }else{
        div.style.display='none'
      }
    }
  })
  
  return tip
}
window.createCursor=createCursor
class Polyline extends BaseGraphic{
  /**
   * Polyline类
   * @param viewer
   * @param options
   */
  constructor(viewer,options=Polyline.defaultStyle(),name=null){
    super(viewer,options,name)
    this.geomType='polyline'
  }

  /**
   * 创建要素
   * @param position
   * @returns {*}
   */
  create(options,position){
    const pos=super.create(options,position)
    options['positions'] = pos
    const shape = this.viewer.entities.add({
      polyline: options
    });
    this.graphic=shape
    return shape
  }
  initEditWindow() {
    if(editPanel){
      super.initEditWindow();
      this.editPanel.width=this.options.width
    }

  }

  startEdit() {
    super.startEdit();
    const options=this.getSelectedStyle()
    options['width']=this.options['width']
    const keys=Object.keys(options)
    for(let key of keys){
      this.graphic.polyline[key]=options[key]
    }
  }
  stopEdit() {
    super.stopEdit();
    this._removeGraphic()
    this.create(this.options,this.positions)
    // const options=this.options
    // const keys=Object.keys(options)
    // for(let key of keys){
    //   this.graphic.polyline[key]=options[key]
    // }
  }
  export(name='polyline'){
    const graphicJSON=Polyline.toGeoJson(this.positions)
    const blob = new Blob([JSON.stringify(graphicJSON)], {type: ""});
    saveAs(blob, name+".geojson");
  }
  setWidth(v){
    this.options.width=parseInt(v)
    this.graphic.polyline.width._value=parseInt(v)
  }
  setColor(v){
    this.options.material=Cesium.Color.fromCssColorString(v)
    this.graphic.polyline.material=Cesium.Color.fromCssColorString(v)
  }
  remove() {
    super.remove();
  }

  /**
   * 默认样式
    * @returns {{material: Cesium.ColorMaterialProperty, width: number, clampToGround: boolean}}
   */
  static defaultStyle(){
    return {
      clampToGround: true,
      material: new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.8)),
      width: 3
    }
  }

  /**
   * 当前对象被选中时的样式
   * @returns {{color: Color, outlineWidth: number, outlineColor: Color, pixelSize: number}}
   */
  static selectedStyle(){
    return {
      clampToGround: true,
      material: Cesium.Color.AQUA,
      width: 3
    }
  }
  static toGeoJson(position,name='polyline'){
    const graphicJSON= {
      "type": "FeatureCollection",
      "name": name,
      "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
      "features": []
    }
    const ellipsoid=Cesium.Ellipsoid.WGS84;
    let i=0
    const nodes=[]
    for(let p of position){
      const cartographic=ellipsoid.cartesianToCartographic(p);
      const lat=Cesium.Math.toDegrees(cartographic.latitude);
      const lon=Cesium.Math.toDegrees(cartographic.longitude);
      nodes.push([lon,lat])
    }
    const feat={ "type": "Feature", "properties": { "Id": i++ ,'name':name}, "geometry": { "type": "MultiLineString", "coordinates":  [nodes] }}
    graphicJSON.features.push(feat)
    //保存文件
    return graphicJSON
  }
}
class Polygon extends BaseGraphic{
  /**
   * Polygon类
   * @param viewer
   * @param options
   */
  constructor(viewer,options=Polygon.defaultStyle(),name=null){
    super(viewer,options,name)
    this.geomType='polygon'
  }
  

  /**
   * 创建要素
   * @param options
   * @param position
   * @returns {*}
   */
  create(options,position){
    const pos=super.create(options,position)
    options['hierarchy'] = pos
    options['id']='polygon%d' % Math.round(Math.random()*1000)
    const shape = this.viewer.entities.add({
      polygon: options
    });
    this.graphic=shape
    return shape
  }
  startEdit() {
    if(this.editMode){
      return
    }
    super.startEdit();
    this._removeGraphic()
    const options=Polygon.selectedStyle()
    options['material']=this.options['material']
    this.create(options,this.positions)
    // if(!this.border){
    //   this.border=[]
    //   const options={clampToGround: true}
    //   options['material']=Polygon.selectedStyle()['outlineColor']
    //   options['width']=Polygon.selectedStyle()['outlineWidth']
    //
    //   this.border=new Polyline(this.viewer)
    //   this.border.create(options,[...this.positions,this.positions[0]])
    //   this.border.deepDestroy()
    // }

    // for(let p of this.positions){
    //   this.tmpBorder.positions.push(p)
    // }
  }
  stopEdit() {
    super.stopEdit();
    this._removeGraphic()
    this.create(this.options,this.positions)
    // const options=this.options
    // const keys=Object.keys(options)
    // for(let key of keys){
    //   this.graphic.polygon[key]=options[key]
    // }
    // this.border.remove()
    // this.border=null
  }
  initEditWindow() {
    if(editPanel){
      super.initEditWindow();
      this.editPanel.outline=this.options.outline
      this.editPanel.outlineWidth=this.options.outlineWidth
    }
  }
  export(name='polyline'){
    const graphicJSON=Polygon.toGeoJson(this.positions,name)
    //保存文件
    const blob = new Blob([JSON.stringify(graphicJSON)], {type: ""});
    saveAs(blob, name+".geojson");
  }

  setWidth(v){
    this.options.width=parseInt(v)
    this.graphic.polyline.width._value=parseInt(v)
  }
  setColor(v){
    this.options.material=Cesium.Color.fromCssColorString(v)
    this.graphic.polygon.material=Cesium.Color.fromCssColorString(v)
  }
  setAlpha(v){
    this.graphic.polygon.material=Cesium.Color.fromAlpha(this.options.material, v)
  }
  setOutline(v){
    this.options.outline=v
    this.graphic.polygon.outline=v
    if(v){
      //必须设置height边框才会生效
      this.graphic.polygon.height=0.0
      this.options.height=0.0
    }
  }
  setOutlineColor(v){
    this.options.outlineColor=Cesium.Color.fromCssColorString(v)
    this.graphic.polygon.outlineColor=Cesium.Color.fromCssColorString(v)
  }
  setOutlineWidth(v){
    this.options.outlineWidth=parseFloat(v)
    this.graphic.polygon.outlineWidth=parseFloat(v)
  }

  static defaultStyle(){
    return {
      material: new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.4)),
      outline: false
      //material: new Cesium.ColorMaterialProperty(new Cesium.Color(205, 139, 14, 1)),

    }
  }
  static selectedStyle(){
    return {
      // material: new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.4)),
      //material: new Cesium.ColorMaterialProperty(new Cesium.Color(205, 139, 14, 1)),
      outline: true,
      outlineColor: Cesium.Color.AQUA,
      outlineWidth:3.0,
      height : 0.0

    }
  }
  static toGeoJson(position,name='polygon'){
    const graphicJSON= {
      "type": "FeatureCollection",
      "name": name,
      "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
      "features": []
    }
    const ellipsoid=Cesium.Ellipsoid.WGS84;
    let i=0
    const nodes=[]
    for(let p of position){
      const cartographic=ellipsoid.cartesianToCartographic(p);
      const lat=Cesium.Math.toDegrees(cartographic.latitude);
      const lon=Cesium.Math.toDegrees(cartographic.longitude);
      nodes.push([lon,lat])
    }
    const feat={ "type": "Feature", "properties": { "Id": i++,'name':name }, "geometry": { "type": "MultiPolygon", "coordinates": [ nodes] }}
    graphicJSON.features.push(feat)
    return graphicJSON
  }

}
class Point{
  constructor(viewer,pixel,position=null,options=Point.defaultStyle()){
    this.viewer=viewer
    this.options=options
    this.graphic=null
    this.create(pixel,position)
  }
  create(pixel,position){
    const wp=position?position:Point.screenWorld(this.viewer,pixel)
    let pos=new Cesium.CallbackProperty(function () {
      return wp
    }, false)
    const point = this.viewer.entities.add({
      position:pos,
      // position:Cesium.Cartesian3.fromDegreesArray(this.scene_to_latlng(worldPosition)[1],this.scene_to_latlng(worldPosition)[1]),
      point: this.options
    });
    this.graphic=point
    return point
  }
  remove(){
    this.viewer.entities.remove(this.graphic)
  }
  static defaultStyle(){
    return  {
      color: Cesium.Color.RED,
      pixelSize: 5,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2
    }
  }
  static editStyle(){
    return  {
      color: Cesium.Color.RED,
      pixelSize: 5,
      outlineColor: Cesium.Color.AQUA,
      outlineWidth: 2
    }
  }
  static selectedStyle(){
    return  {
      color: Cesium.Color.AQUA,
      pixelSize: 5,
      outlineColor: Cesium.Color.AQUA,
      outlineWidth: 3
    }
  }
  static screenWorld(viewer,pixel){
    const cvt=new convertTool(viewer)
    return cvt.screenWorld(pixel)
  }
}
class DrawEvent{
  constructor(){

  }
  static LEFT_CLICK(){
    return Cesium.ScreenSpaceEventType.LEFT_CLICK
  }
  static RIGHT_CLICK(){
    return Cesium.ScreenSpaceEventType.RIGHT_CLICK
  }
  static MOUSE_MOVE(){
    return Cesium.ScreenSpaceEventType.MOUSE_MOVE
  }
  static LEFT_DOUBLE_CLICK(){
    return Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  }
  static LEFT_DOWN(){
    return Cesium.ScreenSpaceEventType.LEFT_DOWN
  }
  static LEFT_UP(){
    return Cesium.ScreenSpaceEventType.LEFT_UP
  }
}
class polylineCollection{
  constructor(viewer,options=Polyline.defaultStyle()){
    this.viewer=viewer
    this.values=new Map()
    this.options=options

  }

  /**
   * 添加一条线
   * * @param node{Boolean}[node=false]
   * @param options{Object}[options=Polyline.defaultStyle()]
   * @param name{String}[name=null]

   */
  add(node=false,name=null){
    const pl=new Polyline(this.viewer,this.options,name)
    this.values.set(pl.name,pl)
    if(node){
      pl.initNodes()
    }
  }
  removeByName(name){
    const pl=this.values.get(name)
    pl.remove()
  }
  remove(){
    const pls=this.values.values()
    for(let pl of pls){
      pl.remove()
    }
  }
  has(v){
    this.values.has(v)?true:false
  }
  export(name='polyline'){
    const pls=this.values.values()
    const graphicJSON= {
      "type": "FeatureCollection",
      "name": name,
      "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
      "features": []
    }
    const feats=[]
    for(let pl of pls){
      const geojson=Polyline.toGeoJson(pl.positions,pl.name)
      graphicJSON.features.push(geojson.features[0])
    }
    const blob = new Blob([JSON.stringify(graphicJSON)], {type: ""});
    saveAs(blob, name+".geojson");

  }
  import(geojson){
    const feats=geojson.features
    for(let feat of feats){
      const geom=feat.geometry.coordinates[0]
      if(feat.geometry.type!=='MultiLineString'&&feat.geometry.type!=='Polyline'){
        console.log('==========文件类型错误============')
        return
      }
      const ps=[]
      for(let p of geom){
        ps.push(Cesium.Cartesian3.fromDegrees(parseFloat(p[0]),parseFloat(p[1])))
      }
      const pl=new Polyline(this.viewer)
      pl.create(Polyline.defaultStyle(),ps)
      pl.positions=ps
      pl.onSelected()
      pl.destroy()
      this.values.set(pl.name,pl)
    }
  }
}
class polygonCollection{
  constructor(viewer,options=Polygon.defaultStyle(),){
    this.viewer=viewer
    this.options=options
    this.values=new Map()

  }

  /**
   * 添加一个多边形
   * @param options
   * @param name
   */
  add(node=true,name=null){
    const pg=new Polygon(this.viewer,this.options,name)
    this.values.set(pg.name,pg)
    if(node){
      pg.initNodes()
    }
  }
  has(v){
    this.values.has(v)?true:false
  }
  remove(){
    const pgs=this.values.values()
    for(let pg of pgs){
      pg.remove()
    }
  }
  export(name='polygon'){
    const pgs=this.values.values()
    const graphicJSON= {
      "type": "FeatureCollection",
      "name": name,
      "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
      "features": []
    }
    const feats=[]
    for(let pg of pgs){
      const geojson=Polygon.toGeoJson(pg.positions,pg.name)
      graphicJSON.features.push(geojson.features[0])
    }
    const blob = new Blob([JSON.stringify(graphicJSON)], {type: ""});
    saveAs(blob, name+".geojson");

  }
  import(geojson){
    const feats=geojson.features
    for(let feat of feats){
      const geom=feat.geometry.coordinates[0]
      if(feat.geometry.type!=='MultiPolygon'&&feat.geometry.type!=='Polygon'){
        console.log('==========文件类型错误============')
        return
      }
      const ps=[]
      for(let p of geom){
        ps.push(Cesium.Cartesian3.fromDegrees(parseFloat(p[0]),parseFloat(p[1])))
      }
      const pg=new Polygon(this.viewer)
      pg.create(Polygon.defaultStyle(),ps)
      pg.positions=ps
      pg.onSelected()
      pg.destroy()
      this.values.set(pg.name,pg)
    }
  }
}
export {Polyline,Polygon,polygonCollection,polylineCollection}
