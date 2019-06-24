/* eslint-disable no-unused-vars */
/**填报隐患点基本信息模块 */
// eslint-disable-next-line
import api from "@/api/basicInfo/report";

export default {
  namespaced: true,
  state: {
    editData: {}
  },
  mutations: {
    setCurrentData(state, data) {
      state.editData = data;
    }
  },
  actions: {
    //通过action发起api请求
    async edit({ commit }, id) {
      const data = await api.getById(id);
      commit("setCurrentData", data);
    },
    async update({ commit }, data) {
      await api.update(data);
    },
    async add({ commit }, data) {
      await api.add(data);
    }
  }
};
