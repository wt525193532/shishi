<template>
  <div class="report-basicinfo">
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
        <template
          slot="cancelable"
          slot-scope="scoped"
          v-if="tab.activeName == $util.appconst.DataStatusEnum.Approval"
        >
          <el-switch
            active-text="是"
            inactive-text="否"
            v-model="scoped.row.isCanceled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="cancelState(scoped.row)"
          ></el-switch>
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
    <cancel-State-dialog
      :dialogForm="dialogForm"
      :handleClose="handleClose"
      ref="dialogForm"
      :sure="sure"
    ></cancel-State-dialog>
  </div>
</template>

<script>
import ReportLayout from "@/view/report/components/reportLayout";
import cancelStateDialog from "./components/cancelStateDialog";
export default {
  name: "BasicInfo",
  components: {
    ReportLayout,
    cancelStateDialog
  },
  computed: {
    tableData() {
      return this.$store.state.report.basicInfo.tableData;
    },
    activeName() {
      return this.tab.activeName;
    }
  },
  data() {
    return {
      cancellation: false,
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
              prop: "isCanceled",
              label: "是否销号",
              render: row => {
                if (row.isCanceled) {
                  return <el-tag type="success">{"已销号"}</el-tag>;
                } else {
                  return <el-tag type="warning">{"未销号"}</el-tag>;
                }
              }
            },
            {
              prop: "name",
              label: "隐患点名称"
            },
            {
              prop: "code",
              label: "隐患点编号"
            },
            {
              prop: "disasterTypeCode",
              label: "隐患点类型",
              render: row => (
                <span>
                  {this.$t(`codes.DisasterType[${row.disasterTypeCode}]`)}
                </span>
              )
            },
            {
              prop: "disasterScale",
              label: "灾害规模",
              render: row => (
                <span>
                  {this.$t(`enums.ScaleLevel[${row.disasterScaleLevel}]`)}
                </span>
              )
            },
            {
              prop: "location",
              label: "地理位置"
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
            // {
            //   prop: "isCanceled",
            //   label: "是否销号"
            // },
            // {
            //   prop: "name",
            //   label: "隐患点名称"
            // },
            {
              prop: "name",
              label: "隐患点名称"
            },
            {
              prop: "code",
              label: "隐患点编号"
            },
            {
              prop: "disasterTypeCode",
              label: "隐患点类型",
              render: row => (
                <span>
                  {this.$t(`codes.DisasterType[${row.disasterTypeCode}]`)}
                </span>
              )
            },
            {
              prop: "disasterScale",
              label: "灾害规模",
              render: row => (
                <span>
                  {this.$t(`enums.ScaleLevel[${row.disasterScaleLevel}]`)}
                </span>
              )
            },
            {
              prop: "location",
              label: "地理位置"
            },
            {
              prop: "cancelable",
              label: "是否销号"
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
        // 未通过
        [this.$util.appconst.DataStatusEnum.Disapproval]: {
          title: [
            {
              prop: "isCanceled",
              label: "是否销号",
              render: row => {
                if (row.isCanceled) {
                  return <el-tag type="success">{"已销号"}</el-tag>;
                } else {
                  return <el-tag type="warning">{"未销号"}</el-tag>;
                }
              }
            },
            {
              prop: "name",
              label: "隐患点名称",
              render: r => <span>{r.name}</span>
            },
            {
              prop: "code",
              label: "隐患点编号"
            },
            {
              prop: "disasterTypeCode",
              label: "隐患点类型",
              render: row => (
                <span>
                  {this.$t(`codes.DisasterType[${row.disasterTypeCode}]`)}
                </span>
              )
            },
            {
              prop: "disasterScaleLevel",
              label: "灾害规模",
              render: row => (
                <span>
                  {this.$t(`enums.ScaleLevel[${row.disasterScaleLevel}]`)}
                </span>
              )
            },
            // {
            //   prop: "",
            //   label: "驳回节点"
            // },
            // {
            //   prop: "",
            //   label: "驳回原因"
            // },
            {
              prop: "location",
              label: "地理位置"
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
        // loading: true, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      expandOptions: {
        expand: false,
        index: true // 显示序号， 多选则 mutiSelect
      },
      selectionList: [],
      dialogForm: {
        width: "600px",
        title: "",
        dialogShow: false,
        cancelTime: null,
        cancelReason: null
      },
      formId: null,
      dataType: null,
      isCanceled: true
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

      this.$store.dispatch("report/basicInfo/query", parmas).then(res => {
        this.pagination.total = res.totalCount;

        this.columns[this.activeName].data = this.tableData;
      });
    },
    view(row) {
      console.log(row, "11111");

      this.$router.push({
        path: "/report/basicinfo/view",
        query: { id: row.id, code: row.code }
      });
    },
    edit(row) {
      this.$router.push({
        path: "/report/basicinfo/edit",
        query: { id: row.id, code: row.code }
      });
    },
    add() {
      this.$router.push({ name: "report.addBasicInfo" });
    },
    // 提交
    async submit() {
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
            this.$store
              .dispatch("report/basicInfo/commit", parmas)
              .then(res => {
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
            .dispatch("report/basicInfo/cancelCommit", row.id)
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
          this.$store.dispatch("report/basicInfo/delData", row.id).then(res => {
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
    },
    cancelState(row) {
      console.log(this.isCanceled);

      row.isCanceled = !row.isCanceled;
      if (!row.isCanceled) {
        this.formId = row.code;
        this.dialogForm.title = "销号";
        this.isCanceled = true;
        this.dialogForm.dialogShow = true;
      } else {
        this.formId = row.code;
        this.dialogForm.title = "取消销号";
        this.isCanceled = false;
        this.dialogForm.dialogShow = true;
      }
    },
    disCancelState(row) {
      this.formId = row.code;
      this.dialogForm.title = "取消销号";
      this.isCanceled = false;
      this.dialogForm.dialogShow = true;
    },
    handleClose() {
      this.$refs.dialogForm.$refs.dialogForm.resetFields();
      this.dialogForm.dialogShow = false;
      this.cancellation = false;
      this.query();
    },
    sure() {
      let cancel;
      this.$refs.dialogForm.$refs.dialogForm.validate(async valid => {
        if (valid) {
          let parmas = {
            code: this.formId,
            isCanceled: this.isCanceled,
            cancelTime: this.dialogForm.cancelTime,
            cancelReason: this.dialogForm.cancelReason
          };
          cancel = await this.$store
            .dispatch("report/basicInfo/cancelGeosite", parmas)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.pagination.pageIndex = 1;
                this.dialogForm.dialogShow = false;
                this.query();
              }
              return res.data.result;
            });
        }
        return cancel;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less"></style>
