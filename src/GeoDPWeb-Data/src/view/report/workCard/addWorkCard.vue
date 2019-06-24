<template>
  <div>
    <work-card-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="save"
      :canEdit="true"
    ></work-card-form>
  </div>
</template>

<script>
import workCardForm from "@/view/components/workCardForm";
export default {
  name: "AddWorkCard",
  data() {
    return {
      disabled: false,
      formData: {
        predisposFactor: "",
        threatObjects: "",
        mainSigns: "",
        mainMethods: "",
        forcastBasis: "",
        hedgingPlace: "",
        alarmSign: "",
        route: "",
        publisher: "",
        dutyPhone: "",
        rescueCoName: "",
        rescueCoPrincipal: "",
        rescueCoPhone: "",
        safetyCoName: "",
        safetyCoPrincipal: "",
        safetyCoPhone: "",
        medicalCoName: "",
        medicalCoPrincipal: "",
        medicalPhone: "",
        sentCoName: "",
        sentCoPrincipal: "",
        sentCoPhone: "",
        sentTime: "",
        holder: "",
        holderPhone: "",
        holdTime: "",
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
        processes: [],
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
      }
    };
  },
  methods: {
    async save() {
      let r;
      r = await this.$store
        .dispatch("report/workCard/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          if (!r) {
            this.formData.site = {
              code: "",
              admin: {}
            };
            this.formData.code = "";
          }
          return r;
        });
      return r;
    }
  },
  components: { workCardForm }
};
</script>

<style lang="less"></style>
