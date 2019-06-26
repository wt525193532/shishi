<template>
  <div>
    <el-input-number
      :controls="false"
      v-bind="$attrs"
      style="width: 31% !important"
      :precision="0"
      :value="obj.degree"
      @change="inputDegress"
    ></el-input-number
    >°
    <el-input-number
      :controls="false"
      style="width: 31% !important"
      v-bind="$attrs"
      :min="0"
      :max="59"
      placeholder="0 ~ 59"
      :precision="0"
      :value="obj.minute"
      @change="inputMinute"
    ></el-input-number
    >′
    <el-input-number
      :controls="false"
      v-bind="$attrs"
      :min="0.0"
      :max="59.99"
      placeholder="0 ~ 59"
      :precision="2"
      style="width: 30% !important"
      v-model="obj.second"
      @change="inputSecond"
    ></el-input-number
    >″
  </div>
</template>
<script>
export default {
  name: "JWDBoom",
  inheritAttrs: false,
  props: {
    value: Number
  },
  data() {
    return {};
  },
  computed: {
    obj() {
      return this.convert(this.value);
    }
  },
  methods: {
    toFloat(d, f, m) {
      return (
        ((d || 0) + (f || 0) / 60.0 + (m || 0) / 3600.0 + 0.0000002).toFixed(
          6
        ) * 1
      );
    },
    convert(v) {
      if (v === undefined) {
        return {
          degree: undefined,
          minute: undefined,
          second: undefined
        };
      }
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
      this.$emit(
        "input",
        this.toFloat(event, this.obj.minute, this.obj.second)
      );
    },
    inputMinute(event) {
      this.$emit(
        "input",
        this.toFloat(this.obj.degree, event, this.obj.second)
      );
    },
    inputSecond(event) {
      this.$emit(
        "input",
        this.toFloat(this.obj.degree, this.obj.minute, event)
      );
    }
  }
};
</script>
