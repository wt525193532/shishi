/* eslint-disable no-unused-vars */
import api from "@/api/organizationManage/workspace";

const workspace = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllByCode({ commit }, code) {
      const res = await api.getAllByCode(code);
      return res.data.result;
    },
    async createDepartment({ commit }, params) {
      const res = await api.createDepartment(params);
      return res.data.result;
    },
    async createWorkspace({ commit }, params) {
      const res = await api.createWorkspace(params);
      return res.data.result;
    },
    async updateWorkspace({ commit }, params) {
      const res = await api.updateWorkspace(params);
      return res.data.result;
    },
    async updateDepartment({ commit }, params) {
      const res = await api.updateDepartment(params);
      return res.data.result;
    },
    async delDepartment({ commit }, params) {
      const res = await api.delDepartment(params);
      return res.data.result;
    },
    async delWorkspace({ commit }, params) {
      const res = await api.delWorkspace(params);
      return res.data.result;
    }
  }
};

export default workspace;
