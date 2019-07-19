<template>
  <el-dialog
    ref="dialogForm"
    title="导出记录"
    :visible.sync="exportShow"
    width="650px"
    :before-close="handleClose"
  >
    <el-form
      v-loading.lock="loading"
      :model="exportForm"
      ref="exportForm"
      label-width="100px"
      label-suffix="："
    >
      <el-form-item class="gl-form-item" label="时间段">
        <el-date-picker
          @change="dateChange"
          style="width: 400px;"
          v-model="exportForm.exportDate"
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
                  $util.transTime(item.endTime) +
                  " " +
                  item.mainDutyPerson.name +
                  " " +
                  (item.otherDutyPersons[0]
                    ? item.otherDutyPersons[0].name
                    : "")
              }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportToWord"
        >导出</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
const plansOptions = [];
export default {
  data() {
    return {
      checkAll: false,
      checkedIds: [],
      isIndeterminate: false,
      showPlans: false,
      exportShow: false,
      exportForm: {
        exportDate: []
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
      if (this.exportForm.exportDate) {
        this.loading = true;
        let params = {
          startDate: this.exportForm.exportDate[0],
          endDate: this.exportForm.exportDate[1]
        };
        this.$store
          .dispatch("dutyManage/schedueManage/getAllActualSchedule", params)
          .then(res => {
            this.plans = res.data.result;
            res.data.result.forEach(item => {
              plansOptions.push(item.id);
            });
            this.showPlans = true;
            this.loading = false;
          });
      }
    },
    exportToWord() {
      if (this.checkedIds.length > 0) {
        this.$store
          .dispatch("onDuty/dutyRecord/exportToWord", {
            ids: this.checkedIds
          })
          .then(res => {
            var content = res;
            var blob = new Blob([content]);
            var fileName =
              "值班记录" + this.$util.transTime(new Date()) + ".docx"; //要保存的文件名称
            if ("download" in document.createElement("a")) {
              // 非IE下载
              var elink = document.createElement("a");
              elink.download = fileName;
              elink.style.display = "none";
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink);
            } else {
              // IE10+下载
              navigator.msSaveBlob(blob, fileName);
            }
          });
      } else {
        this.$message.info("请选择 时间段 和需要导出的 排班");
      }
    },
    clear() {
      this.showPlans = false;
      this.exportForm.exportDate = [];
      this.checkAll = false;
      this.isIndeterminate = false;
      this.checkedIds = [];
    },
    handleClose() {
      this.exportShow = false;
      this.clear();
    },
    open() {
      this.exportShow = true;
    }
  }
};
</script>
