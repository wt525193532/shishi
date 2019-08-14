<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        inline
        :model="formData"
        label-width="140px"
        ref="dzzsdw"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="dzzsdwH1">规划编制数据采集</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州" prop="zgaA08A020">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县" prop="zgaA08A030">
              <el-select
                v-model="formData.zgaA08A030"
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
            <el-form-item label="类型">
              <el-select v-model="formData.zgaA08A050">
                <el-option label="巡排查" value="巡排查"></el-option>
                <el-option label="驻守督导" value="驻守督导"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="技术支撑单位名称">
              <el-input v-model="formData.zgaA08A060" placeholder></el-input>
            </el-form-item>

            <el-form-item label="技术人员数量(人)">
              <el-input-number
                v-model="formData.zgaA08A070"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="督导车辆数量(台)">
              <el-input-number
                v-model="formData.zgaA08A080"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="组长姓名">
              <el-input v-model="formData.zgaA08A090" placeholder></el-input>
            </el-form-item>
            <el-form-item label="组长联系方式">
              <el-input v-model="formData.zgaA08A100" placeholder></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.zgaA08A990"
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
  name: "DzzsdwForm",
  components: { timeLine },
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
  data() {
    return {
      ownDisabled: false,
      rules: {
        projectName: [{ max: 200, message: "长度在 200 个字符以内" }],
        period: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点治理期数不能为空"
          }
        ],
        location: [{ max: 500, message: "长度在 500 个字符以内" }]
      },
      formData: {
        zgaA08A020: "5101",
        zgaA08A030: "",
        zgaA08A040: "",
        zgaA08A050: "",
        zgaA08A060: "",
        zgaA08A070: undefined,
        zgaA08A080: undefined,
        zgaA08A090: "",
        zgaA08A100: "",
        zgaA08A990: "",
        zgaA08A190: "",
        zgaA08A200: "",
        id: 0
      },
      canEdit: true,
      townList: {}
    };
  },
  created() {
    this.$store
      .dispatch("organization/getAdministrative", "510100")
      .then(res => {
        if (this.currenLevel == 3) {
          this.formData.zgaA08A030 = this.user.adminCode;
        }
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/dzzsdw/edit";
      this.canEdit = true;
    } else {
      api = "report/dzzsdw/getById";
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
      this.$refs["dzzsdw"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["dzzsdw"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/dzzsdw/create", this.formData)
              .then(res => {
                this.ownDisabled = false;
                if (this.$util.addSaveConfirm(res.data.success)) {
                  this.formData.zgaA03A030 =
                    this.formData.zgaA03A030 + "000000";
                }
              });
            //  编辑
          } else {
            this.$store
              .dispatch("report/dzzsdw/update", this.formData)
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
