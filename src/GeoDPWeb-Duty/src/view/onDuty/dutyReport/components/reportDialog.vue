<template>
  <el-dialog
    title="上报"
    width="600px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    :visible.sync="dialogTreeVisible"
  >
    <el-form
      :model="reportForm"
      ref="reportForm"
      label-suffix="："
      :rules="rules"
      label-width="100px"
    >
      <el-form-item class="gl-form-item" label="标题">
        <el-input v-model="reportForm.title"></el-input>
      </el-form-item>
      <el-form-item class="gl-form-item" label="制表人">
        <el-input v-model="reportForm.listerName"></el-input>
      </el-form-item>
      <el-form-item class="gl-form-item" label="审核人姓名">
        <el-input v-model="reportForm.reviewerName"></el-input>
      </el-form-item>
      <!-- <div class="line"> -->
      <el-form-item label="报送单位">
        <el-checkbox-group v-model="reportForm.toWorkspaceIds">
          <el-checkbox
            v-for="(item, index) in unitList"
            :key="index"
            :label="item.id"
            >{{ item.displayName }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <!-- </div> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="medium">取消</el-button>
      <el-button type="primary" size="medium" :loading="reLoad" @click="report"
        >上报</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  name: "ReportDialog",
  props: {
    reportFunc: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      dialogTreeVisible: false,
      reLoad: false,
      reportForm: {
        listerName: "",
        reviewerName: "",
        title: "",
        items: [],
        toWorkspaceIds: []
      },
      rules: {}
    };
  },
  computed: {
    unitList() {
      return this.$store.state.organization.allWorkSpace;
    }
  },
  mounted() {},
  methods: {
    handleClose() {
      this.reportForm = {
        listerName: "",
        reviewerName: "",
        title: "",
        items: [],
        toWorkspaceIds: []
      };
      this.dialogTreeVisible = false;
    },
    open(rows) {
      rows.forEach(({ id }) => {
        this.reportForm.items.push(id);
      });
      this.dialogTreeVisible = true;
    },
    report() {
      this.reLoad = true;
      this.$refs["reportForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认上报?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(async () => {
              await this.reportFunc(this.reportForm);
              this.reLoad = false;
              this.dialogTreeVisible = false;
            })
            .catch(() => {
              this.reLoad = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "验证不通过！"
          });
          this.reLoad = false;
          return false;
        }
      });
    }
  }
};
</script>
