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
  name: "RiskCardQuery",
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
          prop: "site_Name",
          label: "隐患点名称"
        },
        {
          prop: "code",
          label: "隐患点编号"
        },

        {
          prop: "site_Location",
          label: "地理位置"
        },
        {
          prop: "disasterTypeCode",
          label: "灾害类型",
          width: 130,
          render: row => (
            <span>
              {row.site_DisasterTypeCode
                ? this.$t(`codes.DisasterType[${row.site_DisasterTypeCode}]`)
                : "--"}
            </span>
          )
        },
        // {
        //   prop: "disasterScaleLevel",
        //   label: "灾害规模",
        //   render: row => {
        //     // <span>
        //     //   {row.site_DisasterScaleLevel
        //     //     ? this.$t(`enums.ScaleLevel[${row.site_DisasterScaleLevel}]`)
        //     //     : "--"}
        //     // </span>
        //     if (row.site_DisasterScaleLevel==3) {
        //       return <el-tag type="danger">大型</el-tag>;
        //     } else if(row.site_DisasterScaleLevel==2) {
        //       return <el-tag type="warning">中型</el-tag>;
        //     }else {
        //       return <el-tag type="success">小型</el-tag>;
        //     }
        //   },
        //   width:100
        // },
        {
          prop: "site_Status",
          label: "审核状态",
          render: row => {
            if (row.site_Status==0) {
              return <span>未提交</span>;
            } else if(row.site_Status==1) {
              return <span>已提交</span>;
            }else if(row.site_Status==2) {
              return <span>审核中</span>;
            }else if(row.site_Status==3) {
              return <span>撤销中</span>;
            }else if(row.site_Status==4) {
              return <span>已撤销</span>;
            }else if(row.site_Status==8) {
              return <span>未通过</span>;
            }else {
              return <span>通过</span>;
            }
          }
        },
        {
          prop: "isCanceled",
          label: "是否销号",
          render: row => {
            if (row.site_IsCanceled) {
              return <el-tag type="success">已销号</el-tag>;
            } else {
              return <el-tag type="warning">未销号</el-tag>;
            }
          },
          width:130
        },
        {
          prop: "houseHoldName",
          label: "户主"
        },
        {
          prop: "familyMemberCount",
          label: "家庭人数"
        },
        {
          prop: "houseType",
          label: "房屋类型"
        },
        {
          prop: "houseAddress",
          label: "家庭住址",
          width:250
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
       this.queryBtn();
    },
    view(row) {
      this.$router.push({
        path: "/query/riskCard/otherFormDetail",
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
        .dispatch("query/riskCardQueryAll", {
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
            "审核状态",
            "是否销号",
            "隐患点编号",
            "隐患点名称",
            "地理位置",
            "灾害类型",
            "户主姓名",
            "家庭人数",
            "房屋类型",
            "家庭地址",
            
          ];
          const filterVal = [
            "status",
            "isCanceled",
            "code",
            "name",
            "location",
            "disasterTypeCode",
            "houseHoldName",
            "familyMemberCount",
            "houseType",
            "houseAddress",
          ];
          const data = this.formatJson(filterVal, dataList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "避险明白卡信息",
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
              return v.site_IsCanceled ? "已销号" : "未销号";
            case "name":
              return v.site_Name;
            case "location":
              return v.site_Location;
            case "disasterTypeCode":
              return this.$t(`codes.DisasterType[${v.site_DisasterTypeCode}]`);
            // case "disasterScaleLevel":
            //   return this.$t(`enums.ScaleLevel[${v.site_DisasterScaleLevel}]`);
            case "status" :
               return this.$t(`enums.DataStatus[${v.site_Status}]`);
            default:
              return v[j];
          }
        })
      );
    }
  }
};
</script>
