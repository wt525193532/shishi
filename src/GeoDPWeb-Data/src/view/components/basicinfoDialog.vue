<template>
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
</template>
<script>
export default {
  name: "BasicinfoDialog",
  props: {
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
      selectedBasicInfo: { ...this.value }
    };
  },
  computed: {
    btnOkEnable() {
      return this.selectedBasicInfo != null;
    }
  },
  created() {
    this.queryBasicinfo();
  },
  methods: {
    open() {
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
      } else {
        // this.$store
        //   .dispatch("queryPage/basicInfo/queryBasicInfo", this.queryParameter)
        //   .then(data => {
        //     this.tabData = data.items;
        //   });
      }
    },
    selectBasicinfo() {
      this.selectDialogVisible = false;
      this.$emit("select", this.selectedBasicInfo);
    },
    handleCurrentChange(row) {
      this.selectedBasicInfo = row;
    }
  }
};
</script>
