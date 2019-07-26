<template>
  <div>
    <mine-Information-form
      :formData="formData"
      :townList="townList"
      :btnExcuteFunc="save"
      :creatCode="creatCode"
      :canEdit="true"
    />
  </div>
</template>

<script>
import mineInformationForm from "@/view/components/mineInformationForm.vue";

export default {
  name: "AddMineInformationForm",
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
        hjyxpg: "",
        fhzlqk: "",
        remark: "",
        lon: undefined,
        lat: undefined,
        isLVSE: true,
        isGUOJIA: true,
        isZHUANYE: true,
        attachments: [],
        id: 0
      },
      townList: {}
    };
  },
  computed: {
    adminCode() {
      return this.$store.getters.area.adminCode;
    },
    myssqx() {
      return this.$store.getters.area.level == 3 ? this.displayName : "";
    },
    area() {
      return this.$store.getters.area;
    },
    displayName() {
      return this.$store.getters.area.displayName;
    }
  },
  mounted() {
    this.$store
      .dispatch("report/mineInformation/getAdministrative", this.adminCode)
      .then(res => {
        this.townList = res.data.result;
      });

    this.formData.ssqx = this.myssqx;
  },
  methods: {
    save() {
      this.$store
        .dispatch("report/mineInformation/create", this.formData)
        .then(res => {
          if (res.data.success) {
            this.$confirm("保存成功, 是否继续填写?", "提示", {
              confirmButtonText: "继续",
              cancelButtonText: "退出",
              type: "warning"
            })
              .then(() => {
                this.formData.code = "";
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                // location.reload();
                // this.$router.push({ name: "report.addmineInformation" });
              })
              .catch(() => {
                this.$router.go(-1);
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
              });
          } else {
            this.$message({
              type: "info",
              message: "保存不成功，验证未通过"
            });
          }
        });
    },
    handleClose() {
      this.creatDialogVisible = false;
    },
    creatCode() {
      this.$store
        .dispatch("report/mineInformation/generateGeositeCode")
        .then(res => {
          this.formData.code = res.data.result;
        });
    }
  }
};
</script>

<style lang="less"></style>
