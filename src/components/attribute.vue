<template>
  <div class="attribute-class" id="attribute_table" v-show="dialogFormVisible">
    <el-container>
      <el-header id="title">
        <span>属性编辑</span>
        <span class="close-btn" @click="dialogFormVisible=false"></span>
        <el-button size="mini" style="margin-left:20px" @click="dialogVisible=true">添加字段</el-button>
        <el-button size="mini" style="margin-left:20px" @click="save">保存</el-button>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%;"
          :height="400"
          ref="attr"
          id="table"
          border
          :default-sort="{prop: 'id', order: 'ascending'}"
          @cell-dblclick="edit"
        >
          <el-table-column width="100" fixed label="id" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.id.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :width="100"
            v-for="item in columns"
            :key="item"
            :prop="item"
            :label="item"
            sortable
          >
            <template slot-scope="scope">
              <span v-if="!scope.row[item]._edit">{{scope.row[item].value}}</span>
              <el-input
                title="按回车键保存修改"
                v-focus
                v-model="scope.row[item].value"
                size="small"
                @keydown.enter.native="saveEdit(scope)"
                v-else
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="添加字段" :visible.sync="dialogVisible" width="30%" :modal-append-to-body="false">
      字段名：
      <el-input v-model="newField" @keypress.enter.native="addField" v-focus></el-input>默认值：
      <el-input v-model="defaultValue" @keypress.enter.native="addField"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addField">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Convert from "../js/Convert";
import {Point,Polyline} from '../js/drawHandler'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      newField: "",
      defaultValue: null,
      name: "undefined",
      object: undefined,
      info: { name: "0.0" },
      mouseListener: false,
      tableData: [
        {
          id: 0,
          name: "xxx"
        },
        {
          id: 1,
          name: "ooo"
        }
      ],
      columns: []
    };
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function(el) {
        // 聚焦元素
        el.querySelector("input").focus();
      }
    }
  },
  mounted() {
    this.columns = Object.keys(this.tableData[0]) || [];
    this.columns.splice(this.columns.indexOf("id"), 1);
    const self = this;
    const cvt = Convert(viewer);
    console.log(Point.editStyle().color)
    window.addEventListener("updateEvent", function(e) {
      const nodes = e.detail.nodes;
      self.nodes=nodes
      self.tableData.splice(0, self.tableData.length);
      if (e.detail.target.info.length != nodes.length) {
        let index = 0;
        self.name = e.detail.name;
        self.object = e.detail.target;
        for (let node of nodes) {
          const ll = cvt.worldLatLon(node);
          self.tableData.push({ id: { value: index, _edit: false } });
          index++;
        }
      } else {
        self.tableData = self.object.info;
      }

      self.columns = Object.keys(self.tableData[0]) || [];
      self.columns.splice(self.columns.indexOf("id"), 1);
    });
    let move = false;
    const start = {},
      end = {};
    window.onDown = function(e) {
      move = true;
      start.x = e.clientX;
      start.y = e.clientY;
    };
    window.onMove = function(e) {
      console.log("---------");
      if (!move) {
        return;
      }
      end.x = e.clientX;
      end.y = e.clientY;
      const eleX = /(\d*)px/.exec($(ele).css('left'))[1];
      const eleY = /(\d*)px/.exec($(ele).css('top'))[1];
      ele.style.left = +eleX + (end.x - start.x) + "px";
      ele.style.top = +eleY + (end.y - start.y) + "px";
      start.x=e.clientX
      start.y=e.clientY
    };
    window.onUp = function(e) {
      move = false;
    };
    function moveElement() {
      self.target.addEventListener("mousedown", onDown);
      self.target.addEventListener("mousemove", onMove);
      self.target.addEventListener("mouseup", onUp);
      self.target.addEventListener("mouseout", onUp);
    }
    const ele = document.getElementById("attribute_table");
    this.target = document.getElementById("title");
    moveElement();
  },
  beforeDestroy() {
    this.target.removeEventListener("mousedown", onDown);
    this.target.removeEventListener("mousemove", onMove);
    this.target.removeEventListener("mouseup", onUp);
    this.target.removeEventListener("mouseout", onUp);
  },
  methods: {
    saveEdit(scope) {
      scope.row[scope.column.label]._edit = false;
      const nodes=this.object.nodes||this.object.tmpNodes
      if(Cesium.defined(nodes[+scope.row.id.value])){
        nodes[+scope.row.id.value].point.color=Point.defaultStyle().color
      }
    },
    edit(row, column, cell, event) {
      row[column.label]._edit = true;
      const nodes=this.object.nodes||this.object.tmpNodes
      if(Cesium.defined(nodes[+row.id.value])){
        nodes[+row.id.value].point.color=Cesium.Color.AQUA
      }
      // this.$set(row, '_edit', true)
    },
    save() {
      for (let d of this.tableData) {
        const pts = {};
        const keys = Object.keys(d);
        for (let k of keys) {
          pts[k] = d[k].value;
        }
        this.object.info.push({ propertites: pts });
      }
    },
    addField() {
      if (this.newField === "") {
        this.$alert("字段名不能为空");
        return;
      }
      this.dialogVisible = false;
      this.columns.push(this.newField);
      for (let d of this.tableData) {
        this.$set(d, this.newField, { value: this.defaultValue, _edit: false });
        // d[this.newField] = this.defaultValue;
      }
      this.$nextTick(() => {
        this.$refs.attr.doLayout();
      });
      this.newField = "";
      this.defaultValue = "";
    },
    open() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    addItem(data) {
      this.tableData.push(data);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-header {
  background-color: #ffffff;
  line-height: 60px !important;
  min-height: 60px;
}
/deep/ .el-input {
  margin-left: 0px !important;
}
/deep/ .el-table {
  overflow: hidden;
}
.el-main {
  background-color: #ffffff;
}
.attribute-class {
  position: fixed;
  width: 800px;
  height: 480px;
}
/deep/ .el-input__inner {
  border: 0px solid #dcdfe6 !important;
}
.close-btn:hover {
  cursor: pointer;
}
.close-btn::after {
  content: "✖";
  float: right;
  margin-right: 10px;
}
/deep/ .el-dialog .el-input {
  border: 1px solid #dcdfe6 !important;
}
</style>