<template>
  <div class="gl-content-item" v-loading.lock="loading">
    <el-form
      label-width="200px"
      label-suffix="："
      :model="emergencyWorkReportForm"
      ref="emergencyWorkReportForm"
      :disabled="!canEdit"
      :rules="rules"
      :inline="true"
      size="medium"
    >
      <el-form-item class="gl-form-item" label="区县/乡镇" prop="adminCode">
        <el-cascader
          v-model="emergencyWorkReportForm.adminCode"
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
      <el-form-item
        class="gl-form-item"
        label="演练场次（次）"
        prop="drillSession"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入演练场次（次）"
          v-model="emergencyWorkReportForm.drillSession"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="演练人数（人）"
        prop="drillNumber"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输演练人数（人）"
          v-model="emergencyWorkReportForm.drillNumber"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="培训场次（次）"
        prop="trainSession"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入培训场次（次）"
          v-model="emergencyWorkReportForm.trainSession"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="培训人数（人）"
        prop="trainNumber"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入培训人数（人）"
          v-model="emergencyWorkReportForm.trainNumber"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="红色预警信息（次）"
        prop="warningRed"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入红色预警信息（次）"
          v-model="emergencyWorkReportForm.warningRed"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="橙色预警信息（次）"
        prop="warningOrange"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入橙色预警信息（次）"
          v-model="emergencyWorkReportForm.warningOrange"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="黄色预警信息（次）"
        prop="warningYellow"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入黄色预警信息（次）"
          v-model="emergencyWorkReportForm.warningYellow"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="蓝色预警信息（次）"
        prop="warningBlue"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :percision="0"
          placeholder="请输入蓝色预警信息（次）"
          v-model="emergencyWorkReportForm.warningBlue"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="应急工作会议（场）"
        prop="emergencyMeeting"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :prescision="0"
          placeholder="请输入应急工作会议（场）"
          v-model="emergencyWorkReportForm.emergencyMeeting"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="应急工作发文（件）"
        prop="emergencyFile"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :prescision="0"
          placeholder="请输入应急工作发文（件）"
          v-model="emergencyWorkReportForm.emergencyFile"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="处置隐患点（处）"
        prop="emergencySite"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :prescision="0"
          placeholder="请输入处置隐患点（处）"
          v-model="emergencyWorkReportForm.emergencySite"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="派出工作组和专家组（个）"
        label-width="240"
        prop="emergencyTeam"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :prescision="0"
          placeholder="请输入派出工作组和专家组（个）"
          v-model="emergencyWorkReportForm.emergencyTeam"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label-width="240"
        label="工作组和专家组人数（人）"
        prop="emergencyPeople"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :prescision="0"
          placeholder="请输入工作组和专家组人数（人）"
          v-model="emergencyWorkReportForm.emergencyPeople"
        ></el-input-number>
      </el-form-item>

      <div>
        <el-form-item class="el-form-inline" label="备注">
          <!-- <p class="gl-second-title">备注</p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="emergencyWorkReportForm.remark"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <!-- <p class="gl-second-title">附件</p>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="medium"
          ><i class="el-icon-plus el-icon--left"></i> 添加附件</el-button
        >
    </el-upload>-->

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
      emergencyWorkReportForm: {
        drillSession: undefined,
        drillNumber: undefined,
        trainSession: undefined,
        trainNumber: undefined,
        warningRed: undefined,
        warningOrange: undefined,
        warningYellow: undefined,
        warningBlue: undefined,
        emergencyMeeting: undefined,
        emergencyFile: undefined,
        emergencyTeam: undefined,
        emergencyPeople: undefined,
        emergencySite: undefined,
        remark: "",
        adminCode: this.$store.getters.area.adminCode,
        id: 0
      },
      rules: {
        drillSession: [
          {
            required: true,
            message: "请填入演练场次",
            trigger: "blur"
          },
          { type: "number", message: "演练场次为整数值", trigger: "blur" }
        ],
        drillNumber: [
          {
            required: true,
            message: "请填入演练人数",
            trigger: "blur"
          },
          { type: "number", message: "演练人数为整数值", trigger: "blur" }
        ],
        trainSession: [
          {
            required: true,
            message: "请填入培训场次",
            trigger: "blur"
          },
          { type: "number", message: "培训场次为整数值", trigger: "blur" }
        ],
        trainNumber: [
          {
            required: true,
            message: "请填入培训人数",
            trigger: "blur"
          },
          { type: "number", message: "培训人数为整数值", trigger: "blur" }
        ],
        warningRed: [
          {
            required: true,
            message: "请填入红色预警信息发布次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "红色预警信息发布次数为整数值",
            trigger: "blur"
          }
        ],
        warningOrange: [
          {
            required: true,
            message: "请填入橙色预警信息发布次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "橙色预警信息发布次数为整数值",
            trigger: "blur"
          }
        ],
        warningYellow: [
          {
            required: true,
            message: "请填入黄色预警信息发布次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "黄色预警信息发布次数为整数值",
            trigger: "blur"
          }
        ],
        warningBlue: [
          {
            required: true,
            message: "请填入蓝色预警信息发布次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "蓝色预警信息发布次数为整数值",
            trigger: "blur"
          }
        ],
        emergencyMeeting: [
          {
            required: true,
            message: "请填入应急工作会议次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "应急工作会议次数为整数值",
            trigger: "blur"
          }
        ],
        emergencyFile: [
          {
            required: true,
            message: "请填入应急工作发文次数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "应急工作发文次数为整数值",
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
        emergencyPeople: [
          {
            required: true,
            message: "请填入应急工作工作组和专家组人数",
            trigger: "blur"
          },
          {
            type: "number",
            message: "应急工作工作组和专家组人数为整数值",
            trigger: "blur"
          }
        ],
        emergencySite: [
          {
            required: true,
            message: "请填入应急工作处置隐患点数量",
            trigger: "blur"
          },
          {
            type: "number",
            message: "应急工作处置隐患点数量为整数值",
            trigger: "blur"
          }
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
            "dutyReport/emergencyWorkReport/editItem",
            this.$route.query.id
          )
          .then(res => {
            this.emergencyWorkReportForm = res;
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
      this.emergencyWorkReportForm.admin = {};
      this.loading = true;
      this.$store
        .dispatch(
          "dutyReport/emergencyWorkReport/getItem",
          this.$route.query.id
        )
        .then(res => {
          this.emergencyWorkReportForm = res;
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
      this.$refs["emergencyWorkReportForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认保存?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.saveLoad = false;
              let method = "";
              if (this.$route.query.routeName == "新增地灾应急工作统计表报送") {
                method = "createItem";
              } else {
                method = "saveEditItem";
              }
              this.$store
                .dispatch(
                  "dutyReport/emergencyWorkReport/" + method,
                  this.emergencyWorkReportForm
                )
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                  this.$refs["emergencyWorkReportForm"].resetFields();
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
