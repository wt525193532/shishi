<template>
  <div class="page-container">
    <div class="clearfix" v-if="disabled && !isFromQuery">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#eliminateDangerPrint'"
        >打印表单</el-button
      >
    </div>
    <div class="form-wrapper" id="eliminateDangerPrint">
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
                <!-- <el-date-picker
                @change="testdata"
                v-model.number="formData.buildYear"
                type="year"
                placeholder="选择年"
                value-format="yyyy"
                ></el-date-picker>-->
                <el-input-number
                  :controls="false"
                  placeholder="请输入年度"
                  v-model="formData.buildYear"
                  :min="0"
                  :max="9999"
                ></el-input-number>
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
                class="form-label-long"
                prop="povertyYear"
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

              <el-form-item
                label="验收主要参与成员"
                prop="acceptanceMainPersons"
              >
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
      <div class="form-foot-btn">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        <el-button v-if="!disabled" type="primary" @click="saveForm"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "@/view/components/basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "EliminateDanger",
  props: {
    codeData: Object,
    isFromQuery: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
        buildYear: [
          {
            required: true,
            trigger: "blur",
            message: "请输入实施年度"
          },
          {
            pattern: /^(1949|19[5-9]\d|20\d{2}|2100)$/,
            trigger: "blur",
            message: "请输入正确的年份！"
          }
        ],
        povertyYear: [
          {
            required: true,
            trigger: "change",
            message: "纳入生态扶贫考核年份不能为空"
          }
        ],
        budgetFunds: [{ type: "number" }],
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
      },
      formData: {
        provinceTaskNumber: "",
        buildYear: null,
        isPovertyProject: true,
        povertyYear: null,
        buildTask: "",
        mainMeasures: "",
        features: "",
        structure: "",
        info: "",
        totalMonths: 0,
        startTime: "",
        finishTime: "",
        budgetFunds: 0,
        finalAccounts: 0,
        finalAcceptanceTime: "",
        acceptanceUnit: "",
        acceptanceMainPersons: "",
        acceptanceOptions: "",
        buildUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        surveyUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        designUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        constructionUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        supervisoryUnit: {
          elminateInfoId: 0,
          unitType: 10,
          name: "",
          owner: "",
          ownerPhone: "",
          id: 0
        },
        site: {
          disasterTypeCode: "",
          name: "",
          developmentTrendCode: "",
          townCode: "",
          village: "",
          group: "",
          location: "",
          longitude: 0,
          latitude: 0,
          yaw: 0,
          isCanceled: true,
          cancelTime: "",
          cancelReason: "",
          disasterScale: 0,
          disasterScaleLevel: 0,
          threatProperty: 0,
          threatHouses: 0,
          threatPeople: 0,
          preventOwnerName: "",
          preventOwnerPhone: "",
          monitorOwnerName: "",
          monitorOwnerPhone: "",
          monitorName: "",
          monitorPhone: "",
          code: "",
          countryApproval: "",
          countryComment: "",
          countryApprovalTime: "",
          cityApproval: "",
          cityComment: "",
          cityApprovalTime: "",
          adminCode: "",
          admin: {
            province: "",
            city: "",
            country: "",
            town: ""
          },
          status: 0,
          id: 0
        },
        processes: [
          {
            node: {
              flowID: 0,
              name: "",
              preNodeID: 0,
              nextNodeID: 0,
              id: 0
            },
            formId: 0,
            handler: {
              userName: "",
              name: "",
              id: 0
            },
            handleTime: "",
            opinion: 0,
            type: 0,
            comment: ""
          }
        ],
        code: "",
        countryApproval: "",
        countryComment: "",
        countryApprovalTime: "",
        cityApproval: "",
        cityComment: "",
        cityApprovalTime: "",
        adminCode: "",
        admin: {
          province: "",
          city: "",
          country: "",
          town: ""
        },
        status: 0,
        id: 0
      },
      disabled: true,
      canEdit: false
    };
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
    },
    formType() {
      return this.$route.meta.formType;
    }
  },
  created() {
    let api;
    if (this.formType == "create") {
      this.disabled = false;
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/eliminateDanger/edit";
      this.disabled = false;
      this.canEdit = false;
    } else {
      api = "querypage/eliminateDanger/getById";
      this.disabled = true;
      this.canEdit = false;
    }
    if (this.formType != "create" && !this.isFromQuery) {
      this.$store.dispatch(api, this.$route.query.id).then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
          if (this.formData.processes == []) {
            this.formData.processes = [
              {
                node: {
                  flowID: 0,
                  name: "",
                  preNodeID: 0,
                  nextNodeID: 0,
                  id: 0
                },
                formId: 0,
                handler: {
                  userName: "",
                  name: "",
                  id: 0
                },
                handleTime: "",
                opinion: 0,
                type: 0,
                comment: ""
              }
            ];
          }
          if (this.formData.buildUnit == null) {
            this.formData.buildUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.surveyUnit == null) {
            this.formData.surveyUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.designUnit == null) {
            this.formData.designUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.constructionUnit == null) {
            this.formData.constructionUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
          if (this.formData.supervisoryUnit == null) {
            this.formData.supervisoryUnit = {
              elminateInfoId: 0,
              unitType: 10,
              name: "",
              owner: "",
              ownerPhone: "",
              id: 0
            };
          }
        }
      });
    } else if (this.isFromQuery) {
      this.formData = this.codeData;
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
    saveForm() {
      this.$refs["reportExcludeDanger"].validate(async valid => {
        if (valid) {
          if (this.formData.site.code) {
            // 新增
            if (this.formType == "create") {
              let flag;
              flag = await this.$store
                .dispatch("report/eliminateDanger/create", this.formData)
                .then(async res => {
                  flag = await this.$util.addSaveConfirm(res.data.success);
                  if (!flag) {
                    this.formData.site = {
                      code: "",
                      admin: {}
                    };
                    this.formData.code = "";
                  }
                });
              // 编辑
            } else {
              this.$store
                .dispatch("report/eliminateDanger/update", this.formData)
                .then(res => {
                  this.$util.editSaveMessage(res.data.success);
                });
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
  }
};
</script>
