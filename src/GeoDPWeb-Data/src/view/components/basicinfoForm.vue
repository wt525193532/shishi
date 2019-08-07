<template>
  <div class="basicinfo-form form-wrapper">
    <div class="form-wapper-it">
      <el-form
        ref="basicinfo-form"
        label-suffix="："
        :rules="rules"
        label-width="140px"
        inline
        :disabled="!canEdit"
        :model="formData"
      >
        <div class="form-item">
          <h2 ref="reportBasicInfoFormH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="隐患点名称" prop="name">
              <el-input
                placeholder="请输入隐患点名称"
                v-model="formData.name"
              ></el-input>
            </el-form-item>

            <el-form-item label="隐患点类型" prop="disasterTypeCode">
              <el-select
                :disabled="!isDisabled"
                clearable
                @change="disasterTypeChange"
                v-model="formData.disasterTypeCode"
                placeholder="请选择隐患点类型"
              >
                <el-option
                  v-for="(value, key) in $t('codes.DisasterType')"
                  :key="key"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="统一编号"
              :class="isDisabled ? 'form-item-btn' : ''"
              prop="code"
            >
              <el-input v-model="formData.code" disabled></el-input>
              <el-button
                icon="el-icon-d-arrow-left"
                v-if="isDisabled"
                @click="creatCode"
                >生成</el-button
              >
            </el-form-item>

            <div v-if="formData.disasterTypeCode == '00'">
              <el-form-item label="发展趋势" prop="developmentTrendCode">
                <el-select
                  clearable
                  v-model="formData.developmentTrendCode"
                  placeholder="请选择发展趋势"
                >
                  <el-option
                    v-for="(value, key) in $t('codes.DevelopmentTrend')"
                    :key="key"
                    :label="value"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-form-item label="省">
              <el-select value="四川省" disabled></el-select>
            </el-form-item>

            <el-form-item label="市州">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>

            <el-form-item label="区县">
              <el-select
                v-if="currenLevel >= 3 && canEdit"
                :value="townList.displayName"
                disabled
              ></el-select>
              <el-select
                @change="countryChange($event)"
                v-else-if="isDisabled"
                v-model="formData.admin.countryCode"
              >
                <el-option
                  v-for="(item, index) in countryList.children"
                  :key="index"
                  :label="item.displayName"
                  :value="item.adminCode"
                ></el-option>
              </el-select>
              <el-select
                v-else
                :value="formData.admin.country"
                disabled
              ></el-select>
            </el-form-item>

            <el-form-item label="乡镇" prop="townCode">
              <el-select
                v-if="currenLevel >= 3 && canEdit"
                v-model="formData.townCode"
              >
                <el-option
                  v-for="(item, index) in townList.children"
                  :key="index"
                  :label="item.displayName"
                  :value="item.adminCode"
                ></el-option>
              </el-select>
              <el-select
                v-else-if="canEdit"
                v-model="formData.townCode"
                no-data-text="请先选择区县！"
              >
                <el-option
                  v-for="(item, index) in townList.children"
                  :key="index"
                  :label="item.displayName"
                  :value="item.adminCode"
                ></el-option>
              </el-select>
              <el-select
                v-else
                :value="formData.admin.town"
                placeholder
              ></el-select>
            </el-form-item>
            <el-form-item label="村" prop="village">
              <el-input
                v-model="formData.village"
                placeholder="请输入村"
              ></el-input>
            </el-form-item>

            <el-form-item label="组" prop="group">
              <el-input
                v-model="formData.group"
                placeholder="请输入组"
              ></el-input>
            </el-form-item>

            <el-form-item label="地理位置" prop="location">
              <el-input
                placeholder="请输入地理位置"
                v-model="formData.location"
              ></el-input>
            </el-form-item>

            <el-form-item label="经度" prop="longitude" class="form-item-jwd">
              <JWDBoom
                :max="110"
                :min="100"
                placeholder="100 ~ 110"
                v-model="formData.longitude"
              ></JWDBoom>
            </el-form-item>

            <el-form-item
              label="纬度"
              prop="latitude"
              class="form-item-jwd-btn"
            >
              <JWDBoom
                :max="35"
                :min="30"
                placeholder="30 ~ 35"
                style="display: inline-block;"
                v-model.number="formData.latitude"
              ></JWDBoom>
              <el-button icon="el-icon-zoom-in">地图</el-button>
            </el-form-item>

            <el-form-item label="方向(度)" prop="yaw">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入方向，范围在0°-359°"
                :max="359"
                v-model.number="formData.yaw"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="灾害规模" prop="disasterScale">
              <el-input-number
                :controls="false"
                :min="0"
                :precision="2"
                placeholder="请输入灾害面积"
                :max="99999999"
                v-model.number="formData.disasterScale"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="隐患点发现时间" prop="discoveryDate">
              <el-date-picker
                type="date"
                format="yyyy 年 MM 月 dd 日"
                placeholder="选择日期"
                v-model="formData.discoveryDate"
              ></el-date-picker>
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

            <el-form-item label="威胁户数(户)" prop="threatHouses">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入威胁户数"
                :max="99999999"
                v-model.number="formData.threatHouses"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="威胁财产(万元)" prop="threatProperty">
              <el-input-number
                :controls="false"
                :precision="2"
                :min="0"
                placeholder="请输入威胁财产"
                :max="99999999"
                v-model.number="formData.threatProperty"
              ></el-input-number>
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

            <el-form-item label="是否转其他行业" class="form-item-row">
              <el-radio-group v-model="formData.isTransferred">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              v-if="formData.isTransferred"
              label="行业"
              class="form-item-row"
              prop="transferredIndustries"
            >
              <el-checkbox-group v-model="formData.transferredIndustries">
                <el-checkbox
                  v-for="(value, key) in $t('codes.TransferredIndustry')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2>监测预警</h2>
          <div class="form-item-wapper">
            <el-form-item label="预案点级别" prop="disasterLevelCode">
              <el-select
                clearable
                v-model="formData.disasterLevelCode"
                placeholder="请选择预案点级别"
              >
                <el-option
                  v-for="(value, key) in $t('codes.DisasterLevel')"
                  :key="key"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="应急演练时间">
              <el-date-picker
                v-model="formData.drillDate"
                type="date"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="是否建立预案" class="form-label-lg">
              <el-radio-group v-model="formData.hasPlan">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否纳入省级经费补助监测点"
              prop="isProvincial"
              class="form-label-lg"
            >
              <el-radio-group v-model="formData.isProvincial">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="威胁对象是否含老弱病残" class="form-label-lg">
              <el-radio-group v-model="formData.isThreateOldOrWeak">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否建立监测预警网络" class="form-label-lg">
              <el-radio-group v-model="formData.hasBuiltAlarmNet">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否发放两卡" class="form-label-lg">
              <el-radio-group v-model="formData.hasBuiltCards">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否已经过地灾防治知识培训"
              class="form-label-lg"
            >
              <el-radio-group v-model="formData.isTrained">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否已公示" class="form-label-lg">
              <el-radio-group v-model="formData.isPublished">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="监测方法"
              prop="monitoringMethods"
              class="form-item-row"
            >
              <el-checkbox-group v-model="formData.monitoringMethods">
                <el-checkbox
                  v-for="(value, key) in $t('codes.MonitoringMethod')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>

            <el-form-item
              label="预警手段"
              prop="alarmMethods"
              class="form-item-row"
            >
              <el-checkbox-group v-model="formData.alarmMethods">
                <el-checkbox
                  v-for="(item, code) in $t('codes.AlarmMethod')"
                  :label="code"
                  :key="code"
                  >{{ item }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="防灾责任人姓名" prop="preventOwner.name">
              <el-input
                placeholder="请输入防灾责任人姓名"
                v-model="formData.preventOwner.name"
              ></el-input>
            </el-form-item>

            <el-form-item label="防灾责任人职位" prop="preventOwner.jobPost">
              <el-input
                placeholder="请输入防灾责任人职位"
                v-model="formData.preventOwner.jobPost"
              ></el-input>
            </el-form-item>

            <el-form-item label="防灾责任人电话" prop="preventOwner.phone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.preventOwner.phone"
              ></el-input>
            </el-form-item>

            <el-form-item label="监测责任人姓名" prop="monitorOwner.name">
              <el-input
                placeholder="请输入监测责任人姓名"
                v-model="formData.monitorOwner.name"
              ></el-input>
            </el-form-item>

            <el-form-item label="监测责任人职位" prop="monitorOwner.jobPost">
              <el-input
                placeholder="请输入监测责任人职位"
                v-model="formData.monitorOwner.jobPost"
              ></el-input>
            </el-form-item>

            <el-form-item label="监测责任人电话" prop="monitorOwner.phone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.monitorOwner.phone"
              ></el-input>
            </el-form-item>

            <div v-for="(monitor, index) in formData.monitor" :key="index">
              <el-form-item
                label="监测人姓名"
                :prop="'monitor[' + index + '].name'"
                :rules="[
                  {
                    required: index === 0 ? true : false,
                    message: '监测人姓名不能为空',
                    trigger: 'blur'
                  },
                  { max: 30, message: '长度在 30 个字符以内', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model="monitor.name"
                  placeholder="请输入监测人姓名"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="监测人电话"
                :prop="'monitor[' + index + '].phone'"
                class="form-item-btn"
                :rules="[
                  {
                    required: true,
                    message: '监测人电话不能为空',
                    trigger: 'blur'
                  },
                  {
                    pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
                    message:
                      '请输入有效的电话号码，如：13996633888 或者 027-87588000',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  v-model="monitor.phone"
                  placeholder="如：13996633888 或者 027-87588000"
                  autocomplete="off"
                ></el-input>
                <el-button
                  @click="index === 0 ? addMonitor() : deleteMonitor(index)"
                  circle
                  :title="index === 0 ? '添加监测人' : '删除监测人'"
                  plain
                  :type="index === 0 ? 'primary' : 'danger'"
                  :icon="index === 0 ? 'el-icon-plus' : 'el-icon-minus'"
                ></el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <br />
        <div class="form-item page-next">
          <h2>防灾措施</h2>
          <div class="form-item-wapper">
            <el-form-item label="是否开展搬迁避让" label-width="140px">
              <el-radio-group v-model="formData.isRelocated">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否开展排危除险" label-width="140px">
              <el-radio-group v-model="formData.isEliminated">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否开展治理工程" label-width="140px">
              <el-radio-group v-model="formData.isRemediated">
                <el-radio :label="false">否</el-radio>
                <el-radio :label="true">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="工程进展阶段">
              <el-select
                clearable
                v-model="formData.projectProgressCode"
                placeholder="请选择"
              >
                <el-option
                  v-for="(value, key) in $t('codes.ProjectProgress')"
                  :key="key"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="防灾措施建议" class="form-item-row">
              <el-checkbox-group v-model="formData.preventeSuggests">
                <el-checkbox
                  v-for="(value, key) in $t('codes.PreventeSuggest')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2>申报信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="第一次上报月份" class="firstReportDate-width">
              <el-date-picker
                type="month"
                format="yyyy 年 MM 月"
                placeholder="选择日期"
                v-model="formData.firstReportDate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="已上报年数(年)">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入已上报年数"
                :max="9999"
                v-model.number="formData.reportedYears"
              ></el-input-number>
            </el-form-item>
            <br />
            <el-form-item label="是否销号" prop="isCanceled">
              <el-select
                clearable
                v-model="formData.isCanceled"
                placeholder="请选择"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销号时间">
              <el-date-picker
                type="date"
                :disabled="formData.isCanceled ? false : true"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="formData.canceleTime"
              ></el-date-picker>
            </el-form-item>
            <br />
            <el-form-item label="销号原因">
              <el-input
                type="textarea"
                placeholder="请输入销号原因"
                :disabled="formData.isCanceled ? false : true"
                :rows="2"
                v-model="formData.cancelReason"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                placeholder="请输入备注"
                :rows="2"
                v-model="formData.remark"
              ></el-input>
            </el-form-item>
            <br />
            <el-form-item label="填报单位">
              <el-input
                placeholder="请输入填报单位"
                v-model="formData.reportUnitName"
              ></el-input>
            </el-form-item>
            <el-form-item label="填报人">
              <el-input
                placeholder="请输入填报人"
                v-model="formData.reporterName"
              ></el-input>
            </el-form-item>
            <el-form-item label="填报时间">
              <el-date-picker
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="formData.reportTime"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2>隐患点示意图</h2>
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
      <el-button type="primary" @click="saveFormData" :disabled="ownDisabled">
        {{ !canEdit ? "返回" : "保存" }}
      </el-button>
    </div>
  </div>
</template>
<script>
import JWDBoom from "./JWDBoom";
// import comAttachment from "@/components/comAttachment";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "BasicInfoForm",
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => ({ processes: [] })
    },
    countryList: {
      type: Object,
      default: null
    },
    townList: {
      type: Object,
      default: null
    },
    creatCode: {
      type: Function,
      default: () => {}
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    },
    countryChange: {
      type: Function,
      default: () => {}
    },
    isDisabled: Boolean
  },
  computed: {
    fileOption() {
      return {
        tag: ["隐患点全貌", "威胁对象全貌", "变形迹象"],
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
    },
    currenLevel() {
      return this.$store.getters.area.level;
    }
  },
  components: {
    JWDBoom,
    timeLine
  },
  data() {
    return {
      ownDisabled: false,
      rules: {
        name: [
          { required: true, message: "请输入隐患点名称", trigger: "blur" },
          { max: 50, message: "长度在 50 个字符以内", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请生成隐患点编号", trigger: "change" }
        ],
        location: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 100, message: "长度在 100 个字符以内", trigger: "blur" }
        ],
        disasterTypeCode: [
          { required: true, message: "请选择隐患点类型", trigger: "change" }
        ],
        townCode: [
          { required: true, message: "请选择乡镇", trigger: "change" }
        ],
        discoveryDate: [
          { required: true, message: "请选择隐患点发现时间", trigger: "change" }
        ],
        developmentTrendCode: [
          { required: true, message: "请选择发展趋势", trigger: "change" }
        ],
        longitude: [
          { required: true, message: "请输入经度", trigger: "blur" },
          {
            type: "number",
            max: 110,
            min: 100,
            message: "请输入有效的范围 100° ~ 110° ",
            trigger: "blur"
          }
        ],
        latitude: [
          { required: true, message: "请输入纬度", trigger: "blur" },
          {
            type: "number",
            max: 35,
            min: 30,
            message: "请输入有效的范围 30° ~ 35°",
            trigger: "blur"
          }
        ],
        "preventOwner.name": [
          {
            required: true,
            message: "防灾责任人姓名不能为空",
            trigger: "blur"
          },
          { max: 30, message: "长度在 30 个字符以内", trigger: "blur" }
        ],
        "preventOwner.jobPost": [
          { max: 30, message: "长度在 30 个字符以内", trigger: "blur" }
        ],
        "preventOwner.phone": [
          {
            required: true,
            message: "防灾责任人电话不能为空",
            trigger: "blur"
          },
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        "monitorOwner.name": [
          {
            required: true,
            message: "监测责任人姓名不能为空",
            trigger: "blur"
          },
          { max: 30, message: "长度在 30 个字符以内", trigger: "blur" }
        ],
        "monitorOwner.jobPost": [
          { max: 30, message: "长度在 30 个字符以内", trigger: "blur" }
        ],
        "monitorOwner.phone": [
          {
            required: true,
            message: "监测责任人电话不能为空",
            trigger: "blur"
          },
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        yaw: [{ required: true, message: "请输入方向", trigger: "blur" }],
        disasterScale: [
          { required: true, message: "请输入灾害面积", trigger: "blur" }
        ],
        threatPeople: [
          { required: true, message: "请输入威胁人数", trigger: "blur" }
        ],
        threatHouses: [
          { required: true, message: "请输入威胁户数", trigger: "blur" }
        ],
        threatProperty: [
          { required: true, message: "请输入威胁财产", trigger: "blur" }
        ],
        predisposeFactors: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个诱发因素",
            trigger: "change"
          }
        ],
        threatObjects: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个威胁对象",
            trigger: "change"
          }
        ],
        transferredIndustries: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个行业",
            trigger: "change"
          }
        ],
        disasterLevelCode: [
          { required: true, message: "请选择预案点级别", trigger: "change" }
        ],
        isProvincial: [
          {
            required: true,
            message: "请选择是否纳入省级经费补助监测点",
            trigger: "blur"
          }
        ],
        monitoringMethods: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个监测方法",
            trigger: "change"
          }
        ],
        alarmMethods: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个预警手段",
            trigger: "change"
          }
        ],
        isCanceled: [
          {
            required: true,
            message: "请选择是否销号",
            trigger: "change"
          }
        ]
      }
    };
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["basicinfo-form"].clearValidate();
    }
  },
  methods: {
    // 隐患点类型改变触发
    disasterTypeChange() {
      this.formData.code = "";
      this.$refs["basicinfo-form"].rules["code"][0].message =
        "隐患点类型已更改，请重新生成统一编号！";
    },
    addMonitor() {
      this.formData.monitor.push({
        name: "",
        phone: "",
        jobPost: "",
        idNumber: "",
        sex: ""
      });
    },
    deleteMonitor(index) {
      this.formData.monitor.splice(index, 1);
    },
    saveFormData() {
      if (!this.canEdit) {
        this.disabled = true;
        this.$router.go(-1);
      } else {
        this.$refs["basicinfo-form"].validate(async valid => {
          if (valid) {
            if (this.formData.code) {
              this.ownDisabled = true;
              let r = await this.btnExcuteFunc();
              this.$refs["basicinfo-form"].clearValidate();
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
  }
};
</script>
