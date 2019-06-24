<template>
  <div>
    <el-dialog
      :title="title"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :visible.sync="dialogTreeVisible"
    >
      <el-form
        :model="templateForm"
        :rules="rules"
        ref="templateForm"
        label-width="80px"
      >
        <el-form-item label="模板名称" prop="name">
          <el-input
            v-model="templateForm.name"
            placeholder="请输入模板名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <el-input
            v-model="templateForm.content"
            type="textarea"
            :rows="4"
            placeholder="请输入模板名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">取 消</el-button>
        <el-button
          type="primary"
          size="medium"
          :loading="saveLoad"
          @click="save"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    fenth: Function
  },
  data() {
    return {
      templateForm: {
        name: "",
        content: "",
        id: 0
      },
      dialogTreeVisible: false,
      title: "新建模板",
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 0,
            max: 32,
            message: "长度在 32 个字符以内",
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 0,
            max: 256,
            message: "长度在 256 个字符以内",
            trigger: "blur"
          }
        ]
      },
      saveLoad: false
    };
  },
  methods: {
    save() {
      this.saveLoad = true;
      this.$refs["templateForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SMS/saveTemplate", this.templateForm)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.saveLoad = false;
              this.fenth();
              this.handleClose();
              this.$message.success("保存成功！");
            });
        } else {
          this.$message({
            type: "warning",
            message: "验证不通过！"
          });
          this.saveLoad = false;
          return false;
        }
      });
    },
    handleClose() {
      this.templateForm = {};
      this.$refs.templateForm.resetFields();
      this.dialogTreeVisible = false;
    },
    open(row) {
      this.dialogTreeVisible = true;
      if (row) {
        const { name, content, id } = row;
        this.templateForm = { name, content, id };
      }
    }
  }
};
</script>
