<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="900px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :model="dialogForm"
        :rules="rules"
        label-suffix="："
        ref="dialogForm"
        size="medium"
        label-width="100px"
        inline
      >
        <el-form-item class="gl-form-item" label="排班日期" prop="schDate">
          <el-date-picker
            v-model="dialogForm.schDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="gl-form-item" label="值班班次" prop="dutyOrderId">
          <el-select
            v-model="dialogForm.dutyOrderId"
            filterable
            placeholder="请选择值班班次"
          >
            <el-option
              v-for="item in common.allDutyOrders"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="gl-form-item"
          label="值班人员"
          prop="dutyPersonIds"
        >
          <el-select
            :multiple="true"
            v-model="dialogForm.dutyPersonIds"
            filterable
            placeholder="请选择值班人员"
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
          <el-select
            v-model="dialogForm.takeLeaderId"
            filterable
            placeholder="请选择局值班领导"
          >
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
          <el-select
            v-model="dialogForm.dutyLeaderId"
            filterable
            placeholder="请选择站值班领导"
          >
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
          <el-select
            v-model="dialogForm.dutyDriverId"
            filterable
            placeholder="请选择值班驾驶员"
          >
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
            placeholder="请选择应急处理组"
          >
            <el-option
              v-for="item in common.allTeams"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="medium">取 消</el-button>
      <el-button type="primary" @click="sure" size="medium">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCom",
  props: {
    dialogForm: Object,
    title: String,
    dialogShow: Boolean,
    sure: Function,
    handleClose: Function,
    rules: Object
  },
  computed: {
    common() {
      return this.$store.state.common;
    }
  }
};
</script>
