<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        inline
        :model="formData"
        label-width="140px"
        ref="dzzsqxForm"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2>基本信息</h2>
          <div class="form-item-wapper">
            <el-form-item
              label="隐患点名称"
              :class="canEdit ? 'form-item-btn' : ''"
            >
              <el-input
                disabled
                placeholder="请查找隐患点名称"
                v-model="formData.ydsJ02A560"
              ></el-input>
              <el-button
                v-if="canEdit"
                @click="openBasicinfo"
                icon="el-icon-search"
                >查找</el-button
              >
            </el-form-item>

            <el-form-item label="隐患点编号" prop="code">
              <el-input disabled v-model="formData.ydsJ02A550"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="市州">
              <el-select disabled v-model="formData.ydsJ02A030">
                <el-option
                  :label="townList.displayName"
                  :value="townList.adminCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区县">
              <el-select
                disabled
                v-model="formData.ydsJ02A040"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in townList.children"
                  :key="item.adminCode"
                  :label="item.displayName"
                  :value="item.adminCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="村">
              <el-input disabled v-model="formData.ydsJ02A060"></el-input>
            </el-form-item>
            <el-form-item label="规模(万m3)">
              <el-input-number
                v-model="formData.ydsJ02A070"
                :controls="false"
                :max="99999999"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否新增点">
              <el-select v-model="formData.ydsJ02A080" placeholder>
                <el-option label="新增" :value="1"></el-option>
                <el-option label="原有" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="dzzsqxFormH1">灾情损失</h2>
          <div class="form-item-wapper">
            <el-form-item label="死亡人数(人)">
              <el-input-number
                :controls="false"
                placeholder="请输入死亡人数"
                :max="99999999"
                v-model.number="formData.ydsJ02A090"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="失踪人数(人)">
              <el-input-number
                :controls="false"
                placeholder="请输入失踪人数"
                :max="99999999"
                v-model.number="formData.ydsJ02A100"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="受伤人数(人)">
              <el-input-number
                :controls="false"
                placeholder="请输入受伤人数"
                :max="99999999"
                v-model.number="formData.ydsJ02A110"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="损失户数(户)" prop="threatHouses">
              <el-input-number
                :controls="false"
                placeholder="请输入损失户数"
                :max="99999999"
                v-model.number="formData.ydsJ02A120"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="人数(人)">
              <el-input-number
                :controls="false"
                placeholder="请输入人数"
                :max="99999999"
                v-model.number="formData.ydsJ02A130"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁房屋(间)">
              <el-input-number
                :controls="false"
                placeholder="请输入损毁房屋"
                :max="99999999"
                v-model.number="formData.ydsJ02A150"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁耕地(亩)">
              <el-input-number
                :controls="false"
                placeholder="请输入损毁耕地"
                :max="99999999"
                v-model.number="formData.ydsJ02A160"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁森林(亩)">
              <el-input-number
                :controls="false"
                placeholder="请输入损毁森林"
                :max="99999999"
                v-model.number="formData.ydsJ02A170"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="损毁道路(m)">
              <el-input-number
                :controls="false"
                placeholder="请输入损毁道路"
                :max="99999999"
                v-model.number="formData.ydsJ02A180"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="直接经济损失(万元)" prop="threatProperty">
              <el-input-number
                :controls="false"
                :precision="2"
                placeholder="请输入直接经济损失"
                :max="99999999.99"
                v-model.number="formData.ydsJ02A190"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="其他">
              <el-input v-model="formData.ydsJ02A200" placeholder></el-input>
            </el-form-item>

            <el-form-item label="灾情等级">
              <el-select v-model="formData.ydsJ02A210" placeholder>
                <el-option label="特大型" value="A"></el-option>
                <el-option label="大型" value="B"></el-option>
                <el-option label="中型" value="C"></el-option>
                <el-option label="小型" value="D"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="form-item page-next">
          <h2 ref="dzzsqxFormH4">现状威胁</h2>
          <div class="form-item-wapper">
            <el-form-item label="威胁户数(户)" prop="threatHouses">
              <el-input-number
                :controls="false"
                placeholder="请输入威胁户数"
                :max="99999999"
                v-model.number="formData.ydsJ02A220"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁人数(人)">
              <el-input-number
                :controls="false"
                placeholder="请输入威胁人数"
                :max="99999999"
                v-model.number="formData.ydsJ02A230"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁房屋(间)">
              <el-input-number
                :controls="false"
                placeholder="请输入威胁房屋"
                :max="99999999"
                v-model.number="formData.ydsJ02A240"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁耕地(亩)">
              <el-input-number
                :controls="false"
                placeholder="请输入威胁耕地"
                :max="99999999"
                v-model.number="formData.ydsJ02A250"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁森林(亩)">
              <el-input-number
                :controls="false"
                placeholder="请输入威胁森林"
                :max="99999999"
                v-model.number="formData.ydsJ02A260"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="威胁道路(m)">
              <el-input-number
                :controls="false"
                placeholder="请输入威胁道路"
                :max="99999999"
                v-model.number="formData.ydsJ02A270"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="潜在经济损失(万元)" prop="threatProperty">
              <el-input-number
                :controls="false"
                :precision="2"
                placeholder="请输入潜在经济损失"
                :max="99999999"
                v-model.number="formData.ydsJ02A280"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="其他">
              <el-input v-model="formData.ydsJ02A290" placeholder></el-input>
            </el-form-item>

            <el-form-item label="险情等级">
              <el-select v-model="formData.ydsJ02A300" placeholder>
                <el-option label="特大型" value="A"></el-option>
                <el-option label="大型" value="B"></el-option>
                <el-option label="中型" value="C"></el-option>
                <el-option label="小型" value="D"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="威胁对象"
              prop="threatObjects"
              class="form-item-row"
            >
              <el-checkbox-group v-model="formData.ydsJ02A310">
                <el-checkbox
                  v-for="(value, key) in $t('codes.ThreatObject')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="诱发因素" class="form-item-row">
              <el-checkbox-group v-model="formData.ydsJ02A320">
                <el-checkbox
                  v-for="(value, key) in $t('codes.PredisposeFactor')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="防灾措施" class="form-item-row">
              <el-checkbox-group v-model="formData.ydsJ02A330">
                <el-checkbox
                  v-for="(value, key) in $t('codes.PreventeSuggest')"
                  :key="key"
                  :label="key"
                  >{{ value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.ydsJ02A510"
                placeholder
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="form-item page-next">
          <h2 ref="dzzsqxFormH4">附件</h2>
          <comAttachment
            v-model="formData.attachments"
            :fileOption="fileOption"
            class="form-attachment"
          />
        </div>-->
      </el-form>
      <!-- <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>-->
      <basicinfoDialog
        ref="basicinfoDialog"
        :isAdd="canEdit"
        @select="selectBasicinfo"
      />
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
// import timeLine from "@/view/components/timeLine.vue";
import basicinfoDialog from "@/view/components/basicinfoDialog";
export default {
  name: "EngineerForm",
  components: { basicinfoDialog },
  computed: {
    formType() {
      return this.$route.meta.formType;
    },
    fileOption() {
      return {
        tag: ["附件上传"],
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
      formData: {
        ydsJ02A020: "51",
        ydsJ02A030: "",
        ydsJ02A040: "",
        ydsJ02A050: "",
        ydsJ02A060: "",
        ydsJ02A070: undefined,
        ydsJ02A080: "",
        ydsJ02A090: undefined,
        ydsJ02A100: undefined,
        ydsJ02A110: undefined,
        ydsJ02A120: undefined,
        ydsJ02A130: undefined,
        ydsJ02A140: "",
        ydsJ02A150: undefined,
        ydsJ02A160: undefined,
        ydsJ02A170: undefined,
        ydsJ02A180: undefined,
        ydsJ02A190: undefined,
        ydsJ02A200: "",
        ydsJ02A210: "",
        ydsJ02A220: undefined,
        ydsJ02A230: undefined,
        ydsJ02A240: undefined,
        ydsJ02A250: undefined,
        ydsJ02A260: undefined,
        ydsJ02A270: undefined,
        ydsJ02A280: undefined,
        ydsJ02A290: "",
        ydsJ02A300: "",
        ydsJ02A310: [],
        ydsJ02A320: [],
        ydsJ02A330: [],
        ydsJ02A510: "",
        ydsJ02A540: "",
        ydsJ02A550: "",
        ydsJ02A560: "",
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
        this.townList = res;
      });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/dzzsqx/edit";
      this.canEdit = true;
    } else {
      api = "report/dzzsqx/getById";
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
      this.$refs["dzzsqxForm"].clearValidate();
    }
  },
  methods: {
    selectBasicinfo({ name, village, code, admin }) {
      this.formData.ydsJ02A560 = name;
      this.formData.ydsJ02A550 = code;
      this.formData.ydsJ02A030 = admin.cityCode;
      this.formData.ydsJ02A040 = admin.countryCode;
      // this.formData.ydsJ02A050 = admin.townCode;
      this.formData.ydsJ02A050 = "510131102";
      this.formData.ydsJ02A060 = village;
    },
    openBasicinfo() {
      this.$refs.basicinfoDialog.open();
    },
    saveForm() {
      this.$refs["dzzsqxForm"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/dzzsqx/create", this.formData)
              .then(res => {
                this.ownDisabled = false;
                this.$util.addSaveConfirm(res.data.success);
              });
            //  编辑
          } else {
            this.$store
              .dispatch("report/dzzsqx/update", this.formData)
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
