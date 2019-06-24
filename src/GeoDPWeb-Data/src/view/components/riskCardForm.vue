<template>
  <div class="form-wrapper">
    <div class="form-wapper-it">
      <el-form
        label-position="right"
        label-suffix="："
        label-width="130px"
        inline
        ref="riskAvoidanceCard"
        :model="formData"
        :disabled="disabled"
        :rules="rules"
      >
        <div class="form-item">
          <h2 ref="avoidDangerCardH1">基本信息</h2>

          <div class="form-item-wapper">
            <basicinfo-selector
              v-show="noBtn"
              v-model="formData.site"
              @input="valueChanged"
              :isAdd="canEdit"
            />
            <el-form-item label="诱发因素" prop="predisposFactor">
              <el-input v-model="formData.predisposFactor"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="avoidDangerCardH2">家庭成员基本信息</h2>

          <div class="form-item-wapper">
            <el-form-item label="户主姓名" prop="houseHoldName">
              <el-input v-model="formData.houseHoldName"></el-input>
            </el-form-item>

            <el-form-item label="家庭人数" prop="familyMemberCount">
              <el-input
                v-model.number="formData.familyMemberCount"
                disabled
              ></el-input>
            </el-form-item>

            <el-form-item label="房屋类型" prop="houseType">
              <el-select v-model="formData.houseType" placeholder="请选择">
                <el-option label="大型" value="大型"></el-option>
                <el-option label="中型" value="中型"></el-option>
                <el-option label="小型" value="小型"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="位置关系" prop="locationRelation">
              <el-input v-model="formData.locationRelation"></el-input>
            </el-form-item>

            <el-form-item label="家庭住址" prop="houseAddress">
              <el-input v-model="formData.houseAddress"></el-input>
            </el-form-item>

            <el-form-item label="本住户注意事项" prop="attentionItems">
              <el-input v-model="formData.attentionItems"></el-input>
            </el-form-item>
            <div
              v-for="(familyMembers, index) in formData.familyMembers"
              :key="index"
            >
              <el-form-item
                label="家庭成员"
                :prop="'familyMembers[' + index + '].name'"
                :rules="[
                  {
                    required: true,
                    message: '家庭成员不能为空',
                    trigger: 'blur'
                  },
                  { max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model="familyMembers.name"
                  placeholder="请输入家庭成员"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="性别"
                :prop="'familyMembers[' + index + '].sex'"
              >
                <el-select v-model="familyMembers.sex">
                  <el-option label="女" value="女"></el-option>
                  <el-option label="男" value="男"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="出生日期"
                :prop="'familyMembers[' + index + '].birthday'"
                class="form-item-btn"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="familyMembers.birthday"
                ></el-date-picker>
                <el-button
                  @click="
                    index === 0
                      ? addfamilyMembers()
                      : deletefamilyMembers(index)
                  "
                  circle
                  :title="index === 0 ? '添加家庭成员' : '删除家庭成员'"
                  plain
                  :type="index === 0 ? 'primary' : 'danger'"
                  :icon="index === 0 ? 'el-icon-plus' : 'el-icon-minus'"
                ></el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="avoidDangerCardH3">监测与预警</h2>

          <div class="form-item-wapper">
            <el-form-item label="监测人及联系电话" v-show="false">
              <el-input disabled v-model="formData.zhgm"></el-input>
            </el-form-item>

            <el-form-item label="预警信号" prop="forcastSignal">
              <el-input v-model="formData.forcastSignal"></el-input>
            </el-form-item>

            <el-form-item label="信号发布人" prop="forcaster">
              <el-input v-model="formData.forcaster"></el-input>
            </el-form-item>

            <el-form-item label="发布人联系电话" prop="forcasterPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.forcasterPhone"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="avoidDangerCardH4">撤离与安置</h2>

          <div class="form-item-wapper">
            <el-form-item label="撤离路线" prop="evacuationRoute">
              <el-input v-model="formData.evacuationRoute"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="安置单位名称" prop="resettleCoName">
              <el-input v-model="formData.resettleCoName"></el-input>
            </el-form-item>

            <el-form-item label="单位负责人" prop="resettleCoPrincipal">
              <el-input v-model="formData.resettleCoPrincipal"></el-input>
            </el-form-item>

            <el-form-item label="单位联系电话" prop="resettleCoPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.resettleCoPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="救护单位" prop="rescueCoName">
              <el-input v-model="formData.rescueCoName"></el-input>
            </el-form-item>

            <el-form-item label="单位负责人" prop="rescueCoPrincipal">
              <el-input v-model="formData.rescueCoPrincipal"></el-input>
            </el-form-item>

            <el-form-item label="单位联系电话" prop="rescueCoPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.rescueCoPhone"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <h2 ref="avoidDangerCardH5">避险明白卡信息</h2>

          <div class="form-item-wapper">
            <el-form-item label="本卡发放单位" prop="sentCoName">
              <el-input v-model="formData.sentCoName"></el-input>
            </el-form-item>

            <el-form-item label="单位负责人" prop="sentCoPrincipal">
              <el-input v-model="formData.sentCoPrincipal"></el-input>
            </el-form-item>

            <el-form-item label="单位联系电话" prop="sentColPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.sentColPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="户主签名">
              <el-input v-model="formData.houseHoldName"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="houseHoldPhone">
              <el-input
                placeholder="如：13996633888 或者 027-87588000"
                v-model="formData.houseHoldPhone"
              ></el-input>
            </el-form-item>

            <el-form-item label="户主签名时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.signTime"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="form-item-step" v-show="isShowAudit">
        <time-line :processes="formData.processes"></time-line>
      </div>
    </div>

    <div class="form-foot-btn" v-show="noBtn">
      <el-button type="primary" @click="saveFormSub" :disabled="ownDisabled">{{
        disabled === false ? "保存" : "返回"
      }}</el-button>
    </div>
  </div>
</template>
<script>
import basicinfoSelector from "./basicinfoSelector";
import timeLine from "@/view/components/timeLine.vue";
export default {
  name: "RiskCardForm",
  data() {
    return {
      ownDisabled: false,
      rules: {
        houseHoldName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "户主签名不能为空",
            trigger: "blur"
          }
        ],
        houseHoldPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        familyMemberCount: [
          { max: 32, message: "输入整数", type: "number" },
          {
            required: true,
            message: "家庭人数不能为空",
            trigger: "blur"
          }
        ],
        houseType: [
          { max: 100, message: "长度在 100 个字符以内" },
          {
            required: true,
            message: "房屋类型不能为空",
            trigger: "blur"
          }
        ],
        houseAddress: [
          { max: 200, message: "长度在 200 个字符以内" },
          {
            required: true,
            message: "房屋类型不能为空",
            trigger: "blur"
          }
        ],
        locationRelation: [{ max: 100, message: "长度在 100 个字符以内" }],
        predisposFactor: [{ max: 100, message: "长度在 100 个字符以内" }],
        attentionItems: [{ max: 500, message: "长度在 500 个字符以内" }],
        forcastSignal: [{ max: 100, message: "长度在 100 个字符以内" }],
        forcaster: [{ max: 100, message: "长度在 100 个字符以内" }],
        forcasterPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        evacuationRoute: [{ max: 500, message: "长度在 500 个字符以内" }],
        resettleCoName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "安置单位名称不能为空",
            trigger: "blur"
          }
        ],
        resettleCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        resettleCoPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        rescueCoName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "救护单位名称不能为空",
            trigger: "blur"
          }
        ],
        rescueCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        rescueCoPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        sentCoName: [
          { max: 50, message: "长度在 50 个字符以内" },
          {
            required: true,
            message: "本卡发放单位名称不能为空",
            trigger: "blur"
          }
        ],
        sentCoPrincipal: [{ max: 50, message: "长度在 50 个字符以内" }],
        sentColPhone: [
          { max: 20, message: "长度在 20 个字符以内" },
          {
            pattern: /^1[34578]\d{9}$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ],
        code: [
          { max: 12, message: "长度在 12 个字符以内" },
          {
            required: true,
            trigger: "blur",
            message: "隐患点编号不能为空"
          }
        ],
        adminCode: [{ max: 12, message: "长度在 12 个字符以内" }]
      }
    };
  },
  props: {
    disabled: Boolean,
    canEdit: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: null
    },
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    },
    noBtn: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    proccessActive() {
      return this.formData.processes
        ? this.formData.processes.length
        : undefined;
    },
    isShowAudit() {
      return !this.canEdit ? (this.proccessActive ? true : false) : false;
    }
  },
  components: { basicinfoSelector, timeLine },
  updated() {
    if (!this.canEdit) {
      this.$refs["riskAvoidanceCard"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    addfamilyMembers() {
      let i = 0;
      this.formData.familyMembers.push({
        name: "",
        phone: "",
        idNumber: "",
        birthday: "",
        sex: "",
        remark: "",
        id: i++
      });
      this.formData.familyMemberCount = this.formData.familyMembers.length;
    },
    deletefamilyMembers(index) {
      this.formData.familyMembers.splice(index, 1);
      this.formData.familyMemberCount = this.formData.familyMembers.length;
    },
    saveFormSub() {
      if (this.disabled) {
        this.$router.go(-1);
      } else {
        this.$refs["riskAvoidanceCard"].validate(async valid => {
          if (valid) {
            if (this.formData.site.code) {
              this.ownDisabled = true;

              let r = await this.btnExcuteFunc();
              if (r === false) {
                this.ownDisabled = r;
              }
            } else {
              this.$message({
                type: "info",
                message: "保存不成功"
              });
              return false;
            }
          } else {
            this.$message.error("验证未通过");
          }
        });
      }
    },
    getDay(time) {
      let date = new Date(time);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    getTime(time) {
      let date = new Date(time);
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return h + m + s;
    }
  }
};
</script>
<style lang="less" scoped></style>
