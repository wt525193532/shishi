<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix
        inline
        :model="formData"
        label-width="140px"
        ref="zhzz"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="zhzzH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州" prop="zgaA01A020">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县" prop="zgaA01A030">
              <el-select
                v-model="formData.zgaA01A030"
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
            <el-form-item label="综合整治项目名称" prop="zgaA01A050">
              <el-input v-model="formData.zgaA01A050" placeholder></el-input>
            </el-form-item>
            <el-form-item label="保护人数">
              <el-input-number
                v-model="formData.zgaA01A060"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="保护财产(万元)">
              <el-input-number
                v-model="formData.zgaA01A070"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <!-- <el-form-item label="下达年度">
             
            </el-form-item>-->
            <div>
              <el-form-item label="是否多期">
                <el-radio-group v-model="formData.zgaA01A086">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="项目期数"
                v-show="formData.zgaA01A086 == '1'"
              >
                <el-select v-model="formData.zgaA01A087">
                  <el-option label="一期" value="一期"></el-option>
                  <el-option label="二期" value="二期"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="省级任务书年份" prop="zgaA01A085">
              <el-date-picker
                type="year"
                v-model="formData.zgaA01A085"
                placeholder="选择年度"
                value-format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="省级任务书编号" prop="zgaA01A090">
              <!-- <el-cascader :options="options" clearable></el-cascader> -->
              <el-input v-model="formData.zgaA01A090" placeholder></el-input>
            </el-form-item>
            <el-form-item label="市州任务书编号">
              <el-input v-model="formData.zgaA01A096" placeholder></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">方案编制</h2>
          <div class="form-item-wapper">
            <el-form-item label="方案编制单位">
              <el-input v-model="formData.zgaA01A100" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
              <el-input v-model="formData.zgaA01A110" placeholder></el-input>
            </el-form-item>
            <el-form-item label="负责人电话">
              <el-input v-model="formData.zgaA01A120" placeholder></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA01A130"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完工时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA01A140"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="概算资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A160"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否入库">
              <el-select v-model="formData.zgaA01A170" disabled>
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>

            <!-- <comAttachment
              v-model="formData.attachments"
              :fileOption="fileOption"
              class="form-attachment"
            />-->
          </div>
        </div>

        <div class="form-item" v-show="formData.zgaA01A170 == '1'">
          <h2 ref="zhzzH4">施工阶段</h2>
          <div class="form-item-wapper">
            <el-form-item label="工程概况">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.zgaA01A180"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="工程治理数量">
              <el-input-number
                v-model="formData.zgaA01A190"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="排危除险数量">
              <el-input-number
                v-model="formData.zgaA01A200"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="避险搬迁数量">
              <el-input-number
                v-model="formData.zgaA01A210"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="专业监测数量">
              <el-input-number
                v-model="formData.zgaA01A220"
                :controls="false"
                :max="9999"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="其他">
              <el-input v-model="formData.zgaA01A230" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成进度(%)">
              <el-input v-model="formData.zgaA01A240" placeholder></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">验收信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="初验组织单位">
              <el-input v-model="formData.zgaA01A270" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成初验时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA01A280"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="终验组织单位">
              <el-input v-model="formData.zgaA01A290" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成终验时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA01A300"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">资金来源</h2>
          <div class="form-item-wapper">
            <el-form-item label="下达资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A310"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="中省资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A320"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <!-- <div v-for="(monitor, index) in formData.monitor" :key="index">
              <el-form-item
                label="中省资金文件"
                :prop="'monitor[' + index + '].name'"
              >
                <el-input v-model="monitor.name" placeholder></el-input>
              </el-form-item>
              <el-form-item
                label="额度(万元)"
                :prop="'monitor[' + index + '].phone'"
                class="form-item-btn"
              >
                <el-input-number
                  v-model="formData.name"
                  :min="1"
                  :controls="false"
                  :max="10"
                ></el-input-number>
                <el-button
                  @click="index === 0 ? addMonitor() : deleteMonitor(index)"
                  circle
                  :title="index === 0 ? '添加中省资金文件' : '删除中省资金文件'"
                  plain
                  :type="index === 0 ? 'primary' : 'danger'"
                  :icon="index === 0 ? 'el-icon-plus' : 'el-icon-minus'"
                ></el-button>
              </el-form-item>
            </div>-->

            <el-form-item label="市级资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A350"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="县级资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A355"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">中省资金使用</h2>
          <div class="form-item-wapper">
            <el-form-item label="累计拨付资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A360"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结存资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A370"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结余资金(万元)">
              <el-input-number
                v-model="formData.zgaA01A380"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.zgaA01A990"
                placeholder
              ></el-input>
            </el-form-item>
            <!-- <comAttachment
              v-model="formData.attachments"
              :fileOption="otherFileOption"
              class="form-attachment"
            />-->
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
  name: "ZzjcForm",
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
        tag: ["评审意见"],
        upload: this.canEdit,
        accept: ""
      };
    },
    otherFileOption() {
      return {
        tag: ["其他附件"],
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
        zgaA01A020: [
          {
            required: true,
            trigger: "blur",
            message: "请选择市州"
          }
        ],
        zgaA01A030: [
          {
            required: true,
            trigger: "blur",
            message: "请选择区县"
          }
        ],

        zgaA01A050: [
          { max: 100, message: "长度在 100 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "综合整治项目名称不能为空"
          }
        ],
        zgaA01A085: [
          {
            required: true,
            trigger: "change",
            message: "请选择省级任务书年份"
          }
        ],
        zgaA01A090: [
          {
            required: true,
            trigger: "blur",
            message: "请选择省级任务书年份"
          }
        ]
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ],
      formData: {
        zgaA01A020: "51",
        zgaA01A025: "510100",
        zgaA01A030: "",
        zgaA01A040: "",
        zgaA01A050: "",
        zgaA01A060: undefined,
        zgaA01A070: undefined,
        zgaA01A080: "",
        zgaA01A085: "",
        zgaA01A086: "",
        zgaA01A087: "",
        zgaA01A090: "",
        zgaA01A095: "",
        zgaA01A096: "",
        zgaA01A100: "",
        zgaA01A110: "",
        zgaA01A120: "",
        zgaA01A130: null,
        zgaA01A140: null,
        zgaA01A150: "",
        zgaA01A160: undefined,
        zgaA01A170: "0",
        zgaA01A180: "",
        zgaA01A190: undefined,
        zgaA01A200: undefined,
        zgaA01A210: undefined,
        zgaA01A220: undefined,
        zgaA01A230: "",
        zgaA01A240: "",
        zgaA01A250: "",
        zgaA01A260: "",
        zgaA01A270: "",
        zgaA01A280: null,
        zgaA01A290: "",
        zgaA01A300: null,
        zgaA01A310: undefined,
        zgaA01A320: undefined,
        zgaA01A330: "",
        zgaA01A340: undefined,
        zgaA01A350: undefined,
        zgaA01A355: undefined,
        zgaA01A360: undefined,
        zgaA01A370: undefined,
        zgaA01A380: undefined,
        zgaA01A390: "",
        zgaA01A400: null,
        zgaA01A410: "",
        zgaA01A420: "",
        zgaA01A430: null,
        zgaA01A440: "",
        zgaA01A450: "",
        zgaA01A460: null,
        zgaA01A990: "",
        compreControlFiles: null,
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
          this.formData.zgaA01A030 = this.user.adminCode;
        }
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/zhzz/edit";
      this.canEdit = true;
    } else {
      api = "report/zhzz/getById";
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
      this.$refs["zhzz"].clearValidate();
    }
  },
  methods: {
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
    valueChanged() {
      //   this.formData.code = this.formData.site.code;
    },
    saveForm() {
      this.$refs["zhzz"].validate(async valid => {
        if (valid) {
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/zhzz/create", this.formData)
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
              .dispatch("report/zhzz/update", this.formData)
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
