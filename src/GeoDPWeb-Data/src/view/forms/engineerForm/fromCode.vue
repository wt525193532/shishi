<template>
  <div>
    <engineer-form :codeData="codeData" :isFromQuery="true" v-if="showPage" />
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import engineerForm from "./default";

export default {
  name: "QueryViewEngineer",
  data() {
    return {
      codeData: {},
      engineerData: []
    };
  },
  components: { engineerForm },
  computed: {
    showPage() {
      return this.engineerData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/engineer/getByCode", this.$route.query.code)
      .then(data => {
        this.engineerData = data;
        this.codeData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
