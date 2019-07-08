<template>
  <div class="disasterRS">
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
            @change="deathChange"
            :min="0"
          ></el-input-number
          >至
          <el-input-number
            :controls="false"
            style="width: 129px !important"
            :min="fenthForm.deathMin"
            v-model="fenthForm.deathMax"
          ></el-input-number>
        </el-form-item>

        <el-form-item class="gl-form-item" label="灾害人口(人)">
          <el-input-number
            :controls="false"
            v-model="fenthForm.affectedMin"
            style="width: 129px !important"
            @change="affectedChange"
            :min="0"
          ></el-input-number
          >至
          <el-input-number
            :controls="false"
            style="width: 129px !important"
            :min="fenthForm.affectedMin"
            v-model="fenthForm.affectedMax"
          ></el-input-number>
        </el-form-item>

        <div class="gl-text-center">
          <el-form-item class="gl-form-item">
            <el-button type="primary" :loading="queryLoad" @click="queryAll"
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
          title="灾情报送信息统计"
          :seriesData="seriesData"
          :xAxisData="xAxisData"
        ></chartBar>
      </div>
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <span class="gl-second-title">灾情报送信息</span>
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
            <!-- <el-button
              icon="el-icon-upload2"
              size="mini"
              @click="report(scoped.row)"
              >报送</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteFun(scoped.row)"
              >删除</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scoped.row)"
              >编辑</el-button
            >-->
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
  name: "DisasterRS",
  components: {
    chartBar
  },
  data() {
    return {
      fenthForm: {
        adminCode: "",
        isReported: null,
        disasterTypes: [],
        scaleLevels: [],
        deathMin: null,
        deathMax: null,
        affectedMin: null,
        affectedMax: null,
        statTime: []
      },
      // Echart x轴名称
      xAxisData: [],
      // Echart y轴数据
      seriesData: [],

      columns: [
        // {
        //   prop: "adminName",
        //   label: "区划"
        // },
        {
          prop: "location",
          label: "发生地点"
        },
        {
          prop: "happenTime",
          label: "发生时间",
          width: 155,
          render: row => {
            return <span>{this.$util.transTime(row.happenTime)}</span>;
          }
        },
        {
          prop: "disasterType",
          label: "灾害类型"
        },
        {
          prop: "scaleLevel",
          label: "灾害级别"
        },
        {
          prop: "affected",
          label: "受灾人口(人)"
        },
        {
          prop: "death",
          label: "死亡(人)"
        },
        {
          prop: "injured",
          label: "受伤(人)"
        },
        {
          prop: "missing",
          label: "失踪(人)"
        },
        {
          prop: "directEcoLoss",
          label: "直接经济损失(万元)",
          width: 160
        },
        {
          prop: "landLoss",
          label: "造成土地受损面积(亩)",
          width: 170
        },
        {
          prop: "func",
          label: "操作",
          fixed: "right"
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
        mutiSelect: true,
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
    affectedChange(minAffected) {
      if (minAffected > this.fenthForm.affectedMax) {
        this.fenthForm.affectedMax = minAffected;
      }
    },
    reset() {
      this.fenthForm = {
        adminCode: "",
        isReported: null,
        disasterTypes: [],
        scaleLevels: [],
        deathMin: null,
        deathMax: null,
        affectedMin: null,
        affectedMax: null,
        statTime: []
      };
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
        statTime,
        affectedMax,
        affectedMin
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
        affectedMax,
        affectedMin
      };
      this.$store
        .dispatch("statisticalAnalysis/disasterInfoSta", params)
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
        statTime,
        affectedMax,
        affectedMin
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
        affectedMax,
        affectedMin,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("statisticalAnalysis/disasterInfoQuey", params)
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
    fenth() {
      console.log("fenth");
    },
    check(row) {
      this.$router.push({
        path: "/onDuty/dutyReport/disasterReport",
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
//
<style lang="less">
// .disasterRS {
//   .el-input-number {
//     width: 131px;
//   }
//   .el-form-item__content {
//     width: 276px;
//   }
// }
//
</style>
