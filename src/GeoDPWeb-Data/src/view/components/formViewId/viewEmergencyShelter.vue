<template>
  <div>
    <div class="clearfix">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#emergencyShelterPrint'"
        >打印表单</el-button
      >
    </div>
    <EmergencyShelter
      id="emergencyShelterPrint"
      :disabled="true"
      :findName="findName"
      :saveFormSub="saveFormSub"
      :basicInfo="basicInfo"
    ></EmergencyShelter>
  </div>
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
