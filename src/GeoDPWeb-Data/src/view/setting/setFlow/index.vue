<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true"
      >新增审核节点</el-button
    >
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>审核节点</span>
      </div>
      <el-table :data="nodesData" style="width: 100%">
        <el-table-column prop="id" label="节点ID"> </el-table-column>
        <el-table-column prop="flowID" label="流程ID"> </el-table-column>
        <el-table-column prop="name" label="节点名称"> </el-table-column>
        <el-table-column prop="preNodeID" label="上一节点ID"> </el-table-column>
        <el-table-column prop="nextNodeID" label="下一节点ID">
        </el-table-column>
        <el-table-column prop="userHandlers[0].userName" label="审核用户名">
        </el-table-column>
        <el-table-column prop="userHandlers[0].name" label="审核人姓名">
        </el-table-column>
        <el-table-column prop="roleHandlers[0].name" label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleHandlers[0].displayName"
          label="角色显示名称"
        >
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="新增班次"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        :model="addNode"
        ref="addShiftForm"
        label-suffix="："
        label-width="130px"
      >
        <el-form-item label="流程Id">
          <el-select v-model="addNode.flowID" placeholder="请选择">
            <el-option
              v-for="(item, index) in flows"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点名称">
          <el-input v-model="addNode.name"></el-input>
        </el-form-item>
        <el-form-item label="上一节点Id">
          <el-select v-model="addNode.preNodeID" placeholder="请选择">
            <el-option
              v-for="(item, index) in nodes"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一节点Id">
          <el-select v-model="addNode.nextNodeID" placeholder="请选择">
            <el-option
              v-for="(item, index) in nodes"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户列表">
          <el-checkbox-group v-model="addNode.userIds">
            <el-checkbox
              v-for="(item, key) in userList"
              :key="key"
              :label="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox-group v-model="addNode.roleIds">
            <el-checkbox
              v-for="(item, key) in roleList"
              :key="key"
              :label="item.id"
              >{{ item.displayName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShiftDatas">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/lib/request";
export default {
  name: "Setting",
  components: {},
  data() {
    return {
      dialogVisible: false,
      nodesData: [
        {
          flowID: 0,
          name: "string",
          preNodeID: 0,
          nextNodeID: 0,
          userHandlers: [
            {
              userName: "111",
              name: "string",
              id: 0
            }
          ],
          roleHandlers: [
            {
              name: "string",
              displayName: "string",
              id: 0
            }
          ],
          id: 0
        }
      ],
      addNode: {
        flowID: null,
        name: "",
        preNodeID: null,
        nextNodeID: null,
        userIds: [],
        roleIds: [],
        id: 0
      },
      flows: [],
      nodes: [],
      userList: [],
      roleList: []
    };
  },
  mounted() {
    this.getAllFlow().then(res => {
      this.flows = res.data.result;
    });
    this.getAllNode().then(res => {
      this.nodes = res.data.result;
      this.nodesData = res.data.result;
      console.log(res.data.result);
    });
    this.getUserList().then(res => {
      this.userList = res.data.result.items;
    });
    this.getRoleList().then(res => {
      this.roleList = res.data.result.items;
    });
  },
  methods: {
    async getAllFlow() {
      return await request.get(`./api/services/app/ApprovalSetting/GetAllFlow`); // 获取全部节点信息
    },
    async getAllNode() {
      return await request.get(`./api/services/app/ApprovalSetting/GetAllNode`); // 获取全部流程信息
    },
    async getUserList() {
      return await request.get(
        `./api/services/app/User/GetAll?IsActive=true&SkipCount=0&MaxResultCount=10000`
      ); // 获取user审核人列表
    },
    async getRoleList() {
      return await request.get(
        `./api/services/app/Role/GetAll?SkipCount=0&MaxResultCount=10000`
      ); // 获取user角色组列表
    },
    async createNode(data) {
      return await request.post(
        `./api/services/app/ApprovalSetting/CreateNode`,
        data
      ); // 新增节点
    },

    handleClose() {
      this.dialogVisible = false;
    },
    addShiftDatas() {
      this.createNode(this.addNode).then(res => {
        console.log(res);
      });
      // this.shiftDatas.push(this.shiftFormDate);
      // this.shiftFormDate = {};
      // this.dialogVisible = false;
    }
  }
};
</script>
