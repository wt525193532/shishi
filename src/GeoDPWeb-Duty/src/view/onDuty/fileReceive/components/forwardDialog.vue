<template>
  <div>
    <el-dialog
      title="文件转发"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :visible.sync="dialogTreeVisible"
    >
      <el-tree
        :props="defaultProps"
        :data="unitList"
        ref="addUnitTree"
        default-expand-all
        node-key="id"
        show-checkbox
        @check="getCheckNodes"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">取消</el-button>
        <el-button
          type="primary"
          size="medium"
          :loading="reLoad"
          @click="forward"
          >转发</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ForwardDialog",
  props: {},
  data() {
    return {
      defaultProps: {
        children: "",
        label: "displayName"
      },
      tags: [],
      dialogTreeVisible: false,
      params: {
        mailId: 0,
        receivers: []
      },
      reLoad: false
    };
  },
  computed: {
    unitList() {
      return this.$store.state.organization.allWorkSpace;
    }
  },
  mounted() {},
  methods: {
    // setCheckedKeys(keys) {
    //   this.$refs.addUnitTree.setCheckedKeys(keys);
    // },
    handleClose() {
      this.dialogTreeVisible = false;
    },
    open(row) {
      this.params.mailId = row.id;
      this.dialogTreeVisible = true;
    },
    async openDialog(keys) {
      await this.open();
      if (keys) {
        this.$refs.addUnitTree.setCheckedKeys(keys);
      }
    },
    forward() {
      this.reLoad = true;
      // eslint-disable-next-line no-unused-vars
      this.$store.dispatch("fileMail/reSend", this.params).then(res => {
        this.reLoad = false;
        this.dialogTreeVisible = false;
        this.$message.success("转发成功");
      });
    },
    getCheckNodes(value, data) {
      this.params.receivers = data.checkedKeys;
    }
    // setCheckedNodes(tags) {
    //   this.$refs.addTree.setCheckedNodes(tags);
    // }
  }
};
</script>
<style lang="less" scoped>
// .el-dialog__body {
//   padding: 0px;
// }
</style>
