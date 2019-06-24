<template>
  <div class="gl-content-item" v-loading.lock="loading">
    <el-form
      label-width="180px"
      label-suffix="："
      :model="dangerReportForm"
      :disabled="!canEdit"
      ref="dangerReportForm"
      :rules="rules"
      :inline="true"
      size="medium"
    >
      <el-form-item class="gl-form-item" label="区县/乡镇" prop="adminCode">
        <el-cascader
          v-model="dangerReportForm.adminCode"
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
      <el-form-item class="gl-form-item" label="灾害类型" prop="disasterType">
        <el-select
          v-model="dangerReportForm.disasterType"
          placeholder="请选择灾害类型"
        >
          <el-option
            v-for="(item, index) in $t('disasterType')"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="gl-form-item" label="灾害规模" prop="scale">
        <el-input-number
          :precision="2"
          :controls="false"
          v-model="dangerReportForm.scale"
          placeholder="请选择灾害规模"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="发现地点" prop="location">
        <el-input
          placeholder="请输入发现地点"
          v-model="dangerReportForm.location"
        ></el-input>
      </el-form-item>
      <el-form-item class="gl-form-item" label="经度" prop="longitude">
        <comJWD
          :max="110"
          :min="100"
          placeholder="100 ~ 110"
          v-model.number="dangerReportForm.longitude"
        ></comJWD>
      </el-form-item>
      <el-form-item class="gl-form-item" label="纬度" prop="latitude">
        <comJWD
          :max="35"
          :min="30"
          placeholder="30 ~ 35"
          v-model.number="dangerReportForm.latitude"
        ></comJWD>
      </el-form-item>
      <el-form-item class="gl-form-item" label="发现时间" prop="discoverTime">
        <el-date-picker
          v-model="dangerReportForm.discoverTime"
          type="datetime"
          placeholder="请选择发现时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="gl-form-item" label="威胁人数" prop="threatNumber">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入威胁人数"
          v-model="dangerReportForm.threatNumber"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        class="gl-form-item"
        label="潜在经济损失（万元）"
        prop="potentialEcoLoss"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="2"
          placeholder="请输入潜在经济损失"
          v-model="dangerReportForm.potentialEcoLoss"
        ></el-input-number>
      </el-form-item>
      <!-- <el-form-item class="gl-form-item" label="是否预案点" prop>
        <el-radio-group v-model="dangerReportForm.schWorker">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>-->

      <div>
        <el-form-item class="el-form-inline" label="具体成因" prop="cause">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入具体成因"
            v-model="dangerReportForm.cause"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="发展趋势" prop="trend">
          <!-- <p class="gl-second-title">发展趋势</p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="dangerReportForm.trend"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item class="el-form-inline" label="防灾措施" prop="measures">
          <!-- <p class="gl-second-title"></p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="dangerReportForm.measures"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="专职监测员" prop="monitor">
          <el-input
            type="textarea"
            :rows="3"
            v-model="dangerReportForm.monitor"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item class="el-form-inline" label="备注">
          <!-- <p class="gl-second-title">备注</p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="dangerReportForm.remark"
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
        :loading="saveLoad"
        size="medium"
        >保 存</el-button
      >
    </p>
  </div>
</template>
<script>
import comJWD from "../../../components/comJWD";

// import util from "@/lib/util";
export default {
  components: {
    comJWD
  },
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
      dangerReportForm: {
        discoverTime: null,
        location: "",
        longitude: undefined,
        latitude: undefined,
        disasterType: "",
        scale: undefined,
        threatNumber: undefined,
        potentialEcoLoss: undefined,
        cause: "",
        trend: "",
        measures: "",
        monitor: "",
        remark: "",
        adminCode: this.$store.getters.area.adminCode,
        id: 0
      },
      rules: {
        discoverTime: [{ required: true }],
        location: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "请输入经度", trigger: "blur" },
          {
            type: "number",
            max: 110,
            min: 100,
            message: "请输入有效的范围 100° ~ 110° ",
            trigger: "blur"
          }
        ],
        latitude: [
          { required: true, message: "请输入纬度", trigger: "blur" },
          {
            type: "number",
            max: 35,
            min: 30,
            message: "请输入有效的范围 30° ~ 35°",
            trigger: "blur"
          }
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
        threatNumber: [
          {
            required: true,
            message: "请填入威胁人数",
            trigger: "blur"
          },
          { type: "number", message: "威胁人数为整数值", trigger: "blur" }
        ],
        potentialEcoLoss: [
          {
            required: true,
            message: "请填入潜在经济损失",
            trigger: "blur"
          },
          {
            type: "number",
            message: "灾害规模为数字值",
            trigger: "blur"
          }
        ],
        cause: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        trend: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        measures: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        monitor: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
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
          .dispatch("dutyReport/dangerReport/editItem", this.$route.query.id)
          .then(res => {
            this.dangerReportForm = res;
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
      this.dangerReportForm.admin = {};
      this.loading = true;
      this.$store
        .dispatch("dutyReport/dangerReport/getItem", this.$route.query.id)
        .then(res => {
          this.dangerReportForm = res;
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
      this.$refs["dangerReportForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认保存?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.saveLoad = false;
              let method = "";
              if (this.$route.query.routeName == "新增险情报送") {
                method = "createItem";
              } else {
                method = "saveEditItem";
              }
              this.$store
                .dispatch(
                  "dutyReport/dangerReport/" + method,
                  this.dangerReportForm
                )
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                  this.$refs["dangerReportForm"].resetFields();
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
