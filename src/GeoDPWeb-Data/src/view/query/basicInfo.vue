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
        <div v-if="onShow">
          <el-form-item label="灾害类型" prop="disasterTypes">
            <el-select
              :multiple="true"
              v-model="queryForm.disasterTypes"
              placeholder="-- 请选择灾害类型 --"
            >
              <el-option
                v-for="(value, key) in $t('codes.DisasterType')"
                :key="key"
                :label="value"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否转行业" prop="isTransferred">
            <el-select
              v-model="queryForm.isTransferred"
              clearable
              placeholder="-- 请选择是否转行业 --"
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="纳入省级补助" prop="isProvincial">
            <el-select
              v-model="queryForm.isProvincial"
              clearable
              placeholder="-- 请选择是否纳入省级补助 --"
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销号状态" prop="isCanceled">
            <el-select
              v-model="queryForm.isCanceled"
              clearable
              placeholder="-- 请选择销号状态 --"
            >
              <el-option label="已销号" :value="true"></el-option>
              <el-option label="未销号" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" prop="status">
            <el-select
              v-model="queryForm.isApproval"
              clearable
              placeholder="-- 请选择审核状态 --"
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
          <span>{{ $t(`enums.DataStatus[${scoped.row.status}]`) }}</span>
          <!-- <el-tag
            :type="
              scoped.row.status == $util.appconst.DataStatusEnum.Approval
                ? 'success'
                : scoped.row.status == $util.appconst.DataStatusEnum.Disapproval
                ? 'danger'
                : 'primary'
            "
            >{{ $t(`enums.DataStatus[${scoped.row.status}]`) }}</el-tag
          >-->
        </template>
        <template slot="func" slot-scope="scoped">
          <!-- <el-button type="info" icon="el-icon-message" circle></el-button> -->
          <el-button
            type="text"
            @click="view(scoped.row)"
            title="查看详情"
            circle
            >查看</el-button
          >
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
  name: "BasicInfoQuery",
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
  computed: {
    // tableData() {
    //   return this.$store.state.query.tableData;
    // },
    user() {
      return this.$store.getters.area;
    }
  },
  data() {
    return {
      queryForm: {
        key: "",
        adminCode: "",
        isApproval: null
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
      selectList: [],
      columns: [
        {
          parent: "admin",
          prop: "city",
          label: "市州"
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
          prop: "code",
          label: "隐患点编号",
          width: 120
        },
        {
          prop: "name",
          label: "隐患点名称",
          width: 200
        },
        {
          prop: "location",
          label: "地理位置",
          width: 250
        },
        {
          label: "灾害类型",
          render: row => (
            <span>
              {this.$t(`codes.DisasterType[${row.disasterTypeCode}]`)}
            </span>
          )
        },
        {
          prop: "threatPeople",
          label: "威胁人口(人)",
          width: 110
        },
        {
          prop: "threatHouses",
          label: "威胁户数(户)",
          width: 110
        },
        {
          prop: "threatProperty",
          label: "威胁财产(万元)",
          width: 120
        },
        {
          prop: "status",
          label: "审核状态"
        },
        {
          label: "防灾负责人",
          width: 200,
          render: row => {
            if (row.preventOwner) {
              return (
                <span>
                  {row.preventOwner.name + " - " + row.preventOwner.phone}
                </span>
              );
            } else {
              return <span>无</span>;
            }
          }
        },
        {
          label: "监测负责人",
          width: 200,
          render: row => {
            if (row.monitorOwner) {
              return (
                <span>
                  {row.monitorOwner.name + " - " + row.monitorOwner.phone}
                </span>
              );
            } else {
              return <span>无</span>;
            }
          }
        },
        {
          label: "监测人",
          width: 200,
          render: row => {
            if (row.monitor[0]) {
              return (
                <span>
                  {row.monitor[0].name + " - " + row.monitor[0].phone}
                </span>
              );
            } else {
              return <span>无</span>;
            }
          }
        },
        {
          label: "附件",
          render: row => {
            return <span>{row.attachments.length}</span>;
          }
        },
        // {
        //   prop: "firstReportDate",
        //   label: "上报日期",
        //   render: row => {
        //     return <span>{this.$util.transDate(row.firstReportDate)}</span>;
        //   }
        // },
        {
          type: "func",
          label: "操作",
          width: 100,
          fixed: "right"
        }
      ],
      tableData: [],
      isDisplay: false,
      onShow: false,
      adminCodeProps: {
        label: "displayName",
        value: "adminCode",
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            resolve([this.user]);
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
  created() {
    this.query();
  },
  methods: {
    reset(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    view(row) {
      this.$router.push({
        path: "/query/basicInfo/detail",
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
        .dispatch("query/basicInfoQuery", {
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
      console.log("d", dataList);
      if (dataList.length) {
        import("@/lib/Export2Excel").then(excel => {
          const tHeader = [
            "状态",
            "是否销号",
            "市州",
            "区县",
            "乡镇",
            "村",
            "隐患点编号",
            "隐患点名称",
            "地理位置",
            "灾害类型",
            "威胁人口",
            "威胁户数",
            "防灾责任人名称",
            "防灾责任人电话",
            "监测责任人名称",
            "监测责任人电话"
          ];
          const filterVal = [
            "status",
            "isCanceled",
            "city",
            "country",
            "province",
            "town",
            "code",
            "name",
            "location",
            "disasterTypeCode",
            "threatPeople",
            "threatHouses",
            "preventOwnerName",
            "preventOwnerPhone",
            "monitorOwnerName",
            "monitorOwnerPhone"
          ];
          const data = this.formatJson(filterVal, dataList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "地质灾害隐患点查询信息",
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
            case "status":
              return this.$t(`enums.DataStatus[${v[j]}]`) || "";
            case "isCanceled":
              return v.isCanceled ? "已销号" : "未销号" || "";
            case "city":
              return v.admin[j] || "";
            case "country":
              return v.admin[j] || "";
            case "province":
              return v.admin[j] || "";
            case "town":
              return v.admin[j] || "";
            // case "name":
            //   return v.site[j];
            // case "location":
            //   return v.site[j];
            case "disasterTypeCode":
              return this.$t(`codes.DisasterType[${v.disasterTypeCode}]`) || "";
            case "threatPeople":
              return v.threatPeople || "";
            case "threatHouses":
              return v.threatHouses || "";
            case "preventOwnerName":
              return v.preventOwner ? v.preventOwner.name : "";
            case "preventOwnerPhone":
              return v.preventOwner ? v.preventOwner.phone : "";
            case "monitorOwnerName":
              return v.monitorOwner ? v.monitorOwner.name : "";
            case "monitorOwnerPhone":
              return v.monitorOwner ? v.monitorOwner.phone : "";
            default:
              return v[j] || "";
          }
        })
      );
    }
  }
};
</script>
<style lang="less" scoped>
.gl-table {
  background-color: #fff;
  padding: 15px;
}
</style>
