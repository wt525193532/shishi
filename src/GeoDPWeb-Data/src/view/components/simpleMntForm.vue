<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        inline
        label-suffix=":"
        :model="formData"
        :disabled="disabled"
        ref="simpleMonitor"
        :rules="rules"
        label-width="140px"
      >
        <div class="form-item">
          <h2 ref="simpleMonitorH1">基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
          </div>
        </div>
        <div class="form-item">
          <h2>简易监测方法</h2>
          <div class="form-item-wapper">
            <el-form-item label="监测方法" class="form-item-row">
              <el-checkbox-group v-model="formData.mntMethods">
                <el-checkbox
                  v-for="(value, key) in $t('codes.SimpleMntMethod')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其它方法" prop="otherMethods">
              <el-input v-model="formData.otherMethods"></el-input>
            </el-form-item>
            <el-form-item
              v-if="landslideDevice"
              label="滑坡伸缩仪套数"
              prop="landslideDeviceNumber"
            >
              <el-input-number
                :controls="false"
                :min="1"
                :max="999"
                v-model="formData.landslideDeviceNumber"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              v-if="crackDevice"
              label="裂缝报警器套数"
              prop="crackDeviceNumber"
            >
              <el-input-number
                :min="1"
                :max="999"
                :controls="false"
                v-model="formData.crackDeviceNumber"
              ></el-input-number>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="saveForm" :disabled="ownDisabled">{{
        !disabled ? "保存" : "返回"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "./basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "SimpleMonitor",
  components: { basicinfoSelector, timeLine },
  props: {
    disabled: Boolean,
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ownDisabled: false,
      rules: {
        otherMethods: [
          { max: 200, message: "长度在200 个字符以内", trigger: "blur" }
        ],
        code: [{ required: true, message: "请选择隐患点！", trigger: "change" }]
      }
    };
  },
  computed: {
    landslideDevice() {
      const m = this.formData.mntMethods;
      return m && m.indexOf("D") >= 0 ? true : false;
    },
    crackDevice() {
      const m = this.formData.mntMethods;
      return m && m.indexOf("E") >= 0 ? true : false;
    },
    proccessActive() {
      return this.formData.processes
        ? this.formData.processes.length
        : undefined;
    },
    isShowAudit() {
      return !this.canEdit ? (this.proccessActive ? true : false) : false;
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["simpleMonitor"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveForm() {
      if (this.disabled) {
        this.isdisabled = true;
        this.$router.go(-1);
      } else {
        this.$refs["simpleMonitor"].validate(async valid => {
          if (valid) {
            if (this.formData.site.code) {
              this.ownDisabled = true;
              let r = await this.btnExcuteFunc();
              this.$refs.simpleMonitor.clearValidate();
              if (r === false) {
                this.ownDisabled = r;
              }
            } else {
              this.$message({
                type: "info",
                message: "保存不成功"
              });
              return false;
            }
          } else {
            this.$message.error("验证未通过");
          }
        });
      }
    },
    getDay(time) {
      let date = new Date(time);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    getTime(time) {
      let date = new Date(time);
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return h + m + s;
    }
  }
};
</script>
