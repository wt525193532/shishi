/**填报防灾预案表模块 */
// eslint-disable-next-line
import api from "@/api/riskCard/query";
import appconst from "@/lib/appconst";

export default {
  namespaced: true,
  state: {
    tableData: [],
    editData: {}
  },
  mutations: {
    setCurrentData(state, data) {
      state.editData = data;
    },
    setTableData(state, data) {
      state.tableData = data;
    }
  },
  actions: {
    // 查询
    async query({ commit }, data) {
      const res =
        data.status[0] == appconst.DataStatusEnum.Processing
          ? await api.getFormProcessing(data)
          : await api.getByStatus(data);
      // debugger;
      commit("setTableData", res.data.result.items);
      return res.data;
    },
    // eslint-disable-next-line
    async getById ( { commit }, id ) {
      const rep = await api.getById(id);
      return rep;
    },
    // eslint-disable-next-line
    async getByCode ( { commit }, code ) {
      const rep = await api.getByCode(code);
      const data = rep.data.result;
      return data;
    }
  }
};
