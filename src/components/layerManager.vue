<!--
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-12-23 16:34:02
 * @LastEditors  : zhangbo
 * @LastEditTime : 2020-01-02 18:06:00
 * @Desc: 
 -->
<template>
  <div class="layer-mamanger-box">
    <div class="layer-manager-header">
      <i class="iconfont icon-guanbi1"></i>
      <span>标绘清单</span>
      <span class="closebtn iconfont icondelete" @click="closeLayerManaer"></span>
    </div>
    <div class="layer-manager-tools" >
      <span class="el-dropdown-link" @click="importHandler">
          <i class="iconfont iconimport action-icon-class">导入</i>
        </span>
      <el-dropdown trigger="click" @command="exportHandler">
        <span class="el-dropdown-link">
          <i class="iconfont iconexport action-icon-class">导出</i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="MARKER" class="iconfont icon-dianshuju">标记</el-dropdown-item>
          <el-dropdown-item command="POLYLINE" class="iconfont icon-shiliangxian">线</el-dropdown-item>
          <el-dropdown-item command="POLYGON" class="iconfont icon-mianbiao">多边形</el-dropdown-item>
          <el-dropdown-item command="LABEL" class="iconfont icon-wenzibiaohui">书签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="iconfont iconremove action-icon-last-class" @click="removeAll">清空</i>
    </div>
    <div id="layerTree" class="graphic-draw-layer-manager-class"></div>
  </div>
</template>
<script>
import GraphicType from "../core/GraphicType";
const Cesium = window.Cesium;
const defined = Cesium.defined;
const console = window.console;
import $ from "jquery";
export default {
  data() {
    return {
      markerTree: new Map(),
      polylineTree: new Map(),
      polygonTree: new Map(),
      labelTree: new Map(),
      modelTree: new Map(),
      renameNodeStatus: false,
      json: [
        {
          id: "marker",
          text: "标记",
          type: "marker",
          children: []
        },
        {
          id: "polyline",
          text: "线",
          type: "polyline",
          children: []
        },
        {
          id: "polygon",
          text: "多边形",
          type: "polygon",
          children: []
        },
        {
          id: "label",
          text: "文字",
          type: "label",
          children: []
        }
        // ,
        // {
        //   id: "model",
        //   text: "模型",
        //   type: "model",
        //   children: []
        // }
      ]
    };
  },
  mounted() {
    const self = this;
    $("#layerTree")
      .jstree({
        core: {
          themes: {
            name: false,
            dots: false,
            icons: true,
            ellipsis: true
          },
          animation: 0,
          check_callback: true,

          data: self.json
        },
        types: {
          default: {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T73TMYpCMRDG8d+7grDNXsHSzmrtPYOlh7BRC7FctrFwa09hoVY2doKXsPEIMmB2w8PnQ0UDgWTy5c83k0zhfwzRx2cWy5cDTMtnxSXQwq7iYgpPcMRPrkuAL6xqAKH9xgG/SXsPoI0t5thgEZB7AKFfZy7Hsb8GGJVSifRilkenClBTir/jSkA4yK3G/v0ObqWRavS6GuT5X3OS6lHp4GnAQ8/YwP5GJ5ah0VTNaK70E0PQRQ8fNRZOWGIWujPS9S0Rze8/BQAAAABJRU5ErkJggg=="
          },
          marker: {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABGUlEQVQ4T53TMStGURzH8c/zDhQvQJLBpCyyYGDGZmJSBsVkfJKJhRQxWZW8AQublMEig8lK5B3Qv86p23Xde5/nP53O//y+93f+v3M72tUIBvGG9zpJp4E3jHMsFM6dYeM/XRPwBvO4wxNmMYED7FRB64BruEiwuSSexGNaxwi+ytA64DWWEbBwmOs2OZ3CQy/ATRyXHI7jOUGG8NkLcBSvSRBOXjCNMdyn9Z8xNoUSCa9XDH8Fl21DiRlFfWC/EELWB2gPJ2njFFe5WeXwJwURZyKMQ2wlwXfq5Sc0k/Z3m4DFDw0gXMf728ZR4ardfoChWcQqlkpz6xsYnHAYVy1Wa2D+M6qCLO61mmFOuQmW+40ptwVVnvsFGZA0EVbye/oAAAAASUVORK5CYII="
          },
          polyline: {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4T8XTr0uDQRzH8df+AOO6YTNYRFBWh1FBgyCu7b8w+i+IdYOxYjBo2obJZBEsFhHDYAjC4vKCHNyNh4fH8cDD8Nr9+Lzvfd+7q6nYahXzNgbYwjkWeFhn+ZdBG88xuNayaHIX93jBEZoFBgPs4CQPSOE+bqJ+D5MMpIGv2N/PAlJ4hKu4oIVrHGcAY8zwhMcEuEMHQ3Rzyq84ww9uEQwuY4FX1zjFNvbwngNc4BCf0ewUH2lNMgjhJb4LClbHPI6Ho2TrUeohBXgwfMNBfoONvcTSX+T/DX4BJE4iUTYT1msAAAAASUVORK5CYII="
          },
          polygon: {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAABJklEQVQ4T5XTPShGURgH8N9blAyKlM1g86aMjIxKKYuBgZSyiJCBfMTgY1CUUrKwSRYpG4NkImQj2WQ0mejo3rrd3q97ttN9zu+e8z/PySk9erGOE6wUK82VQW6xjx3UZUUacIhr/CDM+zCJmzRWaCeD6MEmHhMLGrGKLywmoTRyFC3cKnHMUYxjAK+hLiAbaEczpnBZJqfwOdTPoSUcOSC/ERb+PlsBEJcsYTneyXB0jZ14z4CE0o+QT5zJGMJ1PmVEXpCPkRqsYSYD0opu7CVv5w4dGZBjDMWZxOsmcI63CqFPNKWRekxjoQKkFqFfdtNIHheYxz1CaIVGf5TFKa7SyHP0yMJbqcJIEeQs2sE3/js7GWwXtlGNAzwUQUKntkWtHzL0B8aQM/kTGiTdAAAAAElFTkSuQmCC"
          },
          label: {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAz0lEQVQ4T9XTP05CQRDH8c+7g4V3oMReIbaUWmvLFSi04Qb0WEECnYklEXo9COEQkEl2N48XQF+s3GZnNzPfzG/+VP54qhR/15Kzzv4ZsG8JyHHqgFdsEugW8Y7ziF2yh3igxBVjkRxzIi81QA8lZXzhpikhqMuajEuAI9+ipVGDS4Aj1/8FiFaPMUoFji5VbSRc4R7z1MYuvtsAongDvJ+ag+YgTvGUPp/xluw+Vj8BOpgg78cMH4g7/j5xjW1AT0k4t1j1aSwZn6vBr3frAFW/KhFE2yg+AAAAAElFTkSuQmCC"
          },
          model: {
            icon: "static/images/icon/model.png"
          }
        },
        contextmenu: {
          items: self.getContext
        },
        plugins: ["types", "checkbox"],
        state: {
          selected: true
        }
      })
      .bind("click.jstree", ".layer-manager-handler-class", function(e) {
        if (e.target.dataset && e.target.dataset.gvid) {
          if (e.target.dataset.type === "locate") {
            self.$emit("locate", e.target.dataset.gvid);
          } else if (e.target.dataset.type === "edit") {
            self.$emit("edit", e.target.dataset.gvid);
          } else if (e.target.dataset.type === "delete") {
            self.deleteNode(e.target.dataset.gvid);
            self.$emit("delete", e.target.dataset.gvid);
          } else if (e.target.dataset.type === "rename") {
            self.editNode(e.target.dataset.gvid);
            self.$emit("rename", e.target.dataset.gvid);
          }
          e.stopPropagation();
          e.preventDefault();
          return false;
        } else {
          return false;
        }
      });
    //重写jstree的activate_node方法
    $.jstree.plugins.checkbox.prototype.activate_node = function(obj, e) {
      if (this.is_disabled(obj)) {
        return false;
      }
      if (!e || typeof e !== "object") {
        e = {};
      }

      // ensure last_clicked is still in the DOM, make it fresh (maybe it was moved?) and make sure it is still selected, if not - make last_clicked the last selected node
      this._data.core.last_clicked =
        this._data.core.last_clicked &&
        this._data.core.last_clicked.id !== undefined
          ? this.get_node(this._data.core.last_clicked.id)
          : null;
      if (
        this._data.core.last_clicked &&
        !this._data.core.last_clicked.state.selected
      ) {
        this._data.core.last_clicked = null;
      }
      if (!this._data.core.last_clicked && this._data.core.selected.length) {
        this._data.core.last_clicked = this.get_node(
          this._data.core.selected[this._data.core.selected.length - 1]
        );
      }

      if (
        !this.settings.core.multiple ||
        (!e.metaKey && !e.ctrlKey && !e.shiftKey) ||
        (e.shiftKey &&
          (!this._data.core.last_clicked ||
            !this.get_parent(obj) ||
            this.get_parent(obj) !== this._data.core.last_clicked.parent))
      ) {
        if (
          !this.settings.core.multiple &&
          (e.metaKey || e.ctrlKey || e.shiftKey) &&
          this.is_selected(obj)
        ) {
          this.deselect_node(obj, false, e);
        } else {
          this.deselect_all(true);
          this.select_node(obj, false, false, e);
          this._data.core.last_clicked = this.get_node(obj);
        }
      } else {
        if (e.shiftKey) {
          var o = this.get_node(obj).id,
            l = this._data.core.last_clicked.id,
            p = this.get_node(this._data.core.last_clicked.parent).children,
            c = false,
            i,
            j;
          for (i = 0, j = p.length; i < j; i += 1) {
            // separate IFs work whem o and l are the same
            if (p[i] === o) {
              c = !c;
            }
            if (p[i] === l) {
              c = !c;
            }
            if (!this.is_disabled(p[i]) && (c || p[i] === o || p[i] === l)) {
              if (!this.is_hidden(p[i])) {
                this.select_node(p[i], true, false, e);
              }
            } else {
              this.deselect_node(p[i], true, e);
            }
          }
          this.trigger("changed", {
            action: "select_node",
            node: this.get_node(obj),
            selected: this._data.core.selected,
            event: e
          });
        } else {
          //如果点击的是重命名、编辑、定位、删除按钮
          if (
            e.target.tagName.toUpperCase() === "I" &&
            e.target.className !== "jstree-icon jstree-checkbox"
          ) {
            return;
          }
          if (!this.is_selected(obj)) {
            this.select_node(obj, false, false, e);
          } else {
            this.deselect_node(obj, false, e);
          }
        }
      }
    };

    $("#layerTree").on("changed.jstree", function(e, data) {
      if (data.event && data.event.target) {
        const gvid = data.node.id;
        if (!gvid) {
          return false;
        }
        if (data.action === "select_node") {
          self.$emit("select", gvid, true);
        } else if (data.action === "deselect_node") {
          self.$emit("select", gvid, false);
        }
      }
    });

    $("#layerTree").on("rename_node.jstree", function(e, data) {
      if (!data.node) {
        return;
      }
      //提取真正的名称
      if (/(.*?)</g.test(data.node.text) === false && self.renameNodeStatus) {
        const attr = /(.*?)</g.exec(data.node.text);
        self.renameNode(data.node.id, data.node.text);
        self.renameNodeStatus = false;
        self.$emit("rename", data.node.id, data.node.text);
      }
    });
    console.log($.jstree);
  },
  computed: {
    node() {
      const ref = $("#layerTree").jstree(true);
      const sel = ref.get_selected();
      if (!sel.length) {
        return false;
      }
      return sel[0];
    },
    tree() {
      return $("#layerTree").jstree(true);
    }
  },
  methods: {
    exportHandler(cmd) {
      this.$emit("export", cmd);
    },
    importHandler(cmd) {
      this.$emit("import", cmd);
    },
    closeLayerManaer() {
      this.$emit("close");
    },
    removeAll() {
      this.$emit("clear");
      this.reset();
    },
    reset() {
      $("#layerTree").jstree(true).settings.core.data = this.json; // 新数据
      $("#layerTree")
        .jstree(true)
        .deselect_all();
      $("#layerTree")
        .jstree(true)
        .refresh();
    },
    update(viewer) {
      const values = viewer.entities.values;
      for (let v of values) {
        if (v.gvtype === GraphicType.MARKER && defined(v.gvid)) {
          this.markerTree.set(v.id, v.gvname);
        } else if (v.gvtype === GraphicType.POLYLINE && defined(v.gvid)) {
          this.polylineTree.set(v.id, v.gvname);
        } else if (v.gvtype === GraphicType.POLYGON && defined(v.gvid)) {
          this.polygonTree.set(v.id, v.gvname);
        } else if (v.gvtype === GraphicType.LABEL && defined(v.gvid)) {
          this.labelTree.set(v.id, v.gvname);
        } else if (v.gvtype === GraphicType.MODEL && defined(v.gvid)) {
          this.modelTree.set(v.id, v.gvname);
        }
      }
    },
    insertLayer(type, id, name) {
      switch (type) {
        case GraphicType.MARKER:
          this.insertMarker(id, name);
          break;
        case GraphicType.POLYLINE:
          this.insertPolyline(id, name);
          break;
        case GraphicType.POLYGON:
          this.insertPolygon(id, name);
          break;
        case GraphicType.LABEL:
          this.insertLabel(id, name);
          break;
        case GraphicType.MODEL:
          this.insertModel(id, name);
          break;
      }
      //重写tree-node单击事件
      // this.resetEventHandler();
    },
    insertMarker(id, name) {
      const context = this.createBTN(id, name);
      this.insertNode("marker", id, context);
      $("#layerTree").jstree("open_node", "marker");
    },
    insertPolyline(id, name) {
      const context = this.createBTN(id, name);
      this.insertNode("polyline", id, context);
      $("#layerTree").jstree("open_node", "polyline");
    },
    insertPolygon(id, name) {
      const context = this.createBTN(id, name);
      this.insertNode("polygon", id, context);
      $("#layerTree").jstree("open_node", "polygon");
    },
    insertLabel(id, name) {
      const context = this.createBTN(id, name);
      this.insertNode("label", id, context);
      $("#layerTree").jstree("open_node", "label");
    },
    insertModel(id, name) {
      const context = this.createBTN(id, name);
      this.insertNode("model", id, context);
      $("#layerTree").jstree("open_node", "model");
    },
    insertNode(parent_node, id, text) {
      $("#layerTree").jstree(
        "create_node",
        $("#" + parent_node),
        { text: text, id: id },
        "last",
        false,
        false
      );
      this.selectNode(id);
    },
    selectNode(id) {
      $("#layerTree").jstree("select_node", "#" + id);
    },
    deleteNode(id) {
      $("#layerTree").jstree("delete_node", "#" + id);
    },
    renameNode(id, text) {
      $("#layerTree").jstree("rename_node", id, this.createBTN(id, text));

      // this.resetEventHandler();
    },
    editNode(id) {
      const ref = $("#layerTree").jstree(true);
      const node = ref.get_node(id);
      //提取真正的名称
      const attr = /(.*?)</g.exec(node.text);
      const name = attr[1] || "";

      $("#layerTree").jstree("rename_node", id, name);
      this.renameNodeStatus = true;
      ref.edit(id);
      // this.renameNode(id,name)
    },
    createBTN(id, name) {
      name=name||'未命名';
      const locate =
        "<i class='iconfont iconlocate layer-manager-handler-class' \
      title='定位' data-type='locate' data-gvid='" +
        id +
        "'></i>";
      const rename =
        "<i class='iconfont iconrename layer-manager-handler-class' \
      title='重命名' data-type='rename' data-gvid='" +
        id +
        "'></i>";
      const edit =
        "<i class='iconfont iconedit layer-manager-handler-class'\
       title='编辑' data-type='edit' data-gvid='" +
        id +
        "'></i>";
      const del =
        "<i class='iconfont icondelete layer-manager-last-item layer-manager-handler-class'\
       title='删除' data-type='delete' data-gvid='" +
        id +
        "'></i>";

      return name + del + edit + locate + rename;
    },
    getContext(node) {
      const items = {
        rename: {
          label: "重命名",
          // icon: "img/mapPage.png",
          action: function(data) {
            var inst = $.jstree.reference(data.reference);
            const obj = inst.get_node(data.reference);
            inst.edit(obj);
          }
        },
        edit: {
          label: "编辑",
          // icon: "img/rename1.png",
          action: function(obj) {
            console.log(obj);
          }
        },
        locate: {
          label: "定位",
          // icon: "img/delete1.png",
          action: function(obj) {
            console.log(obj);
          }
        },
        delete: {
          label: "删除",
          // icon: "img/copy1.png",
          action: function(obj) {
            console.log(obj);
          }
        }
      };
      //console.log(node);
      if (node.parent == "#") {
        //如果是根节点
        delete items.createmap;
      } else if (node.type == "mapclass") {
        //如果是图谱
        delete items.deleteItems;
      } else if (node.type == "mapfile") {
        //如果是图谱页
        delete items.createclass;
        delete items.createmap;
      }
      return items; //注意要有返回值
    }
  }
};
</script>
<style lang='scss' scoped>
$icon-b-color: #ff0000;
.layer-mamanger-box {
  width: $g-width;
  background-color: $bg-color;
  color: $color;
  height: 400px;
}
.graphic-draw-layer-manager-class {
  height: 328px;
  z-index: 99;
  // position: absolute;
  padding: $padding;
  border-radius: $b-radius;
  overflow: auto;
  /deep/ .jstree-node {
    line-height: $item-height;
    a {
      height: $item-height;
      line-height: $item-height;
      // width: 376px;
      i {
        height: $item-height;
        line-height: $item-height;
      }
    }
  }
  /deep/ .jstree-anchor {
    padding: $padding;
  }
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: $border-color;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: $bg-color;
  }
}

.layer-manager-tools {
  // width: $g-width;
  height: $item-height;
  line-height: $item-height;
  padding: $padding;
  .action-icon-class {
    margin: $item-margin;
    cursor: pointer;
    &:hover {
      color: $hover-color;
    }
  }
  .el-dropdown {
    color: $color;
  }
  .action-icon-last-class {
    float: right;
    cursor: pointer;
    margin-right: 5px;
    &:hover {
      color: $hover-color;
    }
  }
}
.layer-manager-header {
  height: $title-height;
  line-height: $title-height;
  border-bottom: 1px solid $border-color;
  background-color: $bg-color;
  padding: $padding;

  i {
    margin: $item-margin;
  }
}

/deep/ .jstree-clicked,
/deep/ .jstree-hovered {
  background: $bg-color !important;
  box-shadow: none !important;
}
/deep/ .jstree-hovered {
  // color: $hover-color!important;
}
/deep/ .jstree-default .jstree-checkbox {
  background-position: -164px 5px;
}
/deep/ .jstree-default .jstree-anchor > .jstree-undetermined {
  background-position: -196px 6px;
}
/deep/
  .jstree-default.jstree-checkbox-selection
  .jstree-clicked
  > .jstree-checkbox,
.jstree-default .jstree-checked > .jstree-checkbox {
  background-position: -228px 5px;
}
/deep/ .jstree-default > .jstree-no-dots .jstree-closed > .jstree-ocl {
  background-position: -4px 0px;
}
/deep/ .jstree-default > .jstree-no-dots .jstree-open > .jstree-ocl {
  background-position: -34px 0px;
}
/deep/ .jstree-default .jstree-checkbox:hover {
  background-position: -164px -26px;
}
/deep/
  .jstree-default.jstree-checkbox-selection
  .jstree-clicked
  > .jstree-checkbox:hover,
.jstree-default .jstree-checked > .jstree-checkbox:hover {
  background-position: -228px -26px;
}
</style>
<style lang='scss'>
.layer-manager-handler-class {
  height: $item-height;
  line-height: $item-height;
  margin: 0 8px;
  float: right;
  &:hover {
    color: $hover-color;
  }
}
.layer-manager-last-item {
  margin-right: 10px;
  &:hover {
    color: $hover-color;
  }
}
.jstree-default-contextmenu {
  z-index: 100;
}
</style>