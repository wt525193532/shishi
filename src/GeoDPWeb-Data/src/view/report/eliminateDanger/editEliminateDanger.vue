<template>
  <div>
    <eliminate-danger-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="edit"
    />
  </div>
</template>

<script>
import eliminateDangerForm from "@/view/components/eliminateDangerForm";

export default {
  name: "EditEliminateDanger",
  components: { eliminateDangerForm },
  data() {
    return {
      disabled: false,
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
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        surveyUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        designUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        constructionUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        supervisoryUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
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
        processes: [
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
  computed: {},
  mounted() {
    this.$store
      .dispatch("report/eliminateDanger/edit", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    edit() {
      this.$store
        .dispatch("report/eliminateDanger/update", this.formData)
        .then(res => {
          this.$util.editSaveMessage(res.data.success);
        });
    }
  }
};
</script>

<style lang="less"></style>
