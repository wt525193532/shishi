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
        <el-form-item class="gl-form-item" label="发送时间" prop="sendTime">
          <el-date-picker
            v-model="fenthForm.sendTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="gl-form-item" label="发送状态">
          <el-select
            v-model="fenthForm.arr"
            multiple
            placeholder="请选择文件类型"
          >
            <el-option
              v-for="(v, k) in $t('enums.SmsSendStatus')"
              :key="k"
              :label="v"
              :value="k"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="gl-text-center">
          <el-form-item class="gl-form-item">
            <el-button type="primary" :loading="options.loading" @click="fenth"
              >查询</el-button
            >
            <el-button>重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">发文箱</span>
        <!-- <div class="gl-btnList">
          <el-button size="medium" icon="el-icon-upload">导出记录</el-button>
        </div>-->
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :fetch="fenth"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
      ></com-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "SendRecordManage",
  components: {},
  data() {
    return {
      fenthForm: {
        sendTime: "",
        status: []
      },
      columns: [
        {
          prop: "receiverName",
          label: "收信人"
        },
        {
          prop: "phoneNumber",
          label: "收信人电话号码"
        },
        {
          prop: "smsContent",
          label: "短信内容"
        },
        // {
        //   prop: "sendTime",
        //   label: "发送时间"
        // },
        {
          prop: "senderName",
          label: "发送人"
        },
        {
          prop: "status",
          label: "发送状态",
          render: row => {
            return (
              <span>
                {row.status != null
                  ? this.$t("enums.SmsSendStatus." + row.status)
                  : "--"}
              </span>
            );
          }
        }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      }
    };
  },
  methods: {
    handleRowClick(row, event, column) {
      // 点击行的事件，同理可以绑定其他事件
      console.log("click row:", row, event, column);
    },
    handleSelectionChange(selection) {
      console.log(this.pagination, selection);
    },
    fenth() {
      this.options.loading = true;
      const { sendTime, status } = this.fenthForm;
      let params = {
        sendTimeStart: sendTime[0],
        sendTimeEnd: sendTime[1],
        status,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("SMS/querySendInfo", params).then(res => {
        this.tableData = res.items;
        this.pagination.total = res.totalCount;
        this.options.loading = false;
      });
    },
    check(row) {
      console.log(row);
    },
    report(row) {
      console.log(row);
    }
  }
};
</script>
