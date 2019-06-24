<template>
  <div>
    <risk-card-form :disabled="disabled" :formData="formData" />
  </div>
</template>

<script>
import riskCardForm from "@/view/components/riskCardForm";
export default {
  name: "ViewRiskCard",
  data() {
    return {
      disabled: true,
      formData: {
        admin: { province: null, city: null, country: null, town: null },
        adminCode: null,
        attentionItems: "",
        cityApproval: null,
        cityApprovalTime: null,
        cityComment: null,
        code: "",
        countryApproval: null,
        countryApprovalTime: null,
        countryComment: null,
        evacuationRoute: null,
        familyMemberCount: 1,
        familyMembers: [],
        forcastSignal: "",
        forcaster: "",
        forcasterPhone: "",
        houseAddress: "",
        houseHoldName: "",
        houseHoldPhone: "",
        houseType: "",
        id: 0,
        locationRelation: "",
        predisposFactor: "",
        processes: [],
        rescueCoName: "",
        rescueCoPhone: "",
        rescueCoPrincipal: "",
        resettleCoName: "",
        resettleCoPhone: "",
        resettleCoPrincipal: "",
        sentCoName: "",
        sentCoPrincipal: null,
        sentColPhone: null,
        signTime: null,
        site: {
          admin: {
            province: "",
            city: "",
            country: "",
            town: ""
          },
          adminCode: "",
          cancelReason: null,
          cancelTime: null,
          cityApproval: null,
          cityApprovalTime: null,
          cityComment: null,
          code: "",
          countryApproval: null,
          countryApprovalTime: null,
          countryComment: null,
          developmentTrendCode: null,
          disasterScale: 0,
          disasterScaleLevel: 0,
          disasterTypeCode: "",
          group: null,
          id: 0,
          isCanceled: false,
          latitude: null,
          location: "",
          longitude: null,
          monitorName: null,
          monitorOwnerName: null,
          monitorOwnerPhone: null,
          monitorPhone: null,
          name: "",
          preventOwnerName: null,
          preventOwnerPhone: null,
          status: null,
          threatHouses: null,
          threatPeople: null,
          threatProperty: null,
          townCode: "",
          village: "",
          yaw: null
        },
        status: null
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("querypage/riskCard/getById", this.$route.query.id)
      .then(res => {
        console.log(res);
        if (res.success) {
          this.formData = res.result;
        }
      });
  },

  components: { riskCardForm }
};
</script>

<style lang="less"></style>
