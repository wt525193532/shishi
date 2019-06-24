/* eslint-disable no-unused-vars */
import api from "@/api/dutyManage/schedueManage";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 更新实际的排班信息
    async updateCurrent(
      { commit },
      { takeLeader, dutyLeader, dutyDriver, emergencyTeam, otherDutyPersons }
    ) {
      // console.log(data);
      let parmas = {
        takeLeaderId: takeLeader.id,
        dutyLeaderId: dutyLeader.id,
        dutyDriverId: dutyDriver.id,
        emergencyTeamId: emergencyTeam.id,
        otherDutyPersons: []
      };
      parmas.otherDutyPersons = otherDutyPersons.map(item => {
        return item.id;
      });
      let res = await api.updateCurrent(parmas);
      return res;
    },
    // 获取当前排班信息
    async getCurrent({ commit }) {
      let res = await api.getCurrent();
      for (let k in res.data.result) {
        if (res.data.result[k] == null) {
          res.data.result[k] = {};
        }
      }
      return res.data.result;
    },
    //   获取所有排班信息
    async getAllPlan({ commit }, parmas) {
      let res = await api.getAllPlan(parmas);
      return res;
    },
    //   分页查询交接班信息
    async getAllHandOverInfo({ commit }, parmas) {
      let res = await api.getAllHandOverInfo(parmas);
      return res.data.result;
    },
    // 新增排班信息
    async createPlan({ commit }, parmas) {
      let res = await api.createPlan(parmas);
      return res;
    },
    async deletePlan({ commit }, ids) {
      let res = await api.deletePlan(ids);
      return res;
    },
    // 当前用户是否可接班
    async canTakeOver({ commit }) {
      let res = await api.canTakeOver();
      return res.data.result;
    },
    // 当前用户接班
    async takeOver({ commit }) {
      let res = await api.takeOver();
      return res.data.result;
    },
    // 当前用户交班
    async handOver({ commit }, parmas) {
      parmas.attachments.forEach((item, index) => {
        delete parmas.attachments[index].uid;
        delete parmas.attachments[index].status;
      });
      let res = await api.handOver(parmas);
      return res.data.result;
    }
  }
};
