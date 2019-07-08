<template>
  <div>
    <relocation-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="edit"
      :canEdit="true"
    ></relocation-form>
  </div>
</template>

<script>
import relocationForm from "@/view/components/relocationForm";
export default {
  name: "EditRelocation",
  components: { relocationForm },
  data() {
    return {
      disabled: false,
      formData: {
        provinceTaskNumber: "",
        finishDeadline: "",
        finishTime: null,
        houseHolder: "",
        relocationTypeCode: "",
        isPoorHouseholds: true,
        antiPovertyYear: 0,
        relocationProcessCode: "",
        placeTypeCode: "",
        isDemolished: true,
        relocationTime: null,
        isDangerInNew: true,
        improveInfoCode: "",
        isAccepted: true,
        acceptanceReasons: "",
        isPublishedDetail: true,
        houseDismantleTime: null,
        relocationPersons: 0,
        locationName: "",
        transLocationName: "",
        transitionInTime: null,
        remark: "",
        familyMembers: 0,
        houseHolderPhone: "",
        planBuildLocation: "",
        oldHouseArea: 0,
        isPublishedApply: true,
        groupSuggestion: "",
        vallageSuggestion: "",
        townSuggestion: "",
        landBureauSuggestion: "",
        isCityMonitor: true,
        isCountryMonitor: true,
        applyTime: null,
        isAcceptanced: true,
        newHouseAddress: "",
        newHouseArea: 0,
        subsidyMoney: 0,
        subsidyPerson: "",
        vallageOpinions: "",
        townOpinions: "",
        landBureauOpinions: "",
        acceptanceTime: null,
        attachments: [],
        site: {
          disasterTypeCode: "",
          name: "",
          developmentTrendCode: "",
          townCode: "",
          village: "",
          group: "",
          location: "",
          longitude: 0,
          latitude: 0,
          yaw: 0,
          isCanceled: true,
          cancelTime: null,
          cancelReason: "",
          disasterScale: 0,
          disasterScaleLevel: 0,
          threatProperty: 0,
          threatHouses: 0,
          threatPeople: 0,
          preventOwnerName: "",
          preventOwnerPhone: "",
          monitorOwnerName: "",
          monitorOwnerPhone: "",
          monitorName: "",
          monitorPhone: "",
          code: "",
          countryApproval: "",
          countryComment: "",
          countryApprovalTime: null,
          cityApproval: "",
          cityComment: "",
          cityApprovalTime: null,
          adminCode: "",
          admin: {
            province: "",
            city: "",
            country: "",
            town: ""
          },
          status: 0,
          id: 0
        },
        processes: [
          {
            node: {
              flowID: 0,
              name: "",
              preNodeID: 0,
              nextNodeID: 0,
              id: 0
            },
            formId: 0,
            handler: {
              userName: "",
              name: "",
              id: 0
            },
            handleTime: null,
            opinion: 0,
            type: 0,
            comment: ""
          }
        ],
        code: "",
        countryApproval: "",
        countryComment: "",
        countryApprovalTime: null,
        cityApproval: "",
        cityComment: "",
        cityApprovalTime: null,
        adminCode: "",
        admin: {
          province: "",
          city: "",
          country: "",
          town: ""
        },
        status: 0,
        id: 0
      }
    };
  },
  computed: {},
  mounted() {
    this.$store
      .dispatch("report/relocation/edit", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    edit() {
      this.$store
        .dispatch("report/relocation/update", this.formData)
        .then(res => {
          this.$util.editSaveMessage(res.data.success);
        });
    }
  }
};
</script>

<style lang="less"></style>
