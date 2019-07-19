<template>
  <div class="file-box">
    <div v-for="(items, index) in fileOption.tag" :key="index">
      <div class="form-upload-title">
        {{ items }}
        <span>:</span>
      </div>
      <div class="form-file-loader">
        <div v-if="!attch[index].fileList[0] && !fileOption.upload">
          暂无附件
        </div>
        <ul class="el-upload-list el-upload-list--picture-card" :key="index">
          <li
            :tabindex="i"
            class="el-upload-list__item is-success"
            v-for="(item, i) in attch[index].fileList"
            :key="i"
          >
            <div class="imgbox-img">
              <img
                v-if="
                  item.name.indexOf('.jpg') >= 0 ||
                    item.name.indexOf('.png') >= 0 ||
                    item.name.indexOf('.jpeg') >= 0
                "
                :src="item.url"
                alt
                class="el-upload-list__item-thumbnail"
              />
              <div v-else>
                <i class="el-icon-document fileSvg"></i>
              </div>
            </div>
            <div class="imgbox-title">{{ item.name }}</div>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview">
                <i
                  v-if="
                    item.name.indexOf('.jpg') >= 0 ||
                      item.name.indexOf('.png') >= 0 ||
                      item.name.indexOf('.jpeg') >= 0
                  "
                  class="el-icon-zoom-in"
                  @click="handlePictureCardPreview(item)"
                ></i>
                <i
                  v-else
                  class="el-icon-download"
                  @click="download(item.url, item.name)"
                ></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                v-if="fileOption.upload"
              >
                <i class="el-icon-delete" @click="fileRemove(item, index)"></i>
              </span>
            </span>
          </li>
        </ul>
        <el-upload
          v-if="fileOption.upload"
          :action="fileServer.upload"
          :on-preview="handlePictureCardPreview"
          :on-remove="fileRemove"
          :on-success="handleAvatarSuccess"
          :accept="fileOption.accept"
          :show-file-list="false"
          :file-list="attch[index].fileList"
          class="upload-pic"
        >
          <i class="el-icon-plus" @click="getIndex(index, items)"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :modal="false">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import fileServer from "@/api/file.js";
export default {
  name: "ComAttachment",
  model: {
    prop: "list",
    event: "upload"
  },
  props: {
    list: Array,
    fileOption: {
      type: Object,
      default: () => () => ({
        tag: ["附件上传"],
        upload: true,
        accept: ""
      })
    }
  },
  data() {
    return {
      fileServer,
      dialogImageUrl: "",
      dialogVisible: false,
      attch: [],
      attchIndex: null,
      attchTag: null
    };
  },
  methods: {
    fileRemove(file, index) {
      let i;
      let delObj;
      if (this.attchIndex - 0 >= 0) {
        delObj = this.attch[index].fileList;
        i = delObj.indexOf(file);
      } else {
        this.attch.forEach(el => {
          if (el.tag === file.tag) {
            delObj = el.fileList;
            i = el.fileList.indexOf(file);
          }
        });
      }
      i > -1 ? delObj.splice(i, 1) : "";
      let delList = this.list.filter(items => {
        if (items.url !== file.url) return { ...items };
        return false;
      });
      this.$emit("upload", delList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getIndex(i, tag) {
      this.attchIndex = i;
      this.attchTag = tag;
    },
    handleAvatarSuccess(response) {
      if (!response) {
        this.$message({
          type: "error",
          message: response.message
        });
      } else {
        let apiObj = {
          key: response.pathName,
          extension: "",
          id: 0,
          name: response.title,
          url: `${this.fileServer.view}${response.pathName}`,
          tag: this.attchTag
        };
        console.log(this.attchIndex);
        this.attch[this.attchIndex].fileList.push(apiObj);
        this.list.push(apiObj);
        this.$emit("upload", this.list);
      }
    },
    download(url, name) {
      let downName = url.replace(this.fileServer.view, "");
      return this.$confirm(`确定下载 ${name}？`).then(() => {
        window.location.href = ` ${this.fileServer.download}${downName}`;
      });
    },
    tagClassification() {
      let flag = false;
      let arr = [];
      let attchlistObj = {
        tag: "",
        fileList: []
      };
      for (let i = 0; i < this.list.length; i++) {
        var index = "";
        if (this.fileOption.tag.indexOf(this.list[i].tag) !== -1) {
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].tag === this.list[i].tag) {
              index = j;
              flag = true;
              break;
            }
          }
          if (flag) {
            let a = arr[index];
            a.fileList.push(this.list[i]);
            flag = false;
          } else {
            attchlistObj = {};
            attchlistObj.tag = this.list[i].tag;
            attchlistObj.fileList = [];
            attchlistObj.fileList.push(this.list[i]);
            arr.push(attchlistObj);
          }
        }
      }
      return arr;
    }
  },
  watch: {
    list(v) {
      if (v.length > 0) {
        let attch = this.tagClassification();
        this.attch.map(items => {
          for (let i = 0; i < attch.length; i++) {
            if (items.tag === attch[i].tag)
              [...items.fileList] = attch[i].fileList;
          }
          return items;
        });
      }
    }
  },
  created() {
    /* 初始化 */
    this.attch = this.fileOption.tag.map(tag => {
      return {
        tag,
        fileList: []
      };
    });
  }
};
</script>

<style lang="less" scoped>
.file-box {
  overflow: hidden;
  .upload-pic {
    display: inline;
    .el-upload {
      .el-icon-plus {
        width: 148px;
        height: 148px;
        font-size: 28px;
        border: 1px dashed #c0ccda;
        background-color: #fbfdff;
        vertical-align: middle;
        display: table-cell;
        border-radius: 6px;
        &:hover {
          border-color: #409eff;
          color: #409eff;
        }
      }
    }
  }
  .form-upload-title {
    line-height: 20px;
    font-size: 14px;
    // width: 95%;
    margin: 0 auto 10px auto;
  }
  .form-file-loader {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #fafafa;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.08);
  }
  .imgbox-title {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .imgbox-img {
    height: 125px;
  }
  .el-icon-document {
    width: 100%;
    /*height: 125px;*/
    font-size: 90px;
    text-align: center;
    &:before {
      vertical-align: middle;
    }
  }
}
</style>
