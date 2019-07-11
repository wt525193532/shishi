<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form
      :model="flowForm"
      size="small"
      ref="flowForm"
      :rules="rules"
      inline
      label-width="100px"
    >
      <el-form-item label="流程名称" prop="name">
        <el-input
          v-model="flowForm.name"
          placeholder="请输入流程名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input placeholder="请输入备注" v-model="flowForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "FlowDialog",
  props: {
    queryTab: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      flowForm: {
        name: "",
        remark: ""
      },
      title: "",
      rules: {
        name: [{ required: true, message: "请输入流程名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    save() {
      let requestMethod = "";
      if (this.title == "新增流程") {
        requestMethod = "createFlow";
      } else {
        requestMethod = "updateFlow";
      }
      this.$store
        .dispatch("approvalSetting/" + requestMethod, this.flowForm)
        .then(() => {
          this.handleClose();
          this.queryTab();
          this.$message.success("保存成功！");
        });
    },
    handleClose() {
      this.flowForm = {
        name: "",
        remark: ""
      };
      this.$refs.flowForm.resetFields();
      this.dialogVisible = false;
    },
    addOpen() {
      this.title = "新增流程";
      this.dialogVisible = true;
    },
    editOpen({ id, name, remark }) {
      this.flowForm = {
        id,
        name,
        remark
      };
      this.title = "编辑流程信息";
      this.dialogVisible = true;
    }
  }
};
</script>
