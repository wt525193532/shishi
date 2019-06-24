<template>
  <div>
    <h1>新增TrainingPromotion</h1>
    <geo-form :value="addForm" />
  </div>
</template>

<script>
import geoForm from "./components/form";

export default {
  name: "AddTrainingPromotion",
  components: { geoForm },
  data() {
    return {
      addForm: {}
    };
  },
  computed: {},
  methods: {
    save() {
      this.$store.dispatch("reprot/basicinfo/add", this.addForm);
      //继续填写
      //back
    }
  },
  mounted() {}
};
</script>

<style lang="less"></style>
