<template>
  <div class="page-container">
    <component v-loading="bodyLoading" :is="activeName"></component>
  </div>
</template>
<script>
import basicInfo from "@/view/forms/basicinfoForm/default";
import preventPlan from "@/view/forms/preventPlanForm/default";
import workCard from "@/view/forms/workCardForm/default";
import riskCard from "@/view/forms/riskCardForm/default";
// import emergencyInvestigation from "@/view/forms/viewEmergencyInvestigation/default";
import professionalMnt from "@/view/forms/professionalMntForm/default";
import simpleMnt from "@/view/forms/simpleMntForm/default";
import engineer from "@/view/forms/engineerForm/default";
import eliminateDanger from "@/view/forms/eliminateDangerForm/default";
import relocation from "@/view/forms/relocationForm/default";
// import emergencyShelter from "@/view/forms/viewEmergencyShelter/default";
import training from "@/view/forms/trainingForm/default";
// import riskAversion from "@/view/forms/viewRiskAversion/default";
import HeritageProtection from "@/view/forms/heritageProtectionForm/default";
import MineEngineer from "@/view/forms/governDataCollectForm/default";
import MineInfo from "@/view/forms/mineInformationForm/default";
export default {
  name: "ApprovalView",
  components: {
    basicInfo,
    preventPlan,
    workCard,
    riskCard,
    // emergencyInvestigation,
    professionalMnt,
    simpleMnt,
    engineer,
    eliminateDanger,
    relocation,
    // emergencyShelter,
    training,
    // riskAversion,
    MineInfo,
    HeritageProtection,
    MineEngineer
  },
  computed: {
    bodyLoading() {
      return this.$store.state.app.loading;
    },
    activeName() {
      return this.$route.query.dataType;
    }
  }
};
</script>
<style scoped>
.comContent {
  background: #fff;
  padding: 15px;
}
</style>
