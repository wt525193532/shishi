<template>
  <div>
    <work-card-form
      :codeData="codeData"
      :isFromQuery="true"
      v-if="showPage"
    ></work-card-form>
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import workCardForm from "./default";
export default {
  name: "QueryViewWorkCard",
  components: { workCardForm },
  data() {
    return {
      codeData: {},
      workCardData: []
    };
  },
  computed: {
    showPage() {
      return this.workCardData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/workCard/getByCode", this.$route.query.code)
      .then(data => {
        this.workCardData = data;
        this.codeData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
