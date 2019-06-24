<template>
  <div class="gl-content-item" v-loading.lock="loading">
    <el-form
      label-width="200px"
      label-suffix="："
      :model="preDisasterReportForm"
      ref="preDisasterReportForm"
      :disabled="!canEdit"
      :rules="rules"
      :inline="true"
      size="medium"
    >
      <el-form-item class="gl-form-item" label="区县/乡镇" prop="adminCode">
        <el-cascader
          v-model="preDisasterReportForm.adminCode"
          :props="adminCodeParam"
          :options="options"
        >
          <template slot-scope="{ node }">
            <span v-if="node.isDisabled">
              {{ "原值： " + node.label }}
              <span class="current-admin-spliter"></span>
            </span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item class="gl-form-item" label="灾情（处）" prop="disaster">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入灾情（处）"
          v-model="preDisasterReportForm.disaster"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="险情（处）" prop="danger">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入险情（处）"
          v-model="preDisasterReportForm.danger"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="成功避险（处）" prop="avoid">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入成功避险（处）"
          v-model="preDisasterReportForm.avoid"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="避险转移人数（人次）"
        prop="transfer"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入避险转移人数（人次）"
          v-model="preDisasterReportForm.transfer"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="隐患点排查（处）" prop="patrol">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入隐患点排查（处）"
          v-model="preDisasterReportForm.patrol"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="电话抽查值班室（次）"
        prop="checkDuty"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入电话抽查值班室（次）"
          v-model="preDisasterReportForm.checkDuty"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="电话抽查隐患点（处）"
        prop="checkSite"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入电话抽查隐患点（处）"
          v-model="preDisasterReportForm.checkSite"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label-width="240"
        label="电话抽查防灾责任人（人）"
        prop="checkPreventOwer"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入电话抽查防灾责任人（人）"
          v-model="preDisasterReportForm.checkPreventOwer"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="电话抽查监测责任人（人）"
        label-width="240"
        prop="checkMonitorOwer"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入电话抽查监测责任人（人）"
          v-model="preDisasterReportForm.checkMonitorOwer"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label-width="240"
        label="电话抽查专职监测人（人）"
        prop="checkMonitor"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入电话抽查专职监测人（人）"
          v-model="preDisasterReportForm.checkMonitor"
        ></el-input-number>
      </el-form-item>
      <!-- <el-form-item class="gl-form-item" label="日期" prop>
        <el-date-picker
          v-model="preDisasterReportForm.time"
          type="date"
          format="yyyy年MM月dd日"
          placeholder="请选择日期"
        ></el-date-picker>
      </el-form-item>-->
      <div>
        <el-form-item class="el-form-inline" label="降雨情况" prop="rain">
          <el-input
            type="textarea"
            :rows="3"
            v-model="preDisasterReportForm.rain"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="其他防灾工作" prop="other">
          <el-input
            type="textarea"
            :rows="3"
            v-model="preDisasterReportForm.other"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            v-model="preDisasterReportForm.remark"
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
        size="medium"
        :loading="saveLoad"
        >保 存</el-button
      >
    </p>
  </div>
</template>
<script>
// import comLatitude from "../../components/comLatitude";
// import util from "@/lib/util";
export default {
  // components: {
  //   comLatitude
  // },
  props: {
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      saveLoad: false,
      preDisasterReportForm: {
        disaster: undefined,
        danger: undefined,
        avoid: undefined,
        transfer: undefined,
        patrol: undefined,
        checkDuty: undefined,
        checkSite: undefined,
        checkPreventOwer: undefined,
        checkMonitorOwer: undefined,
        checkMonitor: undefined,
        rain: "",
        other: "",
        remark: "",
        adminCode: this.$store.getters.area.adminCode,
        id: 0
      },
      rules: {
        disaster: [
          {
            required: true,
            message: "请填入灾情处个数",
            trigger: "blur"
          },
          { type: "number", message: "灾情处个数为整数值", trigger: "blur" }
        ],
        danger: [
          {
            required: true,
            message: "请填入险情处个数",
            trigger: "blur"
          },
          { type: "number", message: "险情处个数为整数值", trigger: "blur" }
        ],
        avoid: [
          {
            required: true,
            message: "请填入成功避险处个数",
            trigger: "blur"
          },
          { type: "number", message: "成功避险处个数为整数值", trigger: "blur" }
        ],
        transfer: [
          {
            required: true,
            message: "请填入避险转移人数",
            trigger: "blur"
          },
          { type: "number", message: "避险转移人数为整数值", trigger: "blur" }
        ],
        patrol: [
          {
            required: true,
            message: "请填入隐患点巡排查处",
            trigger: "blur"
          },
          {
            type: "number",
            message: "隐患点巡排查处为整数值",
            trigger: "blur"
          }
        ],
        checkDuty: [
          {
            required: true,
            message: "请填入电话抽查值班室次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "电话抽查值班室次数为整数值",
            trigger: "blur"
          }
        ],
        checkSite: [
          {
            required: true,
            message: "请填入电话抽查隐患点个数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "电话抽查隐患点个数为整数值",
            trigger: "blur"
          }
        ],
        checkPreventOwer: [
          {
            required: true,
            message: "请填电话抽查防灾责任人数量",
            trigger: "blur"
          },
          {
            type: "number",
            message: "电话抽查防灾责任人数量为整数值",
            trigger: "blur"
          }
        ],
        checkMonitorOwer: [
          {
            required: true,
            message: "请填入电话抽查监测责任人数量",
            trigger: "blur"
          },
          {
            type: "number",
            message: "电话抽查监测责任人数量为整数值",
            trigger: "blur"
          }
        ],
        checkMonitor: [
          {
            required: true,
            message: "请填入电话抽查专职监测人数量",
            trigger: "blur"
          },
          {
            type: "number",
            message: "电话抽查专职监测人数量为整数值",
            trigger: "blur"
          }
        ],
        emergencyTeam: [
          {
            required: true,
            message: "请填入应急工作派出工作组和专家组数量",
            trigger: "blur"
          },
          {
            type: "number",
            message: "应急工作派出工作组和专家组数量为整数值",
            trigger: "blur"
          }
        ],
        rain: [
          { required: true, message: "请输入降雨情况", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        other: [
          { required: true, message: "请输入其他防灾工作", trigger: "blur" },
          { max: 512, message: "长度在 512 个字符以内", trigger: "blur" }
        ],
        adminCode: [
          { required: true, message: "请选择区县/乡镇", trigger: "change" }
        ]
      },
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
            "dutyReport/preDisasterReport/editItem",
            this.$route.query.id
          )
          .then(res => {
            this.preDisasterReportForm = res;
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
      this.preDisasterReportForm.admin = {};
      this.loading = true;
      this.$store
        .dispatch("dutyReport/preDisasterReport/getItem", this.$route.query.id)
        .then(res => {
          this.preDisasterReportForm = res;
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
  },
  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    save() {
      this.saveLoad = true;
      this.$refs["preDisasterReportForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认保存?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.saveLoad = false;
              let method = "";
              if (this.$route.query.routeName == "新增防灾概述报送") {
                method = "createItem";
              } else {
                method = "saveEditItem";
              }
              this.$store
                .dispatch(
                  "dutyReport/preDisasterReport/" + method,
                  this.preDisasterReportForm
                )
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                  this.$refs["preDisasterReportForm"].resetFields();
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
