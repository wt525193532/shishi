<template>
  <div class="report-engineer">
    <report-layout :tab="tab" :queryForm="queryForm" :query="query" :submit="submit" :add="add">
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
          >查看</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="edit(scoped.row)"
            v-if="tab.activeName == $util.appconst.DataStatusEnum.UnCommit"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delData(scoped.row)"
            v-if="tab.activeName == $util.appconst.DataStatusEnum.UnCommit"
          >删除</el-button>
          <el-button
            size="mini"
            @click="pullBack(scoped.row)"
            type="warning"
            v-if="
              tab.activeName == $util.appconst.DataStatusEnum.Processing &&
                scoped.row.cancelable
            "
          >撤销</el-button>
        </template>
      </com-table>
    </report-layout>
  </div>
</template>

<script>
import ReportLayout from "@/view/report/components/reportLayout";
export default {
  name: "Engineer",
  components: {
    ReportLayout
  },
  computed: {
    tableData() {
      return this.$store.state.report.engineer.tableData;
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
              parent: "site",
              prop: "isCanceled",
              label: "是否销号",
              render: row => {
                if (row.site.isCanceled) {
                  return <el-tag type="success">已销号</el-tag>;
                } else {
                  return <el-tag type="success">未销号</el-tag>;
                }
              }
            },
            {
              parent: "site",
              prop: "name",
              label: "隐患点名称"
            },
            {
              prop: "code",
              label: "隐患点编号"
            },
            {
              parent: "site",
              prop: "disasterTypeCode",
              label: "隐患点类型",
              render: row => (
                <span>
                  {this.$t(`codes.DisasterType[${row.site.disasterTypeCode}]`)}
                </span>
              )
            },
            {
              parent: "site",
              prop: "location",
              label: "地理位置"
            },
            {
              prop: "projectName",
              label: "治理工程名称"
            },
            {
              prop: "period",
              label: "治理期数"
            },
            {
              prop: "mainTask",
              label: "工程主要建设内容"
            },
            {
              prop: "regulatoryUnit",
              label: "项目监管单位"
            },
            {
              prop: "buildUnit",
              label: "项目实施单位"
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
        // 已入库
        [this.$util.appconst.DataStatusEnum.Approval]: {
          title: [
            {
              parent: "site",
              prop: "isCanceled",
              label: "是否销号",
              render: row => {
                if (row.site.isCanceled) {
                  return <el-tag type="success">已销号</el-tag>;
                } else {
                  return <el-tag type="success">未销号</el-tag>;
                }
              }
            },
            {
              parent: "site",
              prop: "name",
              label: "隐患点名称"
            },
            {
              prop: "code",
              label: "隐患点编号"
            },
            {
              parent: "site",
              prop: "disasterTypeCode",
              label: "隐患点类型",
              render: row => (
                <span>
                  {this.$t(`codes.DisasterType[${row.site.disasterTypeCode}]`)}
                </span>
              )
            },
            {
              parent: "site",
              prop: "location",
              label: "地理位置"
            },
            {
              prop: "projectName",
              label: "治理工程名称"
            },
            {
              prop: "period",
              label: "治理期数"
            },
            {
              prop: "mainTask",
              label: "工程主要建设内容"
            },
            {
              prop: "regulatoryUnit",
              label: "项目监管单位"
            },
            {
              prop: "buildUnit",
              label: "项目实施单位"
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
              parent: "site",
              prop: "isCanceled",
              label: "是否销号",
              render: row => {
                if (row.site.isCanceled) {
                  return <el-tag type="success">已销号</el-tag>;
                } else {
                  return <el-tag type="success">未销号</el-tag>;
                }
              }
            },
            {
              parent: "site",
              prop: "name",
              label: "隐患点名称"
            },
            {
              prop: "code",
              label: "隐患点编号"
            },
            {
              parent: "site",
              prop: "disasterTypeCode",
              label: "隐患点类型",
              render: row => (
                <span>
                  {this.$t(`codes.DisasterType[${row.site.disasterTypeCode}]`)}
                </span>
              )
            },
            {
              parent: "site",
              prop: "location",
              label: "地理位置"
            },
            {
              prop: "projectName",
              label: "治理工程名称"
            },
            {
              prop: "period",
              label: "治理期数"
            },
            {
              prop: "mainTask",
              label: "工程主要建设内容"
            },
            {
              prop: "regulatoryUnit",
              label: "项目监管单位"
            },
            {
              prop: "buildUnit",
              label: "项目实施单位"
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
    query() {
      let parmas = {
        status: [this.tab.activeName], // 审核状态
        key: this.queryForm.key, // 查询字段
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize, // 跳过条数
        maxResultCount: this.pagination.pageSize, // 查询条数
        dataType: this.dataType
      };

      this.$store.dispatch("report/engineer/query", parmas).then(res => {
        this.pagination.total = res.totalCount;

        this.columns[this.activeName].data = this.tableData;
      });
    },
    view(row) {
      // this.$store.dispatch("report/engineer/edit", row.id).then(res => {
      //   if (res.data.success) {
      //     let id = res.data.result.id;
      this.$router.push({
        name: "report.viewEngineer",
        query: { id: row.id, code: row.code }
      });
      //   }
      // });
    },
    edit(row) {
      this.$store.dispatch("report/engineer/edit", row.id).then(res => {
        if (res.data.success) {
          let id = res.data.result.id;
          this.$router.push({ name: "report.editEngineer", query: { id: id } });
        }
      });
    },
    add() {
      this.$router.push({ name: "report.addEngineer" });
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
            this.$store.dispatch("report/engineer/commit", parmas).then(res => {
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
            .dispatch("report/engineer/cancelCommit", row.id)
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
          this.$store.dispatch("report/engineer/delData", row.id).then(res => {
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
