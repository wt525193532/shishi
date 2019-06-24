<template>
  <div>
    <relocation-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="save"
      :canEdit="true"
    ></relocation-form>
  </div>
</template>

<script>
import relocationForm from "@/view/components/relocationForm";
export default {
  name: "AddRelocation",
  components: { relocationForm },
  data() {
    return {
      disabled: false,
      formData: {
        provinceTaskNumber: "",
        finishDeadline: "",
        finishTime: "",
        houseHolder: "",
        relocationTypeCode: "",
        isPoorHouseholds: true,
        antiPovertyYear: 0,
        relocationProcessCode: "",
        placeTypeCode: "",
        isDemolished: true,
        relocationTime: "",
        isDangerInNew: true,
        improveInfoCode: "",
        isAccepted: true,
        acceptanceReasons: "",
        isPublishedDetail: true,
        houseDismantleTime: "",
        relocationPersons: 0,
        locationName: "",
        transLocationName: "",
        transitionInTime: "",
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
        applyTime: "",
        isAcceptanced: true,
        newHouseAddress: "",
        newHouseArea: 0,
        subsidyMoney: 0,
        subsidyPerson: "",
        vallageOpinions: "",
        townOpinions: "",
        landBureauOpinions: "",
        acceptanceTime: "",
        attachments: [
          {
            key: "",
            name: "",
            displayName: "",
            tag: "",
            extension: "",
            url: "",
            id: 0
          }
        ],
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
          cancelTime: "",
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
          countryApprovalTime: "",
          cityApproval: "",
          cityComment: "",
          cityApprovalTime: "",
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
            handleTime: "",
            opinion: 0,
            type: 0,
            comment: ""
          }
        ],
        code: "",
        countryApproval: "",
        countryComment: "",
        countryApprovalTime: "",
        cityApproval: "",
        cityComment: "",
        cityApprovalTime: "",
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
  methods: {
    async save() {
      let r;
      r = await this.$store
        .dispatch("report/relocation/create", this.formData)
        .then(async res => {
          r = await this.$util.addSaveConfirm(res.data.success);
          if (!r) {
            this.formData.site = {
              code: "",
              admin: {}
            };
            this.formData.code = "";
          }
          return r;
        });
      return r;
    }
  }
};
</script>

<style lang="less"></style>
