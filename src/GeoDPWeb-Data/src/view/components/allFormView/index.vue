<template>
  <div class="page-container">
    <component v-loading="bodyLoading" :is="activeName"></component>
  </div>
</template>
<script>
import basicInfo from "../formViewId/viewBasicInfo";
import preventPlan from "../formViewId/viewPreventPlan";
import workCard from "../formViewId/viewWorkCard";
import riskCard from "../formViewId/viewRiskCard";
import emergencyInvestigation from "../formViewId/viewEmergencyInvestigation";
import professionalMnt from "../formViewId/viewProfessionalMnt";
import simpleMnt from "../formViewId/viewSimpleMnt";
import engineer from "../formViewId/viewEngineer";
import eliminateDanger from "../formViewId/viewEliminateDanger";
import relocation from "../formViewId/viewRelocation";
import emergencyShelter from "../formViewId/viewEmergencyShelter";
import training from "../formViewId/viewTraining";
import riskAversion from "./viewRiskAversion";
import HeritageProtection from "../formViewId/viewHeritageProtection";
import MineEngineer from "../formViewId/viewGovernDataCollect";
import MineInfo from "../formViewId/viewMineInformation";
export default {
  name: "Detail",
  props: {
    activeName: String
  },
  components: {
    basicInfo,
    preventPlan,
    workCard,
    riskCard,
    emergencyInvestigation,
    professionalMnt,
    simpleMnt,
    engineer,
    eliminateDanger,
    relocation,
    emergencyShelter,
    training,
    riskAversion,
    MineInfo,
    HeritageProtection,
    MineEngineer
  },
  computed: {
    bodyLoading() {
      return this.$store.state.app.loading;
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
