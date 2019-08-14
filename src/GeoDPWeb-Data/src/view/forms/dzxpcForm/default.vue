<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        inline
        :model="formData"
        label-width="140px"
        ref="dzxpcForm"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="dzxpcFormH1">地灾年度巡、排查采集</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州" prop="zgaA04A020">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县" prop="zgaA04A030">
              <el-select
                v-model="formData.zgaA04A030"
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
            <el-form-item label="实施年度" prop="zgaA04A050">
              <el-date-picker
                type="year"
                v-model="formData.zgaA04A050"
                placeholder="选择日期时间"
                value-format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实施单位">
              <el-input v-model="formData.zgaA04A060" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
              <el-input v-model="formData.zgaA04A070" placeholder></el-input>
            </el-form-item>
            <el-form-item label="负责人电话">
              <el-input-number
                v-model="formData.zgaA04A080"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="巡查点数">
              <el-input-number
                v-model="formData.zgaA04A090"
                :controls="false"
                :max="999999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="处置灾害数">
              <el-input-number
                v-model="formData.zgaA04A100"
                :controls="false"
                :max="999999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="新隐患发现数">
              <el-input-number
                v-model="formData.zgaA04A110"
                :controls="false"
                :max="999999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="销号点数">
              <el-input-number
                v-model="formData.zgaA04A240"
                :controls="false"
                :max="999999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="累计拨付资金(万元)">
              <el-input-number
                v-model="formData.name"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="中省资金(万元)">
              <el-input-number
                v-model="formData.zgaA04A130"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="市级资金(万元)">
              <el-input-number
                v-model="formData.zgaA04A140"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="县级资金(万元)">
              <el-input-number
                v-model="formData.zgaA04A150"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.zgaA04A990"
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
  name: "DzxpcForm",
  components: { timeLine },
  data() {
    return {
      ownDisabled: false,
      rules: {
        zgaA04A020: [
          {
            required: true,
            trigger: "blur",
            message: "请选择市州"
          }
        ],
        zgaA04A030: [
          {
            required: true,
            trigger: "blur",
            message: "请选择区县"
          }
        ],
        zgaA04A050: [
          {
            required: true,
            trigger: "change",
            message: "实施年度不能为空"
          }
        ]
      },
      formData: {
        zgaA04A020: "5101",
        zgaA04A030: "",
        zgaA04A040: "",
        zgaA04A050: "",
        zgaA04A060: "",
        zgaA04A070: "",
        zgaA04A080: "",
        zgaA04A090: undefined,
        zgaA04A100: undefined,
        zgaA04A110: undefined,
        zgaA04A120: undefined,
        zgaA04A130: undefined,
        zgaA04A140: undefined,
        zgaA04A150: undefined,
        zgaA04A240: undefined,
        zgaA04A990: "",
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
          this.formData.zgaA04A030 = this.user.adminCode;
        }
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/dzxpc/edit";
      this.canEdit = true;
    } else {
      api = "report/dzxpc/getById";
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
      this.$refs["dzxpcForm"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["dzxpcForm"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/dzxpc/create", this.formData)
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
              .dispatch("report/dzxpc/update", this.formData)
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
