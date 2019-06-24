<template>
  <div class="gl-content-item">
    <div class="send-btn-group">
      <el-button size="medium" type="primary" @click="saveDraft"
        >存草稿</el-button
      >
      <el-button size="medium" @click="reset">重置</el-button>
    </div>
    <div>
      <el-form
        :model="sendForm"
        label-suffix="："
        ref="sendForm"
        :rules="rules"
        inline
        label-width="92px"
      >
        <div class="line">
          <el-form-item label="收文单位" prop="receivers">
            <div class="tag-wapper">
              <el-tag
                v-for="tag in tags"
                :key="tag.id"
                closable
                @close="delTag(tag)"
                class="tags-margin"
                size="lg"
              >
                {{ tag.displayName }}
              </el-tag>
              <el-button size="medium" icon="el-icon-plus" @click="selectUnit"
                >选择接收单位</el-button
              >
            </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="主题" class="file-send" prop="theme">
            <el-input v-model="sendForm.theme" placeholder=""></el-input>
          </el-form-item>
        </div>
        <el-form-item class="file-send" label="文档类型" prop="typeCode">
          <el-select
            v-model="sendForm.typeCode"
            clearable
            placeholder="请选择文档类型"
          >
            <el-option
              v-for="(value, code) in $t('codes.FileMailType')"
              :key="code"
              :label="value"
              :value="code"
            ></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="附件">
            <el-upload
              :action="fileServer.upload"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="upSuccess"
              multiple
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="medium" icon="el-icon-plus">添加附件</el-button>
            </el-upload>
          </el-form-item>
        </div>

        <div class="line">
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              :rows="12"
              placeholder="请输入内容"
              v-model="sendForm.content"
            >
            </el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="发件人">
            <span>{{ workspaceName }}</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="item-wapper gl-text-center">
      <el-button size="medium" type="primary" :loading="sendLoad" @click="send"
        >发送</el-button
      >
    </div>
    <dialog-tree
      title="添加接收单位"
      :add="addUnit"
      :unitList="unitList"
      ref="addUnit"
      :getCheckNodes="getCheckNodes"
    />
  </div>
</template>
<script>
import fileServer from "@/api/file.js";
import dialogTree from "./addTreeDialog";
export default {
  name: "SendFile",
  components: {
    dialogTree
  },
  data() {
    return {
      fileServer,
      sendForm: {
        theme: "",
        typeCode: "",
        content: "",
        attachments: [],
        receivers: [],
        id: 0
      },
      fileList: [],
      tags: [],
      tempReceivers: [],
      tempTags: [],
      rules: {
        theme: [
          { required: true, message: "请输入主题", trigger: "blur" },
          { min: 0, max: 32, message: "长度在 32 个字符以内", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 0,
            max: 2048,
            message: "长度在 2048 个字符以内",
            trigger: "blur"
          }
        ],
        typeCode: [
          { required: true, message: "请选择文档类型", trigger: "change" }
        ],
        receivers: [{ required: true, message: "请选择接收单位" }]
      },
      sendLoad: false
    };
  },
  computed: {
    workspaceName() {
      return this.$store.getters.user.workspaceName;
    },
    unitList() {
      return this.$store.state.organization.allWorkSpace;
    }
  },
  mounted() {
    // this.$store.dispatch("organization/getWorkspaceByCode").then(res => {
    //   this.unitList = res;
    // });
    if (this.$route.query.id) {
      this.$store
        .dispatch("fileMail/editDraft", this.$route.query.id)
        .then(res => {
          res.receivers.forEach(id => {
            this.unitList.forEach(unit => {
              if (id == unit.id) {
                this.tags.push(unit);
              }
            });
          });
          this.sendForm = res;
          this.fileList = res.attachments;
        });
    }
  },
  methods: {
    // 打开弹窗
    selectUnit() {
      this.$refs.addUnit.openDialog(this.sendForm.receivers);
    },
    // 得到勾选的tag
    getCheckNodes(value, data) {
      this.tempReceivers = data.checkedKeys;
      this.tempTags = data.checkedNodes;
    },
    // 添加接收单位
    addUnit() {
      this.tags = this.tempTags;
      this.sendForm.receivers = this.tempReceivers;
      this.$refs["sendForm"].clearValidate(["receivers"]);
      this.$refs.addUnit.handleClose();
    },
    // tag删除按钮
    delTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.sendForm.receivers.splice(
        this.sendForm.receivers.indexOf(tag.id),
        1
      );
    },
    // 按钮组方法
    send() {
      this.sendLoad = true;
      this.$refs["sendForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认发送文件?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              // eslint-disable-next-line no-unused-vars
              this.$store.dispatch("fileMail/send", this.sendForm).then(res => {
                this.sendLoad = false;
                this.tags = [];
                this.fileList = [];
                this.$refs["sendForm"].resetFields();
                this.$message.success("发送成功！");
              });
            })
            .catch(() => {
              this.sendLoad = false;
              this.$message({
                type: "info",
                message: "取消发送！"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "验证不通过！"
          });
          this.sendLoad = false;
          return false;
        }
      });
    },
    saveDraft() {
      this.$confirm("是否确认存至草稿箱?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$store
            .dispatch("fileMail/saveDraft", this.sendForm)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.tags = [];
              this.fileList = [];
              this.$refs["sendForm"].resetFields();
              this.$message.success("保存成功！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消存至草稿！"
          });
        });
    },
    reset() {
      this.tags = [];
      this.fileList = [];
      this.$refs["sendForm"].resetFields();
    },
    // 上传组件方法
    upSuccess(res) {
      this.sendForm.attachments.push({
        extension: "",
        id: 0,
        key: res.pathName,
        name: res.title,
        tag: "附件",
        url: `${this.fileServer.view}${res.pathName}`
      });
    },
    handleRemove(file) {
      this.sendForm.attachments.splice(
        this.sendForm.attachments.map((item, index) => {
          if (item.name == file.name) {
            return index;
          }
        }),
        1
      );
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // eslint-disable-next-line no-unused-vars
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style lang="less">
.send-btn-group {
  margin-bottom: 15px;
}
.tags-margin {
  margin-right: 10px;
}
.file-send {
  .el-form-item__content {
    width: 445px !important;
    .el-select {
      width: 100%;
    }
    .el-textarea {
      width: 100%;
    }
  }
}
.tag-wapper {
  min-width: 445px;
  min-height: 36px;
}
</style>
