<template>
  <div class="page-container">
    <component v-loading="bodyLoading" :is="activeName"></component>
  </div>
</template>
<script>
import basicInfo from "./viewBasicInfo";
import preventPlan from "./viewPreventPlan";
import workCard from "./viewWorkCard";
import riskCard from "./viewRiskCard";
import emergencyInvestigation from "./viewEmergencyInvestigation";
import professionalMnt from "./viewProfessionalMnt";
import simpleMnt from "./viewSimpleMnt";
import engineer from "./viewEngineer";
import eliminateDanger from "./viewEliminateDanger";
import relocation from "./viewRelocation";
import emergencyShelter from "./viewEmergencyShelter";
import training from "./viewTraining";
import riskAversion from "./viewRiskAversion";
import HeritageProtection from "@/view/components/formViewId/viewHeritageProtection";
import GovernDataCollect from "@/view/components/formViewId/viewGovernDataCollect.vue";
import MineInfo from "@/view/components/formViewId/viewMineInformation";
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
    GovernDataCollect
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
