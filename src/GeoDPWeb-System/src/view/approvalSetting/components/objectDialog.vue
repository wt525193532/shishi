<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form
      :model="objectForm"
      size="small"
      ref="objectForm"
      :rules="rules"
      inline
      label-width="90px"
    >
      <el-form-item label="审核类型">
        <el-input
          v-model="approvalTypeName"
          disabled
          class="input-min-width"
          placeholder
        ></el-input>
      </el-form-item>
      <el-form-item label="显示名称" prop="displayName">
        <el-input
          placeholder="请输入名称"
          class="input-min-width"
          v-model="objectForm.displayName"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否可用" prop="isActive">
        <el-select v-model="objectForm.isActive" placeholder>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核流程" prop="flowId">
        <el-select v-model="objectForm.flowId" placeholder="-- 请选择 -- ">
          <el-option
            v-for="item in allFlow"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          class="input-min-width"
          v-model="objectForm.remark"
          placeholder
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
    queryAllObj: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      objectForm: {
        displayName: "",
        isActive: null,
        flowId: null,
        remark: "",
        id: 0
      },
      approvalTypeEnum: {
        1: "新增",
        2: "修改",
        3: "删除",
        4: "销号"
      },
      approvalType: 1,
      allFlow: [],
      rules: {
        displayName: [
          { required: true, message: "请输入对象显示名称!", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内!", trigger: "blur" }
        ],
        isActive: [
          { required: true, message: "请选择是否可用!", trigger: "change" }
        ],
        flowId: [
          { required: true, message: "请选择审核流程!", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    approvalTypeName: function() {
      return this.approvalTypeEnum[this.approvalType];
    }
  },
  created() {
    this.getAllFlow();
  },
  methods: {
    getAllFlow() {
      this.$store
        .dispatch("approvalSetting/getAllFlow", this.objectForm)
        .then(res => {
          this.allFlow = res;
        });
    },
    save() {
      this.$refs.objectForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("approvalSetting/updateObject", this.objectForm)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.handleClose();
              this.queryAllObj();
              this.$message.success("保存成功！");
            });
        } else {
          this.$message.warning("验证不通过!请检查!");
          return false;
        }
      });
    },
    handleClose() {
      this.objectForm = {
        displayName: "",
        isActive: null,
        flowId: 0,
        remark: "",
        id: 0
      };
      this.approvalType = null;
      this.$refs.objectForm.resetFields();
      this.dialogVisible = false;
    },
    editOpen({ displayName, isActive, flowId, remark, id, approvalType }) {
      this.title = "编辑审核对象";
      this.approvalType = approvalType * 1;
      this.objectForm = { displayName, isActive, flowId, remark, id };
      this.dialogVisible = true;
    }
  }
};
</script>
