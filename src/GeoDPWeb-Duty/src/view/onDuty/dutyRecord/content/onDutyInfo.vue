<template>
  <el-row :gutter="15">
    <el-col :span="17">
      <div class="gl-content-item">
        <div class="gl-second-title">值班基本信息</div>
        <el-row :gutter="15" class="gl-top-border">
          <el-form size="mini" :disabled="true" label-width="40px">
            <el-col :span="6" class="gl-margin-top-15">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>站值班领导</span>
                </div>
                <el-form-item label="姓名">
                  <el-input
                    v-model="onDotyInfo.dutyLeader.name"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input
                    v-model="onDotyInfo.dutyLeader.phoneNumber"
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
                  <el-input
                    v-model="onDotyInfo.takeLeader.name"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input
                    v-model="onDotyInfo.takeLeader.phoneNumber"
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
                  <el-input
                    v-model="onDotyInfo.dutyDriver.name"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input
                    v-model="onDotyInfo.dutyDriver.phoneNumber"
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
                  <el-input
                    v-model="onDotyInfo.emergencyTeam.name"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input
                    v-model="onDotyInfo.emergencyTeam.phoneNumber"
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
                    v-model="onDotyInfo.mainDutyPerson.name"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input
                    v-model="onDotyInfo.mainDutyPerson.phoneNumber"
                    placeholder
                    disabled
                  ></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col
              :span="6"
              class="gl-margin-top-15"
              v-for="(item, index) in onDotyInfo.otherDutyPersons"
              :key="index"
            >
              <el-card>
                <div slot="header" class="clearfix">
                  <span>{{ "值班人员" + (index + 2) }}</span>
                </div>
                <el-form-item label="姓名">
                  <el-input
                    v-model="onDotyInfo.otherDutyPersons[index].name"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input
                    v-model="onDotyInfo.otherDutyPersons[index].phoneNumber"
                    placeholder
                  ></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-col>
    <el-col :span="7" class="gl-left-border">
      <div class="gl-content-item">
        <div class="gl-second-title">交接班信息</div>
        <div class="takeOverInfo gl-top-border gl-padding-top-15">
          <span v-if="!onDotyInfo.takeOverInfo.handOverPerson"
            >暂无上次交班信息</span
          >
          <el-form
            v-else
            :disabled="true"
            :model="onDotyInfo.takeOverInfo"
            ref="dutyForm"
            label-width="120px"
            inline
            label-suffix="："
            size="medium"
          >
            <el-form-item class="gl-form-item" label="上次交班人员">
              <el-input
                v-model="onDotyInfo.takeOverInfo.handOverPerson.name"
              ></el-input>
            </el-form-item>
            <el-form-item class="gl-form-item" label="交班时间">
              <el-date-picker
                v-model="onDotyInfo.takeOverInfo.handTime"
                type="date"
                format="yyyy年MM月dd日"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="gl-form-item" label="交班内容">
              <el-input
                v-model="onDotyInfo.takeOverInfo.content"
                type="textarea"
                :rows="5"
              ></el-input>
            </el-form-item>
            <comAttachment
              v-model="onDotyInfo.takeOverInfo.attachments"
              :fileOption="fileOption"
            />
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "OnDutyInfo",
  props: {},
  data() {
    return {
      onDotyInfo: {
        startTime: null,
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
              id: 0
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
        otherDutyPersons: [
          {
            type: 0,
            userId: 0,
            name: "",
            phoneNumber: "",
            emailAddress: "",
            department: "",
            id: 0
          }
        ],
        takeOverInfo: {
          handOverPerson: {
            type: 0,
            userId: 0,
            name: "",
            phoneNumber: "",
            emailAddress: "",
            department: "",
            id: 0
          },
          takeOverPerson: {
            type: 0,
            userId: 0,
            name: "",
            phoneNumber: "",
            emailAddress: "",
            department: "",
            id: 0
          },
          content: "",
          attachments: [],
          handTime: null,
          id: 0
        },
        id: 0
      }
    };
  },
  computed: {
    fileOption() {
      return {
        tag: ["附件"],
        upload: false,
        accept: ""
      };
    }
  },
  mounted() {
    this.$store
      .dispatch("dutyManage/schedueManage/getCurrent")
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        if (res) {
          this.onDotyInfo = res;
        }
      });
  }
};
</script>
<style lang="less" scoped>
.takeOverInfo {
  min-height: 400px;
}
</style>
