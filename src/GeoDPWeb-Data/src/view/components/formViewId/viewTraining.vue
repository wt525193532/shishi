<template>
  <div>
    <div class="clearfix">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#trainingPrint'"
        >打印表单</el-button
      >
    </div>
    <training-form
      id="trainingPrint"
      :formData="formData"
      disabled
      :canEdit="false"
    />
  </div>
</template>

<script>
import trainingForm from "@/view/components/trainingForm.vue";
export default {
  name: "ViewTraining",
  components: {
    trainingForm
  },
  data() {
    return {
      formData: {
        cityName: "",
        countryName: "",
        trainTownCount: 0,
        trainTime: 0,
        trainPeoCount: 0,
        prevenName: "",
        disasterName: "",
        massesCount: 0,
        expertCount: 0,
        propagandaCount: 0,
        propagandaPeople: 0,
        trainPicture: 0,
        trainManual: 0,
        otherMaterials: 0,
        reportDate: "",
        actDate: "",
        actTimes: 0,
        actPersonsCount: 0,
        remark: "",
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
      .dispatch("report/training/getById", this.$route.query.id)
      .then(res => {
        if (res.success) {
          this.formData = res.result;
        }
      });
  }
};
</script>

<style lang="less"></style>
