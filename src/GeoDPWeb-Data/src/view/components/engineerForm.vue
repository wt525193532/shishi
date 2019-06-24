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
          <h2 ref="governProjectH1">工程基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
            <el-form-item label="治理工程名称" prop="projectName">
              <el-input v-model="formData.projectName"></el-input>
            </el-form-item>

            <el-form-item label="工程地理位置" prop="location">
              <el-input v-model="formData.location"></el-input>
            </el-form-item>

            <el-form-item label="隐患点治理期数" prop="period">
              <el-select v-model="formData.period" placeholder="请选择">
                <el-option label="一期" value="一期"></el-option>
                <el-option label="二期" value="二期"></el-option>
                <el-option label="三期" value="三期"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="governProjectH2">工程进展信息</h2>

          <div class="form-item-wapper">
            <el-form-item
              label="施工设计图开始时间"
              prop="designStartTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.designStartTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="施工设计图结束时间"
              prop="designEndTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.designEndTime"
              ></el-date-picker>
            </el-form-item>
            <br />
            <el-form-item
              label="招标阶段开始时间"
              prop="tenderStartTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.tenderStartTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="招标阶段结束时间"
              prop="tenderEndTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.tenderEndTime"
              ></el-date-picker>
            </el-form-item>
            <br />
            <el-form-item
              label="施工阶段开始时间"
              prop="buildStartTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.buildStartTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="施工阶段结束时间"
              prop="buildEndTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.buildEndTime"
              ></el-date-picker>
            </el-form-item>
            <br />
            <el-form-item
              label="初验时间"
              prop="primaryAcceptanceTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.primaryAcceptanceTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="终验申请时间"
              prop="finalStartTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.finalStartTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="终验结束时间"
              prop="finalEndTime"
              class="form-label-medium"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.finalEndTime"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="governProjectH3">工程信息</h2>

          <div class="form-item-wapper">
            <el-form-item
              label="省厅任务书下达文号"
              prop="provinceTaskNumber"
              class="form-label-medium"
            >
              <el-input v-model="formData.provinceTaskNumber"></el-input>
            </el-form-item>
            <el-form-item
              label="纳入生态扶贫考核年份"
              prop="assessmentYear"
              class="form-label-medium"
            >
              <el-select
                v-model="formData.assessmentYear"
                placeholder="请选择类型"
              >
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2017" value="2017"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="是否属生态扶贫地灾治理项目"
              label-width="200px"
              class="form-item-row"
              prop="isPovertyProject"
            >
              <el-radio-group v-model="formData.isPovertyProject">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="项目监管单位" prop="regulatoryUnit">
              <el-input v-model="formData.regulatoryUnit"></el-input>
            </el-form-item>

            <el-form-item label="项目实施单位" prop="buildUnit">
              <el-input v-model="formData.buildUnit"></el-input>
            </el-form-item>

            <el-form-item label="工程主要建设内容" prop="mainTask">
              <el-input
                type="textarea"
                :rows="1"
                v-model="formData.mainTask"
              ></el-input>
            </el-form-item>

            <el-form-item label="项目下达时间" prop="taskSentTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.taskSentTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="预计完工时间" prop="estimatedFinishTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.estimatedFinishTime"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="勘查单位" prop="surveyUnit">
              <el-input v-model="formData.surveyUnit"></el-input>
            </el-form-item>

            <el-form-item label="设计单位" prop="designUnit">
              <el-input v-model="formData.designUnit"></el-input>
            </el-form-item>

            <el-form-item label="监理单位" prop="supervisoryUnit">
              <el-input v-model="formData.supervisoryUnit"></el-input>
            </el-form-item>

            <el-form-item label="监理负责人" prop="supervisoryPerson">
              <el-input v-model="formData.supervisoryPerson"></el-input>
            </el-form-item>

            <el-form-item
              label="监理负责人及电话"
              prop="supervisoryPersonPhone"
            >
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.supervisoryPersonPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="施工单位" prop="foundationUnit">
              <el-input v-model="formData.foundationUnit"></el-input>
            </el-form-item>

            <el-form-item label="施工方现场负责人" prop="foundationPerson">
              <el-input v-model="formData.foundationPerson"></el-input>
            </el-form-item>

            <el-form-item label="施工负责人及电话" prop="foundationPersonPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.foundationPersonPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="预算资金(万元)" prop="budgetFunds">
              <el-input-number
                :controls="false"
                :min="0"
                :max="99999999"
                :precision="2"
                v-model.number="formData.budgetFunds"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="下达资金(万元)" prop="sentFunds">
              <el-input-number
                :controls="false"
                :min="0"
                :max="99999999"
                :precision="2"
                v-model.number="formData.sentFunds"
              ></el-input-number>
            </el-form-item>

            <el-form-item
              label="中央财政资金(万元)"
              prop="centralFinancialFunds"
              label-width="140px"
            >
              <el-input-number
                :controls="false"
                :min="0"
                :max="99999999"
                :precision="2"
                v-model.number="formData.centralFinancialFunds"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="决算资金(万元)" prop="finalAccounts">
              <el-input-number
                :controls="false"
                :min="0"
                :max="99999999"
                :precision="2"
                v-model.number="formData.finalAccounts"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                :rows="2"
                v-model="formData.remark"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="governProjectH4">文件或照片</h2>
          <comAttachment
            v-model="formData.attachments"
            :fileOption="fileOption"
            class="form-attachment"
          />
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="saveFormSub" :disabled="ownDisabled">
        {{ disabled === false ? "保存" : "返回" }}
      </el-button>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "./basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "EngineerForm",
  components: { basicinfoSelector, timeLine },
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
        projectName: [{ max: 200, message: "长度在 200 个字符以内" }],
        longitude: [
          { required: true, message: "请输入经度", trigger: "blur" },
          {
            type: "number",
            max: 104.866667,
            min: 102.9,
            message: "请输入有效的范围 102° 54′ ~ 104°.53 ",
            trigger: "blur"
          }
        ],
        buildStartTime: [
          { required: true, message: "请输入时间", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "请输入纬度", trigger: "blur" },
          {
            type: "number",
            max: 31.433333,
            min: 30.083333,
            message: "请输入有效的范围 30° 05′ ~ 31°.26",
            trigger: "blur"
          }
        ],
        period: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点治理期数不能为空"
          }
        ],
        location: [{ max: 500, message: "长度在 500 个字符以内" }],
        provinceTaskNumber: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "省厅任务书下达文号不能为空"
          }
        ],

        regulatoryUnit: [{ max: 200, message: "长度在 200 个字符以内" }],
        buildUnit: [{ max: 200, message: "长度在 200 个字符以内" }],
        mainTask: [{ max: 1000, message: "长度在 1000 个字符以内" }],
        surveyUnit: [{ max: 200, message: "长度在 200 个字符以内" }],
        designUnit: [{ max: 200, message: "长度在 200 个字符以内" }],
        supervisoryUnit: [{ max: 200, message: "长度在 200 个字符以内" }],
        supervisoryPerson: [{ max: 20, message: "长度在 1000 个字符以内" }],
        supervisoryPersonPhone: [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        foundationUnit: [{ max: 200, message: "长度在 200 个字符以内" }],
        foundationPerson: [{ max: 20, message: "长度在 20 个字符以内" }],
        foundationPersonPhone: [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        budgetFunds: [
          {
            pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: " 请输入小数部分不超过两位数的正数",
            trigger: "blur"
          }
        ],
        sentFunds: [
          {
            pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: " 请输入小数部分不超过两位数的正数",
            trigger: "blur"
          }
        ],
        centralFinancialFunds: [
          {
            pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: " 请输入小数部分不超过两位数的正数",
            trigger: "blur"
          }
        ],
        finalAccounts: [
          {
            pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: " 请输入小数部分不超过两位数的正数",
            trigger: "blur"
          }
        ],
        remark: [{ max: 500, message: "长度在 500 个字符以内" }],
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
  updated() {
    if (!this.canEdit) {
      this.$refs["governProject"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveFormSub() {
      this.$refs["governProject"].validate(async valid => {
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
