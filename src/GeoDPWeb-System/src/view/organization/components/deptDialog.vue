<template>
  <el-dialog
    title="新增部门"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form
      :model="deptForm"
      size="small"
      ref="deptForm"
      inline
      label-width="100px"
    >
      <el-form-item label="上级单位" prop="parentId">
        <el-select disabled v-model="deptForm.parentId" placeholder>
          <el-option
            v-for="item in parentUnit"
            :key="item.id"
            :label="item.displayName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" prop="displayName">
        <el-input
          placeholder="请输入部门名称"
          class="input-min-width"
          v-model="deptForm.displayName"
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
  name: "MenuDialog",
  props: {
    getUnitList: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      deptForm: {
        parentId: null,
        displayName: ""
      },
      parentUnit: []
    };
  },
  methods: {
    save() {
      this.$store
        .dispatch(
          "organizationManage/workspace/createDepartment",
          this.deptForm
        )
        .then(res => {
          console.log(res);
          this.handleClose();
          this.getUnitList();
          this.$message.success("保存成功！");
        });
    },
    handleClose() {
      this.deptForm = {
        parentId: null,
        displayName: ""
      };
      this.parentUnit = [];
      this.dialogVisible = false;
    },
    addOpen({ ...row }) {
      this.parentUnit.push(row);
      this.deptForm.parentId = row.id;
      this.dialogVisible = true;
    }
  }
};
</script>
