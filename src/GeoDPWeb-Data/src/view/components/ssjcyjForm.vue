<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        inline
        :model="formData"
        label-width="140px"
        ref="governProject"
        :rules="rules"
        :disabled="disabled"
      >
        <div class="form-item">
          <h2>基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
            <el-form-item
              label="威胁对象"
              prop="threatObjects"
              class="form-item-row"
            >
              <el-checkbox-group v-model="formData.threatObjects">
                <el-checkbox
                  v-for="(value, key) in $t('codes.ThreatObject')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="governProjectH1">监测设备计划安装任务</h2>
          <div class="form-item-wapper">
            <el-form-item label="所属年度方案" prop="threatPeople">
              <el-radio-group v-model="formData.ndfa">
                <el-radio :label="true">已计划</el-radio>
                <el-radio :label="false">未计划</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="所属年度">
              <el-date-picker
                :disabled="isNdfa"
                type="year"
                v-model="formData.date"
                placeholder="选择年度"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="裂缝伸缩仪数量(套)" prop="threatPeople">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入裂缝伸缩仪数量"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="雨量站数量" prop="threatPeople">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入雨量站数量"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否共用" prop="threatPeople">
              <el-radio-group v-model="formData.name">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="裂缝报警器数量(套)" prop="threatPeople">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入裂缝报警器数量"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="泥位计数量" prop="threatPeople">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入泥位计数量"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item page-next">
          <h2 ref="governProjectH4">
            监测设备完成安装情况(所属年度的安装数量)
          </h2>
          <div class="form-item-wapper">
            <div>
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>裂缝伸缩仪</strong> 完成安装数量(套)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
            <div>
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>雨量站</strong> 完成安装数量(台)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
            <div>
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>裂缝报警器</strong> 完成安装数量(个)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
            <div>
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>泥位计</strong> 完成安装数量(套)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-item page-next">
          <h2 ref="governProjectH4">
            监测预警信息及互联互通情况(所属年度的数量)
          </h2>
          <div class="form-item-wapper">
            <div>
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>裂缝伸缩仪</strong> 可传输信息的数量(套)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
            <div class="testtt">
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>雨量站</strong> 可传输信息的数量(台)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
            <div>
              <el-form-item class="form-label-lg">
                <template slot="label">
                  <strong>泥位计</strong> 可传输信息的数量(套)
                </template>
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="99999999"
                  v-model.number="formData.threatHouses"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="所占比例(%)">
                <el-input-number
                  :disabled="isNdfa"
                  :controls="false"
                  :min="0"
                  placeholder="请输入"
                  :max="99999999"
                  v-model.number="formData.threatPeople"
                ></el-input-number>
              </el-form-item>
            </div>
            <h3>接收信息的人员情况</h3>
            <el-form-item label="计划数(人)">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="完成数(人)">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="所占比例(%)">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="设备在线率(%)">
              <el-input-number
                :disabled="isNdfa"
                :controls="false"
                :min="0"
                placeholder="请输入"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="纳入年度计划未安装监测设备的原因">
              <el-input
                :disabled="isNdfa"
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="未纳入年度计划的原因">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                :disabled="isNdfa"
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <!-- <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>-->
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="saveFormSub" :disabled="ownDisabled">
        {{ disabled === false ? "保存" : "返回" }}
      </el-button>
    </div>
  </div>
</template>

<script>
// import timeLine from "@/view/components/timeLine.vue";
import basicinfoSelector from "./basicinfoSelector";
export default {
  name: "EngineerForm",
  components: { basicinfoSelector },
  props: {
    disabled: Boolean,
    canEdit: {
      type: Boolean,
      default: false
    },
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    },
    formData: {
      type: Object,
      default: null
    }
  },
  computed: {
    fileOption() {
      return {
        tag: ["附件上传"],
        upload: this.canEdit,
        accept: ""
      };
    },
    isNdfa() {
      if (this.canEdit) {
        return !this.formData.ndfa;
      }
      return true;
    }

    // proccessActive() {
    //   return this.formData.processes
    //     ? this.formData.processes.length
    //     : undefined;
    // },
    // isShowAudit() {
    //   return !this.canEdit ? (this.proccessActive ? true : false) : false;
    // }
  },
  data() {
    return {
      ownDisabled: false,
      rules: {
        projectName: [{ max: 200, message: "长度在 200 个字符以内" }],
        period: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点治理期数不能为空"
          }
        ],
        location: [{ max: 500, message: "长度在 500 个字符以内" }]
      }
    };
  },
  updated() {
    // if (!this.canEdit) {
    //   this.$refs["governProject"].clearValidate();
    // }
  },
  methods: {
    valueChanged() {
      //   this.formData.code = this.formData.site.code;
    },
    saveFormSub() {
      //   this.$refs["governProject"].validate(async valid => {
      //     if (valid) {
      //       if (this.formData.site.code) {
      //         this.ownDisabled = true;
      //         let r = await this.btnExcuteFunc();
      //         if (r === false) {
      //           this.ownDisabled = r;
      //         }
      //       } else {
      //         this.$message({
      //           type: "info",
      //           message: "保存不成功"
      //         });
      //         return false;
      //       }
      //     } else {
      //       this.$message.error("验证未通过");
      //     }
      //   });
    }
  }
};
</script>
<style lang="less" scoped>
.testtt {
  animation-name: teststy;
  animation-duration: 5s;
  // transition: width 2s, height 2s;
  // -webkit-transition: width 2s, height 2s, -webkit-transform 2s; /* Safari and Chrome */
}
// .testtt:hover {
//   transform: rotate(90deg);
//   -webkit-transform: rotate(280deg);
// }
@keyframes teststy {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
