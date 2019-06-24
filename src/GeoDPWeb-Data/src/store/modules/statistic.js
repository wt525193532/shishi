/**统计功能模块 */
// eslint-disable-next-line
import api from "@/api/statistic";

const statistic = {
  namespaced: true,
  state: {
    // areaList: []
  },
  mutations: {
    // getAreaList(state, data) {
    //   state.areaList = data;
    // }
  },
  actions: {
    // 获取灾害区域
    // eslint-disable-next-line
    async getAreaList ( { commit }, data ) {
      const res = await api.getAdministrative(data);
      // commit("getAreaList", res.result.children);
      return res;
    },
    // 按灾害规模等级统计隐患点数量
    // eslint-disable-next-line
    async staByDisasterScale ( { commit }, data ) {
      const res = await api.staByDisasterScale(data);
      return res;
    },
    // 按灾害类型等级统计隐患点数量
    // eslint-disable-next-line
    async staByDisasterType ( { commit }, data ) {
      const res = await api.staByDisasterType(data);
      return res;
    },
    // 按灾害类型等级统计隐患点数量
    // eslint-disable-next-line
    async staByDisasterType ( { commit }, data ) {
      const res = await api.staByDisasterType(data);
      return res;
    },
    // 按灾害规模等级统计隐患点数量
    // eslint-disable-next-line
    async staByClass ( { commit }, data ) {
      const res = await api.staByClass(data);
      return res;
    },
    // 按灾害类型等级统计隐患点数量
    // eslint-disable-next-line
    async staByType ( { commit }, data ) {
      const res = await api.staByType(data);
      return res;
    }
  }
};

export default statistic;
