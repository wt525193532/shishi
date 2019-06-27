<template>
  <div class="gl-content-item" v-loading.body="loading">
    <div class="item-card">
      <el-button size="medium" @click="openAddShift" type="primary">
        <i class="el-icon-plus el-icon--left" />
        新增班次
      </el-button>
      <el-button
        v-if="shiftDatas.length != 0"
        size="medium"
        @click="editBatch"
        type="primary"
        >编 辑</el-button
      >
      <el-button
        v-if="shiftDatas.length != 0"
        size="medium"
        @click="saveBatch"
        type="primary"
        >保 存</el-button
      >
    </div>
    <el-row :gutter="60">
      <el-col v-if="shiftDatas.length == 0" :span="24" class="gl-text-center">
        <h2>暂无班次</h2>
      </el-col>

      <el-col
        :span="6"
        v-for="(item, index) in shiftDatas"
        :key="index"
        class="item-card"
      >
        <form-card
          :formData="shiftDatas[index]"
          :isDisabled="isDisabled"
          :deleteCard="deleteShift"
        />
      </el-col>
    </el-row>
    <div>
      <el-dialog
        title="新增班次"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="closeAddShift"
      >
        <el-form
          :model="shiftFormDate"
          ref="addShiftForm"
          :rules="rules"
          label-suffix="："
          label-width="160px"
        >
          <div class="gl-form-item">
            <el-form-item label="名称" prop="name">
              <el-input v-model="shiftFormDate.name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-select v-model="shiftFormDate.startTime" placeholder="请选择">
                <el-option
                  v-for="(item, index) in 37"
                  :key="index"
                  :label="
                    item < 25 ? index + ':00' : '次日 ' + (index - 24) + ':00'
                  "
                  :value="index * 60"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-select v-model="shiftFormDate.endTime" placeholder="请选择">
                <el-option
                  v-for="item in 36"
                  :key="item"
                  :label="
                    item < 25 ? item + ':00' : '次日 ' + (item - 24) + ':00'
                  "
                  :value="item * 60"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div class="gl-text-center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addShiftDatas">添 加</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import formCard from "./formCard";

export default {
  name: "ShiftManage",
  data() {
    return {
      dialogVisible: false,
      isDisabled: true,
      formCarDisable: true,
      shiftFormDate: {
        name: "",
        startTime: null,
        endTime: null
      },
      shiftDatas: [],
      rules: {
        name: [
          { required: true, message: "请输入班次名称", trigger: "blur" },
          { min: 0, max: 32, message: "长度在 32 个字符以内", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请输入班次名称", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请输入班次名称", trigger: "change" }
        ]
      },
      loading: false
    };
  },
  components: {
    formCard
  },
  mounted() {
    this.getAllShift();
  },
  methods: {
    // 查询所有班次信息
    getAllShift() {
      this.loading = true;
      this.$store.dispatch("common/getAllDutyOrders").then(res => {
        this.shiftDatas = res;
        this.loading = false;
      });
    },
    // 新增班次
    addShiftDatas() {
      this.$refs["addShiftForm"].validate(valid => {
        if (valid) {
          if (this.shiftFormDate.endTime > this.shiftFormDate.startTime) {
            this.$store
              .dispatch("dutyManage/shiftManage/save", this.shiftFormDate)
              // eslint-disable-next-line no-unused-vars
              .then(res => {
                this.closeAddShift();
                this.getAllShift();
              });
          } else {
            this.$message.warning("结束时间应大于开始时间！请重新选择！");
          }
        } else {
          this.$message.warning("验证不通过，请输入正确信息！");
          return false;
        }
      });
    },
    // 删除班次信息
    deleteShift(id) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("dutyManage/shiftManage/delShift", id)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.getAllShift();
              this.$message.success("删除成功！");
            });
        })
        .catch(() => {});
    },
    // 打开新增班次弹窗
    openAddShift() {
      this.dialogVisible = true;
      // this.shiftFormDate = {};
    },
    // 关闭新增班次弹窗
    closeAddShift() {
      this.$refs["addShiftForm"].resetFields();
      this.dialogVisible = false;
    },
    // 批量编辑班次
    editBatch() {
      this.isDisabled = false;
    },
    // 批量保存班次
    saveBatch() {
      if (this.isDisabled) {
        this.$message.warning("请先修改班次信息");
      } else {
        let flag = true;
        this.shiftDatas.forEach((item, index) => {
          if (item.endTime < item.startTime) {
            flag = false;
            this.$message({
              type: "warning",
              message:
                "班次：'" +
                item.name +
                "' 结束时间应大于开始时间！请重新选择！",
              offset: 35 * index + 20
            });
          }
        });
        if (flag) {
          this.$store
            .dispatch("dutyManage/shiftManage/saveBatch", this.shiftDatas)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.getAllShift();
              this.isDisabled = true;
              this.$message.success("保存成功");
            });
        }
      }
    }
  }
};
</script>
<style lang="less">
.item-card {
  margin-bottom: 20px;
  .el-select {
    width: 100%;
  }
}
</style>
