<template>
  <div>
    <EmergencyShelter
      :disabled="true"
      :findName="findName"
      :saveFormSub="saveFormSub"
      :basicInfo="basicInfo"
      v-if="showPage"
    ></EmergencyShelter>
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import EmergencyShelter from "@/view/components/emergencyShelterForm";
export default {
  name: "QueryViewEmergencyShelter",
  components: { EmergencyShelter },
  data() {
    return {};
  }
};
</script>

<style lang="less"></style>
