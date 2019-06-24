<template>
  <div>
    <professional-mnt-form :formData="formData" disabled v-if="showPage" />
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import professionalMntForm from "@/view/components/professionalMntForm";

export default {
  name: "QueryViewProfessionalMnt",
  components: { professionalMntForm },
  data() {
    return {
      formData: {},
      professionalMntData: []
    };
  },
  computed: {
    showPage() {
      return this.professionalMntData.length;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/professionalMnt/getByCode", this.$route.query.code)
      .then(data => {
        this.professionalMntData = data;
        this.formData = data[0];
      });
  },
  methods: {}
};
</script>

<style lang="less"></style>
