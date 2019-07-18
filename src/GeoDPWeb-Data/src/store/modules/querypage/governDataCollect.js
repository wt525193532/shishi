/* eslint-disable no-unused-vars */
import api from "@/api/governDataCollect/query";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getById({ commit }, id) {
      console.log(id);

      const rep = await api.getById(id);
      return rep;
    }
  }
};
