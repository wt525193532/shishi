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
            placeholder="角色名/显示名/描述"
            v-model="queryForm.key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryAllUser">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">角色信息</span>
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
            @click="edit(scoped.row.id)"
            >编辑</el-button
          >
          <el-button
            :disabled="scoped.row.isStatic"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delFunc(scoped.row.id)"
            >删除</el-button
          >
        </template>
      </com-table>
      <roleDialog ref="roleDialog" :queryAllUser="queryAllUser" />
    </div>
  </div>
</template>
<script>
import roleDialog from "./components/roleDialog";
export default {
  name: "Role",
  components: {
    roleDialog
  },
  data() {
    return {
      queryForm: {
        key: ""
      },
      columns: [
        {
          prop: "name",
          label: "角色名"
        },
        {
          prop: "displayName",
          label: "显示名"
        },
        {
          prop: "description",
          label: "描述"
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
        SkipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("permissons/role/getAll", params).then(res => {
        this.tableData = res.items;
        this.pagination.total = res.totalCount;
        this.options.loading = false;
      });
    },
    edit(id) {
      this.$store
        .dispatch("permissons/role/edit", id)
        .then(res => {
          this.$refs.roleDialog.editOpen(res);
        })
        .catch(() => {
          this.$message.warning("此条数据不能编辑");
        });
    },
    delFunc(id) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        // eslint-disable-next-line no-unused-vars
        this.$store.dispatch("permissons/role/deleteRole", id).then(res => {
          this.$message.success("删除成功！");
          this.queryAllUser();
        });
      });
    },
    openAdd() {
      this.$refs.roleDialog.addOpen();
    }
  }
};
</script>
