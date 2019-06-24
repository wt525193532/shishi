<template>
  <basicinfo-form :formData="formData" disabled :canEdit="false" />
</template>

<script>
import basicinfoForm from "@/view/components/basicinfoForm.vue";

export default {
  name: "QueryViewBasicInfo",
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
        reportedYears: 0,
        remark: "",
        predisposeFactors: [""],
        threatObjects: [""],
        transferredIndustries: [""],
        monitoringMethods: [""],
        alarmMethods: [""],
        preventeSuggests: [""],
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
        status: 0,
        id: 0
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("querypage/basicInfo/getById", this.$route.query.id)
      .then(data => {
        this.formData = data.result;
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
      });
  }
};
</script>

<style lang="less"></style>
