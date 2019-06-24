<template>
  <div>
    <prevent-plan-form :formData="formData" disabled v-if="showPage" />
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import preventPlanForm from "@/view/components/preventPlanForm";

export default {
  name: "QueryViewPreventPlan",
  components: { preventPlanForm },
  data() {
    return {
      formData: {},
      preventPlanData: []
    };
  },
  computed: {
    showPage() {
      return this.preventPlanData.length;
    }
  },
  mounted() {
    console.log("m", this.formData);

    this.$store
      .dispatch("querypage/preventPlan/getByCode", this.$route.query.code)
      .then(data => {
        this.preventPlanData = data;
        this.formData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
