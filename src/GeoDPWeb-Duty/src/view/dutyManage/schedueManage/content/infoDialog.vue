<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="820px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :model="dialogForm"
        label-suffix="："
        ref="dialogForm"
        :rules="rules"
        :disabled="!canEdit"
        size="medium"
        label-width="100px"
        inline
      >
        <div>
          <el-form-item label="排班时间">
            <el-date-picker
              disabled
              v-model="schDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy年 M月 d日 H点"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item
          class="gl-form-item"
          label="值班人员"
          prop="dutyPersonIds"
        >
          <el-select
            :multiple="true"
            v-model="dialogForm.dutyPersonIds"
            filterable
            placeholder
          >
            <el-option
              v-for="item in common.allDutyPersons"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="局值班领导"
          prop="takeLeaderId"
        >
          <el-select v-model="dialogForm.takeLeaderId" filterable placeholder>
            <el-option
              v-for="item in common.allChargeLeaders"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="站值班领导"
          prop="dutyLeaderId"
        >
          <el-select v-model="dialogForm.dutyLeaderId" filterable placeholder>
            <el-option
              v-for="item in common.allDutyLeaders"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="值班驾驶员"
          prop="dutyDriverId"
        >
          <el-select v-model="dialogForm.dutyDriverId" filterable placeholder>
            <el-option
              v-for="item in common.allDutyDrivers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="应急处理组"
          prop="emergencyTeamId"
        >
          <el-select
            v-model="dialogForm.emergencyTeamId"
            filterable
            placeholder
          >
            <el-option
              v-for="item in common.allTeams.items"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">关闭</el-button>
      <span v-if="!readOnly" style="margin-left: 10px">
        <el-button type="primary" v-if="!canEdit" @click="edit" size="small"
          >编辑</el-button
        >
        <el-button type="primary" v-if="canEdit" @click="save" size="small"
          >保存</el-button
        >
      </span>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCom",
  props: {
    query: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      canEdit: false,
      title: "排班信息",
      schDate: [],
      dialogForm: {
        id: 0,
        dutyPersonIds: null,
        dutyLeaderId: null,
        takeLeaderId: null,
        dutyDriverId: null,
        emergencyTeamId: null
      },
      dialogShow: false,
      rules: {
        dutyPersonIds: {
          type: "array",
          required: true,
          message: "请选择值班人员"
        }
      },
      readOnly: false
    };
  },
  computed: {
    common() {
      return this.$store.state.common;
    }
  },
  methods: {
    edit() {
      this.canEdit = true;
      this.title = "编辑排班信息";
    },
    save() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let parmas = {
            id: this.dialogForm.id,
            mainDutyPersonId: this.dialogForm.dutyPersonIds[0],
            otherDutyPersonsId: this.dialogForm.dutyPersonIds.slice(1),
            takeLeaderId: this.dialogForm.takeLeaderId,
            dutyLeaderId: this.dialogForm.dutyLeaderId,
            dutyDriverId: this.dialogForm.dutyDriverId,
            emergencyTeamId: this.dialogForm.emergencyTeamId
          };
          this.$store
            .dispatch("dutyManage/schedueManage/updatePlan", parmas)
            .then(res => {
              if (res.data.success) {
                this.$message.success("更新成功");
                this.query();
                this.handleClose();
              }
            });
        }
      });
    },
    viewOpen(
      {
        id,
        dutyDriver,
        dutyLeader,
        emergencyTeam,
        startTime,
        endTime,
        takeLeader,
        mainDutyPerson,
        otherDutyPersons
      },
      readOnly
    ) {
      this.title = "排班信息";
      this.readOnly = readOnly;
      let dutyTime = [];
      dutyTime.push(startTime);
      dutyTime.push(endTime);
      let dutyPersonIds = [];
      dutyPersonIds.push(mainDutyPerson.id);
      if (otherDutyPersons.length > 0) {
        otherDutyPersons.forEach(item => {
          dutyPersonIds.push(item.id);
        });
      }
      this.schDate = dutyTime;
      this.dialogForm = {
        id,
        dutyPersonIds: dutyPersonIds,
        dutyLeaderId: dutyLeader ? dutyLeader.id : null,
        takeLeaderId: takeLeader ? takeLeader.id : null,
        dutyDriverId: dutyDriver ? dutyDriver.id : null,
        emergencyTeamId: emergencyTeam ? emergencyTeam.id : null
      };
      this.dialogShow = true;
    },
    handleClose() {
      this.$refs.dialogForm.resetFields();
      this.canEdit = false;
      this.dialogShow = false;
    }
  }
};
</script>
