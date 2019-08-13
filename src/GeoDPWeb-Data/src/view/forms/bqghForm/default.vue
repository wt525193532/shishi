<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        inline
        :model="formData"
        label-width="140px"
        ref="bqghForm"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="bqghFormH1">规划编制数据采集</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县" prop>
              <el-select
                v-model="formData.zgaA05A030"
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
            <el-form-item
              label="县域地质灾害避险搬迁安置规划名称"
              label-width="250px"
              prop="zgaA05A050"
            >
              <el-input v-model="formData.zgaA05A050" placeholder></el-input>
            </el-form-item>
            <el-form-item label="规划编制单位" prop="zgaA05A060">
              <el-input v-model="formData.zgaA05A060" placeholder></el-input>
            </el-form-item>
            <el-form-item label="规划期限">
              <el-date-picker
                type="date"
                v-model="formData.zgaA05A070"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="规划任务数">
              <el-input-number
                v-model="formData.zgaA05A080"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="规划完成数">
              <el-input-number
                v-model="formData.zgaA05A090"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="规划剩余数">
              <el-input-number
                v-model="formData.zgaA05A100"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input
                type="textarea"
                placeholder="请输入备注"
                :rows="2"
                v-model="formData.zgaA05A990"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="form-item page-next">
          <h2 ref="bqghFormH4">评审意见及修复</h2>
          <comAttachment
            v-model="formData.attachments"
            :fileOption="fileOption"
            class="form-attachment"
          />
        </div>-->
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
  name: "EngineerForm",
  components: { timeLine },
  computed: {
    formType() {
      return this.$route.meta.formType;
    },
    fileOption() {
      return {
        tag: ["附件上传"],
        upload: this.canEdit,
        accept: ""
      };
    },
    currenLevel() {
      return this.$store.getters.area.level;
    },
    user() {
      return this.$store.getters.area;
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
        zgaA05A020: [
          {
            required: true,
            trigger: "blur",
            message: "请选择市州"
          }
        ],
        zgaA05A030: [
          {
            required: true,
            trigger: "blur",
            message: "请选择区县"
          }
        ],
        zgaA05A050: [
          { max: 100, message: "长度在 100 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "县域地质灾害避险搬迁安置规划名称不能为空"
          }
        ],
        zgaA05A060: [
          { max: 100, message: "长度在 100 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "规划编制单位不能为空"
          }
        ]
      },
      formData: {
        zgaA05A020: "510100",
        zgaA05A030: "",
        zgaA05A040: "",
        zgaA05A050: "",
        zgaA05A060: "",
        zgaA05A070: null,
        zgaA05A080: 0,
        zgaA05A090: 0,
        zgaA05A100: 0,
        zgaA05A990: "",
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
          this.formData.zgaA05A030 = this.user.adminCode;
        }
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/bqgh/edit";
      this.canEdit = true;
    } else {
      api = "report/bqgh/getById";
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
      this.$refs["bqghForm"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["bqghForm"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/bqgh/create", this.formData)
              .then(res => {
                this.ownDisabled = false;
                if (this.$util.addSaveConfirm(res.data.success)) {
                  this.formData.zgaA05A030 =
                    this.formData.zgaA05A030 + "000000";
                }
              });
            //  编辑
          } else {
            this.$store
              .dispatch("report/bqgh/update", this.formData)
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
