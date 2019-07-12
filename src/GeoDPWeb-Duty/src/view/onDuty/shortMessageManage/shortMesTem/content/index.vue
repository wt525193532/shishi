<template>
  <div>
    <div class="gl-content-item">
      <!-- <div class="gl-btn-row">
        <span class="gl-second-title">短信模版</span>
      </div>  
      <hr style="color: #DCDFE6">-->
      <div>
        <el-form :model="queryForm" ref="queryForm" inline size="medium">
          <el-form-item class="gl-form-item">
            <el-input
              v-model="queryForm.key"
              placeholder="请输入模板标题"
            ></el-input>
          </el-form-item>
          <el-form-item class="gl-form-item">
            <el-button type="primary" @click="queryBtn">查询</el-button>
            <el-button @click="openTemplateForm">新建模版</el-button>
          </el-form-item>
        </el-form>
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :fetch="fenth"
        :pagination="pagination"
      >
        <template slot="func" slot-scope="scoped">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="primary"
            @click="edit(scoped.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="deleteFun(scoped.row)"
            >删除</el-button
          >
        </template>
      </com-table>
      <addTemplateDialog ref="templateDialog" :fenth="fenth" />
    </div>
  </div>
</template>
<script>
import addTemplateDialog from "./addTemplateDialog";
export default {
  name: "ShortMesTem",
  components: {
    addTemplateDialog
  },
  data() {
    return {
      queryForm: {
        key: ""
      },
      columns: [
        {
          prop: "name",
          label: "名称"
        },
        {
          prop: "content",
          label: "模板内容"
        },
        {
          prop: "func",
          label: "操作",
          width: 250
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
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.fenth();
    },
    fenth() {
      this.options.loading = true;
      let params = {
        key: this.queryForm.key,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("SMS/queryTemplate", params).then(res => {
        this.tableData = res.items;
        this.pagination.total = res.totalCount;
        this.options.loading = false;
      });
    },
    deleteFun(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          // eslint-disable-next-line no-unused-vars
          this.$store.dispatch("SMS/deleteTemplate", [row.id]).then(res => {
            this.fenth();
            this.$message.success("删除成功！");
          });
        })
        .catch(() => {});
    },
    // 弹窗方法
    edit(row) {
      this.$refs.templateDialog.open(row);
    },
    openTemplateForm() {
      this.$refs.templateDialog.open();
    }
  }
};
</script>
<style lang="less" scoped>
.operate-btn {
  margin-top: 10px;
}
</style>
