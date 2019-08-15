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
            <el-form-item label="规模(万m3)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否新增点">
              <el-select v-model="formData.name" placeholder>
                <el-option label="新增" :value="1"></el-option>
                <el-option label="原有" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="governProjectH1">灾情损失</h2>
          <div class="form-item-wapper">
            <el-form-item label="死亡人数(人)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入死亡人数"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="失踪人数(人)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入失踪人数"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="受伤人数(人)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入受伤人数"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="损失户数(户)" prop="threatHouses">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入损失户数"
                :max="99999999"
                v-model.number="formData.threatHouses"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="人数(人)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入人数"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁房屋(间)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入损毁房屋"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁耕地(亩)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入损毁耕地"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁森林(亩)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入损毁森林"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁道路(m)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入损毁道路"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="直接经济损失(万元)" prop="threatProperty">
              <el-input-number
                :controls="false"
                :precision="2"
                :min="0"
                placeholder="请输入直接经济损失"
                :max="99999999"
                v-model.number="formData.threatProperty"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="其他">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>

            <el-form-item label="灾情等级">
              <el-select v-model="formData.name" placeholder>
                <el-option label="特大型" :value="4"></el-option>
                <el-option label="大型" :value="3"></el-option>
                <el-option label="中型" :value="2"></el-option>
                <el-option label="小型" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="form-item page-next">
          <h2 ref="governProjectH4">现状威胁</h2>
          <div class="form-item-wapper">
            <el-form-item label="威胁户数(户)" prop="threatHouses">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁户数"
                :max="99999999"
                v-model.number="formData.threatHouses"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁人数(人)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁人数"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁房屋(间)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁房屋"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁耕地(亩)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁耕地"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁森林(亩)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁森林"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁道路(m)" prop="threatPeople">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁道路"
                :max="99999999"
                v-model.number="formData.threatPeople"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="潜在经济损失(万元)" prop="threatProperty">
              <el-input-number
                :controls="false"
                :precision="2"
                :min="0"
                placeholder="请输入潜在经济损失"
                :max="99999999"
                v-model.number="formData.threatProperty"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="其他">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>

            <el-form-item label="险情等级">
              <el-select v-model="formData.name" placeholder>
                <el-option label="特大型" :value="4"></el-option>
                <el-option label="大型" :value="3"></el-option>
                <el-option label="中型" :value="2"></el-option>
                <el-option label="小型" :value="1"></el-option>
              </el-select>
            </el-form-item>
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
            <el-form-item
              label="诱发因素"
              prop="predisposeFactors"
              class="form-item-row"
            >
              <el-checkbox-group v-model="formData.predisposeFactors">
                <el-checkbox
                  v-for="(value, key) in $t('codes.PredisposeFactor')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="防灾措施"
              prop="predisposeFactors"
              class="form-item-row"
            >
              <el-checkbox-group v-model="formData.predisposeFactors">
                <el-checkbox
                  v-for="(value, key) in $t('codes.PredisposeFactor')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item page-next">
          <h2 ref="governProjectH4">附件</h2>
          <comAttachment
            v-model="formData.attachments"
            :fileOption="fileOption"
            class="form-attachment"
          />
        </div>
      </el-form>
      <!-- <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>-->
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="saveFormSub" :disabled="ownDisabled">{{
        disabled === false ? "保存" : "返回"
      }}</el-button>
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
