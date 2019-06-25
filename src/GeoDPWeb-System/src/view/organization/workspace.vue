<template>
  <div class="gl-content-item">
    <div class="top-button">
      <el-button type="primary" size="small" @click="addUnit"
        >添加工作单位</el-button
      >
    </div>
    <div class="tree-maxHeight">
      <!-- <el-scrollbar style="width: 100%"> -->
      <el-tree
        :data="unitList"
        :props="defaultProps"
        :expand-on-click-node="false"
        ref="userTree"
        node-key="id"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="addDept(data)"
              >添加部门</el-button
            >
            <el-button type="text" size="mini" @click="editUnit(data)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="delFunc(data)"
              >删除</el-button
            >
          </span>
        </span>
      </el-tree>
      <!-- </el-scrollbar> -->
    </div>
    <deptDialog ref="deptDialog" :getUnitList="getUnitList" />
    <unitDialog ref="unitDialog" :getUnitList="getUnitList" />
  </div>
</template>
<script>
import deptDialog from "./components/deptDialog";
import unitDialog from "./components/unitDialog";
export default {
  name: "Worksapce",
  components: {
    deptDialog,
    unitDialog
  },
  data() {
    return {
      nodeForm: {
        flowID: null,
        name: "",
        preNodeID: null,
        nextNodeID: null,
        userIds: [],
        roleIds: [],
        id: 0
      },
      title: "添加节点",
      defaultProps: {
        children: "children",
        label: "displayName"
      },
      tags: [],
      dialogVisible: false,
      unitList: [],
      roleList: [],
      nodes: []
    };
  },
  created() {
    this.getUnitList();
  },
  methods: {
    getUnitList() {
      this.$store
        .dispatch("organizationManage/workspace/getAllByCode")
        .then(res => {
          this.unitList = res;
        });
    },
    addUnit() {
      this.$refs.unitDialog.addOpen();
    },
    addDept(data) {
      this.$refs.deptDialog.addOpen(data);
    },

    editUnit(data) {
      this.$refs.unitDialog.editOpen(data);
    },
    delFunc(data) {
      let api = "";
      if (!data.adminCode) {
        api = "delDepartment";
      } else {
        api = "delWorkspace";
      }
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        this.$store
          .dispatch("organizationManage/workspace/" + api, data.id)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            this.$message.success("删除成功！");
            this.getUnitList();
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.top-button {
  margin: 0px 0px 20px 25px;
}
.tree-maxHeight {
  // margin: 0 auto;
  // border-radius: 4px;
  // border: 1px solid #dcdfe6;
  max-width: 500px;
  // height: 550px;
  // overflow: auto;
}
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
