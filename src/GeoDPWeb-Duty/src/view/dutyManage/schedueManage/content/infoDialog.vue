<template>
  <el-dialog
    title="排班信息"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="820px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :model="dialogForm"
        label-suffix="："
        disabled
        ref="dialogForm"
        size="medium"
        label-width="100px"
        inline
      >
        <div>
          <el-form-item label="排班时间" prop="schDate">
            <el-date-picker
              v-model="dialogForm.schDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy年 M月 d日 H点"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item class="gl-form-item" label="值班人员" prop="dutyPerson">
          <el-input v-model="dialogForm.dutyPerson" placeholder></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="局值班领导" prop="takeLeader">
          <el-input v-model="dialogForm.takeLeader" placeholder></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="站值班领导" prop="dutyLeader">
          <el-input v-model="dialogForm.dutyLeader" placeholder></el-input>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="值班驾驶员"
          prop="dutyDriverId"
        >
          <el-input v-model="dialogForm.dutyDriver" placeholder></el-input>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="应急处理组"
          prop="emergencyTeam"
        >
          <el-input v-model="dialogForm.emergencyTeam" placeholder></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="handleClose" size="medium">取 消</el-button> -->
      <el-button type="primary" @click="handleClose" size="medium"
        >关闭</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCom",
  props: {},
  data() {
    return {
      dialogForm: {
        schDate: [],
        dutyPerson: "",
        dutyLeader: "",
        takeLeader: "",
        dutyDriver: "",
        emergencyTeam: ""
      },
      dialogShow: false
    };
  },
  methods: {
    viewOpen({
      dutyDriver,
      dutyLeader,
      emergencyTeam,
      startTime,
      endTime,
      takeLeader,
      allDutyPerson
    }) {
      let dutyTime = [];
      dutyTime.push(startTime);
      dutyTime.push(endTime);
      this.dialogForm = {
        schDate: dutyTime,
        dutyPerson: allDutyPerson,
        dutyLeader: dutyLeader ? dutyLeader.name : "无",
        takeLeader: takeLeader ? takeLeader.name : "无",
        dutyDriver: dutyDriver ? dutyDriver.name : "无",
        emergencyTeam: emergencyTeam ? emergencyTeam.name : "无"
      };
      this.dialogShow = true;
    },
    handleClose() {
      this.$refs.dialogForm.resetFields();
      this.dialogShow = false;
    }
  }
};
</script>
