/* eslint-disable no-unused-vars */
/**查询功能模块 */
// eslint-disable-next-line
import api from "@/api/query";

const query = {
  namespaced: true,
  state: {
    tableData: []
  },
  mutations: {
    queryAll: (state, data) => {
      state.tableData = data;
    }
  },
  actions: {
    // 隐患点基本信息
    async basicInfoQuery({ commit }, data) {
      const res = await api.basicInfoQuery(data);
      return res.data.result;
    },
    // 防灾预案表
    async preventionPlanQuery({ commit }, data) {
      const res = await api.preventionPlanQuery(data);
      return res.data.result;
    },
    //应急排危
    async eliminateDangerQuery({ commit }, data) {
      const res = await api.EliminateInfoQuery(data);
      return res.data.result;
    },
    //专业监测数据
    async professionalMntQuery({ commit }, data) {
      const res = await api.ProfessionalMntQuery(data);
      return res.data.result;
    },
    //搬迁避让
    async relocationInfoQuery({ commit }, data) {
      const res = await api.RelocationInfoQuery(data);
      return res.data.result;
    },
    //避险明白卡
    async riskCardQuery({ commit }, data) {
      const res = await api.RiskCardQuery(data);
      return res.data.result;
    },
    //简易监测
    async simpleMntQuery({ commit }, data) {
      const res = await api.SimpleMntQuery(data);
      return res.data.result;
    },
    //防灾工作
    async workCardQuery({ commit }, data) {
      const res = await api.WorkCardQuery(data);
      return res.data.result;
    },
    //地质遗迹保护项目进度数据
    async heritageProtectionQuery({ commit }, data) {
      const res = await api.HeritageProtectionQuery(data);
      return res.data.result;
    },
    //培训演练
    async trainingQuery({ commit }, data) {
      const res = await api.TrainingQuery(data);
      return res.data.result;
    },
    //治理工程
    async engineerInfoQuery({ commit }, data) {
      const res = await api.EngineerInfoQuery(data);
      return res.data.result;
    },
    //矿山治理工程进展数据
    async governDataCollectQuery({ commit }, data) {
      const res = await api.governDataCollectQuery(data);
      return res.data.result;
    },
    //矿山基本信息
    async MineInfoQuery({ commit }, data) {
      const res = await api.MineInfoQuery(data);
      return res.data.result;
    }
  }
};

export default query;
