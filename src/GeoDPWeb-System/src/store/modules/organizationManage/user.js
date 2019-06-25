/* eslint-disable no-unused-vars */
import api from "@/api/organizationManage/user";

const user = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllByUnit({ commit }, params) {
      const res = await api.getAllByUnit(params);
      return res.data.result;
    },
    async getAll({ commit }, params) {
      const res = await api.getAll(params);
      return res.data.result;
    },
    async getUser({ commit }, id) {
      const res = await api.getUser(id);
      return res.data.result;
    },
    async create({ commit }, params) {
      const res = await api.create(params);
      return res.data.result;
    },
    async update({ commit }, params) {
      const res = await api.update(params);
      return res.data.result;
    },
    async deleteUser({ commit }, id) {
      const res = await api.deleteUser(id);
      return res.data.result;
    }
  }
};

export default user;
