<template>
  <el-dialog
    ref="dialogForm"
    title="批量删除"
    :visible.sync="delShow"
    width="550px"
    :before-close="handleClose"
  >
    <el-form
      v-loading.lock="loading"
      :model="delForm"
      ref="delForm"
      label-width="100px"
      label-suffix="："
    >
      <el-form-item class="gl-form-item" label="时间段">
        <el-date-picker
          @change="dateChange"
          style="width: 100%;"
          v-model="delForm.delDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="班次" v-if="showPlans">
        <span v-if="plans.length == 0">当前时间段暂无排班信息！</span>
        <div v-else class="dialog-height">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="checkedIds"
            @change="handleCheckedIdsChange"
          >
            <el-checkbox
              v-for="(item, index) in plans"
              :label="item.id"
              :key="index"
            >
              {{
                $util.transTime(item.startTime) +
                  " 至 " +
                  $util.transTime(item.endTime)
              }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="delSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
const plansOptions = [];
export default {
  props: {
    query: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      checkAll: false,
      checkedIds: [],
      isIndeterminate: false,

      showPlans: false,
      delShow: false,

      delForm: {
        delDate: []
      },
      plans: [],
      loading: false
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedIds = val ? plansOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedIdsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.plans.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.plans.length;
    },
    dateChange() {
      this.loading = true;
      let params = {
        startDate: this.delForm.delDate[0],
        endDate: this.delForm.delDate[1]
      };
      this.$store
        .dispatch("dutyManage/schedueManage/getAllPlan", params)
        .then(res => {
          this.plans = res.data.result;
          res.data.result.forEach(item => {
            plansOptions.push(item.id);
          });
          this.showPlans = true;
          this.loading = false;
        });
    },
    delSure() {
      if (this.checkedIds.length > 0) {
        this.$store
          .dispatch("dutyManage/schedueManage/deletePlan", {
            ids: this.checkedIds
          })
          .then(res => {
            if (res.data.success) {
              this.$message.success("删除成功");
              this.query();
              this.handleClose();
            }
          });
      } else {
        this.$message.info("请选择 时间段 和需要删除的 排班");
      }
    },
    clear() {
      this.showPlans = false;
      this.delForm.delDate = [];
      this.checkAll = false;
      this.isIndeterminate = false;
      this.checkedIds = [];
    },
    handleClose() {
      this.delShow = false;
      this.clear();
    },
    open() {
      this.delShow = true;
    }
  }
};
</script>
