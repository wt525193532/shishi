<template>
  <div>
    <el-input-number
      :controls="false"
      :min="0"
      :max="360"
      style="width: 32% !important;"
      controls-position="right"
      v-model="fetchForm.degree"
    ></el-input-number
    >°
    <el-input-number
      :controls="false"
      :min="0"
      :max="59"
      style="width: 30% !important;"
      controls-position="right"
      v-model="fetchForm.minute"
    ></el-input-number
    >′
    <el-input-number
      :controls="false"
      :min="0"
      :max="59"
      style="width: 30% !important;"
      controls-position="right"
      v-model="fetchForm.second"
    ></el-input-number
    >″
  </div>
</template>
<script>
export default {
  props: {
    fetchForm: Object
  }
};
</script>
