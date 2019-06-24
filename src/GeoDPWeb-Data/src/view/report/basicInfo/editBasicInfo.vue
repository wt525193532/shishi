<template>
  <div>
    <basicinfo-form
      :formData="formData"
      :btnExcuteFunc="edit"
      :townList="townList"
      :canEdit="true"
      :isDisabled="false"
    />
  </div>
</template>

<script>
// import util from "@/lib/util";
import basicinfoForm from "@/view/components/basicinfoForm.vue";

export default {
  name: "EditBasicInfo",
  components: { basicinfoForm },
  data() {
    return {
      formData: {
        disasterScale: undefined,
        disasterScaleLevel: undefined,
        threatProperty: undefined,
        threatHouses: undefined,
        threatPeople: undefined,
        discoveryDate: "",
        isTransferred: true,
        disasterLevelCode: "",
        isProvincial: true,
        isThreateOldOrWeak: true,
        hasPlan: true,
        hasBuiltCards: true,
        hasBuiltAlarmNet: true,
        drillDate: "",
        isTrained: true,
        isPublished: true,
        isRelocated: true,
        isRemediated: true,
        projectProgressCode: "",
        isEliminated: true,
        firstReportDate: "",
        reportedYears: 0,
        remark: "",
        predisposeFactors: [],
        threatObjects: [],
        transferredIndustries: [],
        monitoringMethods: [],
        alarmMethods: [],
        preventeSuggests: [],
        preventOwner: {
          personClass: 10,
          orgUnitId: 0,
          name: "",
          phone: "",
          jobPost: "",
          idNumber: "",
          sex: "",
          id: 0
        },
        monitorOwner: {
          personClass: 10,
          orgUnitId: 0,
          name: "",
          phone: "",
          jobPost: "",
          idNumber: "",
          sex: "",
          id: 0
        },
        monitor: [
          {
            personClass: 10,
            orgUnitId: 0,
            name: "",
            phone: "",
            jobPost: "",
            idNumber: "",
            sex: "",
            id: 0
          }
        ],
        attachments: [],

        admin: {},
        disasterTypeCode: "",
        name: "",
        developmentTrendCode: "",
        townCode: "",
        village: "",
        group: "",
        location: "",
        longitude: undefined,
        latitude: undefined,
        yaw: undefined,
        isCanceled: true,
        canceleTime: "",
        cancelReason: "",
        reporterName: "",
        reportUnitName: "",
        reportTime: null,
        code: "",
        id: 0
      },
      townList: {},
      countryList: {},
      countryCode: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.area;
    }
  },
  mounted() {
    this.$store
      .dispatch("report/basicInfo/edit", this.$route.query.id)
      .then(res => {
        if (res.data.result.admin.countryCode) {
          this.$store
            .dispatch(
              "report/basicInfo/getAdministrative",
              res.data.result.admin.countryCode
            )
            .then(town => {
              this.townList = town.data.result;
            });
        }
        if (res.data.success) {
          this.formData = res.data.result;
          if (this.formData.preventOwner == null) {
            this.formData.preventOwner = {
              personClass: 10,
              orgUnitId: 0,
              name: "",
              phone: "",
              jobPost: "",
              idNumber: "",
              sex: "",
              id: 0
            };
          }
          if (this.formData.monitorOwner == null) {
            this.formData.monitorOwner = {
              personClass: 10,
              orgUnitId: 0,
              name: "",
              phone: "",
              jobPost: "",
              idNumber: "",
              sex: "",
              id: 0
            };
          }
          if (this.formData.monitor == []) {
            this.formData.monitor = [
              {
                personClass: 10,
                orgUnitId: 0,
                name: "",
                phone: "",
                jobPost: "",
                idNumber: "",
                sex: "",
                id: 0
              }
            ];
          }
        }
      });
  },
  methods: {
    edit() {
      this.$store
        .dispatch("report/basicInfo/update", this.formData)
        .then(res => {
          this.$util.editSaveMessage(res.data.success);
        });
    }
  }
};
</script>

<style lang="less"></style>
