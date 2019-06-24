/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <div>
    <h1>编辑EmergencyInvestigation</h1>
    <geo-form v-model="editForm" />
  </div>
</template>

<script>
// import util from "@/lib/util";
import geoForm from "./components/form";

export default {
  name: "EditEmergencyInvestigation",
  components: { geoForm }
};
</script>

<style lang="less"></style>
