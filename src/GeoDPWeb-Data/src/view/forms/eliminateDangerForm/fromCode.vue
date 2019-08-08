<template>
  <div>
    <eliminate-danger-form
      :isFromQuery="true"
      :codeData="codeData"
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
import eliminateDangerForm from "./default";

export default {
  name: "QueryViewEliminateDanger",
  components: { eliminateDangerForm },
  data() {
    return {
      eliminateDangerData: [],
      codeData: {}
    };
  },
  computed: {
    showPage() {
      return this.eliminateDangerData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/eliminateDanger/getByCode", this.$route.query.code)
      .then(data => {
        this.eliminateDangerData = data;
        this.codeData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
