<template>
  <div class="gl-content-item">
    <div class="gl-btn-row">
      <span class="gl-second-title">流程配置</span>
      <!-- <div class="gl-btnList">
        <el-button
          size="small"
          @click="openAdd"
          type="primary"
          icon="el-icon-plus"
          >添加</el-button
        >
      </div>-->
    </div>
    <com-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :query="queryTab"
      :pagination="pagination"
    >
      <template slot="node" slot-scope="scoped">
        <el-button
          v-if="scoped.row.nodes.length == 0"
          type="primary"
          @click="createNode(scoped.row, {})"
          size="mini"
          >添加</el-button
        >

        <el-steps>
          <el-step
            status="finish"
            v-for="node in scoped.row.nodes"
            :key="node.id"
          >
            <template slot="title">
              <div style="color: black">{{ node.name }}</div>
            </template>
            <template slot="description">
              <div style="color: black">
                {{ "审核人：" + node.approvaPeople }}
              </div>
              <div style="color: black">
                操作：
                <el-button
                  type="text"
                  style="color: #759aa0"
                  @click="createNode(scoped.row, node)"
                  size="mini"
                  >添加</el-button
                >
                <el-button
                  type="text"
                  @click="editNode(scoped.row, node)"
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  style="color: #f56c6c"
                  type="text"
                  @click="delNode(node.id)"
                  size="mini"
                  >删除</el-button
                >
              </div>
            </template>
          </el-step>
          <!-- <el-step
            title="地环站"
            description="这是一段很长很长很长的描述性文字"
          />
          <el-step
            title="地环处"
            description="这是一段很长很长很长的描述性文字"
          />
          <el-step title="省" description="这是一段很长很长很长的描述性文字" />-->
        </el-steps>
      </template>
    </com-table>
    <setNodeDialog ref="setNodeDialog" :queryTab="queryTab" />
  </div>
</template>

<script>
import setNodeDialog from "./components/setNodeDialog";
export default {
  name: "Role",
  components: {
    setNodeDialog
  },
  data() {
    return {
      queryForm: {
        Keyword: ""
      },
      columns: [
        {
          prop: "name",
          label: "审核流程名称",
          width: 300
        },
        {
          prop: "remark",
          label: "说明",
          width: 200
        },
        {
          prop: "node",
          label: "节点",
          align: "left"
        }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        // maxHeight: 500,
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      }
    };
  },
  methods: {
    firstNode(nodes) {
      return nodes.find(item => item.preNodeID == null);
    },
    findNextNode(nodes, snodes, currentNode) {
      let tempNodes = [...snodes, currentNode];
      if (currentNode.nextNodeID == null) return tempNodes;
      let nnode = nodes.find(item => item.id == currentNode.nextNodeID);
      return this.findNextNode(nodes, tempNodes, nnode);
    },
    sortNode(nodes) {
      if (nodes) {
        let snodes = [];
        let node1 = this.firstNode(nodes);
        snodes = this.findNextNode(nodes, snodes, node1);
        snodes.forEach((item, index) => {
          if (item.roleHandlers) {
            item.roleHandlers.forEach(role => {
              snodes[index].approvaPeople = role.displayName + "、";
            });
          }
          if (item.userHandlers) {
            item.userHandlers.forEach(user => {
              snodes[index].approvaPeople = user.name + "、";
            });
          }
          if (snodes[index].approvaPeople) {
            snodes[index].approvaPeople = snodes[index].approvaPeople.slice(
              0,
              snodes[index].approvaPeople.length - 1
            );
          }
        });
        return snodes;
      } else {
        return null;
      }
    },
    queryTab() {
      this.options.loading = true;
      this.$store
        .dispatch("approvalSetting/getAllFlowWithNodes")
        .then(flows => {
          flows.forEach((flow, index) => {
            if (flow.nodes.length > 0)
              flows[index].nodes = this.sortNode(flows[index].nodes);
          });
          this.options.loading = false;
          this.tableData = flows;
        });
    },
    editNode(row, node) {
      this.$refs.setNodeDialog.editOpen(row, node);
    },
    createNode(row, node) {
      this.$refs.setNodeDialog.addOpen(row, node);
    },
    delNode(nodeId) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        // eslint-disable-next-line no-unused-vars
        this.$store.dispatch("approvalSetting/deleteNode", nodeId).then(res => {
          this.$message.success("删除成功！");
          this.queryTab();
        });
      });
    },
    delFunc() {},
    openAdd() {
      this.$refs.menuDialog.addOpen();
    },
    copyArr(arr) {
      let res = [];
      for (let i = 0; i < arr.length; i++) {
        res.push(arr[i]);
      }
      return res;
    }
  }
};
</script>
