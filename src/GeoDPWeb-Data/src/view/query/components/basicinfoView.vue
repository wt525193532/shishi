<template>
  <div class="page-container">
    <component v-loading="bodyLoading" :is="activeName"></component>
  </div>
</template>
<script>
import basicInfo from "@/view/forms/basicinfoForm/fromCode";
import preventPlan from "@/view/forms/preventPlanForm/fromCode";
import workCard from "@/view/forms/workCardForm/fromCode";
import riskCard from "@/view/forms/riskCardForm/fromCode";
import professionalMnt from "@/view/forms/professionalMntForm/fromCode";
import simpleMnt from "@/view/forms/simpleMntForm/fromCode";
import engineer from "@/view/forms/engineerForm/fromCode";
import eliminateDanger from "@/view/forms/eliminateDangerForm/fromCode";
import relocation from "@/view/forms/relocationForm/fromCode";
export default {
  name: "QueryBasicinfoView",
  props: {
    activeName: String
  },
  components: {
    basicInfo,
    preventPlan,
    workCard,
    riskCard,
    professionalMnt,
    simpleMnt,
    engineer,
    eliminateDanger,
    relocation
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
