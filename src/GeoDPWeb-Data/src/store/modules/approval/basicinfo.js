/**审核隐患点基本信息模块 */
// eslint-disable-next-line
import api from "@/api/basicInfo/approval";

export default {
  namespaced: true,
  state: {
    tableData: []
  },
  mutations: {
    getTableData(state, data) {
      state.tableData = data;
    }
  },
  actions: {
    //通过action发起api请求
    // 查询
    async query({ commit }, data) {
      const res =
        data.activeName == 1
          ? await api.getAllToDo(data.parmas)
          : await api.getAllProcessed(data.parmas);
      // debugger;
      commit("getTableData", res.data.result.items);
      return res.data.result;
    },
    // 同意撤销 拒绝 通过
    // eslint-disable-next-line
    async process({ commit }, data) {
      const res = await api.process(data);
      return res;
    }
  }
};
