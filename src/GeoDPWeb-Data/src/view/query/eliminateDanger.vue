<template>
  <div class="query">
    <div class="query-form">
      <el-form
        ref="queryForm"
        :model="queryForm"
        label-width="100px"
        :inline="true"
        size="small"
      >
        <el-form-item label="行政区划" prop="adminCode">
          <el-cascader
            v-model="queryForm.adminCode"
            :props="adminCodeProps"
            placeholder="-- 请选择行政区划 --"
            collapse-tags
          ></el-cascader>
        </el-form-item>
        <el-form-item label="关键字" prop="key">
          <el-input
            class="input-min-width"
            v-model="queryForm.key"
            placeholder="请输入隐患点名称/村/组"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!onShow">
          <el-button type="primary" @click="queryBtn">查询</el-button>
          <el-button @click="reset('queryForm')">重置</el-button>
          <el-button
            type="text"
            icon="el-icon-arrow-down"
            @click="onShow = !onShow"
            >展开</el-button
          >
        </el-form-item>
        <!-- <el-button type="warning" >清除</el-button> -->
        <div v-if="onShow">
          <el-form-item label="竣工时间(起)" prop="finishStartTime">
            <el-date-picker
              v-model="queryForm.finishStartTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="竣工时间(止)" prop="finishEndTime">
            <el-date-picker
              v-model="queryForm.finishEndTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="灾害类型" prop="disasterTypes">
            <el-select
              :multiple="true"
              v-model="queryForm.disasterTypes"
              placeholder="灾害类型"
            >
              <el-option
                v-for="(value, key) in $t('codes.DisasterType')"
                :key="key"
                :label="value"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销号状态" prop="isCanceled">
            <el-select
              v-model="queryForm.isCanceled"
              clearable
              placeholder="销号状态"
            >
              <el-option label="已销号" :value="true"></el-option>
              <el-option label="未销号" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" prop="isApproval">
            <el-select
              v-model="queryForm.isApproval"
              clearable
              placeholder="审核状态"
            >
              <el-option label="已入库" :value="true"></el-option>
              <el-option label="未入库" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryBtn">查询</el-button>
            <el-button @click="reset('queryForm')">重置</el-button>
            <el-button
              type="text"
              icon="el-icon-arrow-up"
              @click="onShow = !onShow"
              >收起</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="gl-table">
      <div class="gl-table-func">
        <el-button
          type="primary"
          class="gl-table-func-btn"
          @click="downLoad(selectList)"
          >下载</el-button
        >
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :query="query"
        :pagination="pagination"
        :handleSelectionChange="handleSelectionChange"
      >
        <template slot="status" slot-scope="scoped">
          <el-tag
            :type="
              scoped.row.status == $util.appconst.DataStatusEnum.Approval
                ? 'success'
                : scoped.row.status == $util.appconst.DataStatusEnum.Disapproval
                ? 'danger'
                : 'primary'
            "
            >{{ $t(`enums.DataStatus[${scoped.row.status}]`) }}</el-tag
          >
        </template>
        <template slot="func" slot-scope="scoped">
          <el-button size="mini" @click="view(scoped.row)">查看</el-button>
          <!-- <el-button size="mini" type="primary" @click="downLoad(scoped.row)"
            >下载</el-button
          >-->
        </template>
      </com-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "EliminateDangerQuery",
  props: {
    advancedSearch: {
      type: Boolean,
      default: false
    },

    onQuery: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      queryForm: {
        finishStartTime: "",
        finishEndTime: "",
        disasterTypes: [],
        isCanceled: null,
        adminCode: "",
        key: "",
        isApproval: null,
        route: ""
      },
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: true,
        expand: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      tableData: [],
      selectList: [],
      columns: [
        {
          prop: "isCanceled",
          label: "是否销号",
          render: row => {
            if (row.isCanceled) {
              return <el-tag type="success">已销号</el-tag>;
            } else {
              return <el-tag type="success">未销号</el-tag>;
            }
          }
        },
        {
          prop: "site_Name",
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
              {row.site_DisasterTypeCode
                ? this.$t(`codes.DisasterType[${row.site_DisasterTypeCode}]`)
                : "--"}
            </span>
          )
        },
        {
          prop: "buildYear",
          label: "实施年度"
        },
        {
          prop: "buildUnitName",
          label: "建设单位"
          // render: row => {
          //   return (
          //     row.eliminateUnits.find(item => item.unitType == 10).name ||
          //     ""
          //   );
          // }
        },
        {
          prop: "surveyUnitName",
          label: "勘察单位"
          // render: row => {
          //   return (
          //     row.eliminateUnits.find(item => item.unitType == 20).name ||
          //     ""
          //   );
          // }
        },
        {
          prop: "designUnitName",
          label: "设计单位"
          // render: row => {
          //   return (
          //     row.eliminateUnits.find(item => item.unitType == 30).name ||
          //     ""
          //   );
          // }
        },
        {
          prop: "constructionUnitName",
          label: "施工单位"
          // render: row => {
          //   return (
          //     row.eliminateUnits.find(item => item.unitType == 40).name ||
          //     ""
          //   );
          // }
        },
        {
          type: "func",
          label: "操作",
          width: 180,
          fixed: "right"
        }
      ],
      isDisplay: false,
      onShow: false,
      adminCodeProps: {
        label: "displayName",
        value: "adminCode",
        multiple: false,
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            if (!this.user) {
              resolve([{ adminCode: "510100000000", displayName: "成都市" }]);
            } else {
              resolve([this.user]);
            }
          } else if (node.level >= 1) {
            this.$store
              .dispatch("organization/getAdministrative", node.value)
              .then(res => {
                resolve(res.children);
              });
          }
        }
      }
    };
  },
  computed: {
    // tableData() {
    //   return this.$store.state.query.tableData;
    // },
    user() {
      return this.$store.getters.area;
    }
  },
  created() {
    this.query();
  },
  methods: {
    reset(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    view(row) {
      this.$router.push({
        path: "/query/eliminateDanger/otherFormDetail",
        query: { id: row.id, code: row.code }
      });
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.query();
    },
    query() {
      this.$store
        .dispatch("query/eliminateInfoQueryAll", {
          ...this.queryForm,
          maxResultCount: this.pagination.pageSize,
          skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize
        })
        .then(res => {
          this.tableData = res.items;
          this.pagination.total = res.totalCount || 0;
        });
    },
    downLoad(dataList) {
      if (dataList.length) {
        import("@/lib/Export2Excel").then(excel => {
          const tHeader = [
            "是否销号",
            "隐患点编号",
            "隐患点名称",
            "地理位置",
            "灾害类型",
            "实施年度",
            "建设单位",
            "负责人",
            "电话",
            "勘察单位",
            "负责人",
            "电话",
            "设计单位",
            "负责人",
            "电话",
            "施工单位",
            "负责人",
            "电话",
            "监理单位",
            "负责人",
            "电话"
          ];
          const filterVal = [
            "isCanceled",
            "code",
            "name",
            "location",
            "disasterTypeCode",
            "buildYear",
            "buildUnitName",
            "buildUnitOwner",
            "buildUnitOwnerPhone",
            "surveyUnitName",
            "surveyUnitOwner",
            "surveyUnitOwnerPhone",
            "designUnitName",
            "designUnitOwner",
            "designUnitOwnerPhone",
            "constructionUnitName",
            "constructionUnitOwner",
            "constructionUnitOwnerPhone",
            "supervisoryUnitName",
            "supervisoryUnitOwner",
            "supervisoryUnitOwnerPhone"
          ];
          const data = this.formatJson(filterVal, dataList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "应急排危数据采集信息",
            bookType: "xlsx"
          });
        });
      } else {
        this.$message.info("请先选择要下载的数据");
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          switch (j) {
            case "isCanceled":
              return v[j] ? "已销号" : "未销号";
            case "name":
              return v[j];
            case "location":
              return v[j];
            case "disasterTypeCode":
              return this.$t(`codes.DisasterType[${v.disasterTypeCode}]`);
            case "disasterScaleLevel":
              return this.$t(`enums.ScaleLevel[${v.disasterScaleLevel}]`);
            case "buildUnitName":
              return v.buildUnit.name;
            case "buildUnitOwner":
              return v.buildUnit.owner;
            case "buildUnitOwnerPhone":
              return v.buildUnit.ownerPhone;
            case "surveyUnitName":
              return v.surveyUnit.name;
            case "surveyUnitOwner":
              return v.surveyUnit.owner;
            case "surveyUnitOwnerPhone":
              return v.surveyUnit.ownerPhone;
            case "designUnitName":
              return v.designUnit.name;
            case "designUnitOwner":
              return v.designUnit.owner;
            case "designUnitOwnerPhone":
              return v.designUnit.ownerPhone;
            case "constructionUnitName":
              return v.constructionUnit.name;
            case "constructionUnitOwner":
              return v.constructionUnit.owner;
            case "constructionUnitPhone":
              return v.constructionUnit.ownerPhone;
            case "supervisoryUnitName":
              return v.supervisoryUnit.name;
            case "supervisoryUnitOwner":
              return v.supervisoryUnit.owner;
            case "supervisoryUnitPhone":
              return v.supervisoryUnit.ownerPhone;
            default:
              return v[j];
          }
        })
      );
    }
  }
};
</script>
