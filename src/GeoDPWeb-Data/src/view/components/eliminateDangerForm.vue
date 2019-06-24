<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        :disabled="disabled"
        inline
        :model="formData"
        ref="reportExcludeDanger"
        label-width="140px"
        :rules="rules"
      >
        <div class="form-item">
          <h2 ref="reportExcludeDangerH1">基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
          </div>
        </div>
        <div class="form-item">
          <h2 ref="reportExcludeDangerH2">工程基本信息</h2>

          <div class="form-item-wapper">
            <el-form-item
              label="省厅任务书下达文号"
              prop="provinceTaskNumber"
              class="form-label-medium"
            >
              <el-input v-model="formData.provinceTaskNumber"></el-input>
            </el-form-item>

            <el-form-item label="实施年度" prop="buildYear">
              <el-date-picker
                type="year"
                placeholder="选择年度"
                v-model="formData.buildYear"
              ></el-date-picker>
            </el-form-item>
            <br />
            <el-form-item label="建设单位" prop="buildUnit.name">
              <el-input v-model="formData.buildUnit.name"></el-input>
            </el-form-item>

            <el-form-item label="负责人" prop="buildUnit.owner">
              <el-input v-model="formData.buildUnit.owner"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="buildUnit.ownerPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.buildUnit.ownerPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="勘查单位" prop="surveyUnit.name">
              <el-input v-model="formData.surveyUnit.name"></el-input>
            </el-form-item>

            <el-form-item label="负责人" prop="surveyUnit.owner">
              <el-input v-model="formData.surveyUnit.owner"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="surveyUnit.ownerPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.surveyUnit.ownerPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="设计单位" prop="designUnit.name">
              <el-input v-model="formData.designUnit.name"></el-input>
            </el-form-item>

            <el-form-item label="负责人" prop="designUnit.owner">
              <el-input v-model="formData.designUnit.owner"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="designUnit.ownerPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.designUnit.ownerPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="施工单位" prop="constructionUnit.name">
              <el-input v-model="formData.constructionUnit.name"></el-input>
            </el-form-item>

            <el-form-item label="负责人" prop="constructionUnit.owner">
              <el-input v-model="formData.constructionUnit.owner"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="constructionUnit.ownerPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.constructionUnit.ownerPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="监理单位" prop="supervisoryUnit.name">
              <el-input v-model="formData.supervisoryUnit.name"></el-input>
            </el-form-item>

            <el-form-item label="负责人" prop="supervisoryUnit.owner">
              <el-input v-model="formData.supervisoryUnit.owner"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="supervisoryUnit.ownerPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.supervisoryUnit.ownerPhone"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="是否属生态扶贫地灾治理项目"
              class="form-label-lg"
            >
              <el-radio-group v-model="formData.isPovertyProject">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="纳入生态扶贫考核年份"
              class="form-label-medium"
            >
              <el-select
                v-model="formData.povertyYear"
                placeholder="请选择类型"
              >
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2017" value="2017"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="reportExcludeDangerH3">施工信息</h2>

          <div class="form-item-wapper">
            <el-form-item label="工程建设任务" prop="buildTask">
              <el-input v-model="formData.buildTask"></el-input>
            </el-form-item>

            <el-form-item label="主要措施" prop="mainMeasures">
              <el-input v-model="formData.mainMeasures"></el-input>
            </el-form-item>

            <el-form-item label="工程特点" prop="features">
              <el-input v-model="formData.features"></el-input>
            </el-form-item>

            <el-form-item label="工程结构" prop="structure">
              <el-input v-model="formData.structure"></el-input>
            </el-form-item>

            <el-form-item label="开工时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.startTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="竣工时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.finishTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="工程预算(万元)" prop="budgetFunds">
              <el-input-number
                :controls="false"
                :min="0"
                :precision="2"
                :max="99999999"
                v-model.number="formData.budgetFunds"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="工程结算(万元)" prop="finalAccounts">
              <el-input v-model="formData.finalAccounts"></el-input>
            </el-form-item>

            <el-form-item label="工程总工期(月)">
              <el-input-number
                :controls="false"
                :min="0"
                :precision="0"
                :max="99999999"
                v-model.number="formData.totalMonths"
              ></el-input-number>
            </el-form-item>

            <el-form-item
              label="工程概况(主要过程)"
              prop="info"
              label-width="140px"
            >
              <el-input v-model="formData.info"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="reportExcludeDangerH4">竣工验收信息</h2>

          <div class="form-item-wapper">
            <el-form-item label="验收时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.finalAcceptanceTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="验收组织单位" prop="acceptanceUnit">
              <el-input v-model="formData.acceptanceUnit"></el-input>
            </el-form-item>

            <el-form-item label="验收主要参与成员" prop="acceptanceMainPersons">
              <el-input v-model="formData.acceptanceMainPersons"></el-input>
            </el-form-item>

            <el-form-item label="验收意见" prop="acceptanceOptions">
              <el-input v-model="formData.acceptanceOptions"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>
    <div class="form-foot-btn" v-show="noBtn">
      <el-button type="primary" @click="saveFormSub" :disabled="ownDisabled">{{
        disabled === false ? "保存" : "返回"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "./basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "EliminateDanger",
  data() {
    return {
      ownDisabled: false,
      rules: {
        provinceTaskNumber: [
          { max: 20, message: "长度在20 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "省厅任务书下达文号不能为空"
          }
        ],
        buildTask: [{ max: 20, message: "长度在20 个字符以内" }],
        mainMeasures: [{ max: 500, message: "长度在500 个字符以内" }],
        features: [{ max: 3000, message: "长度在3000 个字符以内" }],
        structure: [{ max: 2000, message: "长度在2000 个字符以内" }],
        info: [{ max: 2000, message: "长度在2000 个字符以内" }],
        budgetFunds: [{ type: "number" }],
        finalAccounts: [{ type: "number" }],
        acceptanceUnit: [{ max: 200, message: "长度在200 个字符以内" }],
        acceptanceMainPersons: [{ max: 500, message: "长度在500 个字符以内" }],
        acceptanceOptions: [{ max: 1000, message: "长度在1000 个字符以内" }],
        "buildUnit.name": [
          {
            required: true,
            trigger: "blur",
            message: "建设单位不能为空"
          },
          { max: 128, message: "长度在128 个字符以内" }
        ],
        "buildUnit.owner": [{ max: 20, message: "长度在20 个字符以内" }],
        "buildUnit.ownerPhone": [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        "surveyUnit.name": [
          {
            required: true,
            trigger: "blur",
            message: "勘查单位不能为空"
          },
          { max: 128, message: "长度在128 个字符以内" }
        ],
        "surveyUnit.owner": [{ max: 20, message: "长度在20 个字符以内" }],
        "surveyUnit.ownerPhone": [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        "designUnit.name": [
          {
            required: true,
            trigger: "blur",
            message: "设计单位不能为空"
          },
          { max: 128, message: "长度在128 个字符以内" }
        ],
        "designUnit.owner": [{ max: 20, message: "长度在20 个字符以内" }],
        "designUnitowner.ownerPhone": [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        "constructionUnit.name": [
          {
            required: true,
            trigger: "blur",
            message: "施工单位不能为空"
          },
          { max: 128, message: "长度在128 个字符以内" }
        ],
        "constructionUnit.owner": [{ max: 20, message: "长度在20 个字符以内" }],
        "constructionUnit.ownerPhone": [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        "supervisoryUnit.name": [
          {
            required: true,
            trigger: "blur",
            message: "监理单位不能为空"
          },
          { max: 128, message: "长度在128 个字符以内" }
        ],
        "supervisoryUnit.owner": [{ max: 20, message: "长度在20 个字符以内" }],
        "supervisoryUnit.ownerPhone": [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        code: [
          { max: 12, message: "长度在 12 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点编号不能为空"
          }
        ]
      }
    };
  },
  props: {
    disabled: Boolean,
    formData: {
      type: Object,
      default: null
    },
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    noBtn: {
      type: Boolean,
      default: true
    }
  },
  components: { basicinfoSelector, timeLine },
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
  updated() {
    if (!this.canEdit) {
      this.$refs["reportExcludeDanger"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveFormSub() {
      if (this.disabled) {
        this.$router.go(-1);
      }
      this.$refs["reportExcludeDanger"].validate(async valid => {
        if (valid) {
          if (this.formData.site.code) {
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
