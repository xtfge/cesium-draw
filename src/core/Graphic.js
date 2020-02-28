import GraphicType from "./GraphicType";

/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-12-16 19:28:45
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 13:54:09
 * @Desc: 定义基础图形，包括点线、多边形，(圆，矩形)
 */
// import GraphicType from './GraphicType'
const Cesium = window.Cesium;
const defined = Cesium.defined;
const console=window.console;
import {CVT} from '@/js/utils';
class BaseGraphic {
    constructor(viewer) {
        if (viewer instanceof Cesium.Viewer === false) {
            throw new Error('viewer不是一个有效的Cesium Viewer对象.')
        }
        this.viewer = viewer
        this._type = undefined
        this._gvtype = undefined;
        this._gvid = undefined;
        this._name = undefined
    }
    get type() {
        return this._type;
    }
    get gvtype() {
        return this._gvtype
    }
    set gvtype(v) {
        this._gvtype = v;
    }
    get gvid() {
        return this._gvid;
    }
    set gvid(v) {
        this._gvid = v;
        if (this.graphic) {
            this.graphic.gvid = this._gvid
        }
    }
    get gvname() {
        return this._name
    }
    set gvname(v) {
        this._name = v;
        if (this.graphic) {
            this.graphic.gvname = this.gvname;
            if (this.graphic.label) {
                this.graphic.label.text = v;
            }
        }
    }
    get show() {
        if (this.graphic) {
            return this.graphic.show
        }
        return false
    }
    set show(v) {
        if (this.graphic) {
            this.graphic.show = v
        }
    }
    zoomTo() {
        if (this.graphic) {
            this.viewer.flyTo(this.graphic)
        }
    }
    coordinates(){
        if(this.position instanceof Cesium.Cartesian3){
            const coor=CVT.cartesian2Degrees(this.position,this.viewer)
            return [coor.lon,coor.lat,coor.height]
        }else if(this.positions instanceof Array){
            const pts=[]
            for(let p of this.positions){
                const c=CVT.cartesian2Degrees(p,this.viewer)
                pts.push([c.lon,c.lat,c.height])
            }
            if(this.type==='POLYLINE'){
                return pts
            }else{
                return [pts]
            }
            
        }
    }
    toGeoJson() {
        const type={
            'MARKER':'Point',
            'POLYLINE':'Polyline',
            'POLYGON':'Polygon',
            'LABEL':'Point'
        }
        return {
            "type": "Feature",
            "properties": { name:this.gvname,gvtype:this.gvtype },
            "geometry":
            {
                "type": type[this.type],
                "coordinates":this.coordinates()
            }
        }

    }
}
class CesiumBillboard extends BaseGraphic {
    /**
     * Cesium Marker
     * @param {Viewer} viewer Cesium Viewer
     * @param {*} options describles a billboard. 
     * 遵循和Cesium BillboardGraphic相同的方式.
     */
    constructor(viewer, options, labelOption = CesiumBillboard.defaultLabelStyle) {
        super(viewer);
        this.viewer = viewer;
        this._type = 'MARKER';
        this.gvtype = GraphicType.MARKER;
        this.position = options.position;
        options.image = options.image || CesiumBillboard.defaultStyle.image;

        labelOption.text = options.label;
        this.labelOptions = labelOption;
        const self = this;
        this.options = {
            gvname: this._name,
            gvtype: this.gvtype,
            gvid: this.gvid,
            position: new Cesium.CallbackProperty(function () {
                return self.position
            }, false),
            billboard: options,
            label: labelOption
        }
        this.graphic = undefined;
        this.name = '';
        this.description = '';
        this.create();
    }

    get text() {
        return this.graphic.label.text
    }
    set text(v) {
        this.graphic.label.text = v
        this.gvname = v
    }

    get font() {
        return this.graphic.label.font.getValue()
    }
    set font(font) {
        this.graphic.label.font = font
    }
    get color() {
        return this.graphic.label.fillColor
    }
    set color(color) {
        this.graphic.label.fillColor = color
    }
    /**
     * 
     * @param {*} option 定义一个LabelGraphic
     */
    setLabel(option) {
        if (!this.graphic) {
            return
        }
        const keys = Object.keys(option)
        for (let key of keys) {
            this.graphic.label[key] = option[key]
        }
    }
    create() {
        this.graphic = this.viewer.entities.add(this.options);
    }
    remove() {
        if (this.viewer) {
            this.viewer.entities.remove(this.graphic);
        }
        this.graphic = undefined;
    }
    updateText(text, description) {
        if (this.graphic) {
            this.graphic.label.text = text;
            this.name = text;
            this.description = description;
            this.gvname = text
        }
    }
    updateImage(img) {
        if (this.graphic) {
            if (img === undefined) {
                this.graphic.label.pixelOffset = undefined
                this.graphic.billboard.image = undefined
            } else {
                this.graphic.label.pixelOffset = this.labelOptions.pixelOffset
                this.graphic.billboard.image = img;
            }
        }
    }
    updatePosition(position) {
        this.position = position;
    }
    stopEdit() {
        // if (this.graphic && this.graphic.position) {
        //     this.graphic.position = this.graphic.position.getValue();
        // }
    }
    startEdit() {
        // const self = this;
        // if (this.graphic) {
        //     this.graphic.position = new Cesium.CallbackProperty(function () {
        //         return self.position;
        //     }, false)
        // }
    }
    destroy() {
        this.remove();
        this.viewer = undefined;
        this.options = undefined;
        this.position = undefined;
    }
    static fromDegrees(viewer, position) {
        const option = CesiumBillboard.defaultStyle;
        option.position = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height)
        return new CesiumBillboard(viewer, option);
    }
    static fromRadians(viewer, position) {
        const option = CesiumBillboard.defaultStyle;
        option.position = Cesium.Cartesian3.fromRadians(position.lon, position.lat, position.height)
        return new CesiumBillboard(viewer, option);
    }

    static defaultStyle = {
        image: `data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACk0lEQVRYR+2WO2gUURSGv7MBsZKo
        jY/CJkiiIviAKDuzLGqjWGiRRdEiVqKxEUUEA0ZQBFFsVLRSwaBJCi1EGw3LzsQH+ABRIphKUCs1
        pRa7R3acjbuzs3NnZtE0TnnvOf/57j2PO8IsfzLL8WkLQPN0VQ8gRabSHiQRgNosBg4jrELpBRb4
        gb8hPEd5C1wUhy9xgWIDqMV2hGvAEoP4Z5T94nI/DkQsALU4iTAUR3DGRhkSl1MmHyOA5liD8sok
        FLovrJUSr6N8IwE0TydlXGBliMgw8Mhf3wLsCbF5RweWFJluBRENYHEe4UiTs1IQl7H6dbXoQxgN
        sb0gLkfTAdg8BjY1OCvrxeVlmKBarEN4EdgbF4fNaQG+A50zzsKYlChE5VRzjKL01dlMi8P8xACa
        p5syk4HTD4jLlUgAi4MIlxtsOuiRIu/D/FrWgOZZRLlpoOwThxuRADb9wPUGmwrLZIKPiQCqxmrz
        BNhY5zgsDnsNALcCHfFBHJYnToEHkOM4ytlAGpo6oLbfohOuisOBdABZNpDhaUhrNXVCiw4AoV9K
        3EwF4N2CxSRCd5OAMEaForeeIR+o/D/mwgopBYq5Tsw8ii1OIJyOynvE3og47IryNQP0Mo85PAN6
        EkL8RMm2Glo1LSOA3w3VIors/5AUnZESgyboWAA+RPVRypoE/X3jI5ToBvyWLKCMxAQwDqzEAP4t
        3AV2GCDuicPOmKDJfkrVZjUwDixsEeBr9fUUhzd/BcCfCwMIl0IDKIfEDTxEBpLYRVivoza3oam/
        74jD7rgnT1UDNSfNM5cKUyhLvTXhExm6pMiPfwLgpSLLVjI88AJW2CYTPEwa/Dd7G5/anPNEHI6l
        lWkLIG3Qer//AL8AUSKwIU5nmlMAAAAASUVORK5CYII=`,
        verticalOrigin: Cesium.VerticalOrigin.BASELINE
    }
    static defaultLabelStyle = {
        font: '28px sans-serif',
        fillColor: Cesium.Color.WHITE,
        showBackground: true,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        // outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -20),
        heightReference: Cesium.HeightReference.NONE
    }
}
class CesiumPoint extends BaseGraphic {
    /**
     * Cesium PointGraphic
     * @param {Viewer} viewer Cesium.Viewer
     * @param {Object} options Describes a point. positions定义它的位置信息
     * （positions为数组将同时创建多个Point），
     * 属性信息的定义和Cesium.PointGraphics相同
     */
    constructor(viewer, options = CesiumPoint.defaultStyle) {
        super(viewer);
        this._type = 'POINT';
        this.gvtype = GraphicType.POINT;
        //allow mutiple to be created points at one time
        this.positions = options.positions;
        //only one point
        const self = this;
        if (this.positions instanceof Cesium.Cartesian3) {
            this.options = {
                gvname: this._name,
                gvid: this._gvid,
                gvtype: this._gvtype,
                position: new Cesium.CallbackProperty(function () {
                    return self.positions;
                }, false),
                point: options
            }
        }
        //mutiple points
        else if (this.positions instanceof Array) {
            this.options = [];
            for (let i = 0; i < this.positions.length; i++) {
                const point = {
                    gvname: this._name,
                    gvid: this._gvid,
                    gvtype: this._gvtype,
                    position: new Cesium.CallbackProperty(function () {
                        return self.positions[i];
                    }, false),
                    point: options
                }
                this.options.push(point);
            }
        } else {
            throw new Error('options参数错误.');
        }
        this.graphic = [];
        this.create();


    }

    create() {
        if (this.options instanceof Array) {
            this.graphic = this.options.map(_ => {
                const entity = this.viewer.entities.add(_);
                return entity
            })
        } else {
            this.graphic = this.viewer.entities.add(this.options);
        }
    }
    remove() {
        if (this.graphic instanceof Array) {
            this.graphic.map(_ => {
                this.viewer.entities.remove(_);
            })
        } else {
            this.viewer.entities.remove(this.graphic);
        }
        this.graphic = undefined;
    }
    /**
     * 在确定点的位置之后，将CallBackProperty重置为一个普通对象
     * 因为当点足够多时,CallBackProperty会在一定程度上影响系统性能，
     * 后面的Polyline，Polygon也是出于同样的考虑
     * ps:后来我发现并没有必要，因为Entity会强制转为Property
     */
    stopEdit() {
        if (this.graphic instanceof Cesium.Entity) {
            this.graphic.position = this.graphic.position.getValue();
        } else if (this.graphic instanceof Array) {
            this.graphic = this.graphic.map(_ => {
                return _.position = _.position.getValue();
            })
        }
    }

    /**
     * 判断两个点是否在同一位置
     * @param {*} node1 
     * @param {*} node2 
     */
    static equalPosition(node1, node2) {
        if (!(node1 instanceof Cesium.Cartesian3 && node2 instanceof Cesium.Cartesian3)) {
            throw new Error('node不是一个有效的Cartesian3对象')
        }
        return (node1.x === node2.x &&
            node1.y === node2.y &&
            node1.z === node2.z)
    }
    static setStyle(node, option) {
        const keys = Object.keys(option)
        for (let key of keys) {
            node.point[key] = option[key]
        }
    }
    contain(node) {
        if (this.graphic instanceof Cesium.Cartesian3) {
            return this.graphic === node
        } else if (this.graphic instanceof Array) {
            const count = this.graphic.length
            for (let i = 0; i < count; i++) {
                if (this.graphic[i] === node) {
                    return i
                }
            }
        }
        return -1
    }
    static defaultStyle = {
        color: Cesium.Color.RED,
        pixelSize: 5,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
    static editStyle = {
        color: Cesium.Color.RED,
        pixelSize: 5,
        outlineColor: Cesium.Color.AQUA,
        outlineWidth: 3,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
    static selectedStyle = {
        color: Cesium.Color.AQUA,
        pixelSize: 5,
        outlineColor: Cesium.Color.AQUA,
        outlineWidth: 3
    }
    static fromDegrees(viewer, positions) {
        const options = CesiumPoint.defaultStyle;
        if (positions instanceof Array) {
            options.positions = positions.map(_ => {
                if (_.lon === undefined || _.lat === undefined) {
                    throw new Error('参数错误');
                }
                return Cesium.Cartesian3.fromDegrees(_.lon, _.lat, _.height);
            })
        } else {
            if (positions.lon === undefined || positions.lat === undefined) {
                throw new Error('参数错误');
            }
            options.positions = Cesium.Cartesian3.fromDegrees(
                positions.lon,
                positions.lat,
                positions.height);
        }
        return new CesiumPoint(viewer, options);
    }
    static fromRadians(viewer, positions) {
        const options = CesiumPoint.defaultStyle;
        if (positions instanceof Array) {
            options.positions = positions.map(_ => {
                if (_.lon === undefined || _.lat === undefined) {
                    throw new Error('参数错误');
                }
                return Cesium.Cartesian3.fromRadians(_.lon, _.lat, _.height);
            })
        } else {
            if (positions.lon === undefined || positions.lat === undefined) {
                throw new Error('参数错误');
            }
            options.positions = Cesium.Cartesian3.fromRadians(
                options.positions.lon,
                options.positions.lat,
                options.positions.height);
        }
        return new CesiumPoint(viewer, options);
    }
    static isCesiumPoint(obj) {
        if (defined(obj) && obj.id && obj.id.gvtype === GraphicType.POINT) {
            return true
        }
        return false
    }
    destroy() {
        this.remove()
        this.viewer = undefined;
        this.options = undefined;
        this.graphic = undefined;
    }
}

class CesiumPolyline extends BaseGraphic {
    /**
     * Cesium PolylineGraphic
     * @param {Viewer} viewer Cesium.Viewer
     * @param {Object} options Describes a polyline. positions定义它的顶点集合，
     * 属性定义遵循和Cesium.PolylineGraphic相同的定义方式。
     */
    constructor(viewer, options = CesiumPolyline.defaultStyle) {
        super(viewer);
        this._type = 'POLYLINE';
        this.gvtype = GraphicType.POLYLINE;
        this.positions = options.positions || [];
        const self = this;
        const _update = function () {
            return self.positions;
        };
        this.options = {
            gvname: this._name,
            gvid: this._gvid,
            gvtype: this._gvtype,
            polyline: options
        };
        this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
        this.graphic = undefined;
        this.nodeGraphic = undefined;
        this.node = false;
        this.create();
    }

    get material() {
        if (this.graphic) {
            return this.graphic.polyline.material//.getValue()
        }
        return undefined
    }
    get width() {
        if (this.graphic) {
            return this.graphic.polyline.width.getValue()
        }
        return undefined

    }
    addNode(node) {
        if (node instanceof Cesium.Cartesian3) {
            this.positions.push(node)
        }
    }
    popNode() {
        this.positions.pop()
    }
    updateNode(index, node) {
        if (index < 0 || index > this.positions.length - 1) {
            throw new Error('无效的index')
        }
        if (node instanceof Cesium.Cartesian3 === false) {
            throw new Error('无效的node')
        }
        this.positions[index] = node
    }
    dropNode(index) {
        this.positions.splice(index, 1)
    }
    create() {
        if (this.viewer) {
            this.graphic = this.viewer.entities.add(this.options);
            // this.graphic.gvtype = 'CesiumPolyline'
        }
    }
    /**
     * 
     * @param {Object} options describles a points.
     * 遵循和Cesiun.PointGraphic相同的定义方式
     */
    createNode(options = CesiumPoint.defaultStyle) {
        options.positions = this.positions;
        options.clampToGround = this.options.polyline.clampToGround
        this.nodeGraphic = new CesiumPoint(this.viewer, options);
        this.node = true;
    }
    /**
     * 对于Polyline的编辑，需要做下面几件事
     * 1.要素的positions要变成CallbackProperty
     * 2.创建要素节点
     * 3.要素高亮显示
     */
    startEdit() {
        if (!defined(this.graphic)) {
            return;
        }
        // this.remove()
        // const self = this
        // const attrs = Object.keys(CesiumPolyline.selectedStyle)
        // for (let attr of attrs) {
        //     this.graphic.polyline[attr] = CesiumPolyline.selectedStyle[attr]
        // }
        //this.graphic.polyline.material = CesiumPolyline.selectedStyle.material

        // this.graphic.polyline.positions = new Cesium.CallbackProperty(function () {
        //     return self.positions
        // }, false)
        this.createNode()
        // const evt = new CustomEvent('startEdit', {
        //     detail: { graphicType: 'POLYLINE' }
        // })
        // document.dispatchEvent(evt)

    }
    stopEdit() {
        if (this.graphic instanceof Cesium.Entity) {
            //this.graphic.polyline.positions = this.positions;
            //this.graphic.polyline.material = this.options.polyline.material
        }
        this.removeNode()
        // const endEvent = new CustomEvent('stopEdit')
        // document.dispatchEvent(endEvent)
        // window.aa = this.graphic
    }
    remove() {
        if (this.viewer) {
            this.viewer.entities.remove(this.graphic);
            this.graphic = undefined;
            this.removeNode()
        }

    }
    removeNode() {
        if (this.node) {
            this.nodeGraphic.remove();
            // this.nodeGraphic = undefined
            this.node = false;
        }
    }
    setMaterial(material) {
        this.graphic.polyline.material = material
    }

    static fromDegrees(viewer, positions) {
        positions = positions.map(_ => {
            return Cesium.Cartesian3.fromDegrees(_.lon, _.lat, _.height);
        })
        const options = { positions, ...CesiumPolyline.defaultStyle };
        const pl = new CesiumPolyline(viewer, options);
        return pl;
    }
    static fromRadians(viewer, positions) {
        positions = positions.map(_ => {
            return Cesium.Cartesian3.fromRadians(_.lon, _.lat, _.height);
        })
        const options = { positions, ...CesiumPolyline.defaultStyle };
        const pl = new CesiumPolyline(viewer, options);
        return pl;
    }
    static defaultStyle = {
        clampToGround: true,
        material: Cesium.Color.fromCssColorString('rgba(247,224,32,1)'),
        width: 3
    }
    static selectedStyle = {
        clampToGround: true,
        material: Cesium.Color.AQUA,
        width: 3
    }
    destroy() {
        this.remove();
        this.viewer = undefined;
        this.options = undefined;
        this.positions = undefined;
        if (this.nodeGraphic) {
            this.nodeGraphic.destroy();
        }

        this.nodeGraphic = undefined;
    }
}
class CesiumPolygon extends BaseGraphic {
    /**
     * Cesium PolygonGraphic
     * @param {Viewer} viewer Cesium.Viewer
     * @param {Object} options describles a polygon. 
     * positions定义其位置信息， 属性信息遵循和Cesium.PolygonGraphic相同的定义方式
     */
    constructor(viewer, options = CesiumPolygon.defaultStyle) {
        super(viewer);
        this._type = 'POLYGON';
        this.gvtype = GraphicType.POLYGON;
        this.positions = options.positions || [];
        this.nodePositions = [...this.positions]

        const self = this;
        this.options = {
            gvid: this.gvid,
            gvtype: this.gvtype,
            polygon: {
                hierarchy: new Cesium.CallbackProperty(function () {
                    return new Cesium.PolygonHierarchy(self.positions)
                }, false),
                ...options
            }
        };
        this.node = false;
        this.graphic = undefined;
        this.nodeGraphic = undefined;
        this.outlineGraphic = undefined;
        this.outline = options.outline;
        this.create();
    }
    get outlineStyle() {
        if (this.outlineGraphic) {
            return this.outlineGraphic.polyline
        }
        return undefined
    }
    set outlineStyle(style) {
        const options = {}
        if (defined(this.outlineGraphic)) {
            const pl = this.outlineGraphic.graphic.polyline
            options.material = style.outlineColor || pl.material
            options.width = style.outlineWidth || pl.width
            this.outlineGraphic.graphic.polyline.material = options.material
            this.outlineGraphic.graphic.polyline.width = options.width
            this.outlineGraphic.options.polyline.material = options.material
            this.outlineGraphic.options.polyline.width = options.width
        } else {
            this.outline && this.createOutline(options)
        }

    }
    get material() {
        if (this.graphic) {
            return this.graphic.polygon.material.getValue().color
        }
        return undefined
    }
    get outlineColor() {
        if (this.outlineGraphic) {
            return this.outlineGraphic.graphic.polyline.material.getValue().color
        }
        return CesiumPolygon.defaultStyle.outlineColor
    }
    get outlineWidth() {
        if (this.outlineGraphic) {
            return this.outlineGraphic.graphic.polyline.width.getValue()
        }
        return CesiumPolygon.defaultStyle.outlineWidth
    }
    addNode(node) {
        if (node instanceof Cesium.Cartesian3) {
            this.positions.push(node)
            //由于边框实质上是一个首尾相连的Polyline
            //因此最后一个点需要永远等于第一个点
            const count = this.nodePositions.length
            if (count === 0) {
                this.nodePositions.push(this.positions[0])
                this.nodePositions.push(this.positions[0])
            }
            if (count >= 2) {
                // this.nodePositions.insert(count-1,node)
                this.nodePositions[count] = this.nodePositions[count - 1]
                this.nodePositions[count - 1] = node
            }

        }
    }
    updateNode(index, node) {
        if (index < 0 || index > this.positions.length - 1) {
            throw new Error('无效的index')
        }
        if (node instanceof Cesium.Cartesian3 === false) {
            throw new Error('无效的node')
        }
        this.positions[index] = node
        if (index === 0) {
            this.nodePositions[0] = node
            this.nodePositions[this.nodePositions.length - 1] = node
        } else {
            this.nodePositions[index] = node
        }
    }
    popNode() {
        this.positions.pop()
        //nodePositions的最后一个节点是倒数第2个点
        this.nodePositions.splice(this.nodePositions.length - 2)
        this.nodePositions.push(this.positions[0])
    }

    dropNode(index) {
        this.positions.splice(index, 1)
        this.nodePositions.splice(index, 1)
        if (index === 0) {
            this.nodePositions[this.nodePositions.length - 1] = this.nodePositions[0]
        }
    }
    create() {
        //Not create outline here.
        //Create it with createOutline if necessary

        this.options.polygon.outline = false;
        if (this.viewer) {
            this.graphic = this.viewer.entities.add(this.options);
            // this.graphic.gvtype = 'CesiumPolygon';
            if (this.outline) {
                this.createOutline()
            }
        }
    }
    /**
     * 
     * @param {Object} options describles a points.
     * 遵循和Cesiun.PointGraphic相同的定义方式
     */
    createNode(options = CesiumPoint.defaultStyle) {
        this.node = true;
        options.positions = this.positions;
        options.clampToGround = this.graphic.polygon.perPositionHeight.getValue();

        this.nodeGraphic = new CesiumPoint(this.viewer, options);
    }
    /**
     * 创建多边形边框
     * 由于Cesium PolygonGraphic的outlineWidth属性无效（只能为1），
     * 这里利用Polyline代替多边形的outline
     */
    createOutline(options = {}) {
        if (this.options.outline === false) {
            console.log('如果您想创建多边形边线,请在options中设置outline为true');
            return;
        }
        options.width = this.options.polygon.outlineWidth || CesiumPolyline.defaultStyle.width;
        options.material = this.options.polygon.outlineColor || CesiumPolyline.defaultStyle.material;
        // options.show=this.options.outline
        options.clampToGround = !this.graphic.polygon.perPositionHeight.getValue();
        options.positions = this.nodePositions;
        this.outlineGraphic = new CesiumPolyline(this.viewer, options);
        this.outline = true
    }
    /**
     * 对于Polygon的要素编辑，需要做下面几件事：
     * 1.hierarchy变为CallbackProperty
     * 2.创建多边形顶点
     * 3.要素高亮显示
     * 4.如果多边形定义了outline，outline也要高亮,outline的positions要变为CallbackProperty
     */
    startEdit() {
        // const positions = this.positions
        // const nodePositions = this.nodePositions
        if (this.graphic instanceof Cesium.Entity) {
            // this.graphic.polygon.hierarchy = new Cesium.CallbackProperty(function () {
            //     return new Cesium.PolygonHierarchy(positions);
            // })
            //this.graphic.polygon.material = CesiumPolygon.selectedStyle.material;
            if (this.outline) {
                this.outlineGraphic.startEdit();
                this.nodeGraphic=this.outlineGraphic.nodeGraphic;
                this.node=true;
            } else {
                this.createNode()
            }
        }

    }
    stopEdit() {
        if (this.graphic instanceof Cesium.Entity) {
            //this.graphic.polygon.hierarchy = new Cesium.PolygonHierarchy(this.positions);
            //this.graphic.polygon.material = this.options.polygon.material
        }
        this.removeNode()
        if (this.nodeGraphic) {
            this.nodeGraphic.stopEdit();
        }
        if (this.outlineGraphic) {
            this.outlineGraphic.stopEdit();
        }

    }
    remove() {
        if (this.viewer) {
            this.viewer.entities.remove(this.graphic);
            this.graphic = undefined;
            this.removeNode()
            this.removeOutline()
        }
    }
    removeOutline() {
        if (this.outline) {
            this.outlineGraphic.remove();
            this.outline = false
            this.outlineGraphic = undefined
        }
    }
    removeNode() {
        if (this.node) {
            this.nodeGraphic.remove();
            this.node = false;
            // this.nodePositions=[]
        }
    }
    destroy() {
        this.remove()
        this.viewer = undefined;
        this.positions = undefined;
        this.options = undefined;
        if (this.nodeGraphic) {
            this.nodeGraphic.destroy();
        }
        if (this.outlineGraphic) {
            this.outlineGraphic.destroy();
        }
        this.outlineGraphic = undefined;
        this.nodeGraphic = undefined;
    }

    /**
     * 多边形默认样式
     */
    static defaultStyle = {
        material: new Cesium.Color.fromCssColorString('rgba(247,224,32,0.5)'),
        outline: true,
        outlineColor: new Cesium.Color.fromCssColorString('rgba(255,247,145,1)'),
        outlineWidth: 2,
        perPositionHeight:false
        // height:0,
        // HeightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        //material: new Cesium.ColorMaterialProperty(new Cesium.Color(205, 139, 14, 1)),

    }
    static selectedStyle = {
        // material: new Cesium.ColorMaterialProperty(Cesium.Color.GREEN.withAlpha(0.4)),
        //material: new Cesium.ColorMaterialProperty(new Cesium.Color(205, 139, 14, 1)),
        material: new Cesium.ColorMaterialProperty(Cesium.Color.AQUA.withAlpha(0.4)),
        outlineColor: Cesium.Color.AQUA.withAlpha(0.4)
        //heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
    static fromDegrees(viewer, positions) {
        positions = positions.map(_ => {
            return Cesium.Cartesian3.fromDegrees(_.lon, _.lat, _.height);
        });
        const options = CesiumPolygon.defaultStyle;
        options.positions = positions;
        return new CesiumPolygon(viewer, options);

    }
    static fromRadians(viewer, positions) {
        positions = positions.map(_ => {
            return Cesium.Cartesian3.fromRadians(_.lon, _.lat, _.height);
        });
        const options = CesiumPolygon.defaultStyle;
        options.positions = positions;
        return new CesiumPolygon(viewer, options);

    }
}
class CesiumLabel extends BaseGraphic {
    /**
     * 
     * @param {Viewer} viewer Cesium Viewer 
     * @param {Object} options describles a label.
     * positions定义其空间位置(如果positions为Cartesian3数组将创建多个label)，
     * label属性的定义遵循Cesium LabelGraphic的定义方式
     */
    constructor(viewer, options = CesiumLabel.defaultStyle) {
        super(viewer);
        this._type = 'LABEL';
        this._gvtype = GraphicType.LABEL;
        this.position = options.position;

        this.options = {
            gvid: this._gvid,
            gvtype: this._gvtype,
            position: this.position,
            label: options
        };
        this.graphic = undefined;
        this.create();


    }
    get color() {
        if (this.graphic) {
            return this.graphic.label.fillColor.getValue()
        }
        return undefined
    }
    set color(c) {
        if (this.graphic) {
            this.graphic.label.fillColor = c
        }
    }
    get font() {
        if (this.graphic) {
            return this.graphic.label.font.getValue()
        }
        return undefined
    }
    create() {

        this.graphic = this.viewer.entities.add(this.options);
    }
    remove() {
        this.viewer && this.viewer.entities.remove(this.graphic);
        this.graphic = undefined;
    }
    updateText(text) {
        if (this.graphic) {
            this.graphic.label.text = text;
            this.gvname = text
        }
    }
    static defaultStyle = {
        color: Cesium.Color.WHITE,
        font: '28px sans-serif',
        showBackground: true
    }
    destroy() {
        this.remove();
        this.viewer = undefined;
        this.options = undefined;
        this.positions = undefined;
    }
}
class CesiumModel extends BaseGraphic {
    constructor(viewer, options) {
        super(viewer);
        this._type = 'MODEL';
        this._gvtype = GraphicType.MODEL;
        this.position = options.position
        // this.gvname = '未命名'
        this.options = {
            gvid: this._gvid,
            gvtype: this._gvtype,
            position: this.position,
            model: options
        }
        this.create()

    }
    create() {
        this.graphic = this.viewer.entities.add(this.options)
    }
    remove() {
        if (this.viewer) {
            this.viewer.entities.remove(this.graphic)
            this.graphic = undefined
        }
    }
    destroy() {
        this.remove()
        this.options = undefined
        this.position = undefined
    }
    set uri(uri) {
        if (this.graphic) {
            this.graphic.model.uri = uri
        }
    }
    set color(c) {
        if (this.graphic) {
            this.graphic.model.color = c
        }
    }
    set mode(m) {
        if (this.graphic) {
            this.graphic.model.colorBlendMode = m
        }
    }
    set mixed(v) {
        if (this.graphic) {
            this.graphic.model.colorBlendAmount = v
        }
    }
    static defaultStyle = {
        colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
        color: Cesium.Color.WHITE,
        colorBlendAmount: 0.5,
        minimumPixelSize: 64
    }
}
export { CesiumPoint, CesiumPolyline, CesiumPolygon, CesiumLabel, CesiumBillboard, CesiumModel }