<template>
  <div class="approval-basicinfo">
    <approval-layout :tab="tab" :queryForm="queryForm" :query="queryBtn">
      <com-table
        v-if="tableShow"
        :columns="columns[tab.activeName]"
        :dataSource="tableData"
        :options="options"
        :query="query"
        :pagination="pagination"
      >
        <template slot="expand" slot-scope="scoped">
          <com-table
            :columns="expandColumns[scoped.row.dataType]"
            :dataSource="scoped.row.data"
            :options="expandOptions"
          >
            <template slot="func" slot-scope="childScoped">
              <el-button
                size="mini"
                @click="view(childScoped.row, scoped.row.dataType)"
                >查看</el-button
              >
            </template>
          </com-table>
        </template>
        <template slot="func" slot-scope="scoped">
          <el-button
            size="mini"
            type="success"
            @click="allowCancel(scoped.row)"
            v-if="scoped.row.status == appConst.Canceling"
            >同意撤销</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="pass(scoped.row)"
            v-if="
              tab.activeName == 1 && scoped.row.status != appConst.Canceling
            "
            >通过</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="refuse(scoped.row)"
            v-if="
              tab.activeName == 1 && scoped.row.status != appConst.Canceling
            "
            >不通过</el-button
          >
        </template>
      </com-table>
    </approval-layout>
    <process-dialog
      :dialogForm="dialogForm"
      :handleClose="handleClose"
      :submit="onSubmit"
      :disabled="disabled"
    ></process-dialog>
  </div>
</template>

<script>
import approvalLayout from "@/view/approval/components/approvalLayout";
import processDialog from "./processDialog";
import AppConst from "@/lib/appconst";
export default {
  name: "BasicInfo",
  components: {
    approvalLayout,
    processDialog
  },
  computed: {
    tableData() {
      return this.$store.state.approval.basicInfo.tableData;
    },
    activeName() {
      return this.tab.activeName;
    },
    appConst() {
      return AppConst.DataStatusEnum;
    }
  },
  data() {
    return {
      disabled: false,
      tab: {
        tabList: [
          {
            label: "待审核",
            name: "1"
          },
          {
            label: "已审核",
            name: "2"
          }
        ],
        activeName: "1"
      },
      queryForm: {
        key: ""
      },
      tableShow: true,
      columns: {
        // 待审核
        "1": [
          // {
          //   prop: "dataType",
          //   label: "数据类型",
          //   render: r => <span>{this.$t("dataType." + r.dataType)}</span>
          // },
          // {
          //   prop: "name",
          //   label: "提交人员",
          //   render: r => <span>{r.poster.name}</span>
          // },
          {
            prop: "title",
            label: "标题",
            render: r => <span>{r.title}</span>
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
            prop: "processes",
            label: "最近审核时间",
            render: row => (
              <span>
                {row.processes &&
                  this.$util.transDate(row.processes[row.processes.length - 1])}
              </span>
            )
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        // 已审核
        "2": [
          // {
          //   prop: "dataType",
          //   label: "数据类型",
          //   render: r => <span>{this.$t("dataType." + r.dataType)}</span>
          // },
          // {
          //   prop: "name",
          //   label: "提交人员",
          //   render: r => <span>{r.poster.name}</span>
          // },
          {
            prop: "title",
            label: "标题",
            render: r => <span>{r.title}</span>
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
            label: "审核类型"
          },
          {
            prop: "handleTime",
            label: "审核时间",
            render: row => (
              <span>{this.$util.transDate(row.data.handleTime)}</span>
            )
          },
          {
            prop: "opinion",
            label: "审核意见",
            render: r => <span>{r.opinion == 1 ? "通过" : "不通过"}</span>
          },
          {
            prop: "comment",
            label: "审核评语",
            render: row => <span>{row.comment || "--"}</span>
          }
        ]
      },
      expandColumns: {
        BasicInfo: [
          {
            prop: "isCanceled",
            label: "是否销号",
            render: row => {
              if (row.isCanceled) {
                return <el-tag type="success">已销号</el-tag>;
              } else {
                return <el-tag type="warning">未销号</el-tag>;
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
        PreventionPlan: [
          {
            prop: "isCanceled",
            label: "是否销号",
            parent: "site",
            render: row => {
              if (row.site.isCanceled) {
                return <el-tag type="success">已销号</el-tag>;
              } else {
                return <el-tag type="warning">未销号</el-tag>;
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
            prop: "disasterScaleLevel",
            label: "灾害规模",
            render: row => (
              <span>
                {this.$t(`enums.ScaleLevel[${row.site.disasterScaleLevel}]`)}
              </span>
            )
          },
          {
            parent: "site",
            prop: "location",
            label: "地理位置"
          },
          {
            parent: "site",
            prop: "threatPeople",
            label: "威胁人数"
          },
          {
            parent: "site",
            prop: "threatHouses",
            label: "威胁户数"
          },
          {
            parent: "site",
            prop: "threatProperty",
            label: "威胁财产"
          },
          {
            parent: "site",
            prop: "preventOwnerName",
            label: "防灾责任人",
            render: r => (
              <span>{r.preventOwnerName ? r.preventOwnerName : "--"}</span>
            )
          },

          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        WorkCard: [
          {
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
            prop: "disasterScaleLevel",
            label: "灾害规模",
            render: row => (
              <span>
                {this.$t(`enums.ScaleLevel[${row.site.disasterScaleLevel}]`)}
              </span>
            )
          },
          {
            parent: "site",
            prop: "location",
            label: "地理位置"
          },
          {
            parent: "site",
            prop: "threatPeople",
            label: "威胁人数"
          },
          {
            parent: "site",
            prop: "threatHouses",
            label: "威胁户数"
          },
          {
            parent: "site",
            prop: "threatProperty",
            label: "威胁财产"
          },
          {
            parent: "site",
            prop: "preventOwnerName",
            label: "防灾责任人"
          },

          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        RiskCard: [
          {
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
            // trans: "disasterTypeCode"
          },
          {
            parent: "site",
            prop: "disasterScaleLevel",
            label: "灾害规模",
            render: row => (
              <span>
                {this.$t(`enums.ScaleLevel[${row.site.disasterScaleLevel}]`)}
              </span>
            )
          },
          {
            parent: "site",
            prop: "location",
            label: "地理位置"
          },
          {
            parent: "site",
            prop: "houseHoldName",
            label: "户主"
          },
          {
            parent: "site",
            prop: "familyMemberCount",
            label: "家庭人数"
          },
          {
            prop: "houseType",
            label: "房屋类型"
          },
          {
            prop: "forcastSignal",
            label: "预警信号",
            render: row => (
              <span>
                {this.$t(`codes.DisasterType[${row.site.disasterTypeCode}]`)}
              </span>
            )
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        ProfessionalMnt: [
          {
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
            prop: "mntTypeCode",
            label: "监测类型"
          },
          {
            prop: "mntSiteCode",
            label: "监测点编号"
          },
          {
            parent: "site",
            prop: "location",
            label: "预警阈值"
          },
          {
            prop: "alarmThresholdUnit",
            label: "预警阈值单位"
          },
          {
            prop: "fillYear",
            label: "年度"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        SimpleMnt: [
          {
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
            prop: "mntMethods",
            label: "简易监测方法",
            render: row => {
              let transArr = row.mntMethods.map(item =>
                this.$t(`codes.SimpleMntMethod["${item}"]`)
              );
              return <span>{transArr.join("、")}</span>;
            }
          },
          {
            prop: "landslideDeviceNumber",
            label: "滑坡伸缩仪套数"
          },
          {
            prop: "crackDeviceNumber",
            label: "裂缝报警器套数"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        EngineerInfo: [
          {
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
        EliminateDanger: [
          {
            prop: "name",
            label: "填报人员"
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
            label: "审核类型"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        RelocationInfo: [
          {
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
            prop: "relocationTypeCode",
            label: "搬迁户类型",
            render: row => (
              <span>
                {this.$t(`codes.RelocationType[${row.relocationTypeCode}]`)}
              </span>
            )
          },
          {
            prop: "relocationProcessCode",
            label: "搬迁进度",
            render: row => (
              <span>
                {this.$t(
                  `codes.RelocationProcess[${row.relocationProcessCode}]`
                )}
              </span>
            )
          },
          {
            prop: "placeTypeCode",
            label: "安置方式",
            render: row => (
              <span>{this.$t(`codes.PlaceType[${row.placeTypeCode}]`)}</span>
            )
          },
          {
            prop: "houseHolder",
            label: "户主"
          },
          {
            prop: "familyMembers",
            label: "家庭人口"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        EmShelter: [
          {
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
            prop: "name",
            label: "场所名称"
          },
          {
            prop: "town",
            label: "乡镇"
          },
          {
            parent: "site",
            prop: "vallage",
            label: "村"
          },
          {
            parent: "site",
            prop: "group",
            label: "组"
          },
          {
            parent: "site",
            prop: "typeCode",
            label: "场所类型",
            render: row => (
              <span>{this.$t(`codes.ShelterType[${row.site.typeCode}]`)}</span>
            )
          },
          {
            prop: "levelCode",
            label: "场所级别"
          },
          {
            prop: "shelterArea",
            label: "场所面积"
          },
          {
            prop: "capacity",
            label: "容纳人数"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        EliminateInfo: [
          {
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
            prop: "buildYear",
            label: "实施年度"
          },
          {
            parent: "buildUnit",
            prop: "name",
            label: "建设单位"
          },
          {
            parent: "surveyUnit",
            prop: "name",
            label: "勘察单位"
          },
          {
            parent: "designUnit",
            prop: "name",
            label: "设计单位"
          },
          {
            parent: "constructionUnit",
            prop: "name",
            label: "施工单位"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        GovernDataCollect: [
          {
            prop: "projectName",
            label: "项目名称"
          },
          {
            prop: "supervisionUnit",
            label: "项目监管单位"
          },
          {
            prop: "governNumber",
            label: "治理期数"
          },
          {
            prop: "implementUnit",
            label: "项目实施单位"
          },
          {
            prop: "threatPeople",
            label: "项目任务书"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          },
          {
            prop: "fundDoc",
            label: "资金文件"
          }
        ],
        HeritageProtection: [
          {
            prop: "projectName",
            label: "项目名称"
          },
          {
            prop: "implementUnit",
            label: "项目实施单位"
          },
          {
            prop: "taskBook",
            label: "项目任务书"
          },
          {
            prop: "governNumber",
            label: "治理期数"
          },

          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ],
        MineInfo: [
          {
            prop: "name",
            label: "矿山名称"
          },
          {
            prop: "kaicaikzdm",
            label: "开采矿种",
            render: row => {
              if (!row.kaicaikzdm) {
                return <span>未分类</span>;
              }
              return (
                <span>{this.$t(`codes.MineralType[${row.kaicaikzdm}]`)}</span>
              );
            }
          },
          {
            prop: "xkz",
            label: "采矿许可证号"
          },
          {
            prop: "fzjg",
            label: "发证机关"
          },
          {
            prop: "yxqx",
            label: "矿山有效期限"
          },

          {
            prop: "ssqx",
            label: "所属区县"
          },
          {
            prop: "weizhi",
            label: "位置"
          },
          {
            prop: "scgm",
            label: "生产规模（万吨/年）",
            width: 180
          },
          {
            prop: "area",
            label: "矿区面积（km²）"
          },
          {
            prop: "kczt",
            label: "开采状态"
          },
          {
            type: "func",
            label: "操作",
            width: 250,
            fixed: "right"
          }
        ]
      },

      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
        // query: this.query
      },
      options: {
        expand: true,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      expandOptions: {
        expand: false,
        index: true // 显示序号， 多选则 mutiSelect
      },
      selectionList: [],
      formId: null,
      // 审核不通过弹窗数据
      dialogForm: {
        dialogVisible: false,
        title: "审核不通过",
        emphasize: "确定不通过该申请？",
        comment: "",
        width: "500px"
      },
      dataType: {
        BasicInfo: "basicInfo",
        PreventionPlan: "preventPlan",
        WorkCard: "workCard",
        RiskCard: "riskCard",
        ProfessionalMnt: "professionalMnt",
        SimpleMnt: "simpleMnt",
        EngineerInfo: "engineer",
        EliminateDanger: "eliminateDanger",
        RelocationInfo: "relocation",
        EmShelter: "emergencyShelter",
        EliminateInfo: "eliminateDanger",
        HeritageProtection: "HeritageProtection",
        MineInfo: "MineInfo",
        GovernDataCollect: "GovernDataCollect"
      }
    };
  },
  watch: {
    async activeName() {
      this.tableShow = false;
      this.pagination.pageIndex = 1;
      await this.query();
      this.$nextTick().then(() => {
        this.tableShow = true;
      });
    }
  },
  created() {
    this.tab.activeName = sessionStorage.approvalActiveName || "1";
    this.query();
  },
  methods: {
    handleClose() {
      this.dialogForm.dialogVisible = false;
      this.dialogForm.comment = "";
    },
    onSubmit() {
      // this.disabled = true;
      if (this.dialogForm.comment) {
        let parmas = {
          formId: this.formId,
          opinion: 0,
          comment: this.dialogForm.comment
        };
        this.$store.dispatch("approval/basicInfo/process", parmas).then(res => {
          if (res.data.success) {
            this.$message.success("操作成功");
            this.query();
            this.handleClose();
          }
        });
      } else {
        this.$message.info("请输入不通过的理由");
      }
    },
    pass(row) {
      this.$confirm("确认通过吗？", "提示", {
        type: "warnning"
      }).then(() => {
        let parmas = {
          formId: row.id,
          opinion: 1,
          comment: ""
        };
        this.$store.dispatch("approval/basicInfo/process", parmas).then(res => {
          if (res.data.success) {
            this.$message.success("操作成功");
            this.query();
          }
        });
      });
    },
    refuse(row) {
      this.formId = row.id;
      this.dialogForm.dialogVisible = true;
    },
    allowCancel(row) {
      this.$confirm("确认同意撤销", "提示", {
        type: "warnning"
      }).then(() => {
        let parmas = {
          formId: row.id,
          opinion: 2,
          comment: ""
        };
        this.$store.dispatch("approval/basicInfo/process", parmas).then(res => {
          if (res.data.success) {
            this.$message.success("操作成功");
            this.query();
          }
        });
      });
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.query();
    },
    query() {
      let payLoad = {
        activeName: this.tab.activeName,
        parmas: {
          key: this.queryForm.key, // 查询字段
          skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize, // 跳过条数
          maxResultCount: this.pagination.pageSize // 查询条数
        }
      };

      this.$store.dispatch("approval/basicInfo/query", payLoad).then(res => {
        this.pagination.total = res.totalCount;
      });
    },
    view(row, dataType) {
      sessionStorage.approvalActiveName = this.tab.activeName;
      this.$router.push({
        path: "/approval/view",
        query: {
          id: row.id,
          code: row.code,
          dataType: this.dataType[dataType]
        }
      });
    }
  }
};
</script>

<style lang="less"></style>
