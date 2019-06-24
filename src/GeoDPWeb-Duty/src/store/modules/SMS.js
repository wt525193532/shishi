/* eslint-disable no-unused-vars */
/**短信功能模块 */
import api from "@/api/SMS";

const SMS = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async send({ commit }, parms) {
      const res = await api.send(parms);
      return res.data.result;
    },
    async queryTemplate({ commit }, parms) {
      const res = await api.queryTemplate(parms);
      return res.data.result;
    },
    async saveTemplate({ commit }, parms) {
      const res = await api.saveTemplate(parms);
      return res.data.result;
    },
    async deleteTemplate({ commit }, data) {
      const parms = { templateIds: data };
      const res = await api.deleteTemplate(parms);
      return res.data.result;
    },
    async querySendInfo({ commit }, parms) {
      const res = await api.querySendInfo(parms);
      return res.data.result;
    }
  }
};

export default SMS;
