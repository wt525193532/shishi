<template>
  <div class="page-container">
    <div class="clearfix" v-if="!canEdit">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#trainingPrint'"
        >打印表单</el-button
      >
    </div>
    <div class="form-wrapper" id="trainingPrint">
      <div class="form-wapper-it">
        <el-form
          label-position="right"
          ref="training-form"
          label-suffix="："
          :rules="rules"
          label-width="140px"
          inline
          :disabled="formType == 'view'"
          :model="formData"
        >
          <div class="form-item">
            <h2>地点</h2>
            <div class="form-item-wapper">
              <el-form-item label="市州">
                <el-input
                  v-model="formData.cityName"
                  placeholder
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="区县">
                <el-input
                  v-model="formData.countryName"
                  placeholder
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <h2>培训宣传</h2>
            <div class="form-item-wapper">
              <el-form-item label="宣传培训乡、镇数">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.trainTownCount"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="培训课时">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.trainTime"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="总参训人数(人)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.trainPeoCount"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="地灾防治工作负责人"
                class="form-label-medium"
              >
                <el-input v-model="formData.prevenName" placeholder></el-input>
              </el-form-item>
              <el-form-item
                label="地灾隐患防灾责任人"
                class="form-label-medium"
              >
                <el-input
                  v-model="formData.disasterName"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="普通群众(人)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.massesCount"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="培训专家(人)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.expertCount"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="宣传场次(场)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.propagandaCount"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="宣传人数(人)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.propagandaPeople"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="发放宣传画(张/套)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.trainPicture"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="发放宣传手册(本)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.trainManual"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="其他宣传材料(份)">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.otherMaterials"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="填报日期">
                <el-date-picker
                  v-model="formData.reportDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <h2>避险演练</h2>

            <div class="form-item-wapper">
              <el-form-item label="演练时间">
                <el-date-picker
                  v-model="formData.actDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="演练场次">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.actTimes"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="演练人数">
                <el-input-number
                  :controls="false"
                  :min="0"
                  placeholder
                  :max="359"
                  v-model="formData.actPersonsCount"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="备注说明">
                <el-input
                  type="textarea"
                  placeholder="请输入备注"
                  :rows="2"
                  v-model="formData.remark"
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
  </div>
</template>

<script>
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "TrainingForm",
  components: { timeLine },
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
    },
    adminCode() {
      return this.$store.getters.area.adminCode;
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入隐患点名称", trigger: "blur" },
          { max: 50, message: "长度在 50 个字符以内", trigger: "blur" }
        ]
      },
      formData: {
        cityName: "成都市",
        countryName: "",
        trainTownCount: null,
        trainTime: null,
        trainPeoCount: null,
        prevenName: "",
        disasterName: "",
        massesCount: null,
        expertCount: null,
        propagandaCount: null,
        propagandaPeople: null,
        trainPicture: null,
        trainManual: null,
        otherMaterials: null,
        reportDate: null,
        actDate: null,
        actTimes: null,
        actPersonsCount: null,
        remark: "",
        id: 0
      },
      canEdit: false
    };
  },
  created() {
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/training/edit";
      this.canEdit = true;
    } else {
      api = "report/training/getById";
      this.canEdit = false;
    }
    if (this.formType == "create") {
      this.$store
        .dispatch("report/basicInfo/getAdministrative", this.adminCode)
        .then(res => {
          this.formData.countryName = res.data.result.displayName;
        });
    } else {
      this.$store.dispatch(api, this.$route.query.id).then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["training-form"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["training-form"].validate(async valid => {
        if (valid) {
          // 新增
          if (this.formType == "create") {
            this.$store
              .dispatch("report/training/create", this.formData)
              .then(res => {
                this.$util.addSaveConfirm(res.data.success);
              });
            // 编辑
          } else {
            this.$store
              .dispatch("report/training/update", this.formData)
              .then(res => {
                this.$util.editSaveMessage(res.data.success);
              });
          }
          this.$refs["training-form"].clearValidate();
        } else {
          this.$message({
            type: "info",
            message: "验证未通过"
          });
          return false;
        }
      });
    }
  }
};
</script>
