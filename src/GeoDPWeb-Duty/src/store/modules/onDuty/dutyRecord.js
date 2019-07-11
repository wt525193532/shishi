/* eslint-disable no-unused-vars */
import api from "@/api/onDuty/dutyRecord";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async create({ commit }, parms) {
      parms.attachments.forEach((item, index) => {
        delete parms.attachments[index].uid;
        delete parms.attachments[index].status;
      });
      const res = await api.create(parms);
      return res;
    },
    async update({ commit }, parms) {
      const res = await api.update(parms);
      return res;
    },
    async getAllCurrent({ commit }, data) {
      const res = await api.getAllCurrent(data);
      return res.data.result;
    },
    async getAll({ commit }, data) {
      const res = await api.getAll(data);
      return res.data.result;
    },
    async getAllByKey({ commit }, data) {
      const res = await api.getAllByKey(data);
      return res.data.result;
    },
    async delRecord({ commit }, data) {
      let recordList = { ids: [] };
      data.forEach(item => {
        recordList.ids.push(item.id);
      });
      const res = await api.delRecord(recordList);
      return res.data.result;
    }
  }
};
