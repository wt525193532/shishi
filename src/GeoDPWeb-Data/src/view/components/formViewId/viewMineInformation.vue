<template>
  <mine-information-form :formData="formData" :canEdit="false" disabled />
</template>

<script>
import mineInformationForm from "@/view/components/mineInformationForm.vue";
export default {
  name: "ViewMineInformation",
  components: { mineInformationForm },
  data() {
    return {
      formData: {
        code: "",
        name: "",
        kaicaikzdm: "",
        xkz: "",
        fzjg: "",
        yxqx: "",
        ssqx: "",
        weizhi: "",
        fanwei: "",
        area: 0,
        kczt: "",
        scgm: "",
        kqgm: "",
        dzhjgk: "",
        dzzhfyqk: "",
        bzj: "",
        fhzlqk: "",
        remark: "",
        lon: undefined,
        lat: undefined,
        isLVSE: true,
        isGUOJIA: true,
        isZHUANYE: null,
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
        id: 0
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("querypage/mineInformation/getById", this.$route.query.id)
      .then(res => {
        this.formData = res.result;
      });
  }
};
</script>

<style lang="less"></style>
