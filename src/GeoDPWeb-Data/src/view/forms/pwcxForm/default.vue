<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix=":"
        inline
        :model="formData"
        label-width="140px"
        ref="pwcxForm"
        :rules="rules"
        :disabled="!canEdit"
      >
        <div class="form-item">
          <h2>基本信息</h2>
          <div class="form-item-wapper">
            <basicinfo-selector
              v-model="formData.riskRemovalSites[0]"
              :isAdd="canEdit"
            />
          </div>
        </div>
        <div class="form-item">
          <h2 ref="pwcxFormH1">排危除险</h2>
          <div class="form-item-wapper">
            <el-form-item label="排危除险名称" prop="pwaA02A020">
              <el-input
                v-model="formData.pwaA02A020"
                placeholder="请输入排危除险名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="保护财产(万元)" prop="pwaA02A070">
              <el-input-number
                :controls="false"
                placeholder="请输入"
                :max="99999999.99"
                :precision="2"
                v-model.number="formData.pwaA02A070"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="保护人数" prop="pwaA02A060">
              <el-input-number
                :controls="false"
                placeholder="请输入"
                :max="99999999"
                v-model.number="formData.pwaA02A060"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="省级任务书编号">
              <el-cascader
                v-model="formData.pwaA02A090"
                :options="bookList"
                :props="{ emitPath: false }"
                clearable
              ></el-cascader>
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
              <el-input v-model="formData.pwaA02A110" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
              <el-input v-model="formData.pwaA02A120" placeholder></el-input>
            </el-form-item>
            <el-form-item label="负责人电话">
              <el-input v-model="formData.pwaA02A130" placeholder></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
              <el-date-picker
                type="date"
                v-model="formData.pwaA02A140"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完工时间">
              <el-date-picker
                type="date"
                v-model="formData.pwaA02A150"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="概算资金(万元)">
              <el-input-number
                v-model="formData.pwaA02A160"
                :controls="false"
                :max="99999999.99"
                :precision="2"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="是否入库">
              <el-select v-model="formData.pwaA02A170" disabled>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>

            <!-- <comAttachment
              v-model="formData.attachments"
              :fileOption="fileOption"
              class="form-attachment"
            />-->
          </div>
        </div>
        <div class="form-item">
          <h2 ref="zhzzH4">资金来源</h2>
          <div class="form-item-wapper">
            <el-form-item label="下达资金(万元)">
              <el-input-number
                disabled
                v-model="xdzj"
                :controls="false"
                :max="99999999.99"
                :precision="2"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="中省资金(万元)">
              <el-input-number
                disabled
                v-model="formData.pwaA02A340"
                :controls="false"
                :max="99999999.99"
                :precision="2"
              ></el-input-number>
            </el-form-item>
            <div
              v-for="(file, index) in formData.riskRemovalCentProvs"
              :key="index"
            >
              <el-form-item
                label="中省资金文件"
                :prop="'riskRemovalCentProvs[' + index + '].pwaA03A040'"
              >
                <el-select
                  v-model="file.pwaA03A040"
                  @change="fileChange($event, file)"
                  clearable
                  placeholder
                >
                  <el-option
                    v-for="item in fundList"
                    :key="item.rwaA03A020"
                    :label="item.rwaA03A030"
                    :value="item.rwaA03A020"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="额度(万元)"
                :prop="'riskRemovalCentProvs[' + index + '].pwaA03A050'"
                class="form-item-btn"
              >
                <el-input-number
                  v-model="file.pwaA03A050"
                  :controls="false"
                  @change="zszjChange"
                  :max="99999999.99"
                  :precision="2"
                ></el-input-number>
                <el-button
                  @click="index === 0 ? addFile() : deleteFile(index)"
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
                v-model="formData.pwaA02A350"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                @change="setXdzj"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="县级资金(万元)">
              <el-input-number
                v-model="formData.pwaA02A351"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                @change="setXdzj"
              ></el-input-number>
            </el-form-item>
          </div>
        </div>

        <div class="form-item">
          <h2 ref="zhzzH4">中省资金使用</h2>
          <div class="form-item-wapper">
            <el-form-item label="累计拨付资金(万元)">
              <el-input-number
                v-model="formData.pwaA02A360"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                @change="setJyzj"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结存资金(万元)">
              <el-input-number
                v-model="formData.pwaA02A370"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                @change="setJyzj"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="结余资金(万元)">
              <el-input-number
                disabled
                v-model="formData.pwaA02A380"
                :controls="false"
                :max="99999999.99"
                :precision="2"
                label
              ></el-input-number>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.pwaA02A990"
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
import basicinfoSelector from "@/view/components/pwcxBasicinfo";
export default {
  name: "PwcxForm",
  components: { basicinfoSelector, timeLine },
  computed: {
    test1() {
      return this.formData.riskRemovalCentProvs[0].pwaA03A050;
    },
    formType() {
      return this.$route.meta.formType;
    },
    fileOption() {
      return {
        tag: ["附件上传"],
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
    isNdfa() {
      if (this.canEdit) {
        return !this.formData.ndfa;
      }
      return true;
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
        pwaA02A020: [
          {
            required: true,
            trigger: "blur",
            message: "请输入排危除险名称"
          }
        ]
      },
      formData: {
        pwaA02A020: "",
        pwaA02A030: undefined,
        pwaA02A040: undefined,
        pwaA02A050: "",
        pwaA02A060: undefined,
        pwaA02A070: undefined,
        pwaA02A080: "",
        pwaA02A081: "",
        pwaA02A090: "",
        pwaA02A091: "",
        pwaA02A100: "",
        pwaA02A110: "",
        pwaA02A120: "",
        pwaA02A130: "",
        pwaA02A140: null,
        pwaA02A150: null,
        pwaA02A160: undefined,
        pwaA02A170: "",
        pwaA02A180: "",
        pwaA02A190: null,
        pwaA02A200: null,
        pwaA02A210: "",
        pwaA02A220: "",
        pwaA02A230: "",
        pwaA02A240: null,
        pwaA02A250: null,
        pwaA02A260: "",
        pwaA02A270: "",
        pwaA02A280: "",
        pwaA02A290: "",
        pwaA02A300: null,
        pwaA02A310: "",
        pwaA02A320: null,
        pwaA02A330: undefined,
        pwaA02A340: undefined,
        pwaA02A350: undefined,
        pwaA02A351: undefined,
        pwaA02A360: undefined,
        pwaA02A370: undefined,
        pwaA02A380: undefined,
        pwaA02A390: "",
        pwaA02A400: undefined,
        pwaA02A410: undefined,
        pwaA02A420: "",
        pwaA02A430: null,
        pwaA02A440: "",
        pwaA02A450: null,
        pwaA02A460: "",
        pwaA02A470: "",
        pwaA02A480: null,
        pwaA02A490: "",
        pwaA02A980: "",
        pwaA02A990: "",
        riskRemovalSites: [
          {
            pwaA04A010: "",
            pwaA04A020: "",
            pwaA04A030: "",
            pwaA04A040: "",
            pwaA04A050: "",
            pwaA04A060: "",
            pwaA04A070: "",
            id: 0
          }
        ],
        riskRemovalCentProvs: [
          {
            pwaA03A010: "",
            pwaA03A020: "",
            pwaA03A030: "",
            pwaA03A040: "",
            pwaA03A050: undefined,
            pwaA03A060: 0,
            id: 0
          }
        ]
      },
      canEdit: true,
      bookList: [],
      fundList: [],
      xdzj: undefined
    };
  },
  created() {
    this.$store.dispatch("rwszszj/getAllBook").then(res => {
      this.bookList = res;
    });
    this.$store.dispatch("rwszszj/getAllFund").then(res => {
      this.fundList = res;
    });
    let api;
    if (this.formType == "create") {
      this.canEdit = true;
    } else if (this.formType == "edit") {
      api = "report/pwcx/edit";
      this.canEdit = true;
    } else {
      api = "report/pwcx/getById";
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
      this.$refs["pwcxForm"].clearValidate();
    }
  },
  methods: {
    setXdzj() {
      let a340 = 0,
        a350 = 0,
        a351 = 0;
      if (this.formData.pwaA02A340) {
        a340 = this.formData.pwaA02A340;
      }
      if (this.formData.pwaA02A350) {
        a350 = this.formData.pwaA02A350;
      }
      if (this.formData.pwaA02A351) {
        a351 = this.formData.pwaA02A351;
      }
      this.xdzj = a340 + a350 + a351;
      this.setJyzj();
    },
    zszjChange() {
      let num = 0;
      this.formData.riskRemovalCentProvs.forEach(item => {
        if (item.pwaA03A050) {
          num += item.pwaA03A050;
        }
      });
      this.formData.pwaA02A340 = num;
      this.setXdzj();
    },
    setJyzj() {
      let a360 = 0,
        a370 = 0,
        tempXdzj = 0;
      if (this.formData.pwaA02A360) {
        a360 = this.formData.pwaA02A360;
      }
      if (this.formData.pwaA02A370) {
        a370 = this.formData.pwaA02A370;
      }
      if (this.xdzj) {
        tempXdzj = this.xdzj;
      }
      this.formData.pwaA02A380 = tempXdzj - (a360 + a370);
    },
    fileChange(val, file) {
      let f = this.fundList.find(item => {
        return item.rwaA03A020 == val;
      });
      file.pwaA03A030 = f.rwaA03A010;
    },
    addFile() {
      this.formData.riskRemovalCentProvs.push({
        pwaA03A010: "",
        pwaA03A020: "",
        pwaA03A030: "",
        pwaA03A040: "",
        pwaA03A050: 0,
        pwaA03A060: 0,
        id: 0
      });
    },
    deleteFile(index) {
      this.formData.riskRemovalCentProvs.splice(index, 1);
      this.zszjChange();
    },
    valueChanged() {
      //   this.formData.code = this.formData.site.code;
    },
    saveForm() {
      this.$refs["pwcxForm"].validate(async valid => {
        if (valid) {
          this.ownDisabled = true;
          //  新增;
          if (this.formType == "create") {
            this.$store
              .dispatch("report/pwcx/create", this.formData)
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
              .dispatch("report/pwcx/update", this.formData)
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
