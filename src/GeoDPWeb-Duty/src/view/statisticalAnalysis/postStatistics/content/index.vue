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
          title="已发文件信息统计"
          :seriesData="seriesData"
          :xAxisData="xAxisData"
        ></chartBar>
      </div>
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <span class="gl-second-title">发送文件信息</span>
          <!-- <div class="gl-btnList">
            <el-button type size="medium" icon="el-icon-upload"
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
        statTime: []
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
        statTime: []
      };
      this.pagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.queryAll();
    },
    queryAll() {
      this.queryLoad = true;
      this.queryTab(true);

      const { types, theme, statTime } = this.fenthForm;
      let params = {
        types,
        theme,
        startTime: statTime ? statTime[0] : null,
        endTime: statTime ? statTime[1] : null,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("statisticalAnalysis/mailStaSended", params)
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
      const { types, theme, statTime } = this.fenthForm;
      let params = {
        types,
        theme,
        startTime: statTime ? statTime[0] : null,
        endTime: statTime ? statTime[1] : null,
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
      this.$refs.sendBoxDialog.viewReceive(row);
    }
  }
};
</script>
