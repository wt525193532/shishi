<template>
  <el-dialog
    class="set-node-dialog"
    :title="title"
    width="30%"
    :close-on-click-modal="false"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    @opened="dialogOpen"
  >
    <el-form
      :model="nodeForm"
      ref="nodeForm"
      label-suffix="："
      label-width="90px"
    >
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="nodeForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="上一节点"
        v-if="title == '编辑节点'"
        prop="preNodeID"
      >
        <el-select
          class="gl-full-width"
          v-model="nodeForm.preNodeID"
          placeholder="请选择上一节点"
        >
          <el-option
            v-for="(item, index) in nodes"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="下一节点"
        v-if="title == '编辑节点'"
        prop="nextNodeID"
      >
        <el-select
          class="gl-full-width"
          v-model="nodeForm.nextNodeID"
          placeholder="请选择下一节点"
        >
          <el-option
            v-for="(item, index) in nodes"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核角色" prop="roleIds">
        <div class="form-item-maxHeight">
          <el-checkbox-group v-model="nodeForm.roleIds">
            <el-checkbox
              v-for="(item, key) in roleList"
              :key="key"
              :label="item.id"
              >{{ item.displayName }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="审核用户" prop="userIds">
        <el-tag
          v-for="(tag, index) in tags"
          :key="index"
          closable
          @close="delTag(tag)"
          class="tags-margin"
          size="lg"
          >{{ tag.name }}</el-tag
        >
      </el-form-item>
      <div class="tree-maxHeight">
        <el-tree
          :props="defaultProps"
          :load="loadNode"
          ref="userTree"
          lazy
          node-key="id"
          show-checkbox
          check-strictly
          @check="getCheckNodes"
          :render-content="renderContent"
        ></el-tree>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="medium">取消</el-button>
      <el-button type="primary" size="medium" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "AddPeopleDialog",
  props: {
    queryTab: {
      type: Function,
      default: () => {}
    }
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
        label: "displayName",
        isLeaf: "leaf",
        disabled: "children"
      },
      tags: [],
      dialogVisible: false,
      unitList: [],
      roleList: [],
      nodes: []
    };
  },
  //   computed: {
  //   },
  created() {
    this.getUnitList();
    this.getAllRole();
  },
  methods: {
    save() {
      let api = "";
      if (this.title == "添加节点") {
        api = "createNode";
      } else {
        api = "updateNode";
      }
      this.$store
        .dispatch("approvalSetting/" + api, this.nodeForm)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.queryTab();
          this.handleClose();
        });
    },
    getUnitList() {
      this.$store
        .dispatch("organizationManage/workspace/getAllByCode")
        .then(res => {
          this.unitList = res;
        });
    },
    getAllRole() {
      this.$store
        .dispatch("permissons/role/getRolesByPermission", {
          permission: "Pages.Data.Approval"
        })
        .then(res => {
          this.roleList = res.items;
        });
    },
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
      return this.$store
        .dispatch("organizationManage/user/getAllByUnit", parms)
        .then(res => {
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
      this.nodeForm = {
        flowID: null,
        name: "",
        preNodeID: null,
        nextNodeID: null,
        userIds: [],
        roleIds: [],
        id: 0
      };
      this.tags = [];
      this.$refs.nodeForm.resetFields();
      this.dialogVisible = false;
    },
    addOpen(flow, { nextNodeID, id }) {
      this.title = "添加节点";
      this.nodes = flow.nodes;
      if (flow.nodes.length > 0) {
        this.nodeForm.preNodeID = id;
        this.nodeForm.nextNodeID = nextNodeID;
      }
      this.nodeForm.flowID = flow.id;
      this.dialogVisible = true;
    },
    editOpen(
      row,
      { name, flowID, preNodeID, nextNodeID, roleHandlers, userHandlers, id }
    ) {
      this.title = "编辑节点";
      this.nodes = row.nodes;
      if (userHandlers) {
        this.tags = userHandlers;
        userHandlers.forEach(user => {
          this.nodeForm.userIds.push(user.id);
        });
      }
      if (roleHandlers) {
        roleHandlers.forEach(role => {
          this.nodeForm.roleIds.push(role.id);
        });
      }
      this.nodeForm.name = name;
      this.nodeForm.preNodeID = preNodeID;
      this.nodeForm.nextNodeID = nextNodeID;
      this.nodeForm.flowID = flowID;
      this.nodeForm.id = id;

      this.dialogVisible = true;
    },
    dialogOpen() {
      this.setCheckedKeys();
    },
    getCheckNodes(value, data) {
      let tempUser = [];
      let tempUserIds = [];
      data.checkedNodes.forEach(user => {
        if (user.leaf) {
          tempUser.push(user);
          tempUserIds.push(user.id);
        }
      });
      this.tags = tempUser;
      this.nodeForm.userIds = tempUserIds;
    },
    // tag删除按钮
    delTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.nodeForm.userIds.splice(this.nodeForm.userIds.indexOf(tag.id), 1);
      this.setCheckedKeys();
    },
    setCheckedKeys() {
      console.log(this.nodeForm.userIds, 111);

      this.$refs.userTree.setCheckedKeys(this.nodeForm.userIds);
    }
  }
};
</script>
<style lang="less" scoped>
.set-node-dialog {
  .form-item-maxHeight {
    max-height: 90px;
    overflow: auto;
  }
  .tree-maxHeight {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    margin-left: 90px;
    max-height: 250px;
    overflow: auto;
  }
  .tags-margin {
    margin-right: 10px;
  }
}
</style>
