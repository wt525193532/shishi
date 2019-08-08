<template>
  <div class="page-container">
    <div class="clearfix" v-if="!canEdit">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#mineInformationPrint'"
        >打印表单</el-button
      >
    </div>
    <div class="mineInfo-form form-wrapper" id="mineInformationPrint">
      <div class="form-wapper-it">
        <el-form
          ref="mineInfo-form"
          label-suffix="："
          :rules="rules"
          label-width="140px"
          inline
          :disabled="formType == 'view'"
          :model="formData"
        >
          <div class="form-item">
            <h2 ref="reportmineInfoFormH1">基本信息</h2>
            <div class="form-item-wapper">
              <el-form-item
                label="系统编号"
                :class="formType == 'create' ? 'form-item-btn' : ''"
                prop="code"
              >
                <el-input v-model="formData.code" disabled></el-input>
                <el-button
                  icon="el-icon-d-arrow-left"
                  v-if="formType == 'create' ? true : false"
                  @click="creatCode"
                  >生成</el-button
                >
              </el-form-item>
              <el-form-item label="矿山名称" prop="name">
                <el-input
                  placeholder="请输入矿山名称"
                  v-model="formData.name"
                ></el-input>
              </el-form-item>

              <el-form-item label="开采矿种" prop="kaicaikzdm">
                <el-select
                  :disabled="formType == 'create' ? false : true"
                  clearable
                  v-model="formData.kaicaikzdm"
                  placeholder="请选择开采矿种"
                >
                  <el-option
                    v-for="(value, key) in $t('codes.MineralType')"
                    :key="key"
                    :label="value"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="采矿许可证" prop="xkz">
                <el-input
                  v-model="formData.xkz"
                  placeholder="请输入采矿许可证"
                ></el-input>
              </el-form-item>
              <el-form-item label="发证机关" prop="fzjg">
                <el-select value="成都市" disabled></el-select>
              </el-form-item>
              <el-form-item label="所属区县" prop="ssqx">
                <el-input
                  v-if="currenLevel == 3"
                  v-model="formData.ssqx"
                  disabled
                ></el-input>
                <el-select
                  v-if="currenLevel != 3"
                  :disabled="!canEdit"
                  v-model="formData.ssqx"
                >
                  <template>
                    <el-option
                      v-for="(item, index) in townList.children"
                      :key="index"
                      :label="item.displayName"
                      :value="item.adminCode"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item label="矿山有效期限">
                <el-date-picker
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="formData.yxqx"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="矿区规模" prop="kqgm">
                <el-select
                  clearable
                  v-model="formData.kqgm"
                  placeholder="请选择矿区规模"
                >
                  <el-option label="小型" value="小型"></el-option>
                  <el-option label="中型" value="中型"></el-option>
                  <el-option label="大型" value="大型"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="矿山位置" prop="weizhi">
                <el-input
                  placeholder="请输入矿山位置"
                  v-model="formData.weizhi"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="生产规模（万吨/年）"
                class="form-label-long"
                prop="scgm"
              >
                <el-input
                  placeholder="请输入生产规模"
                  v-model="formData.scgm"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="矿区面积（km²）"
                class="form-label-medium"
                prop="area"
              >
                <el-input-number
                  :controls="false"
                  :min="0"
                  :precision="2"
                  placeholder="请输入矿区面积"
                  :max="99999999"
                  v-model.number="formData.area"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="开采状态" prop="kczt">
                <el-input v-model="formData.kczt"></el-input>
                <!-- <el-select
              clearable
              v-model="formData.kczt"
              placeholder="请选择开采状态"
            >
              <el-option
                v-for="(value, key) in $t('codes.DisasterType')"
                :key="key"
                :label="value"
                :value="key"
              ></el-option>
                </el-select>-->
              </el-form-item>
              <el-form-item label="经度" prop="lon" class="form-item-jwd">
                <JWDBoom
                  :max="110"
                  :min="100"
                  placeholder="100 ~ 110"
                  v-model="formData.lon"
                ></JWDBoom>
              </el-form-item>

              <el-form-item label="纬度" prop="lat" class="form-item-jwd">
                <JWDBoom
                  :max="35"
                  :min="30"
                  placeholder="30 ~ 35"
                  v-model.number="formData.lat"
                ></JWDBoom>
              </el-form-item>
              <div>
                <el-form-item label="采矿权范围" label-width="220px">
                  <el-input
                    type="textarea"
                    placeholder="请输入采矿权范围"
                    :rows="2"
                    v-model="formData.fanwei"
                    style="width:1000px"
                  ></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="矿山地质环境概况" label-width="220px">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :rows="3"
                    v-model="formData.dzhjgk"
                    style="width:1000px"
                  ></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="地质灾害发育情况" label-width="220px">
                  <el-input
                    type="textarea"
                    placeholder="请输入地质灾害发育情况"
                    :rows="3"
                    v-model="formData.dzzhfyqk"
                    style="width:1000px"
                  ></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="环境恢复治理情况"
                  prop="fhzlqk"
                  label-width="220px"
                >
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :rows="3"
                    v-model="formData.fhzlqk"
                    style="width:1000px"
                  ></el-input>
                </el-form-item>
              </div>
              <!-- <div>
            <el-form-item
              label="环境恢复治理保证金缴纳情况"
              prop="bzj"
              label-width="220px"
            >
              <el-input
                type="textarea"
                placeholder="请输入内容"
                :rows="3"
                v-model="formData.bzj"
                style="width:1000px"
              ></el-input>
            </el-form-item>
              </div>-->
              <el-form-item label="备注" label-width="220px">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :rows="3"
                  style="width:1000px"
                  v-model="formData.remark"
                ></el-input>
              </el-form-item>
              <div>
                <el-form-item
                  label="环境影响评估情况"
                  prop="hjyxpg"
                  label-width="210px"
                >
                  <el-radio-group v-model="formData.hjyxpg">
                    <el-radio label="是">已评估</el-radio>
                    <el-radio label="否">未评估</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item
                  label="是否安装了专业设备"
                  label-width="210px"
                  prop="threatObjects"
                >
                  <el-radio-group v-model="formData.isZHUANYE">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="是否安绿色矿山"
                  label-width="210px"
                  prop="threatObjects"
                >
                  <el-radio-group v-model="formData.isLVSE">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="是否安国家级"
                  label-width="210px"
                  prop="threatObjects"
                >
                  <el-radio-group v-model="formData.isGUOJIA">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="环境恢复治理保证金缴纳情况"
                  label-width="210px"
                  prop="predisposeFactors"
                >
                  <el-radio-group v-model="formData.bzj">
                    <el-radio label="是">已缴纳</el-radio>
                    <el-radio label="否">未缴纳</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="form-item">
            <h2 ref="reportmineInfoFormH1">文件或照片</h2>
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
        <el-button v-if="canEdit" type="primary" @click="saveForm"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import JWDBoom from "@/view/components/JWDBoom";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "ReportMineInformationForm",
  components: {
    JWDBoom,
    timeLine
  },
  computed: {
    adminCode() {
      return this.$store.getters.area.adminCode;
    },
    currenLevel() {
      return this.$store.getters.area.level;
    },
    proccessActive() {
      return this.formData.processes
        ? this.formData.processes.length
        : undefined;
    },
    isShowAudit() {
      return !this.canEdit ? (this.proccessActive ? true : false) : false;
    },
    fileOption() {
      return {
        tag: ["附件上传"],
        upload: this.canEdit,
        accept: ""
      };
    },
    formType() {
      return this.$route.meta.formType;
    },
    myssqx() {
      return this.currenLevel == 3 ? this.displayName : "";
    }
  },

  data() {
    return {
      rules: {
        name: [{ max: 128, message: "长度在 128 个字符以内", trigger: "blur" }],
        code: [
          { required: true, message: "请生成矿山编号", trigger: "change" }
        ],
        lon: [
          {
            type: "number",
            max: 110,
            min: 100,
            message: "请输入有效的范围 100° ~ 110° ",
            trigger: "blur"
          }
        ],
        lat: [
          {
            type: "number",
            max: 35,
            min: 30,
            message: "请输入有效的范围 30° ~ 35°",
            trigger: "blur"
          }
        ],
        kaicaikzdm: [
          { max: 12, message: "长度在 12 个字符以内", trigger: "blur" }
        ],
        xkz: [{ max: 129, message: "长度在 129个字符以内", trigger: "blur" }],
        fzjg: [{ max: 256, message: "长度在 256个字符以内", trigger: "blur" }],
        yxqx: [{ max: 256, message: "长度在 256个字符以内", trigger: "blur" }],
        ssqx: [{ max: 256, message: "长度在 256 个字符以内", trigger: "blur" }],
        weizhi: [
          { max: 256, message: "长度在 256个字符以内", trigger: "blur" }
        ],
        fanwei: [
          { max: 2000, message: "长度在 2000个字符以内", trigger: "blur" }
        ],
        area: [
          {
            type: "number",

            min: 0,
            message: "数值不小于0",
            trigger: "blur"
          }
        ],
        kczt: [{ max: 256, message: "长度在 256个字符以内", trigger: "blur" }],
        scgm: [{ max: 256, message: "长度在 256 个字符以内", trigger: "blur" }],
        dzhjgk: [
          { max: 2000, message: "长度在 2000个字符以内", trigger: "blur" }
        ],
        dzzhfyqk: [
          { max: 2000, message: "长度在 2000个字符以内", trigger: "blur" }
        ],
        bzj: [{ max: 256, message: "长度在 256个字符以内", trigger: "blur" }],
        fhzlqk: [
          { max: 2000, message: "长度在 2000个字符以内", trigger: "blur" }
        ],
        remark: [
          { max: 2000, message: "长度在 2000个字符以内", trigger: "blur" }
        ]
      },
      formData: {
        code: "",
        name: "",
        kaicaikzdm: "",
        xkz: "",
        fzjg: "",
        yxqx: "",
        ssqx: "",
        weizhi: "",
        fanwei: "",
        area: 0,
        kczt: "",
        scgm: "",
        kqgm: "",
        dzhjgk: "",
        dzzhfyqk: "",
        bzj: "",
        hjyxpg: "",
        fhzlqk: "",
        remark: "",
        lon: undefined,
        lat: undefined,
        isLVSE: true,
        isGUOJIA: true,
        isZHUANYE: true,
        attachments: [],
        id: 0
      },
      townList: {
        children: ""
      },
      canEdit: false
    };
  },
  created() {
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
      this.formData.ssqx = this.myssqx;
    } else if (this.formType == "edit") {
      api = "report/mineInformation/edit";
      this.canEdit = true;
    } else {
      api = "querypage/mineInformation/getById";
      this.canEdit = false;
    }
    if (this.currenLevel != 3) {
      this.$store
        .dispatch("report/mineInformation/getAdministrative", this.adminCode)
        .then(res => {
          this.townList = res.data.result;
        });
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
      this.$refs["mineInfo-form"].clearValidate();
    }
  },
  methods: {
    saveForm() {
      this.$refs["mineInfo-form"].validate(async valid => {
        if (valid) {
          if (this.formData.code) {
            // 新增
            if (this.formType == "create") {
              let flag;
              flag = await this.$store
                .dispatch("report/mineInformation/create", this.formData)
                .then(async res => {
                  flag = await this.$util.addSaveConfirm(res.data.success);
                  if (!flag) {
                    this.formData.code = "";
                  }
                });
              // 编辑
            } else {
              this.$store
                .dispatch("report/mineInformation/update", this.formData)
                .then(res => {
                  this.$util.editSaveMessage(res.data.success);
                });
            }
            this.$refs["mineInfo-form"].clearValidate();
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
    },
    creatCode() {
      this.$store
        .dispatch("report/mineInformation/generateGeositeCode")
        .then(res => {
          this.formData.code = res.data.result;
        });
    }
  }
};
</script>
