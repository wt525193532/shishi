<template>
  <div>
    <div class="clearfix">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#governDataCollectPrint'"
        >打印表单</el-button
      >
    </div>
    <govern-data-collect-form
      id="governDataCollectPrint"
      :formData="formData"
      disabled
      type="view"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import governDataCollectForm from "@/view/components/governDataCollectForm";

export default {
  name: "ViewGovernDataCollect",
  components: { governDataCollectForm },
  data() {
    return {
      formData: {
        projectName: "",
        supervisionUnit: "",
        implementUnit: "",
        taskBook: "",
        releaseDate: "",
        fundDoc: "",
        centralFunds: 0,
        provinceFunds: 0,
        taskDate: "",
        constructEndDate: "",
        constructPlanDate: "",
        firstAcceptanceDate: "",
        finalAcceptanceDocDate: "",
        finalAcceptanceEndDate: "",
        constructEstimateDate: "",
        remark: "",
        designStartDate: "",
        designEndDate: "",
        tenderStartDate: "",
        tenderEndDate: "",
        implementStartDate: "",
        implementEndDate: "",
        applyFinalAcceptanceDate: "",
        finalFunds: 0,
        governNumber: "",
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
      .dispatch("querypage/governDataCollect/getById", this.$route.query.id)
      .then(res => {
        if (res.data) {
          this.formData = res.data.result;
        }
      });
  }
};
</script>

<style lang="less"></style>
