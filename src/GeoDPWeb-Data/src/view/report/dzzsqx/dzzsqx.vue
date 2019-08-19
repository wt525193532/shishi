<template>
  <div class="report-dzzsqx">
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
        <template slot="expand" slot-scope="scoped">
          <com-table
            :columns="columns[$util.appconst.DataStatusEnum.UnCommit].title"
            :dataSource="scoped.row.data"
            :options="expandOptions"
          >
            <template slot="func" slot-scope="scoped">
              <el-button size="mini" @click="view(scoped.row)">查看</el-button>
            </template>
          </com-table>
        </template>
        <template slot="func" slot-scope="scoped">
          <el-button
            size="mini"
            @click="view(scoped.row)"
            v-if="tab.activeName != $util.appconst.DataStatusEnum.Processing"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="edit(scoped.row)"
            v-if="
              tab.activeName == $util.appconst.DataStatusEnum.UnCommit ||
                tab.activeName == $util.appconst.DataStatusEnum.Approval
            "
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delData(scoped.row)"
            v-if="tab.activeName == $util.appconst.DataStatusEnum.UnCommit"
            >删除</el-button
          >
          <el-button
            size="mini"
            @click="pullBack(scoped.row)"
            type="warning"
            v-if="
              tab.activeName == $util.appconst.DataStatusEnum.Processing &&
                scoped.row.cancelable
            "
            >撤销</el-button
          >
        </template>
      </com-table>
    </report-layout>
  </div>
</template>

<script>
import ReportLayout from "@/view/report/components/reportLayout";
export default {
  name: "Dzzsqx",
  components: {
    ReportLayout
  },
  computed: {
    tableData() {
      return this.$store.state.report.dzzsqx.tableData;
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
            label: this.$util.appconst.DataStatusEnum.ProcessingName,
            name: this.$util.appconst.DataStatusEnum.Processing
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
        activeName: this.$util.appconst.DataStatusEnum.UnCommit,
        aprrovalData: this.$util.appconst.DataStatusEnum.Approval
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
              prop: "ydsJ02A560",
              label: "隐患点名称",
              width: 100
            },
            {
              prop: "ydsJ02A550",
              label: "隐患点编号",
              width: 100
            },
            {
              parent: "admin",
              prop: "country",
              label: "区县"
            },
            {
              parent: "admin",
              prop: "town",
              label: "乡镇"
            },
            {
              prop: "ydsJ02A070",
              label: "规模"
            },
            {
              prop: "ydsJ02A090",
              label: "死亡人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A100",
              label: "失踪人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A110",
              label: "受伤人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A120",
              label: "损失户数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A130",
              label: "人数(人)"
            },
            {
              prop: "ydsJ02A150",
              label: "损毁房屋(间)",
              width: 105
            },
            {
              prop: "ydsJ02A160",
              label: "损毁耕地(亩)",
              width: 105
            },
            {
              prop: "ydsJ02A170",
              label: "损毁森林(亩)",
              width: 105
            },
            {
              prop: "ydsJ02A180",
              label: "损毁道路(m)",
              width: 100
            },
            {
              prop: "ydsJ02A190",
              label: "直接经济损失(万元)",
              width: 150
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
        // 审核中
        [this.$util.appconst.DataStatusEnum.Processing]: {
          title: [
            {
              prop: "status",
              label: "审核状态",
              render: row => <span>{this.$t("DataStatus." + row.status)}</span>
            },
            {
              prop: "name",
              label: "填报人员",
              render: row => <span>{row.poster.name}</span>
            },
            {
              prop: "title",
              label: "审核单标题"
            },
            {
              prop: "postTime",
              label: "提交日期",
              render: row => <span>{this.$util.transDate(row.postTime)}</span>
            },
            {
              prop: "dataCount",
              label: "数据条数",
              render: row => <span>{row.data && row.data.length}</span>
            },
            {
              prop: "flow",
              label: "审核流程"
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
        [this.$util.appconst.DataStatusEnum.Approval]: {
          title: [
            {
              prop: "ydsJ02A560",
              label: "隐患点名称",
              width: 100
            },
            {
              prop: "ydsJ02A550",
              label: "隐患点编号",
              width: 100
            },
            {
              parent: "admin",
              prop: "country",
              label: "区县"
            },
            {
              parent: "admin",
              prop: "town",
              label: "乡镇"
            },
            {
              prop: "ydsJ02A070",
              label: "规模"
            },
            {
              prop: "ydsJ02A090",
              label: "死亡人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A100",
              label: "失踪人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A110",
              label: "受伤人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A120",
              label: "损失户数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A130",
              label: "人数(人)"
            },
            {
              prop: "ydsJ02A150",
              label: "损毁房屋(间)",
              width: 105
            },
            {
              prop: "ydsJ02A160",
              label: "损毁耕地(亩)",
              width: 105
            },
            {
              prop: "ydsJ02A170",
              label: "损毁森林(亩)",
              width: 105
            },
            {
              prop: "ydsJ02A180",
              label: "损毁道路(m)",
              width: 100
            },
            {
              prop: "ydsJ02A190",
              label: "直接经济损失(万元)",
              width: 150
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
              prop: "ydsJ02A560",
              label: "隐患点名称",
              width: 100
            },
            {
              prop: "ydsJ02A550",
              label: "隐患点编号",
              width: 100
            },
            {
              parent: "admin",
              prop: "country",
              label: "区县"
            },
            {
              parent: "admin",
              prop: "town",
              label: "乡镇"
            },
            {
              prop: "ydsJ02A070",
              label: "规模"
            },
            {
              prop: "ydsJ02A090",
              label: "死亡人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A100",
              label: "失踪人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A110",
              label: "受伤人数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A120",
              label: "损失户数(人)",
              width: 105
            },
            {
              prop: "ydsJ02A130",
              label: "人数(人)"
            },
            {
              prop: "ydsJ02A150",
              label: "损毁房屋(间)",
              width: 105
            },
            {
              prop: "ydsJ02A160",
              label: "损毁耕地(亩)",
              width: 105
            },
            {
              prop: "ydsJ02A170",
              label: "损毁森林(亩)",
              width: 105
            },
            {
              prop: "ydsJ02A180",
              label: "损毁道路(m)",
              width: 100
            },
            {
              prop: "ydsJ02A190",
              label: "直接经济损失(万元)",
              width: 150
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
        maxResultCount: this.pagination.pageSize // 查询条数
      };
      this.$store.dispatch("report/dzzsqx/query", parmas).then(res => {
        this.pagination.total = res.totalCount;
        this.columns[this.activeName].data = this.tableData;
      });
    },
    view(row) {
      this.$router.push({
        path: "/report/dzzsqx/view",
        query: { id: row.id, code: row.code }
      });
    },
    edit(row) {
      this.$router.push({
        path: "/report/dzzsqx/edit",
        query: { id: row.id }
      });
    },
    add() {
      this.$router.push({ name: "report.addDzzsqx" });
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
            this.$store.dispatch("report/dzzsqx/commit", parmas).then(res => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message:
                    "提交成功! 数据进入【" +
                    this.$t("DataStatus." + res.data.result.status) +
                    "】"
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
            .dispatch("report/dzzsqx/cancelCommit", row.id)
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
          this.$store.dispatch("report/dzzsqx/delData", row.id).then(res => {
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
