<template>
  <div>
    <ssjcyj-form
      :formData="formData"
      :townList="townList"
      :btnExcuteFunc="save"
      :canEdit="true"
    />
  </div>
</template>

<script>
import ssjcyjForm from "@/view/components/ssjcyjForm";

export default {
  name: "AddMineInformationForm",
  components: { ssjcyjForm },
  data() {
    return {
      formData: {
        code: "",
        name: "",
        kaicaikzdm: "",
        xkz: "",
        monitor: [
          {
            personClass: 10,
            orgUnitId: 0,
            name: "",
            phone: "",
            jobPost: "",
            idNumber: "",
            sex: "",
            id: 0
          }
        ],
        site: {
          disasterTypeCode: "",
          name: "",
          developmentTrendCode: "",
          townCode: "",
          village: "",
          group: "",
          location: "",
          longitude: 0,
          latitude: 0,
          yaw: 0,
          isCanceled: true,
          cancelTime: "",
          cancelReason: "",
          disasterScale: 0,
          disasterScaleLevel: 0,
          threatProperty: 0,
          threatHouses: 0,
          threatPeople: 0,
          preventOwnerName: "",
          preventOwnerPhone: "",
          monitorOwnerName: "",
          monitorOwnerPhone: "",
          monitorName: "",
          monitorPhone: "",
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
          status: 0,
          id: 0
        },
        predisposeFactors: [],
        threatObjects: [],
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
      //   this.$store
      //     .dispatch("report/mineInformation/create", this.formData)
      //     .then(res => {
      //       if (res.data.success) {
      //         this.$confirm("保存成功, 是否继续填写?", "提示", {
      //           confirmButtonText: "继续",
      //           cancelButtonText: "退出",
      //           type: "warning"
      //         })
      //           .then(() => {
      //             this.formData.code = "";
      //             this.$message({
      //               type: "success",
      //               message: "保存成功!"
      //             });
      //             // location.reload();
      //             // this.$router.push({ name: "report.addmineInformation" });
      //           })
      //           .catch(() => {
      //             this.$router.go(-1);
      //             this.$message({
      //               type: "success",
      //               message: "保存成功!"
      //             });
      //           });
      //       } else {
      //         this.$message({
      //           type: "info",
      //           message: "保存不成功，验证未通过"
      //         });
      //       }
      //     });
    }
  }
};
</script>

<style lang="less"></style>
