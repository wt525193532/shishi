<template>
  <div>
    <EmergencyShelter
      :formData="formData"
      :saveFormSub="saveFormSub"
    ></EmergencyShelter>
  </div>
</template>

<script>
import EmergencyShelter from "@/view/components/emergencyShelterForm";
export default {
  name: "AddEmergencyShelter",
  components: {
    EmergencyShelter
  },
  data() {
    return {
      formData: {
        name: "",
        town: "",
        vallage: "",
        group: "",
        typeCode: "",
        levelCode: "",
        longitude: 0,
        latitude: 0,
        shelterArea: 0,
        capacity: 0,
        trafficInfo: "",
        contact: "",
        contactPhone: "",
        remark: "",
        code: ""
      }
    };
  },
  computed: {},
  methods: {
    save() {
      this.$store.dispatch("reprot/basicinfo/add", this.addForm);
      //继续填写
      //back
    },
    saveFormSub() {}
  },
  mounted() {}
};
</script>
<style lang="less"></style>
