<template>
  <EmergencyShelter
    :disabled="true"
    :findName="findName"
    :saveFormSub="saveFormSub"
    :basicInfo="basicInfo"
  ></EmergencyShelter>
</template>

<script>
import EmergencyShelter from "@/view/components/emergencyShelterForm";
export default {
  name: "EditEmergencyShelter",
  components: { EmergencyShelter },
  data() {
    return {};
  }
};
</script>

<style lang="less"></style>
