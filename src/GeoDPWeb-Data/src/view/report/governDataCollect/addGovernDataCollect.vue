<template>
  <div>
    <governDataCollectForm
      :formData="formData"
      :townList="townList"
      :btnExcuteFunc="save"
      type="add"
    />
  </div>
</template>

<script>
import governDataCollectForm from "@/view/components/governDataCollectForm.vue";

export default {
  name: "AddBasicInfo",
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
      },
      townList: {}
    };
  },
  computed: {
    adminCode() {
      return this.$store.getters.area.adminCode;
    }
  },
  mounted() {},
  methods: {
    async save() {
      let r;
      await this.$store
        .dispatch("report/governDataCollect/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          return r;
        });
      return r;
      // this.$store
      //   .dispatch("report/governDataCollect/create", this.formData)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.$confirm("保存成功, 是否继续填写?", "提示", {
      //         confirmButtonText: "退出",
      //         cancelButtonText: "继续",
      //         type: "warning"
      //       })
      //         .then(() => {
      //           this.$router.go(-1);
      //           this.$message({
      //             type: "success",
      //             message: "保存成功!"
      //           });
      //           // location.reload();
      //           // this.$router.push({ name: "report.addBasicInfo" });
      //         })
      //         .catch(() => {
      //           this.$message({
      //             type: "success",
      //             message: "保存成功!"
      //           });
      //         });
      //     } else {
      //       this.$message({
      //         type: "info",
      //         message: "保存不成功，验证未通过"
      //       });
      //     }
      //   });
    },
    handleClose() {
      this.creatDialogVisible = false;
    }
    // creatCode() {
    //   if (!this.formData.site.disasterTypeCode) {
    //     this.$message.warning("请选择一个矿山类型！");
    //   } else {
    //     const parms = {
    //       country: this.townList.adminCode,
    //       disasterType: this.formData.site.disasterTypeCode
    //     };
    //     this.$store
    //       .dispatch("report/governDataCollect/generateGeositeCode", parms)
    //       .then(res => {
    //         this.formData.site.code = res.data.result;
    //         this.formData.code = res.data.result;
    //       });
    //   }
    // }
  }
};
</script>

<style lang="less"></style>
