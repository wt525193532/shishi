<template>
  <div class="gl-content-item">
    <el-form label-width="90px" label-suffix="：">
      <el-form-item label="选择月份">
        <el-date-picker
          format="yyyy年MM月"
          v-model="config.defaultDate"
          @blur="timeChange"
          type="month"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
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
    <infoDialog ref="infoDialog" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGrid from "@fullcalendar/daygrid";
import zh from "@fullcalendar/core/locales/zh-cn";

import infoDialog from "@/view/dutyManage/schedueManage/content/infoDialog";
export default {
  name: "Hello",
  components: {
    infoDialog,
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGrid],
      allPlans: [],
      // 日历事件列表
      events: (info, callback) => {
        let parmas = {
          startDate: info.start,
          endDate: info.end
        };
        this.$store
          .dispatch("dutyManage/schedueManage/getAllActualSchedule", parmas)
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
    // 日历事件-点击事件
    eventClick(day) {
      this.$refs.infoDialog.viewOpen(day.event.extendedProps.info, true);
    },
    // fullCalendar日期跳转，跳转后会自动刷新
    timeChange() {
      this.$refs.fullCalendar.getApi().gotoDate(this.config.defaultDate);
    }
  }
};
</script>
<style>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>
