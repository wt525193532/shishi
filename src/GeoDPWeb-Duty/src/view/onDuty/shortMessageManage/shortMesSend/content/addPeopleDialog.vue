<template>
  <div>
    <el-dialog
      title="添加人员"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :visible.sync="dialogTreeVisible"
    >
      <div class="dialog-height">
        <el-tree
          :props="defaultProps"
          :load="loadNode"
          ref="addPeopleTree"
          lazy
          node-key="id"
          show-checkbox
          @check="getCheckNodes"
          :render-content="renderContent"
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
  name: "AddPeopleDialog",
  props: {
    add: Function,
    getCheckNodes: Function
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "displayName",
        isLeaf: "leaf",
        disabled: "children"
      },
      tags: [],
      dialogTreeVisible: false
    };
  },
  computed: {
    unitList() {
      return this.$store.state.organization.allWorkSpace;
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.unitList.forEach((children, index) => {
          this.unitList[index].className = "el-icon-folder";
        });
        return resolve(this.unitList);
      }
      if (node.level === 1) {
        this.unitList.forEach(item => {
          if (node.key == item.id) {
            item.children.forEach((children, index) => {
              item.children[index].className = "el-icon-folder";
            });
            this.getUsers(node.key, 0).then(res => {
              return resolve([...res, ...item.children]);
            });
          }
        });
      }
      if (node.level === 2) {
        if (node.data.name) {
          return resolve([]);
        }
        this.unitList.forEach(item => {
          item.children.forEach(iChil => {
            if (node.key == iChil.id) {
              iChil.children.forEach((children, index) => {
                iChil.children[index].className = "el-icon-folder";
              });
              this.getUsers(0, node.key).then(res => {
                return resolve([...res, ...iChil.children]);
              });
            }
          });
        });
      }
      if (node.level === 3) {
        this.getUsers(0, node.key).then(res => {
          return resolve(res);
        });
      }
    },
    getUsers(workId, depId) {
      let parms = {
        departmentId: depId,
        workspaceId: workId,
        key: "",
        skipCount: 0,
        maxResultCount: 999
      };
      let users = [];
      return this.$store.dispatch("user/getAllByUnit", parms).then(res => {
        users = res.items;
        users.forEach((item, index) => {
          users[index].className = "el-icon-user";
          users[index].leaf = true;
          users[index].displayName = users[index].name;
        });
        return users;
      });
    },
    renderContent(h, { node, data }) {
      return (
        <span>
          <i class={data.className} />
          &nbsp;
          <span>{node.label}</span>
        </span>
      );
    },
    handleClose() {
      this.dialogTreeVisible = false;
    },
    open() {
      this.dialogTreeVisible = true;
    },
    async openDialog(keys) {
      await this.open();
      if (keys) {
        this.$refs.addPeopleTree.setCheckedKeys(keys);
      }
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
