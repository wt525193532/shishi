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
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="zzjcH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州" prop="zgaA02A030">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县" prop="zgaA02A030">
              <el-select
                v-model="formData.zgaA02A030"
                :disabled="currenLevel == 3 || !canEdit"
                placeholder
              >
                <el-option
                  v-for="item in townList.children"
                  :key="item.adminCode"
                  :label="item.displayName"
                  :value="item.adminCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="实施年度">
              <el-date-picker
                type="year"
                v-model="formData.zgaA02A050"
                placeholder="选择年度"
                value-format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="省级任务书编号" prop="zgaA02A060">
              <!-- <el-cascader :options="options" clearable></el-cascader> -->
              <el-input v-model="formData.zgaA02A060" placeholder></el-input>
            </el-form-item>
            <el-form-item label="市州任务书编号">
              <el-input v-model="formData.zgaA02A070" placeholder></el-input>
            </el-form-item>
            <el-form-item label="中省任务控制数">
              <el-input-number
                v-model="formData.zgaA02A080"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="实际部署数">
              <el-input-number
                v-model="formData.zgaA02A090"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="实际完成数">
              <el-input-number
                v-model="formData.zgaA02A110"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item
              label="属于建档立卡贫困户的专职监测人员数"
              label-width="260px"
            >
              <el-input-number
                v-model="formData.zgaA02A100"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zzjcH4">资金来源</h2>
          <div class="form-item-wapper">
            <el-form-item label="中省资金(万元)">
              <el-input-number
                v-model="formData.zgaA02A120"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="市级资金(万元)">
              <el-input-number
                v-model="formData.zgaA02A130"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="县级资金(万元)">
              <el-input-number
                v-model="formData.zgaA02A140"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="zzjcH4">资金使用</h2>
          <div class="form-item-wapper">
            <el-form-item label="实际拨付资金(万元)">
              <el-input-number
                v-model="formData.zgaA02A150"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="中省资金(万元)">
              <el-input-number
                v-model="formData.zgaA02A160"
                :controls="false"
                :precision="2"
                :max="99999999.99"
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
                v-model="formData.zgaA02A990"
                placeholder
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
  name: "ZzjcForm",
  components: { timeLine },
  data() {
    return {
      ownDisabled: false,
      rules: {
        zgaA02A020: [
          {
            required: true,
            trigger: "blur",
            message: "请选择市州"
          }
        ],
        zgaA02A030: [
          {
            required: true,
            trigger: "blur",
            message: "请选择区县"
          }
        ],
        zgaA02A060: [
          { max: 100, message: "长度在 100 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "省级任务书编号不能为空"
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
        zgaA02A020: "510100",
        zgaA02A030: "",
        zgaA02A040: "",
        zgaA02A050: "",
        zgaA02A060: "",
        zgaA02A070: "",
        zgaA02A080: undefined,
        zgaA02A090: undefined,
        zgaA02A100: undefined,
        zgaA02A110: undefined,
        zgaA02A120: undefined,
        zgaA02A130: undefined,
        zgaA02A140: undefined,
        zgaA02A150: undefined,
        zgaA02A160: undefined,
        zgaA02A990: "",
        id: 0
      },
      canEdit: true,
      townList: {}
    };
  },
  computed: {
    formType() {
      return this.$route.meta.formType;
    },
    currenLevel() {
      return this.$store.getters.area.level;
    },
    user() {
      return this.$store.getters.area;
    },
    fileOption() {
      return {
        tag: ["附件上传"],
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
  created() {
    this.$store
      .dispatch("organization/getAdministrative", "510100")
      .then(res => {
        if (this.currenLevel == 3) {
          this.formData.zgaA02A030 = this.user.adminCode;
        }
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/zzjc/edit";
      this.canEdit = true;
    } else {
      api = "report/zzjc/getById";
      this.canEdit = false;
    }
    if (this.formType != "create") {
      this.$store.dispatch(api, this.$route.query.id).then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["zzjc"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["zzjc"].validate(async valid => {
        if (valid) {
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/zzjc/create", this.formData)
              .then(res => {
                this.ownDisabled = false;
                if (this.$util.addSaveConfirm(res.data.success)) {
                  this.formData.zgaA02A030 =
                    this.formData.zgaA02A030 + "000000";
                }
              });
            //  编辑
          } else {
            this.$store
              .dispatch("report/zzjc/update", this.formData)
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
