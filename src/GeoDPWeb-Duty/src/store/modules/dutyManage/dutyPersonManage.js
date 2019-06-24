/* eslint-disable no-unused-vars */
import api from "@/api/dutyManage/dutyPersonManage";

export default {
  namespaced: true,
  state: {
    allPeople: null
  },
  mutations: {
    setAllPeople(state, res) {
      state.allPeople = res;
    }
  },
  actions: {
    async getAllPeople({ commit }, parms) {
      // if (parms.canUpdate) {
      //   console.log("true");
      //   delete parms.canUpdate;
      const res = await api.getAllPeople(parms);
      commit("setAllPeople", res.data.result);
      return res.data.result;
      // } else {
      //   console.log("else");
      //   return state.allPeople;
      // }
    },
    async getAllUserNotInDuty({ commit }, parms) {
      const res = await api.getAllUserNotInDuty(parms);
      return res.data.result;
    },
    async getAllTeam({ commit }, parms) {
      const res = await api.getAllTeam(parms);
      return res.data.result;
    },
    async addPerson({ commit }, parms) {
      return await api.addPerson(parms);
    },
    async saveTeam({ commit }, parms) {
      return await api.saveTeam(parms);
    },
    async editTeam({ commit }, parms) {
      const res = await api.editTeam(parms);
      return res.data.result;
    },
    async removePerson({ commit }, parms) {
      return await api.removePerson(parms);
    },
    async deleteTeam({ commit }, parms) {
      return await api.deleteTeam(parms);
    },
    async getAllUser({ commit }, parms) {
      const res = await api.getAllUser(parms);
      return res.data.result.items;
    }
  }
};
