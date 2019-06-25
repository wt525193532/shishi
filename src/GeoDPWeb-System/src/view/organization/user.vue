<template>
  <div>
    <div class="gl-content-form">
      <el-form
        :model="queryForm"
        ref="queryForm"
        size="small"
        inline
        label-width="80px"
      >
        <el-form-item label="关键字">
          <el-input
            class="input-min-width"
            placeholder="用户名/名称"
            v-model="queryForm.key"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="IsActive">
          <el-select
            v-model="queryForm.IsActive"
            clearable
            placeholder="-- 请选择 --"
          >
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryAllUser">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">用户信息</span>
        <div class="gl-btnList">
          <el-button
            size="small"
            @click="openAdd"
            type="primary"
            icon="el-icon-plus"
            >添加</el-button
          >
        </div>
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :query="queryAllUser"
        :pagination="pagination"
      >
        <template slot="func" slot-scope="scoped">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scoped.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delUser(scoped.row.id)"
            >删除</el-button
          >
        </template>
      </com-table>
      <userDialog ref="userDialog" :queryAllUser="queryAllUser" />
    </div>
  </div>
</template>
<script>
import userDialog from "./components/userDialog";
export default {
  name: "User",
  components: {
    userDialog
  },
  data() {
    return {
      queryForm: {
        key: "",
        IsActive: null
      },
      columns: [
        {
          prop: "workspaceName",
          label: "工作单位"
        },
        {
          prop: "departmentName",
          label: "工作部门"
        },
        {
          prop: "jobPost",
          label: "工作职位"
        },
        {
          prop: "userName",
          label: "用户名"
        },
        {
          prop: "name",
          label: "名称"
        },
        {
          prop: "isActive",
          label: "是否启用",
          render: row => {
            return <span>{row.isActive ? "是" : "否"}</span>;
          }
        },
        {
          prop: "creationTime",
          label: "创建时间",
          width: 180,
          render: row => {
            return <span>{this.$util.transTime(row.creationTime)}</span>;
          }
        },
        {
          prop: "lastLoginTime",
          label: "最后一次登录时间",
          width: 180,
          render: row => {
            return <span>{this.$util.transTime(row.lastLoginTime)}</span>;
          }
        },
        {
          prop: "func",
          label: "操作",
          width: 200
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
    queryAllUser() {
      this.options.loading = true;
      let params = {
        key: this.queryForm.key,
        IsActive: this.queryForm.IsActive,
        SkipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("organizationManage/user/getAll", params)
        .then(res => {
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
          this.options.loading = false;
        });
    },
    edit(row) {
      this.$refs.userDialog.editOpen(row);
    },
    delUser(id) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        this.$store
          .dispatch("organizationManage/user/deleteUser", id)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            this.queryAllUser();
            this.$message.success("删除成功！");
          });
      });
    },
    openAdd() {
      this.$refs.userDialog.addOpen();
    }
  }
};
</script>
