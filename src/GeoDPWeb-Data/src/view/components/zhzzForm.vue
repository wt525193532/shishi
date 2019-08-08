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
        :disabled="disabled"
      >
        <div class="form-item">
          <h2 ref="zhzzH1">基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="市州">
              <el-select value="成都市" disabled></el-select>
            </el-form-item>
            <el-form-item label="区县">
              <el-select value="浦江县" disabled></el-select>
            </el-form-item>
            <el-form-item label="综合整治项目名称">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="保护人数">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="保护财产(万元)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <!-- <el-form-item label="下达年度">
              <el-date-picker
                type="year"
                v-model="formData.date"
                placeholder="选择年度"
              ></el-date-picker>
            </el-form-item>-->
            <div>
              <el-form-item label="是否多期">
                <el-radio-group v-model="formData.sfdq">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="项目期数" v-show="formData.sfdq">
                <el-select value="一期" disabled></el-select>
              </el-form-item>
            </div>
            <el-form-item label="省级任务书编号">
              <el-cascader :options="options" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="市州任务书编号">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">方案编制</h2>
          <div class="form-item-wapper">
            <el-form-item label="方案编制单位">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="负责人电话">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
              <el-date-picker
                type="date"
                v-model="formData.date"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完工时间">
              <el-date-picker
                type="date"
                v-model="formData.date"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="概算资金(万元)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否入库">
              <el-select v-model="formData.sfrk" placeholder>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <comAttachment
              v-model="formData.attachments"
              :fileOption="fileOption"
              class="form-attachment"
            />
          </div>
        </div>

        <div class="form-item" v-show="formData.sfrk">
          <h2 ref="zhzzH4">施工阶段</h2>
          <div class="form-item-wapper">
            <el-form-item label="工程概况">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="工程治理数量">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="排危除险数量">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="避险搬迁数量">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="专业监测数量">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="其他">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成进度">
              <el-input-number
                v-model="formData.name"
                :min="0"
                :controls="false"
                :max="100"
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">验收信息</h2>
          <div class="form-item-wapper">
            <el-form-item label="初验组织单位">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成初验时间">
              <el-date-picker
                type="date"
                v-model="formData.date"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="终验组织单位">
              <el-input v-model="formData.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="完成终验时间">
              <el-date-picker
                type="date"
                v-model="formData.date"
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
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="中省资金(万元)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <div v-for="(monitor, index) in formData.monitor" :key="index">
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
            </div>

            <el-form-item label="市级资金(万元)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="县级资金(万元)">
              <el-input-number
                v-model="formData.name"
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
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结存资金(万元)">
              <el-input-number
                v-model="formData.name"
                :min="1"
                :controls="false"
                :max="10"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结余资金(万元)">
              <el-input-number
                v-model="formData.name"
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
                v-model="formData.name"
                placeholder
              ></el-input>
            </el-form-item>
            <comAttachment
              v-model="formData.attachments"
              :fileOption="otherFileOption"
              class="form-attachment"
            />
          </div>
        </div>
      </el-form>
      <!-- <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>-->
    </div>
    <div class="form-foot-btn">
      <el-button type="primary" @click="saveFormSub" :disabled="ownDisabled">{{
        disabled === false ? "保存" : "返回"
      }}</el-button>
    </div>
  </div>
</template>

<script>
// import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "ZzjcForm",
  // components: { timeLine },
  props: {
    disabled: Boolean,
    canEdit: {
      type: Boolean,
      default: false
    },
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    },
    formData: {
      type: Object,
      default: null
    }
  },
  computed: {
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
    }
    // proccessActive() {
    //   return this.formData.processes
    //     ? this.formData.processes.length
    //     : undefined;
    // },
    // isShowAudit() {
    //   return !this.canEdit ? (this.proccessActive ? true : false) : false;
    // }
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
      ]
    };
  },
  updated() {
    // if (!this.canEdit) {
    //   this.$refs["zhzz"].clearValidate();
    // }
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
    saveFormSub() {
      //   this.$refs["zhzz"].validate(async valid => {
      //     if (valid) {
      //       if (this.formData.site.code) {
      //         this.ownDisabled = true;
      //         let r = await this.btnExcuteFunc();
      //         if (r === false) {
      //           this.ownDisabled = r;
      //         }
      //       } else {
      //         this.$message({
      //           type: "info",
      //           message: "保存不成功"
      //         });
      //         return false;
      //       }
      //     } else {
      //       this.$message.error("验证未通过");
      //     }
      //   });
    }
  }
};
</script>
