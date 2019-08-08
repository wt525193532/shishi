<template>
  <div>
    <professional-mnt-form
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
import professionalMntForm from "./default";

export default {
  name: "QueryViewProfessionalMnt",
  components: { professionalMntForm },
  data() {
    return {
      codeData: {},
      professionalMntData: []
    };
  },
  computed: {
    showPage() {
      return this.professionalMntData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/professionalMnt/getByCode", this.$route.query.code)
      .then(data => {
        this.professionalMntData = data;
        this.codeData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
