<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix
        inline
        :model="formData"
        label-width="140px"
        ref="lljs"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2 ref="lljsH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州" prop="zgaA03A020">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县" prop="zgaA03A030">
              <el-select
                v-model="formData.zgaA03A030"
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
            <el-form-item label="项目名称">
              <el-input v-model="formData.zgaA03A050" placeholder></el-input>
            </el-form-item>
            <el-form-item label="下达年度">
              <el-date-picker
                type="year"
                v-model="formData.zgaA03A060"
                placeholder="选择年度"
                value-format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="省级任务书编号" prop="zgaA03A070">
              <!-- <el-cascader :options="options" clearable></el-cascader> -->
              <el-input v-model="formData.zgaA03A070" placeholder></el-input>
            </el-form-item>
            <el-form-item label="市州任务书编号">
              <el-input v-model="formData.zgaA03A080" placeholder></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="lljsH4">设计阶段</h2>
          <div class="form-item-wapper">
            <el-form-item label="方案设计单位">
              <el-input v-model="formData.zgaA03A090" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
              <el-input v-model="formData.zgaA03A100" placeholder></el-input>
            </el-form-item>
            <el-form-item label="负责人电话">
              <el-input v-model="formData.zgaA03A110" placeholder></el-input>
            </el-form-item>
            <el-form-item label="方案完成时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA03A120"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目设计预算(万元)">
              <el-input-number
                v-model="formData.zgaA03A130"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <!-- <comAttachment
              v-model="formData.attachments"
              :fileOption="fileOption"
              class="form-attachment"
            />-->
          </div>
        </div>

        <div class="form-item">
          <h2 ref="lljsH4">实施阶段</h2>
          <div class="form-item-wapper">
            <el-form-item label="招标时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA03A140"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="中标时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA03A150"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="开工时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA03A160"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完工时间">
              <el-date-picker
                type="date"
                v-model="formData.zgaA03A170"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实施单位">
              <el-input v-model="formData.zgaA03A180" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
              <el-input v-model="formData.zgaA03A190" placeholder></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="formData.zgaA03A200" placeholder></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="lljsH4">验收阶段</h2>
          <div class="form-item-wapper">
            <el-form-item label="验收组织单位">
              <el-input v-model="formData.zgaA03A210" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成验收时间">
              <el-input v-model="formData.zgaA03A220" placeholder></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="lljsH4">资金来源</h2>
          <div class="form-item-wapper">
            <el-form-item label="下达资金(万元)">
              <el-input-number
                v-model="formData.zgaA03A230"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="中省资金(万元)">
              <el-input-number
                v-model="formData.zgaA03A240"
                :min="1"
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
                v-model="formData.zgaA03A250"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="县级资金(万元)">
              <el-input-number
                v-model="formData.zgaA03A260"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="lljsH4">中省资金使用</h2>
          <div class="form-item-wapper">
            <el-form-item label="累计拨付资金(万元)">
              <el-input-number
                v-model="formData.zgaA03A270"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结存资金(万元)">
              <el-input-number
                v-model="formData.zgaA03A280"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结余资金(万元)">
              <el-input-number
                v-model="formData.zgaA03A290"
                :controls="false"
                :precision="2"
                :max="99999999.99"
                label
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <div class="form-item-wapper" style="padding-top: 30px">
            <el-form-item label="备注说明">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.zgaA03A990"
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
  name: "LljsForm",
  components: { timeLine },
  data() {
    return {
      ownDisabled: false,
      rules: {
        zgaA03A020: [
          {
            required: true,
            trigger: "blur",
            message: "请选择市州"
          }
        ],
        zgaA03A030: [
          {
            required: true,
            trigger: "blur",
            message: "请选择区县"
          }
        ],
        zgaA03A070: [
          { max: 100, message: "长度在 100 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "省级任务书编号不能为空"
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
        zgaA03A020: "510100",
        zgaA03A030: "",
        zgaA03A040: "",
        zgaA03A050: "",
        zgaA03A060: "",
        zgaA03A070: "",
        zgaA03A080: "",
        zgaA03A090: "",
        zgaA03A100: "",
        zgaA03A110: "",
        zgaA03A120: null,
        zgaA03A130: undefined,
        zgaA03A140: null,
        zgaA03A150: null,
        zgaA03A160: null,
        zgaA03A170: null,
        zgaA03A180: "",
        zgaA03A190: "",
        zgaA03A200: "",
        zgaA03A210: "",
        zgaA03A220: null,
        zgaA03A230: undefined,
        zgaA03A240: undefined,
        zgaA03A250: undefined,
        zgaA03A260: undefined,
        zgaA03A270: undefined,
        zgaA03A280: undefined,
        zgaA03A290: undefined,
        zgaA03A300: "",
        zgaA03A310: null,
        zgaA03A320: "",
        zgaA03A330: "",
        zgaA03A340: null,
        zgaA03A350: "",
        zgaA03A360: "",
        zgaA03A370: null,
        zgaA03A990: "",
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
  created() {
    this.$store
      .dispatch("organization/getAdministrative", "510100")
      .then(res => {
        if (this.currenLevel == 3) {
          this.formData.zgaA03A030 = this.user.adminCode;
        }
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/lljs/edit";
      this.canEdit = true;
    } else {
      api = "report/lljs/getById";
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
      this.$refs["lljs"].clearValidate();
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
      this.$refs["lljs"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/lljs/create", this.formData)
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
              .dispatch("report/lljs/update", this.formData)
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
