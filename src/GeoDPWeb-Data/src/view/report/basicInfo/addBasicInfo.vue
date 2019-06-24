<template>
  <div v-loading.lock="loading">
    <basicinfo-form
      :formData="formData"
      :townList="townList"
      :countryList="countryList"
      :creatCode="creatCode"
      :btnExcuteFunc="save"
      :canEdit="true"
      :isDisabled="true"
      :countryChange="countryChange"
    />
  </div>
</template>

<script>
import basicinfoForm from "@/view/components/basicinfoForm.vue";

export default {
  name: "AddBasicInfo",
  components: { basicinfoForm },
  data() {
    return {
      formData: {
        disasterScale: undefined,
        disasterScaleLevel: undefined,
        threatProperty: undefined,
        threatHouses: undefined,
        threatPeople: undefined,
        discoveryDate: "",
        isTransferred: false,
        disasterLevelCode: "",
        isProvincial: false,
        isThreateOldOrWeak: false,
        hasPlan: false,
        hasBuiltCards: false,
        hasBuiltAlarmNet: false,
        drillDate: "",
        isTrained: false,
        isPublished: false,
        isRelocated: false,
        isRemediated: false,
        projectProgressCode: "",
        isEliminated: false,
        firstReportDate: "",
        reportedYears: 0,
        remark: "",
        predisposeFactors: [],
        threatObjects: [],
        transferredIndustries: [],
        monitoringMethods: [],
        alarmMethods: [],
        preventeSuggests: [],
        preventOwner: {
          personClass: 10,
          orgUnitId: 0,
          name: "",
          phone: "",
          jobPost: "",
          idNumber: "",
          sex: "",
          id: 0
        },
        monitorOwner: {
          personClass: 10,
          orgUnitId: 0,
          name: "",
          phone: "",
          jobPost: "",
          idNumber: "",
          sex: "",
          id: 0
        },
        monitor: [
          {
            personClass: 10,
            orgUnitId: 0,
            name: "",
            phone: "",
            jobPost: "",
            idNumber: "",
            sex: "",
            id: 0
          }
        ],
        attachments: [],

        admin: {},
        disasterTypeCode: "",
        name: "",
        developmentTrendCode: "",
        townCode: "",
        village: "",
        group: "",
        location: "",
        longitude: undefined,
        latitude: undefined,
        yaw: undefined,
        isCanceled: false,
        canceleTime: "",
        cancelReason: "",
        reporterName: "",
        reportUnitName: "",
        reportTime: null,
        code: "",
        id: 0
      },
      townList: {},
      countryList: {},
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.area;
    }
  },
  mounted() {
    this.$store
      .dispatch("report/basicInfo/getAdministrative", this.user.adminCode)
      .then(res => {
        if (this.user.level >= 3) {
          this.townList = res.data.result;
        } else {
          this.countryList = res.data.result;
        }
      });
  },
  methods: {
    // 区县变化触发
    countryChange(code) {
      this.loading = true;
      this.formData.townCode = "";
      this.$store
        .dispatch("organization/getAdministrative", code)
        .then(res => {
          this.townList = res;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    async save() {
      let r;
      await this.$store
        .dispatch("report/basicInfo/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          if (!r) {
            this.formData.code = "";
          }
          return r;
        });
      return r;
    },
    handleClose() {
      this.creatDialogVisible = false;
    },
    creatCode() {
      if (!this.formData.disasterTypeCode) {
        this.$message.warning("请选择一个隐患点类型！");
      } else {
        let parms = {
          country: this.user.adminCode,
          disasterType: this.formData.disasterTypeCode
        };
        if (this.user.level < 3 && !this.formData.admin.countryCode) {
          this.$message.warning("请选择区县！");
          return;
        } else if (this.formData.admin.countryCode) {
          parms.country = this.formData.admin.countryCode;
        }
        this.$store
          .dispatch("report/basicInfo/generateGeositeCode", parms)
          .then(res => {
            this.formData.code = res.data.result;
          });
      }
    }
  }
};
</script>

<style lang="less"></style>
