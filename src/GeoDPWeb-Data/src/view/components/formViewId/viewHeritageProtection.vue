<template>
  <div>
    <div class="clearfix">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#heritageProtectionPrint'"
        >打印表单</el-button
      >
    </div>
    <heritageProtectionForm
      id="heritageProtectionPrint"
      :formData="formData"
      :disabled="disabled"
      :btnExcuteFunc="view"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import heritageProtectionForm from "@/view/components/heritageProtectionForm";

export default {
  name: "ViewHeritageProtection",
  components: { heritageProtectionForm },
  data() {
    return {
      disabled: true,
      formData: {
        projectName: "",
        implementUnit: "",
        taskBook: "",
        governNumber: 0,
        releaseDate: "",
        fundDoc: "",
        centralFunds: 0,
        provinceFunds: 0,
        finalFunds: 0,
        taskDate: "",
        designStartDate: "",
        designEndDate: "",
        tenderStartDate: "",
        tenderEndDate: "",
        constructStartDate: "",
        constructEndDate: "",
        firstAcceptanceDate: "",
        finalAcceptanceApplyDate: "",
        finalAcceptanceEndDate: "",
        description: "",
        remark: "",
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
      .dispatch("querypage/heritageProtection/getById", this.$route.query.id)
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
