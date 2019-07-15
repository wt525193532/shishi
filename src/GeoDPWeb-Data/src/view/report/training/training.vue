<template>
  <div class="report-training">
    <report-layout
      :tab="tab"
      :queryForm="queryForm"
      :query="queryBtn"
      :submit="submit"
      :add="add"
    >
      <com-table
        v-if="tableShow"
        :columns="columns[tab.activeName].title"
        :dataSource="columns[tab.activeName].data"
        :options="options"
        :query="query"
        :pagination="pagination"
        :handleSelectionChange="handleSelectionChange"
      >
        <template slot="func" slot-scope="scoped">
          <el-button size="mini" @click="view(scoped.row)">查看</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="edit(scoped.row)"
            v-if="tab.activeName == $util.appconst.DataStatusEnum.UnCommit"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delData(scoped.row)"
            v-if="tab.activeName == $util.appconst.DataStatusEnum.UnCommit"
            >删除</el-button
          >
        </template>
      </com-table>
    </report-layout>
  </div>
</template>

<script>
import ReportLayout from "@/view/report/components/reportLayout";
export default {
  name: "Training",
  components: {
    ReportLayout
  },
  computed: {
    tableData() {
      return this.$store.state.report.training.tableData;
    },
    activeName() {
      return this.tab.activeName;
    }
  },
  data() {
    return {
      tab: {
        tabList: [
          {
            label: this.$util.appconst.DataStatusEnum.UnCommitName,
            name: this.$util.appconst.DataStatusEnum.UnCommit
          },
          {
            label: this.$util.appconst.DataStatusEnum.ApprovalName,
            name: this.$util.appconst.DataStatusEnum.Approval
          },
          {
            label: this.$util.appconst.DataStatusEnum.DisapprovalName,
            name: this.$util.appconst.DataStatusEnum.Disapproval
          }
        ],
        activeName: this.$util.appconst.DataStatusEnum.UnCommit
      },
      queryForm: {
        key: ""
      },
      tableShow: true,
      columns: {
        // 待提交
        [this.$util.appconst.DataStatusEnum.UnCommit]: {
          title: [
            {
              prop: "countryName",
              label: "区县"
            },
            {
              prop: "trainTime",
              label: "培训课时"
            },
            {
              prop: "trainPeoCount",
              label: "总参训人数"
            },
            {
              prop: "prevenName",
              label: "防治负责人"
            },
            {
              prop: "disasterName",
              label: "防灾负责人"
            },
            {
              prop: "propagandaCount",
              label: "宣传场次"
            },
            {
              prop: "propagandaPeople",
              label: "宣传人数"
            },
            {
              type: "func",
              label: "操作",
              width: 250,
              fixed: "right"
            }
          ],
          data: []
        },
        // 已入库
        [this.$util.appconst.DataStatusEnum.Approval]: {
          title: [
            {
              prop: "countryName",
              label: "区县"
            },
            {
              prop: "trainTime",
              label: "培训课时"
            },
            {
              prop: "trainPeoCount",
              label: "总参训人数"
            },
            {
              prop: "prevenName",
              label: "防治负责人"
            },
            {
              prop: "disasterName",
              label: "防灾负责人"
            },
            {
              prop: "propagandaCount",
              label: "宣传场次"
            },
            {
              prop: "propagandaPeople",
              label: "宣传人数"
            },
            {
              type: "func",
              label: "操作",
              width: 250,
              fixed: "right"
            }
          ],
          data: []
        },
        [this.$util.appconst.DataStatusEnum.Disapproval]: {
          title: [
            {
              prop: "countryName",
              label: "区县"
            },
            {
              prop: "trainTime",
              label: "培训课时"
            },
            {
              prop: "trainPeoCount",
              label: "总参训人数"
            },
            {
              prop: "prevenName",
              label: "防治负责人"
            },
            {
              prop: "disasterName",
              label: "防灾负责人"
            },
            {
              prop: "propagandaCount",
              label: "宣传场次"
            },
            {
              prop: "propagandaPeople",
              label: "宣传人数"
            },
            {
              type: "func",
              label: "操作",
              width: 250,
              fixed: "right"
            }
          ],
          data: []
        }
      },
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
        // query: this.query
      },
      options: {
        // maxHeight: 500,
        mutiSelect: true,
        expand: true,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      expandOptions: {
        // maxHeight: 500,
        // mutiSelect: true,
        expand: false,
        index: true // 显示序号， 多选则 mutiSelect
        // loading: false // 表格动画
        // initTable: true // 是否一挂载就加载数据
      },
      selectionList: [],
      dataType: null
    };
  },
  watch: {
    async activeName(val) {
      this.options.expand =
        val == this.$util.appconst.DataStatusEnum.Processing;
      this.options.mutiSelect =
        val == this.$util.appconst.DataStatusEnum.UnCommit;
      this.tableShow = false;
      this.pagination.pageIndex = 1;
      await this.query();
      this.$nextTick().then(() => {
        this.tableShow = true;
      });
    }
  },
  created() {
    this.dataType = this.$util.appconst.dataType[this.$route.meta.title];
    this.options.expand =
      this.tab.activeName == this.$util.appconst.DataStatusEnum.Processing;
    this.options.mutiSelect =
      this.tab.activeName == this.$util.appconst.DataStatusEnum.UnCommit;
    this.query();
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectionList = selection;
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.query();
    },
    query() {
      let parmas = {
        status: [this.tab.activeName], // 审核状态
        key: this.queryForm.key, // 查询字段
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize, // 跳过条数
        maxResultCount: this.pagination.pageSize, // 查询条数
        dataType: this.dataType
      };

      this.$store.dispatch("report/training/query", parmas).then(res => {
        this.pagination.total = res.totalCount;

        this.columns[this.activeName].data = this.tableData;
      });
    },
    view(row) {
      this.$router.push({
        path: "/report/training/view",
        query: { id: row.id, code: row.code }
      });
    },
    edit(row) {
      this.$router.push({
        path: "/report/training/edit",
        query: { id: row.id }
      });
    },
    add() {
      this.$router.push({ name: "report.addTaining" });
    },
    // 提交
    submit() {
      if (this.selectionList.length) {
        this.$confirm("是否提交至上级审核？", "提交", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let parmas = {
              title: "",
              dataIds: []
            };
            parmas.dataIds = this.selectionList.map(item => item.id);
            this.$store.dispatch("report/training/commit", parmas).then(res => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "提交成功!"
                });
                this.pagination.pageIndex = 1;
                this.query();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "请至少选择一条数据"
        });
      }
    },
    // 撤销
    pullBack(row) {
      this.$confirm("是否撤销该审核单？", "撤销", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("report/training/cancelCommit", row.id)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "撤销成功!"
                });
                this.pagination.pageIndex = 1;
                this.query();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
    },
    // 删除
    delData(row) {
      this.$confirm("是否删除该条信息？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("report/training/delData", row.id).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.pagination.pageIndex = 1;
              this.query();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less"></style>
