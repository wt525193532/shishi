/* eslint-disable no-unused-vars */
import api from "@/api/approvalSetting";

const approvalSetting = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllFlow({ commit }) {
      const res = await api.getAllFlow();
      return res.data.result;
    },
    async getAllFlowWithNodes({ commit }) {
      const res = await api.getAllFlowWithNodes();
      return res.data.result;
    },
    async createNode({ commit }, params) {
      const res = await api.createNode(params);
      return res.data.result;
    },
    async updateNode({ commit }, params) {
      const res = await api.updateNode(params);
      return res.data.result;
    },
    async deleteNode({ commit }, id) {
      const res = await api.deleteNode(id);
      return res.data.result;
    },
    async updateObject({ commit }, params) {
      const res = await api.updateObject(params);
      return res.data.result;
    },
    async getObject({ commit }, id) {
      const res = await api.getObject(id);
      return res.data.result;
    },
    async getAllObjects({ commit }, params) {
      const res = await api.getAllObjects(params);
      return res.data.result;
    }
  }
};

export default approvalSetting;
