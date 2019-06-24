/* eslint-disable no-unused-vars */
import api from "@/api/dutyManage/shiftManage";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAll({ commit }) {
      const res = await api.getAll();
      return res.data.result;
    },
    async save({ commit }, data) {
      const res = await api.save(data);
      return res;
    },
    async saveBatch({ commit }, data) {
      const res = await api.saveBatch(data);
      return res;
    },
    async edit({ commit }, data) {
      const res = await api.edit(data);
      return res;
    },
    async delShift({ commit }, data) {
      const res = await api.delShift(data);
      return res;
    }
  }
};
