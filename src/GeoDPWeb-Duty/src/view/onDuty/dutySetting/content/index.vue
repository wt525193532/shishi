<template>
  <div class="gl-content-item" v-loading.body="loading">
    <el-row :gutter="30">
      <el-col :span="24" class="gl-right-border">
        <!-- <div class="gl-second-title gl-bottom-border">（1）值班基本信息</div> -->
        <div>
          <div class="gl-margin-top-15">
            <el-button
              size="medium"
              icon="el-icon-plus"
              @click="addDutyPerson"
              type="primary"
              plain
              >新增值班人员</el-button
            >
            <el-button size="medium" @click="update" type="primary">{{
              canNotEdit ? "编辑" : "保存"
            }}</el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="createDutyRecord"
              size="medium"
              >新建交班</el-button
            >
          </div>
          <div>
            <el-row :gutter="60">
              <el-form size="mini" :disabled="canNotEdit" label-width="40px">
                <el-col :span="6" class="gl-margin-top-15">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>站值班领导</span>
                    </div>
                    <el-form-item label="姓名">
                      <el-select
                        clearable
                        style="width: 100%"
                        v-model="onDutyInfoData.dutyLeader.id"
                        placeholder="请选择"
                        @change="dutyLeaderChange"
                      >
                        <el-option
                          v-for="item in allDotyPerson.allDutyLeaders"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        v-model="onDutyInfoData.dutyLeader.phoneNumber"
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-card>
                </el-col>
                <el-col :span="6" class="gl-margin-top-15">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>局值班领导</span>
                    </div>
                    <el-form-item label="姓名">
                      <el-select
                        clearable
                        style="width: 100%"
                        v-model="onDutyInfoData.takeLeader.id"
                        placeholder="请选择"
                        @change="takeLeaderChange"
                      >
                        <el-option
                          v-for="item in allDotyPerson.allChargeLeaders"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        :value="onDutyInfoData.takeLeader.phoneNumber"
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-card>
                </el-col>
                <el-col :span="6" class="gl-margin-top-15">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>值班驾驶员</span>
                    </div>
                    <el-form-item label="姓名">
                      <el-select
                        clearable
                        style="width: 100%"
                        v-model="onDutyInfoData.dutyDriver.id"
                        placeholder="请选择"
                        @change="dutyDriverChange"
                      >
                        <el-option
                          v-for="item in allDotyPerson.allDutyDrivers"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        v-model="onDutyInfoData.dutyDriver.phoneNumber"
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-card>
                </el-col>
                <el-col :span="6" class="gl-margin-top-15">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>应急处理组</span>
                    </div>
                    <el-form-item label="组名">
                      <el-select
                        clearable
                        style="width: 100%"
                        v-model="onDutyInfoData.emergencyTeam.id"
                        placeholder="请选择"
                        @change="teamChange"
                      >
                        <el-option
                          v-for="item in allDotyPerson.allTeams.items"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        v-model="onDutyInfoData.emergencyTeam.phoneNumber"
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-card>
                </el-col>
                <el-col :span="6" class="gl-margin-top-15">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>值班人员1</span>
                    </div>
                    <el-form-item label="姓名">
                      <el-input
                        v-model="onDutyInfoData.mainDutyPerson.name"
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        v-model="onDutyInfoData.mainDutyPerson.phoneNumber"
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-card>
                </el-col>
                <el-col
                  :span="6"
                  class="gl-margin-top-15"
                  v-for="(item, index) in onDutyInfoData.otherDutyPersons"
                  :key="index"
                >
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>{{ "值班人员" + (index + 2) }}</span>
                      <el-button
                        :disabled="canNotEdit"
                        size="mini"
                        type="danger"
                        style="float: right;"
                        icon="el-icon-delete"
                        @click="deleteCard(index)"
                        circle
                      ></el-button>
                    </div>
                    <el-form-item label="姓名">
                      <el-select
                        clearable
                        style="width: 100%"
                        v-model="onDutyInfoData.otherDutyPersons[index].id"
                        placeholder="请选择"
                        @change="personChange($event, index)"
                      >
                        <el-option
                          v-for="item in allDotyPerson.allDutyPersons"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        v-model="
                          onDutyInfoData.otherDutyPersons[index].phoneNumber
                        "
                        placeholder
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-card>
                </el-col>
              </el-form>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <hand-over-dialog ref="dialogForm" />
  </div>
</template>

<script>
// import dutyCard from "@/view/onDuty/components/dutyCard";
import handOverDialog from "./handOverDialog";
export default {
  name: "ShiftManage",
  components: {
    handOverDialog
  },
  data() {
    return {
      canNotEdit: true,
      dutyMunber: 1,
      onDutyInfoData: {
        mainDutyPerson: {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        },
        emergencyTeam: {
          name: "",
          phoneNumber: "",
          members: [
            {
              type: 0,
              userId: 0,
              name: "",
              phoneNumber: "",
              emailAddress: "",
              department: "",
              id: null
            }
          ],
          id: 0
        },
        takeLeader: {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        },
        dutyLeader: {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        },
        dutyDriver: {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        },
        otherDutyPersons: [],
        id: 0
      },
      loading: false
    };
  },
  computed: {
    allDotyPerson() {
      return this.$store.state.common;
    }
  },
  mounted() {
    this.loading = true;
    this.$store
      .dispatch("dutyManage/schedueManage/getCurrent")
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        if (res) {
          this.onDutyInfoData = res;
        }
        this.loading = false;
      });
  },
  methods: {
    //增加值班人员
    addDutyPerson() {
      this.canNotEdit = false;
      const allPerson = this.allDotyPerson.allDutyPersons.length;
      const otherPerson = this.onDutyInfoData.otherDutyPersons.length;
      if (allPerson - 1 > otherPerson) {
        this.onDutyInfoData.otherDutyPersons.push({
          id: null,
          phoneNumber: undefined
        });
      } else {
        this.$message.warning("超过总值班人员人数! 请联系管理员新增值班人员！");
      }
    },
    deleteCard(index) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.onDutyInfoData.otherDutyPersons.splice(index, 1);
          this.$message.success("删除成功！");
        })
        .catch(() => {});
    },
    update() {
      if (this.canNotEdit) {
        this.canNotEdit = false;
      } else {
        this.$store
          .dispatch(
            "dutyManage/schedueManage/updateCurrent",
            this.onDutyInfoData
          )
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            this.$message.success("更新排班信息成功！");
          });
        this.canNotEdit = true;
      }
    },
    // 新建交班
    createDutyRecord() {
      this.$refs.dialogForm.openDialog();
    },
    dutyLeaderChange(id) {
      this.allDotyPerson.allDutyLeaders.forEach(item => {
        if (item.id == id) {
          this.onDutyInfoData.dutyLeader.phoneNumber = item.phoneNumber;
        }
      });
    },
    takeLeaderChange(id) {
      this.allDotyPerson.allChargeLeaders.forEach(item => {
        if (item.id == id) {
          this.onDutyInfoData.takeLeader.phoneNumber = item.phoneNumber;
        }
      });
    },
    dutyDriverChange(id) {
      this.allDotyPerson.allDutyDrivers.forEach(item => {
        if (item.id == id) {
          this.onDutyInfoData.dutyDriver.phoneNumber = item.phoneNumber;
        }
      });
    },
    teamChange(id) {
      this.allDotyPerson.allTeams.items.forEach(item => {
        if (item.id == id) {
          this.onDutyInfoData.emergencyTeam.phoneNumber = item.phoneNumber;
        }
      });
    },
    personChange(id, index) {
      this.allDotyPerson.allDutyPersons.forEach(item => {
        if (item.id == id) {
          this.onDutyInfoData.otherDutyPersons[index].phoneNumber =
            item.phoneNumber;
        }
      });
    }
  }
};
</script>
<style lang="less"></style>
