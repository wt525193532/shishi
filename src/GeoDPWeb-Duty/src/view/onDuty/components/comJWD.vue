<template>
  <div>
    <el-input-number
      :controls="false"
      v-bind="$attrs"
      :min="0"
      :max="360"
      style="width: 31% !important"
      :precision="0"
      v-model="obj.degree"
      @change="inputDegress"
    ></el-input-number
    >°
    <el-input-number
      :controls="false"
      v-bind="$attrs"
      :min="0"
      :max="59"
      style="width: 31% !important"
      :precision="0"
      v-model="obj.minute"
      @change="inputMinute"
    ></el-input-number
    >′
    <el-input-number
      :controls="false"
      v-bind="$attrs"
      :min="0"
      :max="59"
      :precision="2"
      style="width: 30% !important"
      v-model="obj.second"
      @change="inputSecond"
    ></el-input-number
    >″
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  name: "ComJWD",
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: Number
  },
  data() {
    return {};
  },
  computed: {
    float() {
      return (
        this.obj.degree + this.obj.minute / 60.0 + this.obj.second / 3600.0
      );
    },
    obj() {
      return this.convert(this.value);
    }
  },
  methods: {
    convert(v) {
      const d = Math.floor(v);
      const f = Math.floor((v - d) * 60);
      const m = ((v - d) * 60 - f) * 60;
      return {
        degree: d,
        minute: f,
        second: m
      };
    },
    inputDegress(event) {
      this.$emit("input", this.float.toFixed(6));
    },
    inputMinute(event) {
      this.$emit("input", this.float.toFixed(6));
    },
    inputSecond(event) {
      this.$emit("input", this.float.toFixed(6));
    }
  }
};
</script>
