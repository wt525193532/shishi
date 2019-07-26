<template>
  <el-dialog
    title="新建交班"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="800px"
    :before-close="handleClose"
  >
    <el-form
      :model="handOverForm"
      ref="handOverForm"
      size="medium"
      :rules="rules"
      label-width="100px"
      label-suffix="："
      inline
    >
      <el-form-item
        class="gl-form-item"
        label="接班人员"
        prop="takeOverPersonId"
      >
        <el-select
          v-model="handOverForm.takeOverPersonId"
          filterable
          placeholder="请选择值班人员"
        >
          <el-option
            v-for="(item, index) in allDutyPersons"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item class="gl-form-item" prop="content" label="交班内容">
          <el-input
            type="textarea"
            style="min-width: 600px;"
            :rows="4"
            v-model="handOverForm.content"
            placeholder="请输入记录内容, 如没有请填：‘ 无 ’"
          ></el-input>
        </el-form-item>
      </div>
      <comAttachment
        v-model="handOverForm.attachments"
        :fileOption="fileOption"
      />
    </el-form>
    <div class="gl-text-center gl-margin-top-15">
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">取 消</el-button>
        <el-button
          type="primary"
          size="medium"
          :loading="islaod"
          @click="addHandleOver"
          >确 定</el-button
        >
      </span>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCom",
  props: {},
  data() {
    return {
      dialogShow: false,
      handOverForm: {
        takeOverPersonId: null,
        content: "",
        attachments: []
      },
      rules: {
        takeOverPersonId: [
          { required: true, message: "请选择接班人员！", trigger: "change" }
        ],
        content: [
          { required: true, message: "请填写值班内容！", trigger: "blur" }
        ]
      },
      islaod: false
    };
  },
  computed: {
    allDutyPersons() {
      return this.$store.state.common.allDutyPersons;
    },
    fileOption() {
      return {
        tag: ["附件"],
        upload: true,
        accept: ""
      };
    }
  },
  methods: {
    // 新增交班信息
    addHandleOver() {
      this.islaod = true;
      this.$refs["handOverForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("dutyManage/schedueManage/handOver", this.handOverForm)
            // eslint-disable-next-line no-unused-vars
            .then(async res => {
              this.handleClose();
              this.islaod = false;
              this.$message.success("交班成功！");
              await this.$router.push({ path: "/onDuty/dutyRecordQuery" });
              location.reload();
            });
        } else {
          this.$message.warning("验证不通过，请输入正确信息！");
          return false;
        }
      });
    },
    handleClose() {
      this.handOverForm = {
        takeOverPersonId: null,
        content: "",
        attachments: []
      };
      this.$refs["handOverForm"].resetFields();
      this.dialogShow = false;
    },
    openDialog() {
      this.dialogShow = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
