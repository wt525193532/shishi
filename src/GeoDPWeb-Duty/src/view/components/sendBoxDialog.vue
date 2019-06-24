<template>
  <el-dialog
    title="浏览"
    :visible.sync="dialogVisible"
    width="850px"
    :before-close="handleClose"
  >
    <div class="gl-content-item">
      <el-form
        :model="receiveForm"
        label-suffix="："
        ref="receiveForm"
        disabled
        inline
        label-width="92px"
      >
        <el-form-item class="gl-form-item" label="发文时间">
          <el-date-picker
            v-model="receiveForm.sendTime"
            format="yyyy 年 MM 月 dd 日 H 时 m 分"
            type="datetime"
            placeholder=""
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="gl-form-item" label="发文用户">
          <el-input v-model="receiveForm.sendUser" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="主题">
          <el-input v-model="receiveForm.theme" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="文档类型">
          <el-select
            v-model="receiveForm.typeCode"
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
        <div class="line">
          <el-form-item label="收文单位" prop="receivers">
            <div class="tag-wapper">
              <el-tag
                v-for="tag in tags"
                :key="tag"
                class="tags-margin"
                size="lg"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-form-item>
        </div>
        <div class="line">
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="receiveForm.content"
            >
            </el-input>
          </el-form-item>
        </div>
        <comAttachment
          v-model="receiveForm.attachments"
          :fileOption="fileOption"
        />
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "SendBoxDialog",
  props: {},
  data() {
    return {
      receiveForm: {
        sendTime: "",
        sendWorkspalce: "",
        sendUser: "",
        theme: "",
        typeCode: "",
        content: "",
        status: 2,
        attachments: [],
        receivers: []
      },
      dialogVisible: false,
      tags: []
    };
  },
  computed: {
    fileOption() {
      return {
        tag: ["附件"],
        upload: false,
        accept: ""
      };
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    viewReceive(row) {
      this.receiveForm = row;
      this.tags = row.receivers;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.tags-margin {
  margin-right: 10px;
}
</style>
