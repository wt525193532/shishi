<template>
  <div>
    <prevent-plan-form
      ref="AddPreventPlan"
      :formData="formData"
      :btnExcuteFunc="save"
      :disabled="false"
      :canEdit="true"
    />
  </div>
</template>

<script>
import preventPlanForm from "@/view/components/preventPlanForm";

export default {
  name: "AddPreventPlan",
  components: {
    preventPlanForm
  },
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
        code: "",
        status: 0
      }
    };
  },
  methods: {
    async save() {
      let r;
      r = await this.$store
        .dispatch("report/preventPlan/create", this.formData)
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
  }
};
</script>
