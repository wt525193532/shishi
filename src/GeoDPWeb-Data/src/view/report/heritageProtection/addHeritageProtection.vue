<template>
  <div>
    <heritageProtectionForm
      :formData="formData"
      :btnExcuteFunc="save"
      :disabled="disabled"
      :canEdit="true"
    />
  </div>
</template>

<script>
import heritageProtectionForm from "@/view/components/heritageProtectionForm.vue";

export default {
  name: "AddHeritageProtection",
  components: { heritageProtectionForm },
  data() {
    return {
      disabled: false,
      isdisabled: null,
      formData: {
        adminCode: "string",
        status: 0,
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
        attachments: [],
        id: 0
      }
    };
  },
  computed: {
    adminCode() {
      return this.$store.getters.area.adminCode;
    }
  },
  methods: {
    async save() {
      let r;
      r = await this.$store
        .dispatch("report/heritageProtection/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          // console.log("fu-r", this.isdisabled);
          return r;
        });
      console.log("r", r);
      return r;
    }
    // showDisabled(v) {
    //   this.isdisabled = v;
    // }
    // handleClose() {
    //   this.creatDialogVisible = false;
    // },
    // creatCode() {
    //   if (!this.formData.site.disasterTypeCode) {
    //     this.$message.warning("请选择一个矿山类型！");
    //   } else {
    //     const parms = {
    //       country: this.townList.adminCode,
    //       disasterType: this.formData.site.disasterTypeCode
    //     };
    //     this.$store
    //       .dispatch("report/basicInfo/generateGeositeCode", parms)
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
