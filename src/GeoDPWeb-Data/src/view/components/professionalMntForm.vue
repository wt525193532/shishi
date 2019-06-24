<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-suffix=":"
        inline
        :model="formData"
        :rules="rules"
        :disabled="disabled"
        label-width="140px"
        ref="professionalMonitor"
      >
        <div class="form-item">
          <h2>基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />

            <el-form-item label="预警阈值单位" prop="alarmThresholdUnit">
              <el-select
                v-model="formData.alarmThresholdUnit"
                placeholder="请选择"
              >
                <el-option label="5分钟" value="5分钟"></el-option>
                <el-option label="10分钟" value="10分钟"></el-option>
                <el-option label="15分钟" value="15分钟"></el-option>
                <el-option label="30分钟" value="30分钟"></el-option>
                <el-option label="1小时" value="1小时"></el-option>
                <el-option label="12小时" value="12小时"></el-option>
                <el-option label="24小时" value="24小时"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="预警阈值" prop="alarmThreshold">
              <el-input-number
                v-model="formData.alarmThreshold"
                :precision="2"
                :controls="false"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="监测类型" prop="mntTypeCode">
              <el-select v-model="formData.mntTypeCode" placeholder="请选择">
                <el-option
                  v-for="(value, key) in $t('codes.ProfessionalMntType')"
                  :key="key"
                  :label="value"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="监测点编号" prop="mntSiteCode">
              <el-input v-model="formData.mntSiteCode"></el-input>
            </el-form-item>

            <el-form-item label="年度">
              <el-input-number
                :controls="false"
                :min="0"
                placeholder="请输入年度"
                :max="9999"
                v-model="formData.fillYear"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="经度" prop="longitude" class="form-item-jwd">
              <JWDBoom
                :max="110"
                :min="100"
                placeholder="100 ~ 110"
                v-model.number="formData.longitude"
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
          </div>
        </div>
        <div class="form-item">
          <h2 ref="professionalMonitorH2">野外监测图片</h2>
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
      <el-button type="primary" @click="saveForm" :disabled="ownDisabled">{{
        !disabled ? "保存" : "返回"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import basicinfoSelector from "./basicinfoSelector";
import JWDBoom from "./JWDBoom";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "ProfessionalMntForm",
  components: { basicinfoSelector, JWDBoom, timeLine },
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
  data() {
    return {
      ownDisabled: false,
      rules: {
        mntTypeCode: [
          {
            required: true,
            message: "监测类型编码不能为空",
            trigger: "change"
          }
        ],
        mntSiteCode: [
          { max: 64, message: "长度在 64 个字符以内" },
          {
            required: true,
            message: "监测类型编码不能为空",
            trigger: "blur"
          }
        ],
        alarmThreshold: [{ type: "number", precision: 2 }],
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
        code: [{ required: true, message: "请选择隐患点！", trigger: "change" }]
      }
    };
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["professionalMonitor"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveForm() {
      console.log(this.formData);
      if (this.disabled) {
        this.isdisabled = true;
        this.$router.go(-1);
      } else {
        this.$refs["professionalMonitor"].validate(async valid => {
          if (valid) {
            if (this.formData.site.code) {
              this.ownDisabled = true;
              let r = await this.btnExcuteFunc();
              this.$refs.professionalMonitor.clearValidate();
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
  }
};
</script>
