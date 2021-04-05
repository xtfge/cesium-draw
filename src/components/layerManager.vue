<template>
  <div class="layer-manager-box" id="layer-manager-box">
    <div class="layer-manager-header" id="layer-manager-header">
      <i class="iconfont iconclose1"></i>
      <span>标绘清单</span>
      <span class="closebtn iconfont iconclose" @click="closeLayerManaer"></span>
    </div>
    <div class="layer-manager-tools">
      <span class="el-dropdown-link" @click="importHandler">
        <i class="iconfont iconimport action-icon-class">
          <span>导入</span>
        </i>
      </span>
      <el-dropdown trigger="click" @command="exportHandler">
        <span class="el-dropdown-link">
          <i class="iconfont iconexport action-icon-class">
            <span>导出</span>
          </i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="MARKER" class="iconfont iconmarker">标记</el-dropdown-item>
          <el-dropdown-item command="POLYLINE" class="iconfont iconpolyline">线</el-dropdown-item>
          <el-dropdown-item command="POLYGON" class="iconfont iconpolygon">多边形</el-dropdown-item>
          <el-dropdown-item command="LABEL" class="iconfont iconlabel">书签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="iconfont iconremove action-icon-last-class" @click="removeAll">
        <span>清空</span>
      </i>
    </div>
    <div id="layerTree" class="graphic-draw-layer-manager-class">
      <el-tree
        :data="json"
        show-checkbox
        node-key="id"
        ref="tree"
        @check="checkAction"
        :default-expanded-keys="['marker','polyline','polygon']"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon" class="action-item"></i>
          <el-input v-model="newName" v-if="data.edit" @keypress.enter.native="renameAction(data)"></el-input>
          <span class="node-name action-item" v-else>{{ data.text }}</span>
          <span v-if="!data.children" class="action-class">
            <i
              v-for="tool in tools"
              :key="tool.id"
              class="iconfont action-item"
              :class="[tool.icon]"
              :title="tool.text"
              @click="tool.action(data)"
            ></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      markerTree: new Map(),
      polylineTree: new Map(),
      polygonTree: new Map(),
      labelTree: new Map(),
      modelTree: new Map(),
      renameNodeStatus: false,
      checked: [],
      newName: "",
      json: [
        {
          id: "marker",
          text: "标记",
          type: "marker",
          icon: "iconfont icon-lujing",
          children: []
        },
        {
          id: "polyline",
          text: "线",
          type: "polyline",
          icon: "iconfont iconpolyline",
          children: []
        },
        {
          id: "polygon",
          text: "多边形",
          type: "polygon",
          icon: "iconfont iconpolygon",
          children: []
        },
        {
          id: "label",
          text: "文字",
          type: "label",
          icon: "iconfont iconlabel",
          children: []
        },
        {
          id: "model",
          icon: "iconfont iconmodel",
          text: "模型",
          type: "model",
          children: []
        }
      ],
      defaultTools: {
        locate: { text: "定位", icon: "iconlocate", action: this.locate },
        rename: {
          text: "重命名",
          icon: "iconrename",
          action: this.rename
        },
        edit: { text: "编辑", icon: "iconedit", action: this.edit },
        drop: { text: "删除", icon: "iconremove", action: this.drop }
      }
    };
  },
  props: {
    tools: {
      default: function() {
        return this.defaultTools;
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    checkAction(data, node) {
      if (node.checkedKeys.includes(data.id)) {
        this.$emit("select", data.id, true);
      } else {
        this.$emit("select", data.id, false);
      }
    },
    locate(data) {
      this.$emit("locate", data.id);
    },
    rename(data, id, text) {
      // data.edit=true;
      if (data) {
        this.$set(data, "edit", true);
        this.newName = data.text;
      } else {
        for (let ls of this.json) {
          for (let l of ls.children) {
            if (l.id === id) {
              l.text = text;
            }
          }
        }
      }
    },
    renameAction(data) {
      data.edit = false;
      this.$emit("rename", data.id, this.newName);
      data.text = this.newName;
    },
    edit(data) {
      this.$emit("edit", data.id);
    },
    drop(data) {
      if (!data) return;
      this.$emit("delete", data.id);
      const index = this.checked.indexOf(data.id);
      if (data.id > -1) {
        this.checked.splice(index, 1);
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.checked);
      });

      for (let ls of this.json) {
        let i = 0;
        for (let l of ls.children) {
          if (l.id === data.id) {
            ls.children.splice(i, 1);
            break;
          }
          i++;
        }
      }
    },
    removeAll() {
      this.$emit("clear");
      for (let ls of this.json) {
        ls.children.splice(0);
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    insertLayer(type, id, name) {
      name = name || "未命名";
      this.json[type].children.push({
        id: id,
        text: name,
        icon: "el-icon-document"
      });
      this.checked.push(id);
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.checked);
      });
    },
    exportHandler(cmd) {
      this.$emit("export", cmd);
    },
    importHandler(cmd) {
      this.$emit("import", cmd);
    },
    closeLayerManaer() {
      this.$emit("close");
    }
  }
};
</script>
<style lang='scss' scoped>
.layer-manager-box {
  width: $draw-panel-width;
  background-color: $bg-color;
  color: $color;
  height: 400px;
  ::v-deep span {
    font-size: $font-size;
    display: inline-block;
    vertical-align: top;
  }
}

.graphic-draw-layer-manager-class {
  height: 328px;
  z-index: 99;
  // position: absolute;
  padding: $padding;
  border-radius: $b-radius;
  overflow: auto;
  background-color: $bg-color;
  ::v-deep .el-checkbox__inner {
    border: 1px solid $border-color;
  }
  ::v-deep .action-item {
    margin: $item-margin;
    &:hover {
      color: $hover-color !important;
    }
  }
  ::v-deep .action-class {
    right: 20px;
    position: absolute;
  }
  ::v-deep * {
    color: $color !important;
    background-color: $bg-color !important;
    font-size: $font-size !important;
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
    color: $color;
    &:hover {
      color: $hover-color;
    }
    span {
      color: $color;
      &:hover {
        color: $hover-color;
      }
    }
  }
  .el-dropdown {
    color: $color;
  }
  .action-icon-last-class {
    float: right;
    cursor: pointer;
    vertical-align: middle;
    display: inline-block;
    margin-right: 5px;
    color: $color;
    &:hover {
      color: $hover-color;
    }
    span {
      color: $color;
      &:hover {
        color: $hover-color;
      }
    }
  }
}
.layer-manager-header {
  height: $title-height;
  line-height: $title-height;
  border-bottom: 1px solid $devision-color;
  background-color: $bg-color;
  padding: $padding;
  color: $color;

  i {
    margin: $item-margin;
    color: $color;
  }
  span {
    color: $color;
  }
}
.el-input {
  width: 120px;
  display: inline-block;
  vertical-align: middle;
}
</style>
<style lang='scss'>
.layer-manager-handler-class {
  height: $item-height;
  line-height: $item-height;
  margin: 0 8px;
  float: right;
  color: $color;
  &:hover {
    color: $hover-color;
  }
}
.layer-manager-last-item {
  margin-right: 10px;
  color: $color;
  &:hover {
    color: $hover-color;
  }
}
</style>
