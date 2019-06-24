<template>
  <div>
    <eliminate-danger-form
      :disabled="disabled"
      :formData="formData"
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
import eliminateDangerForm from "@/view/components/eliminateDangerForm";

export default {
  name: "QueryViewEliminateDanger",
  components: { eliminateDangerForm },
  data() {
    return {
      disabled: true,
      activeName: "0",
      eliminateDangerData: [],
      formData: {}
    };
  },
  computed: {
    showPage() {
      return this.eliminateDangerData.length;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/eliminateDanger/getByCode", this.$route.query.code)
      .then(data => {
        this.eliminateDangerData = data;
        this.formData = data[0];
      });
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="less"></style>
