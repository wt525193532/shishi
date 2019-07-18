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
          <el-form-item label="监测类型" prop="mntTypeCode">
            <el-select
              v-model="queryForm.mntTypeCode"
              clearable
              placeholder="监测类型"
            >
              <el-option
                v-for="(value, key) in $t('codes.ProfessionalMntType')"
                :key="key"
                :label="value"
                :value="key"
              ></el-option>
            </el-select>
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
  name: "ProfessionalMntQuery",
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
        mntTypeCode: "",
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
          label: "隐患点名称",
          width: 100
        },
        {
          prop: "code",
          label: "隐患点编号",
          width: 100
        },
        {
          prop: "disasterTypeCode",
          label: "隐患点类型",
          width: 100,
          render: row => (
            <span>
              {row.site_DisasterTypeCode
                ? this.$t(`codes.DisasterType[${row.site_DisasterTypeCode}]`)
                : "--"}
            </span>
          )
        },
        {
          prop: "disasterScaleLevel",
          label: "灾害规模",
          render: row => (
            <span>
              {row.site_DisasterScaleLevel
                ? this.$t(`enums.ScaleLevel[${row.site_DisasterScaleLevel}]`)
                : "--"}
            </span>
          )
        },
        {
          prop: "site_Location",
          label: "地理位置"
        },
        {
          prop: "mntTypeCode",
          label: "监测类型",
          render: row => (
            <span>
              {this.$t(`codes.ProfessionalMntType.` + row.mntTypeCode)}
            </span>
          )
        },
        {
          prop: "mntSiteCode",
          label: "监测点编号",
          width: 100
        },
        {
          prop: "alarmThreshold",
          label: "预警阈值"
        },
        {
          prop: "alarmThresholdUnit",
          label: "预警阈值单位",
          width: 120
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
        path: "/query/professionalMnt/otherFormDetail",
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
        .dispatch("query/professionalMntQueryAll", {
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
      console.log(dataList);
      if (dataList.length) {
        import("@/lib/Export2Excel").then(excel => {
          const tHeader = [
            "是否销号",
            "隐患点编号",
            "隐患点名称",
            "地理位置",
            "灾害类型",
            "灾害规模",
            "监测点编号",
            "监测类型",
            "预警阈值",
            "预警阈值单位"
          ];
          const filterVal = [
            "isCanceled",
            "code",
            "name",
            "location",
            "disasterTypeCode",
            "disasterScaleLevel",
            "mntSiteCode",
            "mntTypeCode",
            "alarmThreshold",
            "alarmThresholdUnit"
          ];
          const data = this.formatJson(filterVal, dataList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "专业监测点数据采集信息",
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
            case "mntTypeCode":
              return this.$t(`codes.ProfessionalMntType.` + v.mntTypeCode);
            default:
              return v[j];
          }
        })
      );
    }
  }
};
</script>
