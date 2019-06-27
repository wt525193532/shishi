/* eslint-disable no-unused-vars */
import api from "@/api/permissons/role";

const role = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAll({ commit }, params) {
      if (!params) {
        params = {
          Keyword: "",
          SkipCount: 0,
          MaxResultCount: 9999
        };
      }
      const res = await api.getAll(params);
      return res.data.result;
    },
    async getRolesByPermission({ commit }, params) {
      const res = await api.getRolesByPermission(params);
      return res.data.result;
    },
    async edit({ commit }, id) {
      const res = await api.edit(id);
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
    async deleteRole({ commit }, params) {
      const res = await api.deleteRole(params);
      return res.data.result;
    }
  }
};

export default role;
