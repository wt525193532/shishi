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
            placeholder="请输入矿山名称/位置"
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
          <el-form-item label="审核状态">
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
            <el-button @click="reset">重置</el-button>
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
  name: "MineInformationQuery",
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
        adminCode: "",
        key: "",
        disasterTypes: [],
        isApproval: null,
        isCanceled: null
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
          prop: "name",
          label: "矿山名称"
        },
        {
          prop: "kaicaikzdm",
          label: "开采矿种",
          render: row => {
            if (!row.kaicaikzdm) {
              return <span>--</span>;
            }
            return (
              <span>{this.$t(`codes.MineralType[${row.kaicaikzdm}]`)}</span>
            );
          }
        },
        {
          prop: "xkz",
          label: "采矿许可证号",
          width:120
        },
        {
          prop: "fzjg",
          label: "发证机关"
        },
        {
          prop: "yxqx",
          label: "矿山有效期限",
          width:120
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
          width:153
        },
        {
          prop: "area",
          label: "矿区面积（km²）",
          width:130
        },
        {
          prop: "kczt",
          label: "开采状态"
        },
        {
          type: "func",
          label: "操作",
          width: 200,
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
    reset() {
      this.$refs.queryForm.resetFields();
    },
    view(row) {
      this.$router.push({
        path: "/query/mineInformation/otherFormDetail",
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
        .dispatch("query/MineInfoQuery", {
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
            "矿山名称",
            "开采矿种",
            "采矿许可证号",
            "发证机关",
            "矿山有效期限",
            "所属区县",
            "位置",
            "生产规模（万吨/年）",
            "矿区面积（km²）",
            "开采状态"
          ];
          const filterVal = [
            "name",
            "kaicaikzdm",
            "xkz",
            "fzjg",
            "yxqx",
            "ssqx",
            "weizhi",
            "scgm",
            "area",
            "kczt"
          ];
          const data = this.formatJson(filterVal, dataList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "矿山基本信息",
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
            case "kaicaikzdm":
              return this.$t(`codes.MineralType[${v.kaicaikzdm}]`);
            default:
              return v[j];
          }
        })
      );
    }
  }
};
</script>
