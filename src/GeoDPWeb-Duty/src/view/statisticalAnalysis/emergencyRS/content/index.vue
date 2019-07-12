<template>
  <div class="emergency-r-s">
    <div class="gl-content-item">
      <el-form
        :model="fenthForm"
        label-suffix="："
        size="medium"
        inline
        label-width="110px"
      >
        <el-form-item class="gl-form-item" label="行政区划" prop>
          <el-cascader
            v-model="fenthForm.adminCode"
            :props="adminProps"
          ></el-cascader>
        </el-form-item>

        <el-form-item class="gl-form-item" label="是否已上报">
          <el-select
            v-model="fenthForm.isReported"
            clearable
            placeholder="请选择"
          >
            <el-option label="已上报" :value="true"></el-option>
            <el-option label="未上报" :value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="gl-form-item" label="灾害类型">
          <el-select
            v-model="fenthForm.disasterTypes"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in $t('disasterType')"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="gl-form-item" label="灾害级别">
          <el-select
            v-model="fenthForm.scaleLevels"
            multiple
            placeholder="请选择"
          >
            <el-option label="小型" value="小型"></el-option>
            <el-option label="中型" value="中型"></el-option>
            <el-option label="大型" value="大型"></el-option>
            <el-option label="特大型" value="特大型"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="gl-form-item" label="统计周期" prop="sendTime">
          <el-date-picker
            v-model="fenthForm.statTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="gl-form-item" label="死亡人口(人)">
          <el-input-number
            :controls="false"
            v-model="fenthForm.deathMin"
            style="width: 129px !important"
            controls-position="right"
            @change="deathChange"
            :min="0"
          ></el-input-number
          >至
          <el-input-number
            :controls="false"
            controls-position="right"
            style="width: 129px !important"
            :min="fenthForm.deathMin"
            v-model="fenthForm.deathMax"
          ></el-input-number>
        </el-form-item>

        <div class="gl-text-center">
          <el-form-item class="gl-form-item">
            <el-button type="primary" :loading="queryLoad" @click="queryBtn"
              >查询</el-button
            >
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div v-loading.lock="queryLoad">
      <div class="gl-content-item">
        <chartBar
          title="险情报送信息统计"
          :seriesData="seriesData"
          :xAxisData="xAxisData"
        ></chartBar>
      </div>
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <span class="gl-second-title">险情报送信息</span>
          <!-- <div class="gl-btnList">
          <el-button type="" icon="el-icon-upload2" size="medium"
            >批量报送</el-button
          >
          <el-button type="" size="medium" icon="el-icon-upload"
            >批量导出</el-button
          >
          </div>-->
        </div>
        <com-table
          :columns="columns"
          :dataSource="tableData"
          :options="options"
          :fetch="queryTab"
          :pagination="pagination"
          @selection-change="handleSelectionChange"
        >
          <template slot="func" slot-scope="scoped">
            <el-button
              icon="el-icon-view"
              size="mini"
              @click="check(scoped.row)"
              >浏览</el-button
            >
          </template>
        </com-table>
      </div>
    </div>
  </div>
</template>
<script>
let flag = 0;
import chartBar from "@/view/statisticalAnalysis/components/chartBar";

export default {
  name: "EmergencyRS",
  components: {
    chartBar
  },
  data() {
    return {
      fenthForm: {
        adminCode: "",
        statTime: [],
        isReported: null,
        disasterTypes: [],
        scaleLevels: [],
        deathMin: null,
        deathMax: null
      },
      // Echart x轴名称
      xAxisData: [],
      // Echart y轴数据
      seriesData: [],
      // table
      columns: [
        {
          prop: "isReported",
          label: "上报状态",
          render: row => {
            return <span>{row.isReported ? "已上报" : "未上报"}</span>;
          }
        },
        {
          prop: "discoverTime",
          label: "发现时间",
          width: 155,
          render: row => {
            return <span>{this.$util.transTime(row.discoverTime)}</span>;
          }
        },
        {
          prop: "location",
          label: "地点"
        },
        {
          prop: "disasterType",
          label: "灾害类型"
        },
        {
          prop: "scale",
          label: "灾害规模"
        },
        {
          prop: "longitude",
          label: "经度"
        },
        {
          prop: "latitude",
          label: "纬度"
        },
        {
          prop: "threatNumber",
          label: "威胁人数"
        },
        {
          prop: "potentialEcoLoss",
          label: "潜在经济损失(万元)",
          width: 150
        },
        {
          prop: "func",
          label: "操作"
        }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        // maxHeight: 500,
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      queryLoad: false,
      adminProps: {
        label: "displayName",
        value: "adminCode",
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            resolve([this.userUnit]);
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
  mounted() {
    this.queryAll();
  },
  computed: {
    userUnit() {
      return this.$store.getters.area;
    }
  },
  methods: {
    deathChange(minDeath) {
      if (minDeath > this.fenthForm.deathMax) {
        this.fenthForm.deathMax = minDeath;
      }
    },
    reset() {
      this.fenthForm = {
        adminCode: "",
        statTime: [],
        isReported: null,
        disasterTypes: [],
        scaleLevels: [],
        deathMin: null,
        deathMax: null
      };
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.queryAll();
    },
    queryAll() {
      this.queryLoad = true;
      this.queryTab(true);

      const {
        deathMax,
        deathMin,
        scaleLevels,
        disasterTypes,
        isReported,
        adminCode,
        statTime
      } = this.fenthForm;
      let params = {
        deathMax,
        deathMin,
        scaleLevels,
        disasterTypes,
        isReported,
        adminCode,
        startTime: statTime[0],
        endTime: statTime[1]
      };
      this.$store
        .dispatch("statisticalAnalysis/dangerInfoSta", params)
        .then(res => {
          flag += 1;
          let xData = [];
          let yData = [];
          res.forEach(item => {
            xData.push(item.type);
            yData.push(item.count);
          });
          this.xAxisData = xData;
          this.seriesData = yData;
          if (flag > 1) {
            this.queryLoad = false;
            flag = 0;
          }
        });
    },
    queryTab(tabLoad) {
      if (!tabLoad) {
        this.options.loading = true;
      }
      const {
        deathMax,
        deathMin,
        scaleLevels,
        disasterTypes,
        isReported,
        adminCode,
        statTime
      } = this.fenthForm;
      let params = {
        deathMax,
        deathMin,
        scaleLevels,
        disasterTypes,
        isReported,
        adminCode,
        startTime: statTime[0],
        endTime: statTime[1],
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("statisticalAnalysis/dangerInfoQuey", params)
        .then(res => {
          if (tabLoad) {
            flag += 1;
          }
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
          this.options.loading = false;
          if (flag > 1) {
            this.queryLoad = false;
            flag = 0;
          }
        });
    },
    handleRowClick(row, event, column) {
      // 点击行的事件，同理可以绑定其他事件
      console.log("click row:", row, event, column);
    },
    handleSelectionChange(selection) {
      console.log(this.pagination, selection);
    },
    check(row) {
      this.$router.push({
        path: "/onDuty/dutyReport/dangerReport",
        query: { id: row.id, routeName: "查看灾情报送" }
      });
    },
    edit(row) {
      console.log(row);
    },
    deleteFun(row) {
      console.log(row);
    },
    report(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less">
// .emergency-r-s {
//   .el-input-number--medium {
//     width: 131px;
//   }
//   .el-form-item__content {
//     width: 276px;
//   }
// }
</style>
