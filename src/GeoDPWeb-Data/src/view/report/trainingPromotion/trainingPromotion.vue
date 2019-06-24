<template>
  <div>
    <h1>trainingPromotion</h1>
  </div>
</template>

<script>
export default {
  name: "TrainingPromotion",
  methods: {
    edit(id) {
      this.$store.dispatch("report/basicinfo/edit", id);
      this.$router.push({ name: "report.editBasicInfo" });
    },
    add() {
      this.$router.push({ name: "report.addBasicInfo" });
    }
  }
};
</script>

<style lang="less"></style>
