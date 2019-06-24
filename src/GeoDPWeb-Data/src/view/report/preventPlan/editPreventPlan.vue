<template>
  <div>
    <prevent-plan-form
      :formData="formData"
      :btnExcuteFunc="edit"
      :disabled="false"
      :canEdit="false"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import preventPlanForm from "@/view/components/preventPlanForm";

export default {
  name: "EditPreventPlan",
  components: { preventPlanForm },
  data() {
    return {
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
        status: 0,
        id: 0,
        code: ""
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("report/preventPlan/edit", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    edit() {
      this.$store
        .dispatch("report/preventPlan/update", this.formData)
        .then(res => {
          this.$util.editSaveMessage(res.data.success);
        });
    }
  }
};
</script>

<style lang="less"></style>
