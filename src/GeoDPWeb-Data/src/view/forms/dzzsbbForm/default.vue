<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix
        inline
        :model="formData"
        label-width="140px"
        ref="dzzsbbForm"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="dzzsbbFormH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州" prop="zgaA09A030">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="类型" prop="zgaA09A060">
              <el-select v-model="formData.zgaA09A060">
                <el-option label="周报" value="1"></el-option>
                <el-option label="月报" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="第几周"
              v-if="formData.zgaA09A060 == '1'"
              prop="zgaA09A050"
            >
              <el-date-picker
                @change="weekChange"
                type="week"
                v-model="weekDate"
                format="yyyy 第 WW 周"
                placeholder="选择周"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="月份" prop="zgaA09A040" v-else>
              <el-date-picker
                type="month"
                v-model="formData.zgaA09A040"
                placeholder="选择月份"
                value-format="yyyyMM"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="巡查组人员(人)">
              <el-input-number
                v-model="formData.zgaA09A070"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="巡查县区数(个)">
              <el-input-number
                v-model="formData.zgaA09A080"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="巡查乡镇数(个)">
              <el-input-number
                v-model="formData.zgaA09A090"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="其它在建工地检查(处)">
              <el-input-number
                v-model="formData.zgaA09A330"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="dzzsbbFormH4">隐患点巡查</h2>
          <div class="form-item-wapper">
            <el-form-item label="巡查隐患点个数(个)">
              <el-input-number
                v-model="formData.zgaA09A100"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁户数(户)">
              <el-input-number
                v-model="formData.zgaA09A110"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁人数(人)">
              <el-input-number
                v-model="formData.zgaA09A120"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="新增隐患点(个)">
              <el-input-number
                v-model="formData.zgaA09A130"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="dzzsbbFormH4">抢险救援调查</h2>
          <div class="form-item-wapper">
            <el-form-item label="点数(个)">
              <el-input-number
                v-model="formData.zgaA09A140"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>

            <el-form-item label="死亡人数(人)">
              <el-input-number
                v-model="formData.zgaA09A150"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="伤亡人数(人)">
              <el-input-number
                v-model="formData.zgaA09A160"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损失财产(万元)">
              <el-input-number
                v-model="formData.zgaA09A170"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="dzzsbbFormH4">协助完善预案、培训工作</h2>
          <div class="form-item-wapper">
            <el-form-item label="建立预案个数(个)">
              <el-input-number
                v-model="formData.zgaA09A180"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="工作卡(张)">
              <el-input-number
                v-model="formData.zgaA09A190"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="明白卡(张)">
              <el-input-number
                v-model="formData.zgaA09A200"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="警示牌(张)">
              <el-input-number
                v-model="formData.zgaA09A210"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="培训(人次)">
              <el-input-number
                v-model="formData.zgaA09A220"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="dzzsbbFormH4">协助完成监测设备安装</h2>
          <div class="form-item-wapper">
            <el-form-item label="裂缝伸缩仪(套)">
              <el-input-number
                v-model="formData.zgaA09A230"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="雨量站(台)">
              <el-input-number
                v-model="formData.zgaA09A240"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="裂缝报警器(个)">
              <el-input-number
                v-model="formData.zgaA09A250"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="dzzsbbFormH4">地灾治理工作核查</h2>
          <div class="form-item-wapper">
            <el-form-item label="在建治理工程核查(处)">
              <el-input-number
                v-model="formData.zgaA09A260"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="已完成治理工程核查(处)">
              <el-input-number
                v-model="formData.zgaA09A270"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="灾害点踏堪(处)">
              <el-input-number
                v-model="formData.zgaA09A280"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="dzzsbbFormH9">安置点检查</h2>
          <div class="form-item-wapper">
            <el-form-item label="总数(个)">
              <el-input-number
                v-model="formData.zgaA09A290"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="需补评估的(个)">
              <el-input-number
                v-model="formData.zgaA09A300"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="需要治理的(个)">
              <el-input-number
                v-model="formData.zgaA09A310"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="新选址(个)">
              <el-input-number
                v-model="formData.zgaA09A320"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="dzzsbbFormH9">整改通知</h2>
          <div class="form-item-wapper">
            <el-form-item label="口头(份)">
              <el-input-number
                v-model="formData.zgaA09A340"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="书面(份)">
              <el-input-number
                v-model="formData.zgaA09A350"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="已回复(份)">
              <el-input-number
                v-model="formData.zgaA09A360"
                :controls="false"
                :max="9999"
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
                v-model="formData.zgaA09A990"
                placeholder
              ></el-input>
            </el-form-item>
            <!-- <comAttachment
              v-model="formData.attachments"
              :fileOption="otherFileOption"
              class="form-attachment"
            />-->
            <el-form-item label="报表联系人">
              <el-input v-model="formData.zgaA09A420" placeholder></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="formData.zgaA09A430" placeholder></el-input>
            </el-form-item>
            <el-form-item label="联系QQ">
              <el-input v-model="formData.zgaA09A440" placeholder></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      <el-button v-if="canEdit" type="primary" @click="saveForm"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "DzzsbbFormForm",
  components: { timeLine },
  computed: {
    formType() {
      return this.$route.meta.formType;
    },
    otherFileOption() {
      return {
        tag: ["其他附件"],
        upload: this.canEdit,
        accept: ""
      };
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
  data() {
    return {
      ownDisabled: false,
      rules: {
        zgaA09A020: [
          {
            required: true,
            trigger: "blur",
            message: "请选择市州"
          }
        ],
        zgaA09A030: [
          {
            required: true,
            trigger: "blur",
            message: "请选择区县"
          }
        ],
        zgaA09A060: [
          {
            required: true,
            trigger: "change",
            message: "类型不能为空"
          }
        ]
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
      ],
      formData: {
        zgaA09A020: "51",
        zgaA09A030: "5101",
        zgaA09A040: "",
        zgaA09A050: "",
        zgaA09A060: "",
        zgaA09A070: undefined,
        zgaA09A080: undefined,
        zgaA09A090: undefined,
        zgaA09A100: undefined,
        zgaA09A110: undefined,
        zgaA09A120: undefined,
        zgaA09A130: undefined,
        zgaA09A140: undefined,
        zgaA09A150: undefined,
        zgaA09A160: undefined,
        zgaA09A170: undefined,
        zgaA09A180: undefined,
        zgaA09A190: undefined,
        zgaA09A200: undefined,
        zgaA09A210: undefined,
        zgaA09A220: undefined,
        zgaA09A230: undefined,
        zgaA09A240: undefined,
        zgaA09A250: undefined,
        zgaA09A260: undefined,
        zgaA09A270: undefined,
        zgaA09A280: undefined,
        zgaA09A290: undefined,
        zgaA09A300: undefined,
        zgaA09A310: undefined,
        zgaA09A320: undefined,
        zgaA09A330: undefined,
        zgaA09A340: undefined,
        zgaA09A350: undefined,
        zgaA09A360: undefined,
        zgaA09A420: "",
        zgaA09A430: "",
        zgaA09A440: "",
        zgaA09A990: "",
        id: 0
      },
      canEdit: true,
      weekDate: null
    };
  },
  created() {
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/dzzsbb/edit";
      this.canEdit = true;
    } else {
      api = "report/dzzsbb/getById";
      this.canEdit = false;
    }
    if (this.formType != "create") {
      this.$store.dispatch(api, this.$route.query.id).then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
          this.weekDate = this.$util.weekToDate(this.formData.zgaA09A050);
        }
      });
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["dzzsbbForm"].clearValidate();
    }
  },
  methods: {
    weekChange(weekDate) {
      this.formData.zgaA09A050 = this.$util.dateToWeek(weekDate);
    },
    typeChange() {
      this.formData.zgaA09A050 = "";
      this.formData.zgaA09A040 = "";
      this.weekDate = null;
      this.$refs["dzzsbbForm"].clearValidate();
    },
    saveForm() {
      this.$refs["dzzsbbForm"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/dzzsbb/create", this.formData)
              .then(res => {
                this.ownDisabled = false;
                this.$util.addSaveConfirm(res.data.success);
              });
            //  编辑
          } else {
            this.$store
              .dispatch("report/dzzsbb/update", this.formData)
              .then(res => {
                this.$util.editSaveMessage(res.data.success);
                this.ownDisabled = false;
              });
          }
        } else {
          this.$message.error("验证未通过");
        }
      });
    }
  }
};
</script>
