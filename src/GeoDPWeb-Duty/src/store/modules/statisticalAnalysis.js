/* eslint-disable no-unused-vars */
/**统计功能模块 */
import api from "@/api/statisticalAnalysis";

const statisticalAnalysis = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async smsQuey({ commit }, parms) {
      const res = await api.smsQuey(parms);
      return res.data.result;
    },
    async smsSta({ commit }, parms) {
      const res = await api.smsSta(parms);
      return res.data.result;
    },
    async mailQueryReceived({ commit }, parms) {
      const res = await api.mailQueryReceived(parms);
      return res.data.result;
    },
    async mailStaReceived({ commit }, parms) {
      const res = await api.mailStaReceived(parms);
      return res.data.result;
    },
    async mailQuerySended({ commit }, parms) {
      const res = await api.mailQuerySended(parms);
      return res.data.result;
    },
    async mailStaSended({ commit }, parms) {
      const res = await api.mailStaSended(parms);
      return res.data.result;
    },
    async disasterInfoQuey({ commit }, parms) {
      const res = await api.disasterInfoQuey(parms);
      return res.data.result;
    },
    async disasterInfoSta({ commit }, parms) {
      const res = await api.disasterInfoSta(parms);
      return res.data.result;
    },
    async dangerInfoQuey({ commit }, parms) {
      const res = await api.dangerInfoQuey(parms);
      return res.data.result;
    },
    async dangerInfoSta({ commit }, parms) {
      const res = await api.dangerInfoSta(parms);
      return res.data.result;
    },
    async avoidRiskInfoQuey({ commit }, parms) {
      const res = await api.avoidRiskInfoQuey(parms);
      return res.data.result;
    },
    async avoidRiskInfoSta({ commit }, parms) {
      const res = await api.avoidRiskInfoSta(parms);
      return res.data.result;
    }
  }
};

export default statisticalAnalysis;
