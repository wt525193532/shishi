<template>
  <div>
    <governDataCollectForm
      :formData="formData"
      type="edit"
      :btnExcuteFunc="edit"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import governDataCollectForm from "@/view/components/governDataCollectForm";
import { debug } from "util";

export default {
  name: "EditRuinDataCollect",
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
        attachments: [],
        adminCode: "",
        status: 0,
        countryApproval: "",
        countryComment: "",
        countryApprovalTime: "",
        cityApproval: "",
        cityComment: "",
        cityApprovalTime: "",
        id: 0
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("report/governDataCollect/getById", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    edit() {
      debug;
      this.$store
        .dispatch("report/governDataCollect/update", this.formData)
        .then(res => {
          if (res.data.success) {
            this.$router.go(-1);
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: "保存不成功，验证未通过"
            });
          }
        });
    }
  }
};
</script>

<style lang="less"></style>
