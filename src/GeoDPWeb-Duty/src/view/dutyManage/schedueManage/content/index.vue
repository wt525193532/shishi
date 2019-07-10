<template>
  <div class="gl-content-item">
    <div style="margin-bottom: 20px;">
      <el-button size="medium" @click="dialogShow = true" type="primary">
        <i class="el-icon-plus el-icon--left" />
        新增排班
      </el-button>
      <el-button size="medium" @click="openBatchDelete" type="danger">
        <i class="el-icon-delete el-icon--left" />
        批量删除
      </el-button>
      <el-date-picker
        style="margin-left: 10px;"
        format="yyyy年MM月"
        v-model="config.defaultDate"
        @blur="timeChange"
        type="month"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <FullCalendar
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :displayEventEnd="true"
      :height="720"
      :locale="config.locale"
      :events="events"
      :header="config.header"
      @eventClick="eventClick"
    />
    <!-- <full-calendar
      :config="config"
      @event-created="eventCreated"
      @event-selected="eventSelected"
      :events="events"
    />-->
    <dialogCom
      ref="dialogForm"
      :rules="rules"
      :title="title"
      :dialogForm="dialogForm"
      :dialogShow="dialogShow"
      :sure="sure"
      :handleClose="handleClose"
    ></dialogCom>
    <infoDialog ref="infoDialog" :query="query" />
    <dialogBanchDelete ref="delDialog" :query="query"></dialogBanchDelete>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGrid from "@fullcalendar/daygrid";
import zh from "@fullcalendar/core/locales/zh-cn";
// import moment from "moment";
// eslint-disable-next-line no-unused-vars
import { eachDay } from "date-fns";

// import "fullcalendar/dist/locale/zh-cn";
import dialogCom from "./dialogCom";
import infoDialog from "./infoDialog";
import dialogBanchDelete from "./dialogBanchDelete";
// import { constants } from "crypto";
export default {
  name: "Hello",
  components: {
    dialogCom,
    infoDialog,
    dialogBanchDelete,
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGrid],
      title: "新增排班",
      dialogShow: false,
      dialogForm: {
        schDate: [],
        dutyOrderId: null,
        dutyPersonIds: [],
        takeLeaderId: null,
        dutyLeaderId: null,
        dutyDriverId: null,
        emergencyTeamId: null
      },
      rules: {
        schDate: { type: "array", required: true, message: "请选择排班日期" },
        dutyOrderId: {
          // type: "number",
          required: true,
          message: "请选择值班班次"
        },
        dutyPersonIds: {
          type: "array",
          required: true,
          message: "请选择值班人员"
        }
      },
      allPlans: [],
      // 日历事件列表
      events: (info, callback) => {
        let parmas = {
          startDate: info.start,
          endDate: info.end
        };
        this.$store
          .dispatch("dutyManage/schedueManage/getAllPlan", parmas)
          .then(res => {
            this.allPlans = res.data.result;
            let events = [];
            this.allPlans.forEach(item => {
              let otherPerson = "";
              if (item.otherDutyPersons.length > 0) {
                item.otherDutyPersons.forEach(item => {
                  otherPerson += item.name + " ";
                });
              }
              item.allDutyPerson = item.mainDutyPerson.name + " " + otherPerson;
              events.push({
                title: item.mainDutyPerson.name + " " + otherPerson,
                start: item.startTime,
                end: item.endTime,
                info: item
              });
            });
            callback(events);
          });
      },
      selected: {},
      // 日历配置属性
      config: {
        defaultDate: new Date(),
        locale: zh,
        header: {
          left: "prev next today",
          center: "title",
          right: "dayGridMonth"
        }
      }
    };
  },
  methods: {
    // 日历事件-删除事件
    removeEvent() {
      this.$refs.calendar.$emit("remove-event", this.selected);
      this.selected = {};
    },
    // 日历事件-点击事件
    eventClick(day) {
      this.$refs.infoDialog.viewOpen(day.event.extendedProps.info, false);
    },
    // fullCalendar日期跳转，跳转后会自动刷新
    timeChange() {
      this.$refs.fullCalendar.getApi().gotoDate(this.config.defaultDate);
    },
    // 打开批量删除
    openBatchDelete() {
      this.$refs.delDialog.open();
    },
    // 日历事件-刷新事件
    query() {
      this.$refs.fullCalendar.getApi().refetchEvents();
      // let parmas = {
      //   startDate: moment(this.config.defaultDate).startOf("month"),
      //   endDate: moment(this.config.defaultDate).endOf("month")
      // };
      // this.$store
      //   .dispatch("dutyManage/schedueManage/getAllPlan", parmas)
      //   .then(res => {
      //     this.allPlans = res.data.result;
      //     this.events = [];
      //     this.allPlans.forEach(item => {
      //       let otherPerson = "";
      //       if (item.otherDutyPersons.length > 0) {
      //         item.otherDutyPersons.forEach(item => {
      //           otherPerson += item.name + " ";
      //         });
      //       }
      //       item.allDutyPerson = item.mainDutyPerson.name + " " + otherPerson;
      //       this.events.push({
      //         title: item.mainDutyPerson.name + " " + otherPerson,
      //         start: item.startTime,
      //         end: item.endTime,
      //         info: item
      //       });
      //     });
      //   });
    },
    sure() {
      this.$refs.dialogForm.$refs.dialogForm.validate(valid => {
        if (valid) {
          let parmas = {
            startDate: this.dialogForm.schDate[0],
            endDate: this.dialogForm.schDate[1],
            dutyOrderId: this.dialogForm.dutyOrderId,
            mainDutyPersonId: this.dialogForm.dutyPersonIds[0],
            moreDutyPersons: this.dialogForm.dutyPersonIds.slice(1),
            takeLeaderId: this.dialogForm.takeLeaderId,
            dutyLeaderId: this.dialogForm.dutyLeaderId,
            dutyDriverId: this.dialogForm.dutyDriverId,
            emergencyTeamId: this.dialogForm.emergencyTeamId
          };
          this.$store
            .dispatch("dutyManage/schedueManage/createPlan", parmas)
            .then(res => {
              if (res.data.success) {
                this.$message.success("新增成功");
                this.query();
              }
            });
          this.handleClose();
        }
      });
    },
    handleClose() {
      this.$refs.dialogForm.$refs.dialogForm.resetFields();
      this.dialogShow = false;
    }
  }
};
</script>
<style>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>
