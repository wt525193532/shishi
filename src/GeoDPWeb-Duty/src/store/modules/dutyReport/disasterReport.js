/* eslint-disable no-unused-vars */
/**报送表三模块 */
// eslint-disable-next-line
import api from '@/api/dutyReport/disasterReport'

const disasterReport = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async createItem({ commit }, parms) {
      const res = await api.createItem(parms);
      return res.data.result;
    },
    async saveEditItem({ commit }, parms) {
      const res = await api.saveEditItem(parms);
      return res.data.result;
    },
    async queryItems({ commit }, parms) {
      const res = await api.queryItems(parms);
      return res.data.result;
    },
    async queryReportedItems({ commit }, parms) {
      const res = await api.queryReportedItems(parms);
      return res.data.result;
    },
    async queryReportedTables({ commit }, parms) {
      const res = await api.queryReportedTables(parms);
      return res.data.result;
    },
    async report({ commit }, parms) {
      const res = await api.report(parms);
      return res.data.result;
    },
    async editItem({ commit }, id) {
      const res = await api.editItem(id);
      return res.data.result;
    },
    async getItem({ commit }, id) {
      const res = await api.getItem(id);
      return res.data.result;
    },
    async deleteItem({ commit }, id) {
      const res = await api.deleteItem(id);
      return res.data.result;
    }
  }
};

export default disasterReport;
