<template>
  <div>
    <training-form :formData="formData" :btnExcuteFunc="save" :canEdit="true" />
  </div>
</template>

<script>
import trainingForm from "@/view/components/trainingForm.vue";

export default {
  name: "AddTraining",
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
      },
      townList: {}
    };
  },
  computed: {
    adminCode() {
      return this.$store.getters.area.adminCode;
    }
  },
  mounted() {
    this.$store
      .dispatch("report/basicInfo/getAdministrative", this.adminCode)
      .then(res => {
        this.formData.countryName = res.data.result.displayName;
      });
  },
  methods: {
    async save() {
      let r;
      r = await this.$store
        .dispatch("report/training/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          return r;
        });
      return r;
    }
  }
};
</script>

<style lang="less"></style>
