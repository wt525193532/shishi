/* eslint-disable no-unused-vars */
/**填报防灾预案表模块 */
// eslint-disable-next-line
import api from "@/api/bqgh/report";
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
      commit("setTableData", res.data.result.items);
      return res.data.result;
    },
    // 按状态查询数据
    async getByStatus({ commit }, id) {
      const res = await api.getByStatus(id);
      return res.data.result;
    },
    // 撤销
    async cancel({ commit }, id) {
      const res = await api.cancel(id);
      return res;
    },
    // 提交
    async commit({ commit }, data) {
      const res = await api.commit(data);
      return res;
    },
    // 删除
    async delData({ commit }, id) {
      const res = await api.delData(id);
      return res;
    },
    //获取详情
    async edit({ commit }, id) {
      const res = await api.edit(id);
      commit("setCurrentData", res);
      res.data.result.zgaA05A030 = res.data.result.zgaA05A030 + "000000";
      return res;
    },
    // 编辑
    async update({ commit }, data) {
      data.zgaA05A030 = data.zgaA05A030.substring(0, 6);
      const res = await api.update(data);
      return res;
    },
    // 新增
    async create({ commit }, data) {
      data.zgaA05A030 = data.zgaA05A030.substring(0, 6);
      const res = await api.create(data);
      return res;
    },
    async getById({ commit }, id) {
      const res = await api.getById(id);
      commit("setCurrentData", res);
      res.data.result.zgaA05A030 = res.data.result.zgaA05A030 + "000000";
      return res;
    },
    async cancelCommit({ commit }, formId) {
      const res = await api.cancelCommit({ formId });
      return res;
    }
  }
};
