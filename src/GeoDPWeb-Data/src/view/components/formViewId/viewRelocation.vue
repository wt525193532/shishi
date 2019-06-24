<template>
  <div>
    <relocation-form
      :disabled="disabled"
      :formData="formData"
    ></relocation-form>
  </div>
</template>

<script>
import relocationForm from "@/view/components/relocationForm";
export default {
  name: "ViewRelocation",
  components: { relocationForm },
  data() {
    return {
      disabled: true,
      formData: {
        historyDate: "",
        stabilityAnalysis: "",
        featureMovements: "",
        geoEnvironment: "",
        primingFactors: "",
        potentialHazard: "",
        statusForecast: "",
        monitorMethods: "",
        monitorCycle: "",
        alarmMethods: "",
        alarmSignal: "",
        alarmPerson: "",
        alarmPhone: "",
        refuge: "",
        route: "",
        preventSuggests: "",
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
  computed: {},
  mounted() {
    this.$store
      .dispatch("querypage/relocation/getById", this.$route.query.id)
      .then(res => {
        if (res.success) {
          this.formData = res.result;
        }
      });
  }
};
</script>

<style lang="less"></style>
