<template>
  <div>
    <work-card-form :disabled="disabled" :formData="formData"></work-card-form>
  </div>
</template>

<script>
import workCardForm from "@/view/components/workCardForm";
export default {
  name: "ViewWorkCard",
  data() {
    return {
      disabled: true,
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
        processes: [
          {
            node: {
              flowID: 0,
              name: "",
              preNodeID: 0,
              nextNodeID: 0,
              id: 0
            },
            formId: 0,
            handler: {
              userName: "",
              name: "",
              id: 0
            },
            handleTime: "",
            opinion: 0,
            type: 0,
            comment: ""
          }
        ],
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
  mounted() {
    this.$store
      .dispatch("querypage/workCard/getById", this.$route.query.id)
      .then(res => {
        if (res.success) {
          this.formData = res.result;
        }
      });
  },

  components: { workCardForm }
};
</script>

<style lang="less"></style>
