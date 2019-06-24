<template>
  <div class="page-container">
    <component v-loading="bodyLoading" :is="activeName"></component>
  </div>
</template>
<script>
import basicInfo from "@/view/components/formViewId/viewBasicInfo.vue";
import preventPlan from "@/view/components/formViewId/viewPreventPlan";
import workCard from "@/view/components/formViewId/viewWorkCard";
import riskCard from "@/view/components/formViewId/viewRiskCard";
import emergencyInvestigation from "@/view/components/formViewId/viewEmergencyInvestigation";
import professionalMnt from "@/view/components/formViewId/viewProfessionalMnt";
import simpleMnt from "@/view/components/formViewId/viewSimpleMnt";
import engineer from "@/view/components/formViewId/viewEngineer";
import eliminateDanger from "@/view/components/formViewId/viewEliminateDanger";
import relocation from "@/view/components/formViewId/viewRelocation";
import emergencyShelter from "@/view/components/formViewId/viewEmergencyShelter";
import training from "@/view/components/formViewId/viewTraining";
import heritageProtection from "@/view/components/formViewId/viewHeritageProtection";
import governDataCollect from "@/view/components/formViewId/viewGovernDataCollect.vue";
import mineInformation from "@/view/components/formViewId/viewMineInformation";
export default {
  name: "Detail",

  data() {
    return {
      activeName: this.$route.meta.formName
    };
  },
  components: {
    governDataCollect,
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
    heritageProtection,
    mineInformation
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
