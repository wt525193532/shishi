<template>
  <div>
    <div class="clearfix">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#basicInfoPrint'"
        >打印表单</el-button
      >
    </div>
    <basicinfo-form
      id="basicInfoPrint"
      :formData="formData"
      :canEdit="false"
      :isDisabled="false"
    />
  </div>
</template>

<script>
import basicinfoForm from "@/view/components/basicinfoForm.vue";

export default {
  name: "ViewBasicInfo",
  components: { basicinfoForm },
  data() {
    return {
      formData: {
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
        discoveryDate: "",
        isTransferred: true,
        disasterLevelCode: "",
        isProvincial: true,
        isThreateOldOrWeak: true,
        hasPlan: true,
        hasBuiltCards: true,
        hasBuiltAlarmNet: true,
        drillDate: "",
        isTrained: true,
        isPublished: true,
        isRelocated: true,
        isRemediated: true,
        projectProgressCode: "",
        isEliminated: true,
        firstReportDate: "",
        reportedYears: undefined,
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
        attachments: [
          {
            key: "",
            name: "",
            displayName: "",
            tag: "",
            extension: "",
            url: "",
            id: 0
          }
        ],
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
        reporterName: "",
        reportUnitName: "",
        reportTime: null,
        status: 0,
        id: 0
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("querypage/basicInfo/getById", this.$route.query.id)
      .then(res => {
        if (res.success) {
          this.formData = res.result;
          if (this.formData.preventOwner == null) {
            this.formData.preventOwner = {
              personClass: 10,
              orgUnitId: 0,
              name: "",
              phone: "",
              jobPost: "",
              idNumber: "",
              sex: "",
              id: 0
            };
          }
          if (this.formData.monitorOwner == null) {
            this.formData.monitorOwner = {
              personClass: 10,
              orgUnitId: 0,
              name: "",
              phone: "",
              jobPost: "",
              idNumber: "",
              sex: "",
              id: 0
            };
          }
          if (this.formData.monitor == []) {
            this.formData.monitor = [
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
            ];
          }
        }
      });
  }
};
</script>
