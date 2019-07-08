<template>
  <div class="gl-content-item" v-loading.lock="loading">
    <el-form
      label-width="180px"
      label-suffix="："
      :model="successForm"
      ref="successForm"
      :disabled="!canEdit"
      :rules="rules"
      :inline="true"
      size="medium"
    >
      <el-form-item class="gl-form-item" label="行政区划" prop="adminCode">
        <el-cascader
          v-model="successForm.adminCode"
          :props="adminCodeParam"
          :options="options"
          @change="handleItemChange"
        >
          <template slot-scope="{ node }">
            <span v-if="node.isDisabled">
              {{ "原值： " + node.label }}
              <span class="current-admin-spliter"></span>
            </span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item class="gl-form-item" label="发生地点" prop="location">
        <el-input
          v-model="successForm.location"
          placeholder="请输入发生地点"
        ></el-input>
      </el-form-item>
      <el-form-item class="gl-form-item" label="灾害类型" prop="disasterType">
        <el-select
          v-model="successForm.disasterType"
          placeholder="请选择灾害类型"
        >
          <el-option
            v-for="item in $t('disasterType')"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="gl-form-item" prop="scale">
        <template slot="label">
          灾害规模(m
          <sup>2</sup>)：
        </template>
        <el-input-number
          v-model="successForm.scale"
          :controls="false"
          :min="0"
          placeholder="请输入灾害规模(内容为数字)"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="灾害发生时间" prop="happenTime">
        <el-date-picker
          v-model="successForm.happenTime"
          type="datetime"
          placeholder="请选择灾害发生时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="发出预报时间"
        prop="forecastTime"
      >
        <el-date-picker
          v-model="successForm.forecastTime"
          type="datetime"
          placeholder="请选择发出预报时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="人员撤离时间"
        prop="evacuationTime"
      >
        <el-date-picker
          v-model="successForm.evacuationTime"
          type="datetime"
          placeholder="请选择人员撤离时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        class="gl-form-item"
        label="撤离避让人数(人)"
        prop="evacuatioNumber"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入撤离避让人数"
          v-model="successForm.evacuatioNumber"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="避免伤亡人数(人)"
        prop="avoidCasualty"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入避免伤亡人数"
          v-model="successForm.avoidCasualty"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="避免经济损失(万元)"
        :precision="2"
        prop="avoidEcoLoss"
      >
        <el-input-number
          :controls="false"
          :min="0"
          placeholder="请输入避免经济损失（万元）"
          v-model="successForm.avoidEcoLoss"
        ></el-input-number>
      </el-form-item>
      <div>
        <el-form-item
          class="el-form-inline"
          label="预报方法和避灾措施"
          prop="methodAndMeasure"
        >
          <el-input
            type="textarea"
            :rows="3"
            v-model="successForm.methodAndMeasure"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="el-form-inline"
          label="成绩突出人员(或单位)"
          prop="achievement"
        >
          <el-input
            type="textarea"
            :rows="3"
            v-model="successForm.achievement"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            v-model="successForm.remark"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <p class="gl-text-center">
      <el-button @click="handleClose" size="medium">返 回</el-button>
      <el-button
        v-if="canEdit"
        type="primary"
        @click="save"
        :loading="saveLoad"
        size="medium"
        >保 存</el-button
      >
    </p>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  props: {
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      successForm: {
        location: "",
        disasterType: "",
        scale: undefined,
        happenTime: "",
        forecastTime: "",
        evacuationTime: "",
        evacuatioNumber: undefined,
        avoidCasualty: undefined,
        avoidEcoLoss: undefined,
        methodAndMeasure: "",
        achievement: "",
        remark: "",
        adminCode: this.$store.getters.area.adminCode,
        id: 0
      },
      rules: {
        location: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        disasterType: [
          {
            required: true,
            message: "请选择灾害类型",
            trigger: "change"
          }
        ],
        scale: [
          {
            required: true,
            message: "请填入灾害规模",
            trigger: "blur"
          },
          {
            type: "number",
            message: "灾害规模为数字值",
            trigger: "blur"
          }
        ],
        happenTime: [
          { required: true, message: "请输入灾害发生时间", trigger: "blur" }
        ],
        forecastTime: [
          { required: true, message: "请输入发出预报时间", trigger: "blur" }
        ],
        evacuationTime: [
          { required: true, message: "请输入人员撤离时间", trigger: "blur" }
        ],
        evacuatioNumber: [
          {
            required: true,
            message: "请填入撤离避让人数",
            trigger: "blur"
          },
          { type: "number", message: "撤离避让人数为整数值", trigger: "blur" }
        ],
        avoidEcoLoss: [
          {
            required: true,
            message: "请填入避免经济损失值",
            trigger: "blur"
          },
          { type: "number", message: "避免经济损失值为整数值", trigger: "blur" }
        ],
        avoidCasualty: [
          {
            required: true,
            message: "请填入避免伤亡人数",
            trigger: "blur"
          },
          { type: "number", message: "避免伤亡人数为整数值", trigger: "blur" }
        ],
        methodAndMeasure: [
          {
            required: true,
            message: "请输入预报方法和避灾措施",
            trigger: "blur"
          },
          { max: 256, message: "长度在 256 个字符以内", trigger: "blur" }
        ],
        achievement: [
          {
            required: true,
            message: "请输入成绩突出人员(或单位)",
            trigger: "blur"
          },
          { max: 256, message: "长度在 256 个字符以内", trigger: "blur" }
        ],
        adminCode: [
          { required: true, message: "请选择区县/乡镇", trigger: "change" }
        ]
      },
      saveLoad: false,
      loading: false,
      region: [],
      options: [],
      adminCodeParam: {
        label: "displayName",
        value: "adminCode",
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            resolve([this.user]);
          } else if (node.level >= 1) {
            this.$store
              .dispatch("organization/getAdministrative", node.value)
              .then(res => {
                resolve(res.children);
              });
          }
        }
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.area;
    }
  },
  created() {
    if (this.canEdit) {
      if (this.$route.query.id) {
        this.loading = true;
        this.$store
          .dispatch(
            "dutyReport/successHedgeReport/editItem",
            this.$route.query.id
          )
          .then(res => {
            this.successForm = res;
            let adminCode = res.adminCode || this.user.adminCode;
            this.options = [
              {
                adminCode: adminCode,
                displayName: res.adminName || adminCode,
                leaf: true,
                disabled: true
              },
              {
                adminCode: this.user.adminCode,
                displayName: this.user.displayName
              }
            ];
            this.loading = false;
          });
      }
    } else {
      this.successForm.admin = {};
      this.loading = true;
      this.$store
        .dispatch("dutyReport/successHedgeReport/getItem", this.$route.query.id)
        .then(res => {
          this.successForm = res;
          let adminCode = res.adminCode || "510100000000";
          this.options = [
            {
              adminCode: adminCode,
              displayName: res.adminName
            }
          ];
          this.loading = false;
        });
    }
  },
  methods: {
    handleItemChange(val) {
      console.log(val, this.successForm);
    },
    handleClose() {
      this.$router.go(-1);
    },
    save() {
      this.saveLoad = true;
      this.$refs["successForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认保存?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              let method = "";
              if (this.$route.query.routeName == "新增成功避险报送") {
                method = "createItem";
              } else {
                method = "saveEditItem";
              }
              this.$store
                .dispatch(
                  "dutyReport/successHedgeReport/" + method,
                  this.successForm
                )
                .then(res => {
                  this.saveLoad = false;
                  this.$refs["successForm"].resetFields();
                  this.$message.success("保存成功！");
                  this.$router.go(-1);
                });
            })
            .catch(() => {
              this.saveLoad = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "验证不通过！"
          });
          this.saveLoad = false;
          return false;
        }
      });
    }
  }
};
</script>
