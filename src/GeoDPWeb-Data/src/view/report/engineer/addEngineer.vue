<template>
  <div>
    <engineer-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="save"
      :canEdit="true"
    />
  </div>
</template>

<script>
import engineerForm from "@/view/components/engineerForm";

export default {
  name: "AddEngineer",
  data() {
    return {
      disabled: false,
      formData: {
        projectName: "",
        longitude: 0,
        latitude: 0,
        period: "",
        location: "",
        designStartTime: "",
        designEndTime: "",
        tenderStartTime: "",
        tenderEndTime: "",
        buildStartTime: "",
        buildEndTime: "",
        primaryAcceptanceTime: "",
        finalStartTime: "",
        finalEndTime: "",
        provinceTaskNumber: "",
        isPovertyProject: true,
        assessmentYear: 0,
        regulatoryUnit: "",
        buildUnit: "",
        mainTask: "",
        taskSentTime: "",
        estimatedFinishTime: "",
        surveyUnit: "",
        designUnit: "",
        supervisoryUnit: "",
        supervisoryPerson: "",
        supervisoryPersonPhone: "",
        foundationUnit: "",
        foundationPerson: "",
        foundationPersonPhone: "",
        budgetFunds: 0,
        sentFunds: 0,
        centralFinancialFunds: 0,
        finalAccounts: 0,
        remark: "",
        attachments: [],
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
  components: { engineerForm },
  computed: {},
  methods: {
    async save() {
      let r;
      r = await this.$store
        .dispatch("report/engineer/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          if (!r) {
            this.formData.site = {
              code: "",
              admin: {}
            };
            this.formData.code = "";
          }
          return r;
        });
      return r;
    }
  }
};
</script>

<style lang="less"></style>
