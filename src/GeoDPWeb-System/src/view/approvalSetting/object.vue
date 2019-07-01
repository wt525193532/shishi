<template>
  <div class="approvalObject">
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
            placeholder="显示名"
            v-model="queryForm.key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryAllObj">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">对象信息</span>
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
        :query="queryAllObj"
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
        </template>
      </com-table>
    </div>
    <objectDialog ref="objectDialog" :queryAllObj="queryAllObj" />
  </div>
</template>
<script>
import objectDialog from "./components/objectDialog";
export default {
  name: "Object",
  components: {
    objectDialog
  },
  data() {
    return {
      queryForm: {
        key: ""
      },
      columns: [
        {
          prop: "name",
          label: "数据类型"
        },
        {
          prop: "displayName",
          label: "名称"
        },
        {
          prop: "approvalType",
          label: "审核类型",
          render: row => {
            if (row.approvalType == 1) {
              return <span>新增</span>;
            } else if (row.approvalType == 2) {
              return <span>修改</span>;
            } else if (row.approvalType == 3) {
              return <span>删除</span>;
            } else if (row.approvalType == 4) {
              return <span>销号</span>;
            } else {
              return <span>--</span>;
            }
          }
        },
        {
          prop: "isActive",
          label: "是否可用",
          render: row => {
            return <span>{row.isActive ? "是" : "否"}</span>;
          }
        },
        // {
        //   prop: "isDeleted",
        //   label: "是否删除",
        //   render: row => {
        //     return <span>{row.isDeleted ? "是" : "否"}</span>;
        //   }
        // },
        {
          prop: "flowName",
          label: "流程名称",
          render: row => {
            return <span>{row.flow.name}</span>;
          }
        },
        {
          prop: "remark",
          label: "备注"
        },
        {
          prop: "func",
          label: "操作"
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
    queryAllObj() {
      this.options.loading = true;
      let params = {
        key: this.queryForm.key,
        SkipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("approvalSetting/getAllObjects", params)
        .then(res => {
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
          this.options.loading = false;
        });
    },
    edit(row) {
      this.$refs.objectDialog.editOpen(row);
    }
  }
};
</script>
<style lang="less" scoped>
.approvalObject {
}
</style>
