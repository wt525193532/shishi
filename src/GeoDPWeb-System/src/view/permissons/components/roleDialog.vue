<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
    width="600px"
    :before-close="handleClose"
  >
    <el-form :rules="rules" ref="roleForm" :model="roleForm" label-width="80px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="roleForm.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item label="显示名称" prop="displayName">
        <el-input
          v-model="roleForm.displayName"
          placeholder="请输入显示名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="roleForm.description"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="permissions">
        <el-tree
          :data="permissionsData"
          class="tree-maxHeight"
          show-checkbox
          default-expand-all
          node-key="name"
          ref="permissionsTree"
          check-strictly
          highlight-current
          @check="checkPermissions"
          :props="permissionsTreeProps"
        ></el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "RoleDialog",
  props: {
    queryAllUser: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      roleForm: {
        name: "",
        displayName: "",
        normalizedName: "",
        description: "",
        permissions: []
      },
      permissionsTreeProps: {
        children: "children",
        label: "displayName"
      },
      permissionsData: [],
      rules: {
        displayName: [
          { required: true, message: "请输入角色名!", trigger: "blur" },
          { max: 64, message: "长度在 64 个字符以内!", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户名!", trigger: "blur" },
          { max: 32, message: "长度在 32 个字符以内!", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getAllPermissions();
  },
  methods: {
    save() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.roleForm.normalizedName = this.roleForm.name.toUpperCase();
          let api = "";
          if (this.title == "编辑角色") {
            api = "update";
          } else {
            api = "create";
          }
          this.$store
            .dispatch("permissons/role/" + api, this.roleForm)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.queryAllUser();
              this.handleClose();
              this.$message.success("保存成功！");
            });
        } else {
          this.$message.warning("验证不通过!请检查!");
          return false;
        }
      });
    },
    getAllPermissions() {
      this.$store
        .dispatch("permissons/authorization/getAllPermissonsTree")
        .then(res => {
          this.permissionsData = res.items;
        });
    },
    handleClose() {
      this.roleForm = {
        name: "",
        displayName: "",
        normalizedName: "",
        description: "",
        permissions: []
      };
      this.$refs.permissionsTree.setCheckedKeys([]);
      this.$refs.roleForm.resetFields();
      this.dialogVisible = false;
    },
    addOpen() {
      this.title = "创建新角色";
      this.dialogVisible = true;
    },
    editOpen({ grantedPermissionNames, role }) {
      this.roleForm.name = role.name;
      this.roleForm.id = role.id;
      this.roleForm.description = role.description;
      this.roleForm.displayName = role.displayName;
      this.roleForm.permissions = grantedPermissionNames;
      this.title = "编辑角色";
      this.dialogVisible = true;
    },
    dialogOpen() {
      if (this.title == "编辑角色") {
        this.setCheckedKeys();
      }
    },
    setCheckedKeys() {
      this.$refs.permissionsTree.setCheckedKeys(this.roleForm.permissions);
    },
    checkPermissions(val, data) {
      if (data.checkedKeys) {
        this.roleForm.permissions = data.checkedKeys;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tree-maxHeight {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  height: 350px;
  overflow: auto;
}
</style>
