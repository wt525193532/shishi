<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-suffix="："
        inline
        :model="formData"
        label-width="140px"
        :rules="rules"
        ref="RelocationAvoidance"
        :disabled="disabled"
      >
        <div class="form-item">
          <h2 ref="RelocationAvoidanceH1">基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
          </div>
        </div>
        <div class="form-item">
          <h2 ref="RelocationAvoidanceH2">明细信息</h2>
          <div class="form-item-wapper">
            <el-form-item
              label="省厅任务下达文号"
              prop="provinceTaskNumber"
              class="form-label-medium"
            >
              <el-input v-model="formData.provinceTaskNumber"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="完成时限" class="form-label-medium">
              <el-date-picker
                v-model="formData.finishDeadline"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="完成时间" class="form-label-medium">
              <el-date-picker
                v-model="formData.finishTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="单户户主"
              prop="houseHolder"
              class="form-label-medium"
            >
              <el-input v-model="formData.houseHolder"></el-input>
            </el-form-item>

            <el-form-item
              label="单户搬迁人数"
              class="form-label-medium"
              prop="relocationPersons"
            >
              <el-input v-model="formData.relocationPersons"></el-input>
            </el-form-item>

            <el-form-item label="纳入脱贫计划年度" class="form-label-medium">
              <el-select
                v-model="formData.antiPovertyYear"
                placeholder="请选择"
              >
                <el-option label="2015" value="2015"></el-option>
                <el-option label="2016" value="2016"></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item
              label="安置方式"
              prop="placeTypeCode"
              class="form-label-medium"
            >
              <el-select v-model="formData.placeTypeCode" placeholder="请选择">
                <el-option
                  v-for="(name, id) in $t('codes.PlaceType')"
                  :key="id"
                  :label="name"
                  :value="id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="集中或分散安置点名"
              prop="locationName"
              class="form-label-medium"
            >
              <el-input v-model="formData.locationName"></el-input>
            </el-form-item>

            <el-form-item
              label="过渡安置点名称"
              prop="transLocationName"
              class="form-label-medium"
            >
              <el-input v-model="formData.transLocationName"></el-input>
            </el-form-item>

            <el-form-item label="自主安置入住时间" class="form-label-medium">
              <el-date-picker
                v-model="formData.transitionInTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="原址是否拆除" class="form-label-medium">
              <el-select v-model="formData.isDemolished" placeholder="请选择">
                <el-option label="未拆除" :value="true"></el-option>
                <el-option label="已拆除" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="旧房拆除时间" class="form-label-medium">
              <el-date-picker
                v-model="formData.houseDismantleTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="集中或分散安置入住时间"
              class="form-label-long"
            >
              <el-date-picker
                v-model="formData.relocationTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="迁入地是否存在地灾隐患"
              class="form-label-long"
            >
              <el-select v-model="formData.isDangerInNew" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="迁入地生产生活条件改善情况"
              prop="improveInfoCode"
              class="form-label-lg"
            >
              <el-select
                v-model="formData.improveInfoCode"
                placeholder="请选择"
              >
                <el-option
                  v-for="(value, key) in $t('codes.ImproveInfo')"
                  :key="key"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="明细信息是否公示" class="form-label-medium">
              <el-select
                v-model="formData.isPublishedDetail"
                placeholder="请选择"
              >
                <el-option label="已公示" :value="true"></el-option>
                <el-option label="未公示" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否对搬迁工作认同" class="form-label-medium">
              <el-select v-model="formData.isAccepted" placeholder="请选择">
                <el-option label="认同" :value="true"></el-option>
                <el-option label="不认同" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="认同情况原因"
              prop="acceptanceReasons"
              class="form-label-medium"
            >
              <el-input
                type="textarea"
                v-model="formData.acceptanceReasons"
              ></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="remark" class="form-label-medium">
              <el-input
                type="textarea"
                v-model="formData.remark"
                class="input-textarea"
              ></el-input>
            </el-form-item>
            <br />
            <el-form-item label="是否属贫困户" class="form-label-medium">
              <el-radio-group v-model="formData.isPoorHouseholds">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="搬迁户类型"
              class="form-label-medium"
              prop="relocationTypeCode"
            >
              <el-radio-group v-model="formData.relocationTypeCode">
                <el-radio
                  v-for="(value, key) in $t('codes.RelocationType')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-radio
                >
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="搬迁进度"
              class="form-label-medium"
              prop="relocationProcessCode"
            >
              <el-radio-group v-model="formData.relocationProcessCode">
                <el-radio
                  v-for="(value, key) in $t('codes.RelocationProcess')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="RelocationAvoidanceH3">搬迁户申请信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="家庭人口" prop="familyMembers">
              <el-input v-model.number="formData.familyMembers"></el-input>
            </el-form-item>

            <el-form-item label="农户联系电话" prop="houseHolderPhone">
              <el-input v-model="formData.houseHolderPhone"></el-input>
            </el-form-item>

            <el-form-item label="拟建房地址" prop="planBuildLocation">
              <el-input v-model="formData.planBuildLocation"></el-input>
            </el-form-item>

            <el-form-item label="旧房面积(m2)" prop="oldHouseArea">
              <el-input-number
                :controls="false"
                :min="0"
                :max="999999"
                :precision="2"
                v-model.number="formData.oldHouseArea"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="申请信息是否公示">
              <el-select
                v-model="formData.isPublishedApply"
                placeholder="请选择"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="申请时间" prop="applyTime">
              <el-date-picker
                v-model="formData.applyTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="组(社)意见" prop="groupSuggestion">
              <el-input
                type="textarea"
                v-model="formData.groupSuggestion"
              ></el-input>
            </el-form-item>

            <el-form-item label="村意见" prop="vallageSuggestion">
              <el-input
                type="textarea"
                v-model="formData.vallageSuggestion"
              ></el-input>
            </el-form-item>

            <el-form-item label="乡(镇)意见" prop="townSuggestion">
              <el-input
                type="textarea"
                v-model="formData.townSuggestion"
              ></el-input>
            </el-form-item>

            <el-form-item label="区(市)国土局意见" prop="landBureauSuggestion">
              <el-input
                type="textarea"
                v-model="formData.landBureauSuggestion"
              ></el-input>
            </el-form-item>

            <el-form-item label="是否为市级监测点">
              <el-radio-group v-model="formData.isCityMonitor">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否为区(县)监测点" class="form-label-medium">
              <el-radio-group v-model="formData.isCountryMonitor">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="RelocationAvoidanceH4">建房验收信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="是否已验收">
              <el-select v-model="formData.isAcceptanced" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="验收日期">
              <el-date-picker
                v-model="formData.acceptanceTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="旧房面积(m2)">
              <el-input-number
                :controls="false"
                :min="0"
                :max="999999"
                :precision="2"
                v-model.number="formData.oldHouseArea"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="申请信息是否公示">
              <el-select
                v-model="formData.isPublishedApply"
                placeholder="请选择"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="新住房地址" prop="newHouseAddress">
              <el-input v-model="formData.newHouseAddress"></el-input>
            </el-form-item>

            <el-form-item label="新住房面积(m2)" prop="newHouseArea">
              <el-input-number
                :controls="false"
                :min="0"
                :max="999999"
                :precision="2"
                v-model.number="formData.newHouseArea"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="补助标准(元)" prop="subsidyMoney">
              <el-input-number
                :controls="false"
                :min="0"
                :max="999999"
                :precision="2"
                v-model.number="formData.subsidyMoney"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="被补助人" prop="subsidyPerson">
              <el-input v-model="formData.subsidyPerson"></el-input>
            </el-form-item>

            <el-form-item label="村(组)验收意见" prop="vallageOpinions">
              <el-input
                type="textarea"
                v-model="formData.vallageOpinions"
              ></el-input>
            </el-form-item>

            <el-form-item label="乡(镇)验收意见" prop="townOpinions">
              <el-input
                type="textarea"
                v-model="formData.townOpinions"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="区(市)国土验收意见:"
              prop="landBureauOpinions"
              class="form-label-medium"
            >
              <el-input
                type="textarea"
                v-model="formData.landBureauOpinions"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="form-item">
            <h2 ref="RelocationAvoidanceH5">文件或照片</h2>
            <comAttachment
              v-model="formData.attachments"
              :fileOption="fileOption"
              class="form-attachment"
            />
          </div>
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>
    <div class="form-foot-btn">
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
  name: "RelocationAvoidance",
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
  updated() {
    if (!this.canEdit) {
      this.$refs["RelocationAvoidance"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveFormSub() {
      if (this.disabled) {
        this.$router.go(-1);
      } else {
        this.$refs["RelocationAvoidance"].validate(async valid => {
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
      }
    }
  },
  data() {
    return {
      ownDisabled: false,
      rules: {
        applyTime: [
          {
            required: true,
            message: "必须输入数字值",
            trigger: "blur"
          }
        ],
        relocationPersons: [
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入正整数",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "必须输入数字值" }],
        newHouseArea: [{ type: "number", message: "必须输入数字值" }],
        oldHouseArea: [{ type: "number", message: "必须输入数字值" }],
        provinceTaskNumber: [
          { required: true, message: "请输入文号", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 20个字符", trigger: "blur" }
        ],
        houseHolder: [
          { required: true, message: "请输入户主", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 20个字符", trigger: "blur" }
        ],
        relocationTypeCode: [{ required: true, message: "请选择类型" }],
        relocationProcessCode: [{ required: true, message: "请选择进度" }],
        placeTypeCode: [
          { required: true, min: 0, max: 2, message: "请选择安置方式" }
        ],
        improveInfoCode: [{ required: true, message: "请选择改善情况" }],
        acceptanceReasons: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        locationName: [{ min: 0, max: 200, message: "长度在 0 到 200个字符" }],
        transLocationName: [
          { min: 0, max: 200, message: "长度在 0 到 200个字符" }
        ],
        remark: [{ min: 0, max: 500, message: "长度在 0 到 500个字符" }],
        houseHolderPhone: [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        planBuildLocation: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 0, max: 200, message: "长度在 0 到 200个字符" }
        ],
        vallageSuggestion: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        townSuggestion: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        landBureauSuggestion: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        newHouseAddress: [
          { min: 0, max: 200, message: "长度在 0 到 200个字符" }
        ],
        subsidyPerson: [{ min: 0, max: 20, message: "长度在 0 到 20个字符" }],
        vallageOpinions: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        townOpinions: [{ min: 0, max: 500, message: "长度在 0 到 500个字符" }],
        landBureauOpinions: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        groupSuggestion: [
          { min: 0, max: 500, message: "长度在 0 到 500个字符" }
        ],
        subsidyMoney: [{ type: "number", message: "必须输入数字值" }]
      }
    };
  },
  mounted() {}
};
</script>
