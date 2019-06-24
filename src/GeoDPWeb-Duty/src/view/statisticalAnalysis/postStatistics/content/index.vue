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
        <el-form-item class="gl-form-item" label="文件类型">
          <el-select v-model="fenthForm.types" multiple placeholder="请选择">
            <el-option
              v-for="(value, code) in $t('codes.FileMailType')"
              :key="code"
              :label="value"
              :value="code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="gl-form-item" label="主题">
          <el-input
            v-model="fenthForm.theme"
            placeholder="请输入主题"
          ></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="开始时间">
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
          title="已发文件信息统计"
          :seriesData="seriesData"
          :xAxisData="xAxisData"
        ></chartBar>
      </div>
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <span class="gl-second-title">发送文件信息</span>
          <div class="gl-btnList">
            <el-button type size="medium" icon="el-icon-upload"
              >批量导出</el-button
            >
          </div>
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
        <sendBoxDialog ref="sendBoxDialog" />
      </div>
    </div>
  </div>
</template>
<script>
let flag = 0;
import sendBoxDialog from "@/view/components/sendBoxDialog";
import chartBar from "@/view/statisticalAnalysis/components/chartBar";
export default {
  name: "PostStatistics",
  components: {
    chartBar,
    sendBoxDialog
  },
  data() {
    return {
      fenthForm: {
        types: [],
        theme: "",
        startTime: null,
        endTime: null
      },
      // Echart x轴名称
      xAxisData: [],
      // Echart y轴数据
      seriesData: [],
      // table
      columns: [
        {
          prop: "sendTime",
          label: "发文时间",
          width: 155,
          render: row => {
            return <span>{this.$util.transTime(row.sendTime)}</span>;
          }
        },
        {
          prop: "sendWorkspalce",
          label: "发文单位名称"
        },
        {
          prop: "sendUser",
          label: "发文用户姓名"
        },
        {
          prop: "theme",
          label: "主题"
        },
        {
          prop: "typeCode",
          label: "文档类型",
          render: row => {
            return (
              <span>
                {row.typeCode
                  ? this.$t("codes.FileMailType." + row.typeCode)
                  : "--"}
              </span>
            );
          }
        },
        {
          prop: "content",
          label: "内容"
        },
        {
          prop: "attachments",
          label: "附件",
          render: row => {
            return <span>{row.attachments.length}</span>;
          }
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
        theme: "",
        startTime: null,
        endTime: null
      };
      this.pagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    queryAll() {
      this.queryLoad = true;
      this.queryTab(true);
      this.$store
        .dispatch("statisticalAnalysis/mailStaSended", this.fenthForm)
        .then(res => {
          flag += 1;
          let xData = [];
          let yData = [];
          res.forEach(item => {
            xData.push(this.$t("codes.FileMailType." + item.type));
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
      const { types, theme, startTime, endTime } = this.fenthForm;
      let params = {
        types,
        theme,
        startTime,
        endTime,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("statisticalAnalysis/mailQuerySended", params)
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
      this.$refs.receiveDialog.viewReceive(row);
    }
  }
};
</script>
