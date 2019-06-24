<template>
  <el-dialog
    :title="dialogForm.title"
    :visible.sync="dialogForm.dialogVisible"
    :width="dialogForm.width"
    :before-close="handleClose"
  >
    <section class="dialog-body">
      <p>
        <span class="el-icon-warning"></span>
        {{ dialogForm.emphasize }}
      </p>
      <section class="textarea-box">
        <p class="no-reason">不通过理由:</p>
        <el-input
          type="textarea"
          v-model="dialogForm.comment"
          :maxlength="50"
          placeholder="请填写理由，不超过50字"
        ></el-input>
      </section>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button
        @click="submit"
        type="primary"
        size="small"
        :disabled="disabled"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "ProcessDialog",
  props: {
    dialogForm: Object,
    handleClose: Function,
    submit: Function,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="less">
.dialog-body {
  .no-reason {
    margin-bottom: 20px;
  }
  .textarea-box {
    padding: 30px 0 0 0;
  }
  .el-icon-warning {
    color: #faad14;
    font-size: 24px;
    padding-right: 20px;
  }
}
</style>
