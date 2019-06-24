<template>
  <div>
    <mine-information-form
      :formData="formData"
      :btnExcuteFunc="edit"
      :townList="townList"
      :canEdit="true"
    />
  </div>
</template>

<script>
// import util from "@/lib/util";
import mineInformationForm from "@/view/components/mineInformationForm.vue";

export default {
  name: "EditMineInformationForm",
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
      },
      townList: {}
    };
  },
  computed: {
    adminCode() {
      return this.$store.getters.area.adminCode;
    }
  },
  mounted() {
    this.$store
      .dispatch("report/mineInformation/getAdministrative", this.adminCode)
      .then(res => {
        this.townList = res.data.result;
      });
    this.$store
      .dispatch("report/mineInformation/edit", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    edit() {
      this.$store
        .dispatch("report/mineInformation/update", this.formData)
        .then(res => {
          // console.log(res);

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
