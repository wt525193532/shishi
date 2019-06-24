/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import api from '@/api/organization'

const organization = {
  namespaced: true,
  state: {
    allWorkSpace: []
  },
  mutations: {
    setAllWorkSpace(state, data) {
      state.allWorkSpace = data;
    }
  },
  actions: {
    async getWorkspaceByCode({ commit }) {
      const res = await api.getWorkspaceByCode();
      commit("setAllWorkSpace", res.data.result);
    },
    async getAdministrative({ commit }, params) {
      const res = await api.getAdministrative(params);
      return res.data.result;
    }
  }
};

export default organization;
