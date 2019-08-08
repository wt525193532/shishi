<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix
        inline
        :model="formData"
        label-width="140px"
        ref="zzjc"
        :rules="rules"
        :disabled="disabled"
      >
        <div class="form-item">
          <h2 ref="zzjcH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formData.name" disabled>
                <el-option label="周报" :value="1"></el-option>
                <el-option label="月报" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月份">
              <el-date-picker
                type="month"
                v-model="formData.date"
                placeholder="选择月份"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="巡查组人员(人)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="巡查县区数(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="巡查乡镇数(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="其它在建工地检查(处)">
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

        <div class="form-item">
          <h2 ref="zzjcH4">隐患点巡查</h2>
          <div class="form-item-wapper">
            <el-form-item label="巡查隐患点个数(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁户数(户)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁人数(人)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="新增隐患点(个)">
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

        <div class="form-item">
          <h2 ref="zzjcH4">抢险救援调查</h2>
          <div class="form-item-wapper">
            <el-form-item label="点数(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>

            <el-form-item label="死亡人数(人)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="伤亡人数(人)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损失财产(万元)">
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

        <div class="form-item">
          <h2 ref="zzjcH4">协助完善预案、培训工作</h2>
          <div class="form-item-wapper">
            <el-form-item label="建立预案个数(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="工作卡(张)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="明白卡(张)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="警示牌(张)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="培训(人次)">
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

        <div class="form-item">
          <h2 ref="zzjcH4">协助完成监测设备安装</h2>
          <div class="form-item-wapper">
            <el-form-item label="裂缝伸缩仪(套)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="雨量站(台)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="裂缝报警器(个)">
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

        <div class="form-item">
          <h2 ref="zzjcH4">地灾治理工作核查</h2>
          <div class="form-item-wapper">
            <el-form-item label="在建治理工程核查(处)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="已完成治理工程核查(处)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="灾害点踏堪(处)">
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
        <div class="form-item">
          <h2 ref="zzjcH9">安置点检查</h2>
          <div class="form-item-wapper">
            <el-form-item label="总数(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="需补评估的(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="需要治理的(个)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="新选址(个)">
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
        <div class="form-item">
          <h2 ref="zzjcH9">整改通知</h2>
          <div class="form-item-wapper">
            <el-form-item label="口头(份)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="书面(份)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="已回复(份)">
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

        <div class="form-item">
          <div class="form-item-wapper" style="padding-top: 30px">
            <el-form-item label="备注说明">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <comAttachment
              v-model="formData.attachments"
              :fileOption="otherFileOption"
              class="form-attachment"
            />
            <el-form-item label="报表联系人">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="联系QQ">
              <el-input v-model="formData.name" placeholder></el-input>
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
  name: "ZzjcForm",
  // components: { timeLine },
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
    otherFileOption() {
      return {
        tag: ["其他附件"],
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
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  updated() {
    // if (!this.canEdit) {
    //   this.$refs["zzjc"].clearValidate();
    // }
  },
  methods: {
    valueChanged() {
      //   this.formData.code = this.formData.site.code;
    },
    saveFormSub() {
      //   this.$refs["zzjc"].validate(async valid => {
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
