<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        inline
        label-width="140px"
        :rules="rules"
        label-suffix="："
        :disabled="disabled"
        ref="preventPlanForm"
        :model="formData"
      >
        <div class="form-item">
          <h2>基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
          </div>
        </div>
        <div class="form-item">
          <h2>威胁及监测预报</h2>

          <div class="form-item-wapper">
            <el-form-item label="隐患点类型">
              <el-select
                disabled
                v-model="formData.site.disasterTypeCode"
                placeholder="无"
              >
                <el-option
                  v-for="(name, code) in $t('codes.DisasterType')"
                  :key="code"
                  :label="name"
                  :value="code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="规模等级">
              <el-select
                disabled
                v-model="formData.site.disasterScaleLevel"
                placeholder="无"
              >
                <el-option label="小型" :value="1"></el-option>
                <el-option label="中型" :value="2"></el-option>
                <el-option label="大型" :value="3"></el-option>
                <el-option label="特大型" :value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="威胁户数(户)">
              <el-input
                disabled
                v-model="formData.site.threatHouses"
              ></el-input>
            </el-form-item>

            <el-form-item label="威胁财产(万元)">
              <el-input
                disabled
                v-model="formData.site.threatProperty"
              ></el-input>
            </el-form-item>

            <el-form-item label="威胁人数(人)">
              <el-input
                disabled
                v-model="formData.site.threatPeople"
              ></el-input>
            </el-form-item>
            <br />

            <el-form-item
              label="变形特征及历史活动情况"
              class="history-width"
              prop="oneThousand"
            >
              <el-input
                type="textarea"
                class="history-input"
                :rows="2"
                v-model="formData.featureMovements"
              ></el-input>
            </el-form-item>

            <el-form-item label="地质环境条件" prop="oneThousand">
              <el-input
                type="textarea"
                :rows="2"
                v-model="formData.geoEnvironment"
              ></el-input>
            </el-form-item>

            <el-form-item label="引发因素" prop="oneThousand">
              <el-input
                type="textarea"
                :rows="2"
                v-model="formData.primingFactors"
              ></el-input>
            </el-form-item>

            <el-form-item label="曾发生灾害时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.historyDate"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="稳定性分析" prop="oneHundred">
              <el-input v-model="formData.stabilityAnalysis"></el-input>
            </el-form-item>

            <el-form-item label="潜在危害" prop="oneHundred">
              <el-input v-model="formData.potentialHazard"></el-input>
            </el-form-item>

            <el-form-item label="临灾状态预测" prop="oneHundred">
              <el-input v-model="formData.statusForecast"></el-input>
            </el-form-item>

            <el-form-item label="监测方法" prop="oneHundred">
              <el-input v-model="formData.monitorMethods"></el-input>
            </el-form-item>

            <el-form-item label="监测周期" prop="oneHundred">
              <el-input v-model="formData.monitorCycle"></el-input>
            </el-form-item>

            <el-form-item label="报警方法" prop="oneHundred">
              <el-input v-model="formData.alarmMethods"></el-input>
            </el-form-item>

            <el-form-item label="报警信号" prop="oneHundred">
              <el-input v-model="formData.alarmSignal"></el-input>
            </el-form-item>

            <el-form-item label="报警人" prop="oneHundred">
              <el-input v-model="formData.alarmPerson"></el-input>
            </el-form-item>

            <el-form-item label="报警人电话" prop="alarmPhone">
              <el-input v-model="formData.alarmPhone"></el-input>
            </el-form-item>

            <el-form-item label="预定避灾地点" prop="oneHundred">
              <el-input v-model="formData.refuge"></el-input>
            </el-form-item>

            <el-form-item label="预定疏散路线" prop="route">
              <el-input v-model="formData.route"></el-input>
            </el-form-item>

            <el-form-item label="防治建议" prop="oneThousand">
              <el-input
                type="textarea"
                :rows="2"
                v-model="formData.preventSuggests"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="saveForm" :disabled="ownDisabled">
        {{ !disabled ? "保存" : "返回" }}
      </el-button>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "./basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "PreventPlanForm",
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
  computed: {
    proccessActive() {
      return this.formData.processes
        ? this.formData.processes.length
        : undefined;
    },
    isShowAudit() {
      return !this.canEdit ? (this.proccessActive ? true : false) : false;
    }
  },
  data() {
    return {
      ownDisabled: false,
      rules: {
        code: [
          { max: 12, message: "长度在 12 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点编号不能为空"
          }
        ],
        route: [
          {
            min: 0,
            max: 200,
            message: "长度在 0 ~ 200 个字符以内！",
            trigger: "blur"
          }
        ],
        alarmPhone: [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        oneHundred: [
          {
            min: 0,
            max: 100,
            message: "长度在 0 ~ 100 个字符以内！",
            trigger: "blur"
          }
        ],
        oneThousand: [
          {
            min: 0,
            max: 1000,
            message: "长度在 0 ~ 1000 个字符以内！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["preventPlanForm"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveForm() {
      console.log(this.formData.code);
      if (this.disabled) {
        this.isdisabled = false;
        this.$router.go(-1);
      } else {
        this.$refs["preventPlanForm"].validate(async valid => {
          if (valid) {
            let myCode = this.formData.site.code;
            if (myCode) {
              this.ownDisabled = true;
              let r = await this.btnExcuteFunc();
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
