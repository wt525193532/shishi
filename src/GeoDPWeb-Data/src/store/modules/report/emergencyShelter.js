/**填报防灾预案表模块 */
// eslint-disable-next-line
import api from "@/api/emergencyShelter/report";
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
      return res.data.result;
    },
    // 撤销
    // eslint-disable-next-line
    async cancelCommit({ commit }, formId) {
      const res = await api.cancelCommit({ formId });
      return res;
    },
    // 提交
    // eslint-disable-next-line
    async commit({ commit }, data) {
      const res = await api.commit(data);
      return res;
    },
    // 删除
    // eslint-disable-next-line
    async delData({ commit }, id) {
      const res = await api.delData(id);
      return res;
    },
    //获取详情
    async edit({ commit }, id) {
      const res = await api.getById(id);
      commit("setCurrentData", res);
      return res;
    },
    // 编辑
    // eslint-disable-next-line
    async update({ commit }, data) {
      await api.update(data);
    },
    // 新增
    // eslint-disable-next-line
    async create({ commit }, data) {
      await api.create(data);
    }
  }
};
