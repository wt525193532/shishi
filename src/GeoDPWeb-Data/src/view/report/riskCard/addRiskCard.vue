<template>
  <div>
    <risk-card-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="save"
      :canEdit="true"
    />
  </div>
</template>

<script>
import riskCardForm from "@/view/components/riskCardForm";
export default {
  name: "AddRiskCard",
  data() {
    return {
      disabled: false,
      formData: {
        houseHoldName: "",
        signTime: "",
        houseHoldPhone: "",
        familyMemberCount: 1,
        houseType: "",
        houseAddress: "",
        locationRelation: "",
        predisposFactor: "",
        attentionItems: "",
        forcastSignal: "",
        forcaster: "",
        forcasterPhone: "",
        evacuationRoute: "",
        resettleCoName: "",
        resettleCoPrincipal: "",
        resettleCoPhone: "",
        rescueCoName: "",
        rescueCoPrincipal: "",
        rescueCoPhone: "",
        sentCoName: "",
        sentCoPrincipal: "",
        sentColPhone: "",
        familyMembers: [
          {
            name: "",
            phone: "",
            idNumber: "",
            birthday: "",
            sex: "",
            remark: "",
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
  methods: {
    async save() {
      let r;
      await this.$store
        .dispatch("report/riskCard/create", this.formData)
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
  },
  components: { riskCardForm }
};
</script>

<style lang="less"></style>
