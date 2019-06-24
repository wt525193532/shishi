<template>
  <div>
    <professional-mnt-form :formData="formData" :disabled="true" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import professionalMntForm from "@/view/components/professionalMntForm";

export default {
  name: "ViewProfessionalMnt",
  components: { professionalMntForm },
  data() {
    return {
      formData: {
        mntTypeCode: "",
        mntSiteCode: "",
        alarmThreshold: 0,
        alarmThresholdUnit: "",
        longitude: undefined,
        latitude: undefined,
        fillYear: 0,
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
          longitude: undefined,
          latitude: undefined,
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
  mounted() {
    this.$store
      .dispatch("querypage/professionalMnt/getById", this.$route.query.id)
      .then(res => {
        if (res.success) {
          this.formData = res.result;
        }
      });
  },
  methods: {}
};
</script>

<style lang="less"></style>
