<template>
  <div>
    <prevent-plan-form
      :codeData="codeData"
      :isFromQuery="true"
      v-if="showPage"
    />
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import preventPlanForm from "./default";

export default {
  name: "QueryViewPreventPlan",
  components: { preventPlanForm },
  data() {
    return {
      codeData: {},
      preventPlanData: []
    };
  },
  computed: {
    showPage() {
      return this.preventPlanData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/preventPlan/getByCode", this.$route.query.code)
      .then(data => {
        this.preventPlanData = data;
        this.codeData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
