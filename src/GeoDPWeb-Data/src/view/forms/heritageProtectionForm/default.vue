<template>
  <div class="page-container">
    <div class="clearfix" v-if="disabled">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#engineerPrint'"
        >打印表单</el-button
      >
    </div>
    <div class="heritageProtection-form form-wrapper">
      <div class="form-wapper-it">
        <el-form
          ref="heritageProtection-form"
          label-suffix="："
          :rules="rules"
          label-width="140px"
          inline
          :disabled="disabled"
          :model="formData"
          :canEdit="canEdit"
        >
          <div class="form-item">
            <h2 ref="reportheritageProtectionFormH1">工程基本信息</h2>
            <div class="form-item-wapper">
              <!-- <el-form-item
            label="项目编号"
            :class="type == 'add' ? 'form-item-btn' : ''"
            prop="site.code"
          >
            <el-input v-model="formData.site.code" disabled></el-input>
            <el-button
              icon="el-icon-d-arrow-left"
              v-if="type == 'add' ? true : false"
              @click="creatCode"
              >生成</el-button
            >
              </el-form-item>-->
              <el-form-item label="项目名称" prop="projectName">
                <el-input
                  placeholder="请输入项目名称"
                  v-model="formData.projectName"
                ></el-input>
              </el-form-item>
              <el-form-item label="治理期数" prop="governNumber">
                <el-select
                  :disabled="disabled"
                  clearable
                  v-model="formData.governNumber"
                  placeholder="请选择治理期数"
                >
                  <el-option
                    v-for="(value, key) in 5"
                    :key="key"
                    :label="value"
                    :value="value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目实施单位" prop="implementUnit">
                <el-input
                  v-model="formData.implementUnit"
                  placeholder="请输入项目实施单位"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目任务书" prop="taskBook">
                <el-input
                  v-model="formData.taskBook"
                  placeholder="请输入项目任务书"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目下达时间">
                <el-date-picker
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="formData.releaseDate"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="资金文件" prop="fundDoc">
                <el-input
                  v-model="formData.fundDoc"
                  placeholder="请输入资金文件"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="中央财政资金（万元）"
                class="form-label-long"
                prop="centralFunds"
              >
                <el-input-number
                  :controls="false"
                  :min="0"
                  :precision="2"
                  placeholder="请输入资金数目"
                  :max="99999999"
                  v-model.number="formData.centralFunds"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="省财政资金（万元）"
                class="form-label-long"
                prop="provinceFunds"
              >
                <el-input-number
                  :controls="false"
                  :min="0"
                  :precision="2"
                  placeholder="请输入资金数目"
                  :max="99999999"
                  v-model.number="formData.provinceFunds"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="决算资金（万元）"
                class="form-label-long"
                prop="finalFunds"
              >
                <el-input-number
                  :controls="false"
                  :min="0"
                  :precision="2"
                  placeholder="请输入资金数目"
                  :max="99999999"
                  v-model.number="formData.finalFunds"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="任务书要求完成时间"
                class="form-label-medium"
              >
                <el-date-picker
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="formData.taskDate"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <h2 ref="reportheritageProtectionFormH1">工程进展信息</h2>

            <div class="form-item-wapper">
              <div>
                <el-form-item
                  label="施工图设计开始时间"
                  class="form-label-medium"
                >
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.designStartDate"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="施工图设计结束时间"
                  class="form-label-medium"
                >
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.designEndDate"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="招标阶段开始时间"
                  class="form-label-medium"
                >
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.tenderStartDate"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="招标阶段结束时间"
                  class="form-label-medium"
                >
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.tenderEndDatee"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="施工阶段开始时间"
                  class="form-label-medium"
                >
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.constructStartDate"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="施工阶段结束时间"
                  class="form-label-medium"
                >
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.constructEndDate"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="初验时间" class="form-label-medium">
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.firstAcceptanceDate"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="终验申请时间" class="form-label-medium">
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.finalAcceptanceApplyDate"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="终验结束时间" class="form-label-long">
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formData.finalAcceptanceEndDate"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="主要情况">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :rows="2"
                    prop="description"
                    v-model="formData.description"
                  ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :rows="2"
                    prop="remark"
                    v-model="formData.remark"
                  ></el-input>
                </el-form-item>
              </div>
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
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        <el-button v-if="!disabled" type="primary" @click="saveForm"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
// import comAttachment from "@/components/comAttachment";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "HeritageProtectionForm",
  components: { timeLine },
  data() {
    return {
      rules: {
        implementUnit: [
          { required: true, message: "请输入项目实施单位", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        taskBook: [
          { required: true, message: "请输入项目实施单位", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        fundDoc: [
          { required: true, message: "请输入项目实施单位", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        description: [
          { max: 512, message: "长度在 512 个字符以内", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入项目实施单位", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        governNumber: [
          { required: true, message: "请输入项目实施单位", trigger: "blur" }
        ],
        remark: [
          { max: 1024, message: "长度在 1024 个字符以内", trigger: "blur" }
        ]
      },
      formData: {
        adminCode: "string",
        status: 0,
        projectName: "",
        implementUnit: "",
        taskBook: "",
        governNumber: 0,
        releaseDate: "",
        fundDoc: "",
        centralFunds: 0,
        provinceFunds: 0,
        finalFunds: 0,
        taskDate: "",
        designStartDate: "",
        designEndDate: "",
        tenderStartDate: "",
        tenderEndDate: "",
        constructStartDate: "",
        constructEndDate: "",
        firstAcceptanceDate: "",
        finalAcceptanceApplyDate: "",
        finalAcceptanceEndDate: "",
        description: "",
        remark: "",
        attachments: [],
        id: 0
      },
      disabled: true,
      canEdit: true
    };
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
      api = "report/heritageProtection/edit";
      this.disabled = false;
      this.canEdit = true;
    } else {
      api = "querypage/heritageProtection/getById";
      this.disabled = true;
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
      this.$refs["heritageProtection-form"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["heritageProtection-form"].validate(async valid => {
        if (valid) {
          // 新增
          if (this.formType == "create") {
            this.$store
              .dispatch("report/heritageProtection/create", this.formData)
              .then(res => {
                this.$util.addSaveConfirm(res.data.success);
              });
            // 编辑
          } else {
            this.$store
              .dispatch("report/heritageProtection/update", this.formData)
              .then(res => {
                this.$util.editSaveMessage(res.data.success);
              });
          }
        } else {
          this.$message({
            type: "info",
            message: "保存不成功，验证未通过"
          });
          return false;
        }
      });
    }
  }
};
</script>
