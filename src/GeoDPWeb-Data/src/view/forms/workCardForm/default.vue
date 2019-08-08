<template>
  <div class="page-container">
    <div class="clearfix" v-if="disabled && !this.isFromQuery">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#workCardPrint'"
        >打印表单</el-button
      >
    </div>
    <div class="form-wrapper" id="workCardPrint">
      <div class="form-wapper-it">
        <el-form
          label-position="right"
          label-suffix="："
          label-width="140px"
          :model="formData"
          inline
          ref="geodisasterPreventionWorkCard"
          :disabled="disabled"
          :rules="rules"
        >
          <div class="form-item">
            <h2 ref="disasterWorkCardH1">基本信息</h2>

            <div class="form-item-wapper">
              <basicinfo-selector
                v-model="formData.site"
                @input="valueChanged"
                :isAdd="canEdit"
              />
              <el-form-item label="诱发因素" prop="predisposFactor">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="formData.predisposFactor"
                ></el-input>
              </el-form-item>

              <el-form-item label="威胁对象" prop="threatObjects">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="formData.threatObjects"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <h2 ref="disasterWorkCardh2">监测预报</h2>

            <div class="form-item-wapper">
              <el-form-item label="主要迹象" prop="mainSigns">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="formData.mainSigns"
                ></el-input>
              </el-form-item>

              <el-form-item label="主要手段和方法" prop="mainMethods">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="formData.mainMethods"
                ></el-input>
              </el-form-item>

              <el-form-item label="临灾预报的依据" prop="forcastBasis">
                <el-input
                  type="textarea"
                  class="history-input"
                  :rows="2"
                  v-model="formData.forcastBasis"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <h2 ref="disasterWorkCardh2">应急避险撤离</h2>

            <div class="form-item-wapper">
              <el-form-item label="预定避险地点" prop="hedgingPlace">
                <el-input v-model="formData.hedgingPlace"></el-input>
              </el-form-item>

              <el-form-item label="预定报警信号" prop="alarmSign">
                <el-input v-model="formData.alarmSign"></el-input>
              </el-form-item>

              <el-form-item label="预定疏散路线" prop="route">
                <el-input v-model="formData.route"></el-input>
              </el-form-item>

              <el-form-item label="疏散命令发布人" prop="publisher">
                <el-input v-model="formData.publisher"></el-input>
              </el-form-item>

              <el-form-item label="疏散值班电话" prop="dutyPhone">
                <el-input
                  placeholder="如：13996633888 或者 027-87588000"
                  v-model="formData.dutyPhone"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="抢排险单位" prop="rescueCoName">
                <el-input v-model="formData.rescueCoName"></el-input>
              </el-form-item>

              <el-form-item
                label="抢排险单位负责人"
                prop="rescueCoPrincipal"
                class="form-label-medium"
              >
                <el-input v-model="formData.rescueCoPrincipal"></el-input>
              </el-form-item>

              <el-form-item label="值班电话" prop="rescueCoPhone">
                <el-input
                  placeholder="如：13996633888 或者 027-87588000"
                  v-model="formData.rescueCoPhone"
                ></el-input>
              </el-form-item>

              <el-form-item label="治安保卫单位" prop="safetyCoName">
                <el-input v-model="formData.safetyCoName"></el-input>
              </el-form-item>

              <el-form-item
                label="治安保卫单位负责人"
                prop="safetyCoPrincipal"
                class="form-label-medium"
              >
                <el-input v-model="formData.safetyCoPrincipal"></el-input>
              </el-form-item>

              <el-form-item label="值班电话" prop="safetyCoPhone">
                <el-input
                  placeholder="如：13996633888 或者 027-87588000"
                  v-model="formData.safetyCoPhone"
                ></el-input>
              </el-form-item>

              <el-form-item label="医疗救护单位" prop="medicalCoName">
                <el-input v-model="formData.medicalCoName"></el-input>
              </el-form-item>

              <el-form-item
                label="医疗救护单位负责人"
                prop="medicalCoPrincipal"
                class="form-label-medium"
              >
                <el-input v-model="formData.medicalCoPrincipal"></el-input>
              </el-form-item>

              <el-form-item label="值班电话" prop="medicalPhone">
                <el-input
                  placeholder="如：13996633888 或者 027-87588000"
                  v-model="formData.medicalPhone"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <h2 ref="disasterWorkCardh2">防灾工作明白卡信息</h2>

            <div class="form-item-wapper">
              <el-form-item label="本卡发放单位" prop="sentCoName">
                <el-input v-model="formData.sentCoName"></el-input>
              </el-form-item>
              <el-form-item
                label="发放单位联系电话"
                label-width="150px"
                prop="sentCoPhone"
              >
                <el-input
                  placeholder="如：13996633888 或者 027-87588000"
                  v-model="formData.sentCoPhone"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="本卡发放单位负责人"
                class="form-label-medium"
              >
                <el-input v-model="formData.sentCoPrincipal"></el-input>
              </el-form-item>

              <el-form-item label="发放时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formData.sentTime"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="持卡单位或个人" prop="holder">
                <el-input v-model="formData.holder"></el-input>
              </el-form-item>

              <el-form-item
                label="持卡人联系电话"
                label-width="150px"
                prop="holderPhone"
              >
                <el-input
                  placeholder="如：13996633888 或者 027-87588000"
                  v-model="formData.holderPhone"
                ></el-input>
              </el-form-item>

              <el-form-item label="持卡时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formData.holdTime"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="form-item-step" v-show="isShowAudit">
          <time-line :processes="formData.processes"></time-line>
        </div>
      </div>
      <div class="form-foot-btn">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        <el-button v-if="!disabled" type="primary" @click="saveForm"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "@/view/components/basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "WorkCardForm",
  props: {
    codeData: Object,
    isFromQuery: {
      type: Boolean,
      default: false
    }
  },
  components: { basicinfoSelector, timeLine },
  data() {
    return {
      rules: {
        predisposFactor: [{ max: 500, message: "长度在 500 个字符以内" }],
        threatObjects: [{ max: 500, message: "长度在 500 个字符以内" }],
        mainSigns: [{ max: 500, message: "长度在 500 个字符以内" }],
        mainMethods: [{ max: 500, message: "长度在 500 个字符以内" }],
        forcastBasis: [{ max: 1000, message: "长度在 1000 个字符以内" }],
        hedgingPlace: [{ max: 200, message: "长度在 200 个字符以内" }],
        alarmSign: [{ max: 200, message: "长度在 200 个字符以内" }],
        route: [{ max: 200, message: "长度在 200 个字符以内" }],
        publisher: [{ max: 100, message: "长度在 100 个字符以内" }],
        dutyPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        rescueCoName: [
          { max: 50, message: "长度在 500 个字符以内" },
          {
            required: true,
            message: "抢排险单位名称不能为空",
            trigger: "blur"
          }
        ],
        rescueCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        rescueCoPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        safetyCoName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "治安保卫单位名称不能为空",
            trigger: "blur"
          }
        ],
        safetyCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        safetyCoPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        medicalCoName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "医疗救护单位名称不能为空",
            trigger: "blur"
          }
        ],
        medicalCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        medicalPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        sentCoName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "本卡发放单位名称不能为空",
            trigger: "blur"
          }
        ],
        sentCoPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        sentCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        holder: [{ max: 100, message: "长度在 100 个字符以内" }],
        holderPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        code: [
          { max: 12, message: "长度在 12 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点编号不能为空"
          }
        ]
      },
      formData: {
        predisposFactor: "",
        threatObjects: "",
        mainSigns: "",
        mainMethods: "",
        forcastBasis: "",
        hedgingPlace: "",
        alarmSign: "",
        route: "",
        publisher: "",
        dutyPhone: "",
        rescueCoName: "",
        rescueCoPrincipal: "",
        rescueCoPhone: "",
        safetyCoName: "",
        safetyCoPrincipal: "",
        safetyCoPhone: "",
        medicalCoName: "",
        medicalCoPrincipal: "",
        medicalPhone: "",
        sentCoName: "",
        sentCoPrincipal: "",
        sentCoPhone: "",
        sentTime: "",
        holder: "",
        holderPhone: "",
        holdTime: "",
        site: {
          disasterTypeCode: "",
          name: "",
          developmentTrendCode: "",
          townCode: "",
          village: "",
          group: "",
          location: "",
          longitude: 0,
          latitude: 0,
          yaw: 0,
          isCanceled: true,
          cancelTime: "",
          cancelReason: "",
          disasterScale: 0,
          disasterScaleLevel: 0,
          threatProperty: 0,
          threatHouses: 0,
          threatPeople: 0,
          preventOwnerName: "",
          preventOwnerPhone: "",
          monitorOwnerName: "",
          monitorOwnerPhone: "",
          monitorName: "",
          monitorPhone: "",
          code: "",
          countryApproval: "",
          countryComment: "",
          countryApprovalTime: "",
          cityApproval: "",
          cityComment: "",
          cityApprovalTime: "",
          adminCode: "",
          admin: {
            province: "",
            city: "",
            country: "",
            town: ""
          },
          status: 0,
          id: 0
        },
        processes: [],
        code: "",
        countryApproval: "",
        countryComment: "",
        countryApprovalTime: "",
        cityApproval: "",
        cityComment: "",
        cityApprovalTime: "",
        adminCode: "",
        admin: {
          province: "",
          city: "",
          country: "",
          town: ""
        },
        status: 0,
        id: 0
      },
      disabled: true,
      canEdit: false
    };
  },
  computed: {
    proccessActive() {
      return this.formData.processes
        ? this.formData.processes.length
        : undefined;
    },
    isShowAudit() {
      return !this.canEdit ? (this.proccessActive ? true : false) : false;
    },
    formType() {
      return this.$route.meta.formType;
    }
  },
  created() {
    let api;
    if (this.formType == "create") {
      this.disabled = false;
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/workCard/edit";
      this.disabled = false;
      this.canEdit = false;
    } else {
      api = "querypage/workCard/getById";
      this.disabled = true;
      this.canEdit = false;
    }
    if (this.formType != "create" && !this.isFromQuery) {
      this.$store.dispatch(api, this.$route.query.id).then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
    } else if (this.isFromQuery) {
      this.formData = this.codeData;
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["geodisasterPreventionWorkCard"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveForm() {
      this.$refs["geodisasterPreventionWorkCard"].validate(async valid => {
        if (valid) {
          if (this.formData.site.code) {
            // 新增
            if (this.formType == "create") {
              let flag;
              flag = await this.$store
                .dispatch("report/workCard/create", this.formData)
                .then(async res => {
                  flag = await this.$util.addSaveConfirm(res.data.success);
                  if (!flag) {
                    this.formData.site = {
                      code: "",
                      admin: {}
                    };
                    this.formData.code = "";
                  }
                });
              // 编辑
            } else {
              this.$store
                .dispatch("report/workCard/update", this.formData)
                .then(res => {
                  this.$util.editSaveMessage(res.data.success);
                });
            }
          } else {
            this.$message({
              type: "info",
              message: "保存不成功"
            });
            return false;
          }
        } else {
          this.$message.error("验证未通过");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
