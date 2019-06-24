<template>
  <div>
    <simple-mnt-form :formData="formData" disabled v-if="showPage" />
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import simpleMntForm from "@/view/components/simpleMntForm";

export default {
  name: "QueryViewSimpleMnt",
  components: { simpleMntForm },
  data() {
    return {
      formData: {},
      simpleMntData: []
    };
  },
  computed: {
    showPage() {
      return this.simpleMntData.length;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/simpleMnt/getByCode", this.$route.query.code)
      .then(data => {
        this.simpleMntData = data;
        this.formData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
