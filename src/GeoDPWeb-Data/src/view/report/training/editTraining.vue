<template>
  <div>
    <training-form :formData="formData" :btnExcuteFunc="save" :canEdit="true" />
  </div>
</template>

<script>
import trainingForm from "@/view/components/trainingForm.vue";

export default {
  name: "EditTraining",
  components: { trainingForm },
  data() {
    return {
      formData: {
        cityName: "成都市",
        countryName: "",
        trainTownCount: null,
        trainTime: null,
        trainPeoCount: null,
        prevenName: "",
        disasterName: "",
        massesCount: null,
        expertCount: null,
        propagandaCount: null,
        propagandaPeople: null,
        trainPicture: null,
        trainManual: null,
        otherMaterials: null,
        reportDate: null,
        actDate: null,
        actTimes: null,
        actPersonsCount: null,
        remark: "",
        id: 0
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("report/training/edit", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    save() {
      this.$store
        .dispatch("report/training/update", this.formData)
        .then(res => {
          this.$util.editSaveMessage(res.data.success);
        });
    }
  }
};
</script>

<style lang="less"></style>
