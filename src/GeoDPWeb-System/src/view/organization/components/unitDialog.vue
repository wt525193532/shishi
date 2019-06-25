<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form
      :model="unitForm"
      size="small"
      ref="unitForm"
      inline
      label-width="90px"
    >
      <el-form-item label="名称" prop="parentId">
        <el-input
          placeholder="请输入名称"
          class="input-min-width"
          v-model="unitForm.displayName"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="title != '修改部门名称'"
        label="区划代码"
        prop="displayName"
      >
        <el-input
          placeholder="请输入区划代码"
          class="input-min-width"
          v-model="unitForm.adminCode"
        ></el-input>
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
  name: "UnitDialog",
  props: {
    getUnitList: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      unitForm: {
        adminCode: "",
        displayName: ""
      }
    };
  },
  methods: {
    save() {
      let api = "";
      if (this.title == "添加单位") {
        api = "createWorkspace";
      } else if (this.title == "修改单位") {
        api = "updateWorkspace";
      } else {
        api = "updateDepartment";
      }
      this.$store
        .dispatch("organizationManage/workspace/" + api, this.unitForm)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.handleClose();
          this.getUnitList();
          this.$message.success("保存成功！");
        });
    },
    handleClose() {
      this.unitForm = {
        adminCode: "",
        displayName: ""
      };
      this.dialogVisible = false;
    },
    editOpen({ displayName, adminCode, id }) {
      if (!adminCode) {
        this.title = "修改部门名称";
        this.unitForm = { displayName, id };
      } else {
        this.title = "修改单位";
        this.unitForm = { displayName, adminCode, id };
      }
      this.dialogVisible = true;
    },
    addOpen() {
      this.title = "添加单位";
      this.dialogVisible = true;
    }
  }
};
</script>
