<template>
  <div>
    <engineer-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="view"
    />
  </div>
</template>

<script>
import engineerForm from "@/view/components/engineerForm";

export default {
  name: "ViewEngineer",
  data() {
    return {
      disabled: true,
      formData: {
        projectName: "",
        longitude: 103.676389,
        latitude: 31.145,
        period: "",
        location: "",
        designStartTime: "",
        designEndTime: "",
        tenderStartTime: "",
        tenderEndTime: "",
        buildStartTime: "",
        buildEndTime: "",
        primaryAcceptanceTime: "",
        finalStartTime: null,
        finalEndTime: null,
        provinceTaskNumber: "",
        isPovertyProject: false,
        assessmentYear: 0,
        regulatoryUnit: "",
        buildUnit: "",
        mainTask: "",
        taskSentTime: null,
        estimatedFinishTime: null,
        surveyUnit: null,
        designUnit: "",
        supervisoryUnit: null,
        supervisoryPerson: null,
        supervisoryPersonPhone: null,
        foundationUnit: "",
        foundationPerson: null,
        foundationPersonPhone: null,
        budgetFunds: null,
        sentFunds: 0,
        centralFinancialFunds: 0,
        finalAccounts: 0,
        remark: null,
        attachments: [],
        site: {
          disasterTypeCode: "",
          name: "",
          developmentTrendCode: null,
          townCode: "",
          village: "",
          group: "",
          location: "",
          longitude: null,
          latitude: null,
          yaw: null,
          isCanceled: false,
          cancelTime: null,
          cancelReason: null,
          disasterScale: null,
          disasterScaleLevel: null,
          threatProperty: null,
          threatHouses: null,
          threatPeople: null,
          preventOwnerName: null,
          preventOwnerPhone: null,
          monitorOwnerName: null,
          monitorOwnerPhone: null,
          monitorName: null,
          monitorPhone: null,
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
          status: null,
          id: null
        },
        processes: [],
        code: "",
        countryApproval: null,
        countryComment: null,
        countryApprovalTime: null,
        cityApproval: null,
        cityComment: null,
        cityApprovalTime: null,
        adminCode: null,
        admin: {
          province: null,
          city: null,
          country: null,
          town: null
        },
        status: null,
        id: null
      }
    };
  },
  components: { engineerForm },
  computed: {},
  mounted() {
    this.$store
      .dispatch("querypage/engineer/getById", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    view() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less"></style>
