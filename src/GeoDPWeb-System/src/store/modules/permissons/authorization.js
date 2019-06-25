/* eslint-disable no-unused-vars */
import api from "@/api/permissons/authorization";

const authorization = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllPermissions({ commit }) {
      const res = await api.getAllPermissions();
      return res.data.result;
    },
    async getAllPermissonsTree({ commit }) {
      const res = await api.getAllPermissonsTree();
      return res.data.result;
    }
  }
};

export default authorization;
