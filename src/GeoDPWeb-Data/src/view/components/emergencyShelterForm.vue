<template>
  <div class="form-wrapper">
    <el-form
      label-suffix="："
      :rules="rules"
      inline
      :model="formData"
      ref="emergencyShelter"
      label-width="140px"
      v-bind="$attrs"
    >
      <div class="form-title">
        <h3 ref="emergencyShelterH1">一、基本信息</h3>
      </div>
      <div class="form-item-wapper">
        <basicinfo-selector v-model="formData.basicInfo" />
      </div>
      <div class="form-title">
        <h3 ref="emergencyShelterH2">二、应急避难场所详细信息</h3>
      </div>
      <div class="form-item-wapper">
        <el-form-item label="场所名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="场所类型">
          <el-select v-model="formData.typeCode" placeholder="请选择">
            <el-option label="县级" value="0"></el-option>
            <el-option label="乡镇" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="场所级别">
          <el-select v-model="formData.levelCode" placeholder="请选择">
            <el-option label="县级" value="0"></el-option>
            <el-option label="乡镇" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="场所面积(m²)">
          <el-select v-model="formData.shelterArea" placeholder="请选择">
            <el-option label="县级" value="0"></el-option>
            <el-option label="乡镇" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-model="formData.trafficInfo"
          label="场所交通条件"
          prop="trafficInfo"
        >
          <el-input v-model="formData.trafficInfo"></el-input>
        </el-form-item>

        <!-- <el-form-item label="场所设施">
              <el-input></el-input>
        </el-form-item>-->

        <el-form-item label="容纳人数(人)">
          <el-select v-model="formData.capacity" placeholder="请选择">
            <el-option label="县级" value="0"></el-option>
            <el-option label="乡镇" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系人" prop="contact">
          <el-input v-model="formData.contact"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="formData.contactPhone"></el-input>
        </el-form-item>

        <el-form-item label="备注信息" prop="remark">
          <el-input
            v-model="formData.remark"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>

        <div class="form-foot-btn">
          <el-button type="primary" @click="saveFormSub()">{{
            disabled === false ? "保存" : "返回"
          }}</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import basicinfoSelector from "./basicinfoSelector";
export default {
  name: "EmergencyShelter",
  components: { basicinfoSelector },
  data() {
    return {
      formData: {
        basicInfo: {
          status: 0,
          code: "",
          name: "",
          disasterTypeCode: "",
          townCode: "",
          town: {
            province: "",
            city: "",
            country: "",
            town: ""
          },
          village: "",
          group: "",
          location: "",
          longitude: 0,
          latitude: 0,
          yaw: 0,
          disasterScale: 0,
          disasterScaleLevel: 0,
          threatProperty: 0,
          threatHouses: 0,
          threatPeople: 0,
          isTransferred: true,
          isProvincial: true,
          isThreateOldOrWeak: true,
          hasPlan: true,
          hasBuiltCards: true,
          hasBuiltAlarmNet: true,
          isTrained: true,
          isPublished: true,
          isRelocated: true,
          isRemediated: true,
          isEliminated: true,
          firstReportDate: "2019-05-09T14:35:15.239Z",
          reportedYears: 0,
          isCanceled: true,
          canceleTime: "2019-05-09T14:35:15.239Z",
          cancelReason: "",
          id: 0
        }
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 0, max: 100, message: "长度在 0 到 100个字符" }
        ],
        town: [{ required: true, message: "请选择乡镇", trigger: "change" }],
        vallage: [
          { required: true, message: "请输入村", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50个字符", trigger: "blur" }
        ],
        group: [
          { required: true, message: "请输入组", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50个字符", trigger: "blur" }
        ],
        trafficInfo: [{ min: 0, max: 500, message: "长度在 0 到 500个字符" }],
        contact: [{ min: 0, max: 20, message: "长度在 0 到 20个字符" }],
        contactPhone: [{ min: 0, max: 20, message: "长度在 0 到 20个字符" }],
        remark: [{ min: 0, max: 500, message: "长度在 0 到 500个字符" }]
      }
    };
  },
  props: {
    disabled: Boolean,
    btnExcuteFunc: {
      type: Function,
      default: () => {}
    }
  },
  updated() {
    if (!this.canEdit) {
      this.$refs["emergencyShelter"].clearValidate();
    }
  },
  methods: {
    valueChanged() {
      this.formData.code = this.formData.site.code;
    },
    saveFormSub() {
      this.$refs["emergencyShelter"].validate(valid => {
        if (valid) {
          this.btnExcuteFunc();
        } else {
          this.$message({
            type: "info",
            message: "保存不成功，验证未通过"
          });
          return false;
        }
      });
    }
  }
};
</script>
