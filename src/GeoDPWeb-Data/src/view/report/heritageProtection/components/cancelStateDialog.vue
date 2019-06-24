<template>
  <el-dialog
    class="form-wrapper"
    :title="dialogForm.title"
    :visible="dialogForm.dialogShow"
    :width="dialogForm.width"
  >
    <el-form
      class="form-item-wapper"
      :model="dialogForm"
      ref="dialogForm"
      label-width="100px"
      :inline="true"
    >
      <el-form-item
        :label="`${dialogForm.title}时间`"
        prop="cancelTime"
        :rules="{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }"
      >
        <el-date-picker
          type="date"
          v-model="dialogForm.cancelTime"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        :label="`${dialogForm.title}理由`"
        prop="cancelReason"
        :rules="{
          required: true,
          message: '请输入理由',
          trigger: 'blur'
        }"
      >
        <el-input
          type="textarea"
          v-model="dialogForm.cancelReason"
          placeholder="请输入理由"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "CancelStateDialog",
  props: {
    dialogForm: Object,
    handleClose: Function,
    sure: Function
  }
};
</script>
