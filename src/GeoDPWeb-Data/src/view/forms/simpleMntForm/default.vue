<template>
  <div class="page-container">
    <div class="clearfix" v-if="disabled && !isFromQuery">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#workCardPrint'"
        >打印表单</el-button
      >
    </div>
    <div class="form-wrapper">
      <div class="form-wapper-it">
        <el-form
          label-position="right"
          inline
          label-suffix=":"
          :model="formData"
          :disabled="disabled"
          ref="simpleMonitor"
          :rules="rules"
          label-width="140px"
        >
          <div class="form-item">
            <h2 ref="simpleMonitorH1">基本信息</h2>

            <div class="form-item-wapper">
              <basicinfo-selector
                v-model="formData.site"
                @input="valueChanged"
                :isAdd="canEdit"
              />
            </div>
          </div>
          <div class="form-item">
            <h2>简易监测方法</h2>
            <div class="form-item-wapper">
              <el-form-item label="监测方法" class="form-item-row">
                <el-checkbox-group v-model="formData.mntMethods">
                  <el-checkbox
                    v-for="(value, key) in $t('codes.SimpleMntMethod')"
                    :key="key"
                    :label="key"
                    >{{ value }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="其它方法" prop="otherMethods">
                <el-input v-model="formData.otherMethods"></el-input>
              </el-form-item>
              <el-form-item
                v-if="landslideDevice"
                label="滑坡伸缩仪套数"
                prop="landslideDeviceNumber"
              >
                <el-input-number
                  :controls="false"
                  :min="1"
                  :max="999"
                  v-model="formData.landslideDeviceNumber"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                v-if="crackDevice"
                label="裂缝报警器套数"
                prop="crackDeviceNumber"
              >
                <el-input-number
                  :min="1"
                  :max="999"
                  :controls="false"
                  v-model="formData.crackDeviceNumber"
                ></el-input-number>
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
  name: "SimpleMonitor",
  props: {
    codeData: Object,
    isFromQuery: {
      type: Boolean,
      default: false
    }
  },
  components: { basicinfoSelector, timeLine },
  data() {
    return {
      ownDisabled: false,
      rules: {
        otherMethods: [
          { max: 200, message: "长度在200 个字符以内", trigger: "blur" }
        ],
        code: [{ required: true, message: "请选择隐患点！", trigger: "change" }]
      },
      formData: {
        otherMethods: "",
        landslideDeviceNumber: 0,
        crackDeviceNumber: 0,
        mntMethods: [],
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
  computed: {
    landslideDevice() {
      const m = this.formData.mntMethods;
      return m && m.indexOf("D") >= 0 ? true : false;
    },
    crackDevice() {
      const m = this.formData.mntMethods;
      return m && m.indexOf("E") >= 0 ? true : false;
    },
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
      api = "report/simpleMnt/edit";
      this.disabled = false;
      this.canEdit = false;
    } else {
      api = "querypage/simpleMnt/getById";
      this.disabled = true;
      this.canEdit = false;
    }
    if (this.formType != "create" && !this.isFromQuery) {
      this.$store.dispatch(api, this.$route.query.id).then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
    } else if (this.isFromQuery) {
      this.formData = this.codeData;
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["simpleMonitor"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveForm() {
      this.$refs["simpleMonitor"].validate(async valid => {
        if (valid) {
          if (this.formData.site.code) {
            this.$refs.simpleMonitor.clearValidate();
            // 新增
            if (this.formType == "create") {
              let flag;
              flag = await this.$store
                .dispatch("report/simpleMnt/create", this.formData)
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
                .dispatch("report/simpleMnt/update", this.formData)
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
