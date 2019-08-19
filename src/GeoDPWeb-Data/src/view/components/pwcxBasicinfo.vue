<template>
  <div class="basicinfo-selector">
    <el-form-item label="隐患点名称" :class="isAdd ? 'form-item-btn' : ''">
      <el-input
        disabled
        placeholder="请查找隐患点名称"
        :value="value.pwaA04A040"
      ></el-input>
      <el-button v-if="isAdd" @click="findName" icon="el-icon-search"
        >查找</el-button
      >
    </el-form-item>

    <el-form-item label="隐患点编号" prop="code">
      <el-input disabled :value="value.pwaA04A030"></el-input>
    </el-form-item>
    <el-form-item label="市州">
      <el-select disabled :value="value.pwaA04A050">
        <el-option
          :label="townList.displayName"
          :value="townList.adminCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="区县">
      <el-select disabled :value="value.pwaA04A060" placeholder="请选择">
        <el-option
          v-for="item in townList.children"
          :key="item.adminCode"
          :label="item.displayName"
          :value="item.adminCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-dialog
      :append-to-body="true"
      title="选择隐患点"
      :visible.sync="selectDialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <el-form label-width="85px" size="small">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="隐患点编号">
              <el-input v-model="queryParameter.disasterCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="隐患点名称">
              <el-input v-model="queryParameter.disasterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="queryBasicinfo" size="small"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              ref="singleTable"
              :data="tabData"
              highlight-current-row
              @current-change="handleCurrentChange"
            >
              <el-table-column
                v-for="(item, key) in tabTitle"
                :property="key"
                :label="item"
                :key="item"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="selectBasicinfo"
          :disabled="!btnOkEnable"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BasicinfoSelector",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Object,
      default: null
    },
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      queryParameter: {
        skipCount: 0,
        maxResultCount: 5,
        disasterName: "",
        disasterCode: ""
      },
      selectDialogVisible: false,
      tabTitle: {
        code: "隐患点编号",
        name: "隐患点名称",
        location: "地址位置",
        disasterTypeCode: "类型"
      },
      tabData: [],
      selectedBasicInfo: { ...this.value },
      townList: {}
    };
  },
  created() {
    this.$store
      .dispatch("organization/getAdministrative", "510100")
      .then(res => {
        this.townList = res;
      });
    this.queryBasicinfo();
  },
  computed: {
    btnOkEnable() {
      return this.selectedBasicInfo != null;
    }
  },
  methods: {
    findName() {
      this.selectDialogVisible = true;
    },
    handleClose() {
      this.selectDialogVisible = false;
    },
    queryBasicinfo() {
      if (this.isAdd) {
        this.$store
          .dispatch("report/basicInfo/queryBasicInfo", this.queryParameter)
          .then(data => {
            this.tabData = data.items;
          });
      }
    },
    selectBasicinfo() {
      this.selectDialogVisible = false;
      this.$emit("change", this.selectedBasicInfo);
    },
    handleCurrentChange(row) {
      this.selectedBasicInfo = {
        pwaA04A010: "",
        pwaA04A020: "",
        pwaA04A030: row.code,
        pwaA04A040: row.name,
        pwaA04A050: row.admin.cityCode,
        pwaA04A060: row.admin.countryCode,
        pwaA04A070: "",
        id: row.id
      };
    }
  }
};
</script>
