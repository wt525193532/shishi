<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="800px"
    :before-close="handleCloseDialog"
  >
    <div>
      <el-form
        :disabled="title == '查看记录'"
        :model="dutyRecordData"
        ref="dutyRecordForm"
        size="medium"
        :rules="rules"
        label-width="100px"
        label-suffix="："
      >
        <el-form-item class="gl-form-item" label="时间">
          <el-date-picker
            disabled
            v-model="activeTime"
            format="yyyy 年 MM 月 dd 日 H 时 m 分"
            type="datetime"
            style="min-width: 300px;"
            placeholder="请选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="dutyRecordData.keyWords"
            multiple
            style="min-width: 300px;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <!-- <div>
            <el-tag
              :key="tag"
              v-for="tag in dutyRecordData.keyWords"
              :closable="title != '查看记录'"
              size="lg"
              class="tags-margin"
              :disable-transitions="false"
              @close="handleCloseTag(tag)"
            >
              {{ tag }}
            </el-tag>
            <span v-if="title != '查看记录'">
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ 新增关键词</el-button
              >
            </span>
          </div>-->
        </el-form-item>
        <div>
          <el-form-item class="gl-form-item" prop="content" label="记录内容">
            <el-input
              type="textarea"
              style="min-width: 600px;"
              :rows="4"
              v-model="dutyRecordData.content"
              placeholder="请输入记录内容"
            ></el-input>
          </el-form-item>
        </div>
        <comAttachment
          v-model="dutyRecordData.attachments"
          :fileOption="fileOption"
          ref="comAttachment"
        />
      </el-form>
    </div>
    <span v-if="title != '查看记录'" slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog" size="medium">取消</el-button>
      <el-button type="primary" size="medium" @click="saveDutyRecord"
        >保存</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DutyRecordDialog",
  props: {
    getAllCurrent: Function
  },
  data() {
    return {
      isdisabled: false,
      dialogShow: false,
      title: "",
      activeTime: new Date(),
      dutyRecordData: {
        keyWords: [],
        content: "",
        attachments: [],
        id: 0
      },
      inputVisible: false,
      inputValue: "",
      executeGet: false, // 是否更新值班记录表
      rules: {
        content: [
          {
            required: true,
            message: "请输入记录内容，如没有请填写: ‘无’",
            trigger: "blur"
          }
        ]
      },
      options: [
        { label: "类型一" },
        { label: "类型二" },
        { label: "类型三" },
        { label: "类型四" },
        { label: "类型五" }
      ]
    };
  },
  computed: {
    fileOption() {
      return {
        upload: this.title != "查看记录",
        accept: "",
        tag: ["附件"]
      };
    }
  },
  methods: {
    // tag关闭方法
    handleCloseTag(tag) {
      this.dutyRecordData.keyWords.splice(
        this.dutyRecordData.keyWords.indexOf(tag),
        1
      );
    },
    // 显示tag输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 输入新增tag文本方法
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dutyRecordData.keyWords.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.dutyRecordData = {
        keyWords: [],
        content: "",
        attachments: [],
        id: 0
      };
      this.$refs["dutyRecordForm"].resetFields();
      if (this.executeGet) {
        this.getAllCurrent();
      }
      this.executeGet = false;
      this.dialogShow = false;
    },
    // 保存值班信息
    saveDutyRecord() {
      this.$refs["dutyRecordForm"].validate(valid => {
        if (valid) {
          let methods = "";
          if (this.title == "新增记录") {
            methods = "create";
          } else {
            methods = "update";
          }
          this.$store
            .dispatch("onDuty/dutyRecord/" + methods, this.dutyRecordData)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.executeGet = true;
              this.handleCloseDialog();
              this.$message.success("保存成功！");
            });
        } else {
          this.$message.warning("验证不通过，请输入正确信息！");
          return false;
        }
      });
    },
    // 打开新增记录弹框
    openNewDutyRecord() {
      this.title = "新增记录";
      this.dialogShow = true;
    },
    // 打开编辑记录弹框
    openEditDutyRecord({ keyWords, attachments, content, id }) {
      this.dialogShow = true;
      this.dutyRecordData = { keyWords, attachments, content, id };
      this.title = "编辑记录";
      this.executeGet = true;
    },
    // 打开查看记录弹框
    openViewDutyRecord({ keyWords, attachments, content, id }) {
      this.dutyRecordData = { keyWords, attachments, content, id };
      this.title = "查看记录";
      this.dialogShow = true;
    }
  }
};
</script>
<style lang="less" scoped>
.tags-margin {
  margin-right: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
