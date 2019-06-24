<template>
  <div>
    <el-dialog
      :title="title"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :visible.sync="dialogTreeVisible"
    >
      <div class="dialog-height">
        <el-tree
          :props="defaultProps"
          :data="unitList"
          ref="addUnitTree"
          default-expand-all
          node-key="id"
          show-checkbox
          @check="getCheckNodes"
        ></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="add">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "AddTreeDialog",
  props: {
    title: {
      type: String,
      default: ""
    },
    add: Function,
    getCheckNodes: Function,
    unitList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultProps: {
        children: "",
        label: "displayName"
      },
      tags: [],
      dialogTreeVisible: false
    };
  },
  mounted() {},
  methods: {
    // setCheckedKeys(keys) {
    //   this.$refs.addUnitTree.setCheckedKeys(keys);
    // },
    handleClose() {
      this.dialogTreeVisible = false;
    },
    open() {
      this.dialogTreeVisible = true;
    },
    async openDialog(keys) {
      await this.open();
      if (keys) {
        this.$refs.addUnitTree.setCheckedKeys(keys);
      }
    }
    // setCheckedNodes(tags) {
    //   this.$refs.addTree.setCheckedNodes(tags);
    // }
  }
};
</script>
