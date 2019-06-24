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
    async getAllByCode({ commit }, code) {
      const res = await api.getAllByCode(code);
      commit("setAllWorkSpace", res.data.result);
      return res.data.result;
    },
    async getAdministrative({ commit }, params) {
      const res = await api.getAdministrative(params);
      return res.data.result;
    }
  }
};

export default organization;
