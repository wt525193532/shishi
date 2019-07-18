<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :rules="rules"
        ref="userForm"
        :model="userForm"
        label-width="80px"
      >
        <el-form-item label="单位部门" prop="workspaceId">
          <el-cascader
            class="gl-full-width"
            v-model="workspace"
            :options="workspaceList"
            :props="workspaceProps"
            @change="checkWorkspace"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="工作职位" prop="jobPost">
          <el-input
            v-model="userForm.jobPost"
            placeholder="请输入工作职位"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="title != '编辑用户'" label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="userForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱地址" prop="emailAddress">
          <el-input
            v-model="userForm.emailAddress"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>-->
        <el-form-item label="电话" prop="phoneNumber">
          <el-input
            v-model="userForm.phoneNumber"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleNames">
          <el-checkbox-group
            class="form-item-maxHeight"
            v-model="userForm.roleNames"
          >
            <el-checkbox
              v-for="role in roleList"
              :key="role.id"
              :label="role.normalizedName"
              >{{ role.displayName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否启用" prop="isActive">
          <el-radio-group v-model="userForm.isActive">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "UserDialog",
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
      userForm: {
        userName: "",
        name: "",
        emailAddress: null,
        isActive: true,
        roleNames: [],
        password: "",
        workspaceId: null,
        departmentId: null,
        jobPost: "",
        phoneNumber: null
      },
      workspaceList: [],
      workspace: [],
      roleList: [],
      workspaceProps: {
        children: "children",
        label: "displayName",
        checkStrictly: true,
        value: "id"
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名!", trigger: "blur" },
          { max: 64, message: "长度在 64 个字符以内!", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名!", trigger: "blur" },
          { max: 256, message: "长度在 256 个字符以内!", trigger: "blur" }
        ],
        // emailAddress: [
        //   { required: true, message: "请输入用户邮箱!", trigger: "blur" },
        //   { max: 256, message: "长度在 256 个字符以内!", trigger: "blur" }
        // ],
        password: [
          { required: true, message: "请输入用户密码!", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 - 32 个字符!", trigger: "blur" }
        ],
        isActive: [
          { required: true, message: "请选择是否启用!", trigger: "change" }
        ],
        jobPost: [
          { min: 0, max: 20, message: "长度在 20 个字符以内!", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入用户电话号码!", trigger: "blur" },
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getWorkspaceList();
    this.getAllRole();
  },
  computed: {
    adminCode() {
      return this.$store.state.session.administrative.adminCode;
    }
  },
  methods: {
    save() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let api = "";
          if (this.title == "创建新用户") {
            api = "create";
          } else {
            api = "update";
          }
          this.$store
            .dispatch("organizationManage/user/" + api, this.userForm)
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
    checkWorkspace(ids) {
      if (ids.length > 0) {
        this.userForm.workspaceId = ids[0];
        if (ids.length > 1) {
          this.userForm.departmentId = ids[ids.length - 1];
        }
      } else {
        this.userForm.workspaceId = null;
        this.userForm.departmentId = null;
      }
    },
    getWorkspaceList() {
      this.$store
        .dispatch("organizationManage/workspace/getAllByCode", this.adminCode)
        .then(res => {
          this.workspaceList = res;
        });
    },
    getAllRole() {
      this.$store.dispatch("permissons/role/getAll").then(res => {
        this.roleList = res.items;
      });
    },
    handleClose() {
      this.userForm = {
        userName: "",
        name: "",
        emailAddress: null,
        isActive: null,
        roleNames: [],
        password: "",
        workspaceId: null,
        departmentId: null,
        jobPost: "",
        phoneNumber: null
      };
      this.workspace = [];
      this.$refs.userForm.resetFields();
      this.dialogVisible = false;
    },
    addOpen() {
      this.title = "创建新用户";
      this.dialogVisible = true;
    },
    editOpen({
      id,
      name,
      userName,
      emailAddress,
      isActive,
      roleNames,
      workspaceId,
      departmentId,
      jobPost,
      phoneNumber
    }) {
      this.userForm = {
        id,
        name,
        userName,
        emailAddress,
        isActive,
        roleNames,
        workspaceId,
        departmentId,
        jobPost,
        phoneNumber
      };
      let tempSpace = [];
      tempSpace.push(workspaceId);
      if (departmentId) {
        tempSpace.push(departmentId);
      }
      this.workspace = tempSpace;
      this.title = "编辑用户";
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.tree-maxHeight {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  max-height: 250px;
  overflow: auto;
}

.form-item-maxHeight {
  max-height: 90px;
  overflow: auto;
}
</style>
