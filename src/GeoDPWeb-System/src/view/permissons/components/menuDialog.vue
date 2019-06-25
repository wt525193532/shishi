<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :model="menuForm"
        size="small"
        ref="menuForm"
        :rules="rules"
        inline
        label-width="130px"
      >
        <el-form-item label="唯一名称" prop="name">
          <el-input
            class="input-min-width"
            v-model="menuForm.name"
            placeholder="菜单的唯一名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="displayName">
          <el-input
            placeholder="菜单的显示名称"
            class="input-min-width"
            v-model="menuForm.displayName"
          ></el-input>
        </el-form-item>
        <el-form-item label="导航地址" prop="url">
          <el-input
            class="input-min-width"
            placeholder="菜单项导航地址"
            v-model="menuForm.url"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标名称" prop="icon">
          <el-input
            class="input-min-width"
            placeholder="菜单图标名称"
            v-model="menuForm.icon"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单序号" prop="order">
          <el-input
            class="input-min-width"
            placeholder="菜单的唯一名称"
            v-model="menuForm.order"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单是否可见" prop="isVisible">
          <el-select v-model="menuForm.isVisible" placeholder>
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单是否激活可用" prop="isActive">
          <el-select v-model="menuForm.isActive" placeholder>
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否登录后可用" prop="requiresAuthentication">
          <el-select v-model="menuForm.requiresAuthentication" placeholder>
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证的权限名称" prop="requiredPermissionName">
          <el-input
            class="input-min-width"
            v-model="menuForm.requiredPermissionName"
          ></el-input>
          <!-- <el-select v-model="menuForm.requiredPermissionName">
              <el-option
                v-for="(item, key) in auth"
                :key="item.value"
                :label="key"
                :value="key"
              >
              </el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="上一级菜单id" prop="parentId">
          <el-input
            class="input-min-width"
            v-model="menuForm.parentId"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单跳转目标">
          <el-radio-group v-model="menuForm.target">
            <el-radio label="_blank"></el-radio>
            <el-radio label="_self"></el-radio>
            <el-radio label="_parent"></el-radio>
            <el-radio label="_top"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "MenuDialog",
  props: {
    queryAllMenu: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      menuForm: {
        name: "",
        displayName: "",
        url: "",
        icon: "",
        order: null,
        isVisible: null,
        isActive: null,
        customData: null,
        target: "",
        requiresAuthentication: null,
        requiredPermissionName: "",
        parentId: null
      },
      rules: {
        displayName: [
          { required: true, message: "请输入菜单的唯一名称!", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内!", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入菜单的显示名称!", trigger: "blur" },
          { max: 256, message: "长度在 256 个字符以内!", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    save() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("permissons/menu/createOrUpdate", this.menuForm)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.handleClose();
              this.queryAllMenu();
              this.$message.success("保存成功！");
            });
        } else {
          this.$message.warning("验证不通过!请检查!");
          return false;
        }
      });
    },
    handleClose() {
      this.menuForm = {
        name: "",
        displayName: "",
        url: "",
        icon: "",
        order: null,
        isVisible: null,
        isActive: null,
        customData: null,
        target: "",
        requiresAuthentication: null,
        requiredPermissionName: "",
        parentId: null
      };
      this.$refs.menuForm.resetFields();
      this.dialogVisible = false;
    },
    addOpen() {
      this.title = "创建新菜单";
      this.dialogVisible = true;
    },
    editOpen({ ...menu }) {
      this.menuForm = menu;
      this.title = "编辑菜单";
      this.dialogVisible = true;
    }
  }
};
</script>
