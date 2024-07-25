<template>
  <div
    id="markerContainer"
    :style="{ left: winPos.x + 'px', top: winPos.y + 'px' }"
  >
    <el-dialog
      :title="markName + '附件'"
      v-model="dialogVisible"
      :modal-append-to-body="false"
    >
      <el-upload
        class="upload-class"
        ref="upload"
        :action="attachment.action"
        :on-remove="attachment.delete"
        :on-success="attachment.success"
        :file-list="attachment.fileList"
        :on-preview="attachment.download"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button size="small" type="primary">选取文件</el-button>
        </template>
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="$refs.upload.submit()"
          >上传到服务器</el-button
        >
      </el-upload>
    </el-dialog>
    <div id="createMerkerPanel" v-if="markMode === 'marker'" v-show="visible">
      <el-container v-show="!selectPanel">
        <el-header>
          <span>添加标记</span>
          <i
            class="el-icon-paperclip"
            v-if="attachment.enabled"
            @click="dialogVisible = true"
            title="附件"
            style="font-size: 16px"
          ></i>
          <span
            class="closebtn cesiumDrawFont iconclose"
            @click="visible = false"
          ></span>
        </el-header>
        <el-container id="marker-panel">
          <el-container>
            <el-main class="marker-main-class">
              <div class="pane-row">
                <div>名称：</div>
                <el-input
                  v-model="markName"
                  ref="nameinput"
                  @keyup.enter="update"
                ></el-input>
              </div>
              <div class="pane-row pane-desc">
                <div>描述：</div>
                <el-input v-model="markRemark" type="textarea"></el-input>
              </div>
            </el-main>
            <el-aside>
              <img :src="selectedImage" />
              <br />
              <a href="#" id="imageC" @click="selectPanel = true">更换</a>
            </el-aside>
          </el-container>
          <el-footer>
            <el-button
              type="danger"
              id="cancelbtn"
              plain
              size="small"
              @click="cancelMark"
              >删除</el-button
            >
            <el-button
              type="primary"
              plain
              size="small"
              id="submitbtn"
              @click="update"
              >确定</el-button
            >
          </el-footer>
        </el-container>
      </el-container>
      <el-container v-show="selectPanel" class="image-list-class">
        <!-- <img :src="noImage" @click="changeHandler(undefined)"> -->
        <img
          v-for="(img, index) in images"
          :src="img"
          :key="index"
          @click="changeHandler(img)"
        />
      </el-container>
    </div>
    <div
      id="createLabelPanel"
      :style="{ left: winPos.x + 'px', top: winPos.y + 'px' }"
      v-if="markMode === 'label'"
      v-show="visible"
    >
      <el-input
        v-model="markName"
        @keypress.enter="update"
        ref="nameinput"
      ></el-input>
      <el-button size="small" @click="update" style="margin-left: 20px"
        >确定</el-button
      >
    </div>
    <input
      type="file"
      v-show="false"
      @change="importMarks"
      id="uploadhandler"
      accept=".json"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";
import MarkerManager from "../core/MarkerManager";
import utils from "../js/utils";
import { checkComponent, checkViewer } from "../js/utils";
export default {
  name: "cesiumMarkerViewer",
  data() {
    return {
      visible: false,
      selectPanel: false,
      markName: "",
      markRemark: "",
      images: [],
      markMode: "",
      winPos: {
        x: 0,
        y: 0,
      },
      dialogVisible: false,
      fileList: [],
    };
  },
  setup() {},
  computed: {},
  components: {},
  props: {
    extendImage: {
      type: Array,
      default: function () {
        return [];
      },
    },
    attachment: {
      default: function () {
        return {
          enabled: false,
          method: "",
        };
      },
    },
  },
  directives: {
    focus: {
      bind: function (el) {
        el.focus();
      },
      updated: function (el) {
        el.focus();
      },
      inserted: function (el) {
        el.focus();
      },
    },
  },
  mounted() {
    const self = this;
    window.addEventListener("marker-edit", (e) => {
      const type = e.detail.type;
      self.visible = true;
      self.markName = e.detail.name;
      self.markRemark = e.detail.remark;
      self.winPos = {
        ...e.detail.pos,
      };
      self.$emit("editEvent", type);
    });
    window.addEventListener("marker-add", (e) => {
      self.winPos = self.markerManager.panelPosition();      
      if (e.detail.type !== 4) {
        self.visible = true;
      }
      self.$emit("addEvent", e.detail.id, e.detail.name, e.detail.type);
    });
    window.addEventListener("marker-delete", (e) => {
      self.visible = false;
      self.$emit("deleteEvent", e.detail.id);
      self.markName = "";
      self.markRemark = "";
    });
    window.addEventListener("marker-update", (e) => {
      self.$emit("updateEvent", e.detail.id, e.detail.name);
      self.markName = "";
      self.markRemark = "";
    });
    this.$nextTick(() => {
      utils.moveDiv("markerContainer");
    });
  },
  methods: {
    init(viewer) {
      if (this._viewer) {
        return;
      }
      checkViewer(viewer);
      this._viewer = viewer;
      !this.markerManager && (this.markerManager = new MarkerManager(viewer));
      this.images = [this.markerManager.defaultImage, ...this.extendImage];
      this.selectedImage = this.markerManager.defaultImage;
    },
    pick(type = "marker", mode = "single") {
      checkComponent(this);
      if (this.markerManager) {
        this.markMode = type;
        return this.markerManager.pick(type, mode);
      }
    },
    createMarker(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createMarker(cartesian);
      }
    },
    panelPosition() {
      if (this.markerManager) {
        return this.markerManager.panelPosition();
      }
    },
    createLabel(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createLabel(cartesian);
      }
    },
    createModel(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createLabel(cartesian);
      }
    },
    removeEventListener() {
      if (this.markerManager) {
        return this.markerManager.removeEventListener();
      }
    },
    stopPick() {
      if (this.markerManager) {
        this.markerManager.stopPick();
      }
    },
    zoomTo(id) {
      if (this.markerManager) {
        this.markerManager.zoomTo(id);
      }
    },
    edit(id) {
      if (this.markerManager) {
        this.markerManager.edit(id);
      }
    },
    drop(id) {
      if (this.markerManager) {
        this.markerManager.drop(id);
      }
    },
    rename(id, name) {
      if (this.markerManager) {
        this.markerManager.rename(id, name);
      }
    },
    select(type, id, status) {
      if (this.markerManager) {
        this.markerManager.select(type, id, status);
      }
    },
    destroyPopPanle() {
      if (this.markerManager) {
        this.markerManager.destroyPopPanle();
      }
    },
    createPopPanel() {
      if (this.markerManager) {
        this.markerManager.createPopPanel();
      }
    },
    import(feat) {
      if (this.markerManager) {
        this.markerManager.createPopPanel();
        this.markerManager.import(feat);
      }
    },
    export(type) {
      if (this.markerManager) {
        this.markerManager.export(type);
      }
    },
    setFont(font) {
      if (this.markerManager) {
        this.markerManager.font = font;
      }
    },
    getFont() {
      if (this.activeMarker) {
        return this.markerManager.font;
      }
      return undefined;
    },
    setColor(color) {
      if (this.markerManager) {
        this.markerManager.color = color;
      }
    },
    setLabel(option) {
      if (this.markerManager) {
        this.markerManager.label = option;
      }
    },
    setModel(options) {
      if (this.markerManager) {
        this.markerManager.model = options;
      }
    },
    removeAll() {
      if (this.markerManager) {
        this.markerManager.removeAll();
      }
    },
    cancelMark() {
      if (this.markerManager) {
        this.markerManager.cancelMark();
      }
    },
    update() {
      if (this.markerManager) {
        this.markerManager.update(this.markName, this.markRemark);
        this.visible = false;
      }
    },
    changeHandler(img) {
      if (this.markerManager) {
        this.markerManager.changeHandler(img);
        this.selectedImage = img;
      }
      this.selectPanel = false;
    },
    generateId() {
      if (this.markerManager) {
        return this.markerManager.generateId();
      }
    },
    getById(id) {
      if (this.has(id)) {
        return this.markerManager.get(id);
      }
    },
    has(id) {
      if (this.markerManager) {
        return this.markerManager.has(id);
      }
      return false;
    },
    importMarks() {},
  },
  watch: {
    visible(val) {
      if (val) {
        nextTick(() => {
          this.$refs.nameinput && this.$refs.nameinput.focus();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#markerContainer {
  position: fixed;
  z-index: 2;
  top: -20px;
  font-size: $font-size;

  * {
    font-size: $font-size;
  }
}

#msg1,
.msg {
  width: 150px;
  height: 30px;
  position: fixed;
}

#submit1,
.submit {
  position: fixed;
  height: 34px;
  width: 34px;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 3px 12px;
  font-size: $font-size;
  line-height: 1.42857143;
  color: $color;
  background-color: $bg-color;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: $b-radius;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.form-control::-moz-placeholder {
  color: $color;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: $color;
}

.form-control::-webkit-input-placeholder {
  color: $color;
}

.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}

.marker-main-class {
  color: $color;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: $font-size;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 0px;
}

#menu {
  position: fixed;
  width: 100px;
  height: 70px;
  border: 2px solid #b7b1a3;
  background-color: $bg-color;
  text-align: left;
}

#createMerkerPanel {
  ::v-deep a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      font-size: 14px;
      text-decoration: none;
      color: $color;
    }
  }

  ::v-deep .el-button--primary {
    span {
      color: #409eff !important;
    }

    &:hover {
      span {
        color: #ffffff !important;
      }
    }
  }

  ::v-deep .el-button--danger {
    span {
      color: #f56c6c !important;
    }

    &:hover {
      span {
        color: #ffffff !important;
      }
    }
  }
}

#menu > div {
  width: 80px;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  padding-left: 20px;
  padding-top: 0px;
}

#menu > div:hover {
  background-color: #e5e5e5;
}

.no-image-class {
  width: 24px;
  height: 24px;
  line-height: 24px;
}

#createMerkerPanel {
  left: 0px;
  top: 0px;
  width: 340px;
  height: 210px;
  position: absolute;
  border: 0px solid #b7b1a3;
  background-color: $bg-color;
  color: $color;

  .image-list-class {
    display: block;
    padding: 10px;
  }
  :deep(.el-input__wrapper) {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .pane-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 40px;
  }
  .pane-desc {
    height: 80px;
  }
}

#createMerkerPanel .el-input {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-top: 0px;
  width: 78%;
  margin-left: 0px !important;
  position: relative;
}

#createMerkerPanel .el-button {
  display: inline-block;
  margin-top: 8px;
  margin-right: 20px;
  float: right;
}

#createMerkerPanel .el-header {
  height: 45px !important;
  line-height: 30px;
  color: $color;
  padding: $padding;

  span,
  i {
    margin: $item-margin;
    color: $color;
  }
}

#createMerkerPanel .el-footer {
  padding-right: 20%;
}

#createMerkerPanel .el-textarea {
  width: 78%;
}

#createMerkerPanel .el-aside {
  width: 20% !important;
  // padding-left: 10px;
  text-align: center;
  line-height: 20px;

  a {
    display: inline-block;
    width: 32px;
  }
}

#createMerkerPanel .el-main {
  width: 70%;
  padding-left: 10px !important;
}

#createMerkerPanel .el-main {
  padding: 0px 0px 0px 0px;
}

#createMerkerPanel img {
  margin-top: 8px;
  // width:32px;
  // height:32px;
  // margin-left: 5px;
}

.crusor-tip {
  width: 200px;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  border: 1px solid #e5e5e5;
  color: white;
  background-color: #00000099;
  position: fixed;
}

#createLabelPanel {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 320px;
  .el-input {
    display: inline-block;
    width: 180px;
    margin: 0 10px;
    vertical-align: middle;
    height: 40px;
  }
  :deep(.el-input__wrapper) {
    height: 100%;
    width: 100%;
  }

  .el-button {
    display: inline-block;
    // width:60px;
    margin: 0 2px;
    width: 92px;
    height: 36px;
    background-color: $bg-color;
    border: none;
    color: $color;
    border-radius: $b-radius;
    vertical-align: middle;
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
  }

  ::v-deep .el-dialog__body {
    padding: 0 20px;
  }

  .upload-class {
    min-height: 200px;
  }
}
</style>
