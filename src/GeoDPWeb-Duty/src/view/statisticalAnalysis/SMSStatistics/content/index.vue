<template>
  <div>
    <div class="gl-content-item">
      <el-form
        :model="fenthForm"
        label-suffix="："
        size="medium"
        inline
        label-width="110px"
      >
        <el-form-item class="gl-form-item" label="短信类型">
          <el-select v-model="fenthForm.types" multiple placeholder="请选择">
            <el-option label="灾情上报" value="灾情上报"></el-option>
            <el-option label="意外事件报送" value="意外事件报送"></el-option>
            <el-option
              label="重要天气预警预报"
              value="重要天气预警预报"
            ></el-option>
            <el-option label="其它" value="其它"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="gl-form-item" label="发送状态">
          <el-select
            v-model="fenthForm.sendStatus"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="(val, key) in $t('enums.SmsSendStatus')"
              :key="key"
              :label="val"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="gl-form-item" label="统计周期" prop="sendTime">
          <el-date-picker
            v-model="fenthForm.sendTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item class="gl-form-item" label="开始时间">
          <el-date-picker
            v-model="fenthForm.startTime"
            type="date"
            format="yyyy年MM月dd日"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="gl-form-item" label="结束时间">
          <el-date-picker
            v-model="fenthForm.endTime"
            type="date"
            format="yyyy年MM月dd日"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>-->
        <el-form-item class="gl-form-item" label="短信内容">
          <el-input
            v-model="fenthForm.content"
            placeholder="请输入内容"
          ></el-input>
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
          title="短信信息统计"
          :seriesData="seriesData"
          :xAxisData="xAxisData"
        ></chartBar>
      </div>
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <span class="gl-second-title">短信信息列表</span>
          <!-- <div class="gl-btnList">
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
          <!-- <template slot="func" slot-scope="scoped">
            <el-button
              icon="el-icon-view"
              size="mini"
              @click="check(scoped.row)"
              >浏览</el-button
            >
          </template>-->
        </com-table>
      </div>
    </div>
  </div>
</template>
<script>
let flag = 0;
import chartBar from "@/view/statisticalAnalysis/components/chartBar";
export default {
  name: "SMSStatistics",
  components: {
    chartBar
  },
  data() {
    return {
      fenthForm: {
        types: [],
        sendStatus: [],
        content: "",
        sendTime: []
      },
      // Echart x轴名称
      xAxisData: [],
      // Echart y轴数据
      seriesData: [],
      // table
      columns: [
        {
          prop: "senderName",
          label: "发送人"
        },
        {
          prop: "leader",
          label: "审核领导姓名"
        },
        {
          prop: "type",
          label: "短信类型"
        },
        {
          prop: "content",
          label: "短信内容"
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
        initTable: false // 是否一挂载就加载数据
      },
      queryLoad: false
    };
  },
  mounted() {
    this.queryAll();
  },
  methods: {
    reset() {
      this.fenthForm = {
        types: [],
        sendStatus: [],
        content: "",
        sendTime: null
      };
    },
    queryAll() {
      this.queryLoad = true;
      this.queryTab(true);
      const { types, sendStatus, content, sendTime } = this.fenthForm;
      let params = {
        types,
        sendStatus,
        content,
        startTime: sendTime[0],
        endTime: sendTime[1]
      };
      this.$store.dispatch("statisticalAnalysis/smsSta", params).then(res => {
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
      const { types, sendStatus, content, sendTime } = this.fenthForm;
      let params = {
        types,
        sendStatus,
        content,
        startTime: sendTime[0],
        endTime: sendTime[1],
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("statisticalAnalysis/smsQuey", params).then(res => {
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
      console.log(row);
    }
  }
};
</script>
<style lang="less" scoped>
// .el-input-number--small {
//   width: 162px;
// }
// .el-form-item--small.el-form-item {
//   min-width: 400px;
// }
// .el-date-editor--daterange.el-input__inner {
//   width: 280px;
// }
</style>
