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
        <el-form-item label="市州" label-width="80px">
          <el-select value="成都市" disabled></el-select>
        </el-form-item>
        <div class="form-item">
          <h2 ref="governProjectH1">治理地质灾害隐患点(处)</h2>
          <div class="form-item-wapper">
            <h3>项目情况</h3>
            <el-form-item label="目标数">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="完成百分比">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="勘察">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="施工设计图">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="施工招标">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <div>
              <el-form-item>
                <template slot="label">
                  <strong>施工</strong>
                  进度达到25%
                </template>
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
              <el-form-item label="进度达到50%">
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
              <el-form-item label="进度达到75%">
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
            </div>
            <el-form-item label="已竣工">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="初验">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="终验">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <h3>资金情况(万元)</h3>
            <el-form-item label="计划安排资金">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="预算下达数">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="比列">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <div>
              <el-form-item
                label="截止完工应拨付资金数"
                class="form-label-medium"
              >
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
              <el-form-item label="资金拨付数">
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
              <el-form-item label="比列">
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="governProjectH1">避险搬迁安置农户(户)</h2>
          <div class="form-item-wapper">
            <h3>项目情况</h3>
            <el-form-item label="目标数">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="完成百分比">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="征求意见">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="选址">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="建房">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="搬迁">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="初验">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="终验">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="其他(买房等)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <h3>资金情况(万元)</h3>
            <el-form-item label="计划安排资金">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="预算下达数">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="比列">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <div>
              <el-form-item
                label="截止完工应拨付资金数"
                class="form-label-medium"
              >
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
              <el-form-item label="资金拨付数">
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
              <el-form-item label="比列">
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                  label
                ></el-input-number>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="form-item">
          <div class="form-item-wapper" style="padding-top: 30px">
            <el-form-item label="项目推进情况">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="未达到序时进度说明">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input
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
export default {
  name: "EngineerForm",
  //   components: { timeLine },
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
