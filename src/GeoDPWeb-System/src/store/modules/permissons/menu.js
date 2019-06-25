/* eslint-disable no-unused-vars */
import api from "@/api/permissons/menu";

const role = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAll({ commit }) {
      const res = await api.getAll();
      return res.data.result;
    },
    async createOrUpdate({ commit }, params) {
      const res = await api.createOrUpdate(params);
      return res.data.result;
    },
    async deleteMenu({ commit }, id) {
      const res = await api.deleteMenu(id);
      return res.data.result;
    }
  }
};

export default role;
