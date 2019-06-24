<template>
  <div>
    <eliminate-danger-form :disabled="disabled" :formData="formData" />
  </div>
</template>

<script>
import eliminateDangerForm from "@/view/components/eliminateDangerForm";

export default {
  name: "ViewEliminateDanger",
  components: { eliminateDangerForm },
  data() {
    return {
      disabled: true,
      formData: {
        provinceTaskNumber: "",
        buildYear: 0,
        isPovertyProject: true,
        povertyYear: 0,
        buildTask: "",
        mainMeasures: "",
        features: "",
        structure: "",
        info: "",
        totalMonths: 0,
        startTime: "",
        finishTime: "",
        budgetFunds: 0,
        finalAccounts: 0,
        finalAcceptanceTime: "",
        acceptanceUnit: "",
        acceptanceMainPersons: "",
        acceptanceOptions: "",
        buildUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "1",
          owner: "",
          ownerPhone: "",
          id: 1
        },
        surveyUnit: {
          elminateInfoId: 0,
          unitType: 20,
          name: "1",
          owner: "",
          ownerPhone: "",
          id: 5
        },
        designUnit: {
          elminateInfoId: 0,
          unitType: 30,
          name: "1",
          owner: "",
          ownerPhone: "",
          id: 3
        },
        constructionUnit: {
          elminateInfoId: 0,
          unitType: 40,
          name: "1",
          owner: "",
          ownerPhone: "",
          id: 2
        },
        supervisoryUnit: {
          elminateInfoId: 0,
          unitType: 50,
          name: "1",
          owner: "",
          ownerPhone: "",
          id: 4
        },
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
      }
    };
  },
  computed: {},
  mounted() {
    this.$store
      .dispatch("querypage/eliminateDanger/getById", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
          if (this.formData.processes == []) {
            this.formData.processes = [
              {
                node: {
                  flowID: 0,
                  name: "",
                  preNodeID: 0,
                  nextNodeID: 0,
                  id: 0
                },
                formId: 0,
                handler: {
                  userName: "",
                  name: "",
                  id: 0
                },
                handleTime: "",
                opinion: 0,
                type: 0,
                comment: ""
              }
            ];
          }
          if (this.formData.buildUnit == null) {
            this.formData.buildUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.surveyUnit == null) {
            this.formData.surveyUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.designUnit == null) {
            this.formData.designUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.constructionUnit == null) {
            this.formData.constructionUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.supervisoryUnit == null) {
            this.formData.supervisoryUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
        }
      });
  }
};
</script>

<style lang="less"></style>
