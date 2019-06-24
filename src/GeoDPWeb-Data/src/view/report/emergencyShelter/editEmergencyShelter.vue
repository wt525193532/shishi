<template>
  <div>
    <EmergencyShelter
      :saveFormSub="saveFormSub"
      :basicInfo="basicInfo"
    ></EmergencyShelter>
  </div>
</template>

<script>
import EmergencyShelter from "@/view/components/emergencyShelterForm";

export default {
  name: "EditEmergencyShelter",
  components: { EmergencyShelter }
};
</script>

<style lang="less"></style>
