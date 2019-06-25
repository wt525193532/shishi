<template>
  <div class="gl-content-item">
    <div class="gl-btn-row">
      <span class="gl-second-title">菜单信息</span>
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
      :query="queryAllMenu"
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
          @click="delFunc(scoped.row.id)"
          >删除</el-button
        >
      </template>
    </com-table>
    <menuDialog ref="menuDialog" :queryAllMenu="queryAllMenu" />
  </div>
</template>

<script>
import menuDialog from "./components/menuDialog";
export default {
  name: "Role",
  components: {
    menuDialog
  },
  data() {
    return {
      queryForm: {
        Keyword: ""
      },
      columns: [
        {
          prop: "id",
          label: "菜单id",
          width: 70
        },
        {
          prop: "parentId",
          label: "上一级菜单id",
          width: 105
        },
        {
          prop: "name",
          label: "唯一名称"
        },
        {
          prop: "displayName",
          label: "显示名称"
        },
        {
          prop: "url",
          label: "菜单项导航地址",
          width: 125
        },
        {
          prop: "icon",
          label: "菜单图标名称",
          width: 105
        },
        {
          prop: "order",
          label: "菜单序号"
        },
        {
          prop: "requiredPermissionName",
          label: "菜单权限"
        },
        {
          prop: "isVisible",
          label: "菜单是否可见",
          width: 105,
          render: row => {
            return <span>{row.isVisible ? "是" : "否"}</span>;
          }
        },
        {
          prop: "isActive",
          label: "菜单是否激活可用",
          width: 140,
          render: row => {
            return <span>{row.isActive ? "是" : "否"}</span>;
          }
        },
        {
          prop: "requiresAuthentication",
          label: "是否需要用户登录后才可用",
          width: 200,
          render: row => {
            return <span>{row.requiresAuthentication ? "是" : "否"}</span>;
          }
        },
        {
          prop: "func",
          label: "操作",
          width: 180
        }
      ],
      tableData: [{}],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        // maxHeight: 500,
        mutiSelect: false,
        index: false, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      }
    };
  },
  methods: {
    queryAllMenu() {
      this.options.loading = true;
      this.$store.dispatch("permissons/menu/getAll").then(res => {
        this.options.loading = false;
        this.tableData = res;
      });
    },
    edit(row) {
      this.$refs.menuDialog.editOpen(row);
    },
    delFunc(id) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        // eslint-disable-next-line no-unused-vars
        this.$store.dispatch("permissons/menu/deleteMenu", id).then(res => {
          this.$message.success("删除成功！");
          this.queryAllMenu();
        });
      });
    },
    openAdd() {
      this.$refs.menuDialog.addOpen();
    }
  }
};
</script>
