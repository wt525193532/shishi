<template>
  <div class="gl-content-item" v-loading.lock="loading">
    <el-form
      label-width="180px"
      label-suffix="："
      :model="disasterForm"
      ref="disasterForm"
      :disabled="!canEdit"
      :rules="rules"
      :inline="true"
      size="medium"
    >
      <el-form-item class="gl-form-item" label="区县/乡镇" prop="adminCode">
        <el-cascader
          v-model="disasterForm.adminCode"
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
          v-model="disasterForm.disasterType"
          placeholder="请选择灾害级别"
        >
          <el-option
            v-for="(item, index) in $t('disasterType')"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="gl-form-item" label="灾害级别" prop="scaleLevel">
        <el-select
          v-model="disasterForm.scaleLevel"
          placeholder="请选择灾害级别"
        >
          <el-option
            v-for="(item, index) in $t('scaleLevel')"
            :key="index"
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
          :controls="false"
          :min="0"
          :precision="0"
          v-model="disasterForm.scale"
          placeholder="请输入灾害规模(内容为数字)"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="地点" prop="location">
        <el-input
          placeholder="请输入地点"
          v-model="disasterForm.location"
        ></el-input>
      </el-form-item>
      <el-form-item class="gl-form-item" label="经度" prop="longitude">
        <comJWD
          :max="110"
          :min="100"
          placeholder="100 ~ 110"
          v-model.number="disasterForm.longitude"
        ></comJWD>
      </el-form-item>
      <el-form-item class="gl-form-item" label="纬度" prop="latitude">
        <comJWD
          :max="35"
          :min="30"
          placeholder="30 ~ 35"
          v-model.number="disasterForm.latitude"
        ></comJWD>
      </el-form-item>
      <el-form-item class="gl-form-item" label="发生时间" prop="happenTime">
        <el-date-picker
          v-model="disasterForm.happenTime"
          type="datetime"
          placeholder="请选择发现时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="gl-form-item" label="受灾人口" prop="affected">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入受灾人数"
          v-model="disasterForm.affected"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="死亡（人）" prop="death">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入死亡人数"
          v-model="disasterForm.death"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="失踪（人）" prop="missing">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入失踪人数"
          v-model="disasterForm.missing"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="受伤（人）" prop="injured">
        <el-input-number
          :controls="false"
          :min="0"
          :precision="0"
          placeholder="请输入受伤人数"
          v-model="disasterForm.injured"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="gl-form-item" label="引发因素" prop="factor">
        <el-input
          placeholder="请输入引发因素"
          v-model="disasterForm.factor"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="直接经济损失（万元）"
        prop="directEcoLoss"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="2"
          placeholder="请输入直接经济损失"
          v-model="disasterForm.directEcoLoss"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        class="gl-form-item"
        label="造成土地受损面积(亩)"
        prop="landLoss"
      >
        <el-input-number
          :controls="false"
          :min="0"
          :precision="2"
          placeholder="请输入造成土地受损面积"
          v-model="disasterForm.landLoss"
        ></el-input-number>
      </el-form-item>
      <!-- <el-form-item class="gl-form-item" label="造成土地受损面积（亩）" prop>
        <el-input-number
          :controls="false"
          :min="0"
          placeholder="请输入造成土地受损面积"
          controls-position="right"
          v-model="disasterForm.schWorker"
        ></el-input-number>
      </el-form-item>-->
      <!-- <el-form-item class="gl-form-item" label="是否预案点" prop>
        <el-radio-group v-model="disasterForm.schWorker">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item class="gl-form-item" label="损毁土地类型" prop="landType">
        <el-select
          v-model="disasterForm.landType"
          placeholder="请选择损毁土地类型"
        >
          <el-option
            v-for="(item, index) in $t('landType')"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item class="el-form-inline" label="具体成因" prop="cause">
          <!-- <p class="gl-second-title">发展趋势</p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="disasterForm.cause"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="受灾对象" prop="objects">
          <!-- <p class="gl-second-title"></p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="disasterForm.objects"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="采取措施" prop="measures">
          <el-input
            type="textarea"
            :rows="3"
            v-model="disasterForm.measures"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-inline" label="备注">
          <!-- <p class="gl-second-title">备注</p> -->
          <el-input
            type="textarea"
            :rows="3"
            v-model="disasterForm.remark"
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
import comJWD from "../../../components/comJWD";

// import { getDuFenMiao } from "@/lib/util"
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
      disasterForm: {
        happenTime: null,
        location: "",
        longitude: undefined,
        latitude: undefined,
        disasterType: "",
        scaleLevel: "",
        scale: undefined,
        affected: undefined,
        death: undefined,
        missing: undefined,
        injured: undefined,
        directEcoLoss: undefined,
        landLoss: undefined,
        landType: "",
        factor: "",
        cause: "",
        objects: "",
        measures: "",
        remark: "",
        adminCode: "510131000000",
        id: 0
      },
      rules: {
        happenTime: [
          { required: true, message: "请输入发生时间", trigger: "blur" }
        ],
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
        scaleLevel: [
          {
            required: true,
            message: "请选择灾情级别",
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
        affected: [
          {
            required: true,
            message: "请填入受灾人口",
            trigger: "blur"
          },
          { type: "number", message: "受灾人口为整数值", trigger: "blur" }
        ],
        death: [
          {
            required: true,
            message: "请填入死亡人口",
            trigger: "blur"
          },
          { type: "number", message: "死亡人口为整数值", trigger: "blur" }
        ],
        missing: [
          {
            required: true,
            message: "请填入失踪人口",
            trigger: "blur"
          },
          { type: "number", message: "失踪人口为整数值", trigger: "blur" }
        ],
        injured: [
          {
            required: true,
            message: "请填入受伤人口",
            trigger: "blur"
          },
          { type: "number", message: "受伤人口为整数值", trigger: "blur" }
        ],
        directEcoLoss: [
          {
            required: true,
            message: "请填入直接经济损失",
            trigger: "blur"
          },
          {
            type: "number",
            message: "直接经济损失为数字值",
            trigger: "blur"
          }
        ],
        landLoss: [
          {
            required: true,
            message: "请填入造成土地受损面积",
            trigger: "blur"
          },
          {
            type: "number",
            message: "造成土地受损面积为数字值",
            trigger: "blur"
          }
        ],
        factor: [
          { required: true, message: "请输入引发因素", trigger: "blur" },
          { max: 10, message: "长度在 10 个字符以内", trigger: "blur" }
        ],
        cause: [
          { required: true, message: "请输入具体成因", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        objects: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 128, message: "长度在 128 个字符以内", trigger: "blur" }
        ],
        measures: [
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
  // watch: {
  //   testL (newVal, oldVal) {
  //     let resObj = getDuFenMiao(newVal)
  //     this.disasterForm.degree = resObj.d
  //     this.disasterForm.minute = resObj.f
  //     this.disasterForm.second = resObj.m
  //   }
  // },

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
          .dispatch("dutyReport/disasterReport/editItem", this.$route.query.id)
          .then(res => {
            this.disasterForm = res;
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
      this.disasterForm.admin = {};
      this.loading = true;
      this.$store
        .dispatch("dutyReport/disasterReport/getItem", this.$route.query.id)
        .then(res => {
          this.disasterForm = res;
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
      this.$refs["disasterForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认保存?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.saveLoad = false;
              let method = "";
              if (this.$route.query.routeName == "新增灾情报送") {
                method = "createItem";
              } else {
                method = "saveEditItem";
              }
              this.$store
                .dispatch(
                  "dutyReport/disasterReport/" + method,
                  this.disasterForm
                )
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                  this.$refs["disasterForm"].resetFields();
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
