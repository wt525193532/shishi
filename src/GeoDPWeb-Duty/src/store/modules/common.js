import api from "@/api/common";
export default {
  namespaced: true,
  state: {
    allPeople: [], // 所有人员
    allDutyPersons: [], // 所有值班人员
    allChargeLeaders: [], // 所有局值班领导
    allDutyLeaders: [], // 所有站值班领导
    allDutyDrivers: [], // 所有值班人员
    allTeams: [], // 所有应急处理组
    allDutyOrders: [], // 所有班次,
    onDotyInfo: {
      startTime: null,
      mainDutyPerson: {
        type: 0,
        userId: 0,
        name: "",
        phoneNumber: "",
        emailAddress: "",
        department: "",
        id: 0
      },
      emergencyTeam: {
        name: "",
        phoneNumber: "",
        members: [
          {
            type: 0,
            userId: 0,
            name: "",
            phoneNumber: "",
            emailAddress: "",
            department: "",
            id: 0
          }
        ],
        id: 0
      },
      takeLeader: {
        type: 0,
        userId: 0,
        name: "",
        phoneNumber: "",
        emailAddress: "",
        department: "",
        id: 0
      },
      dutyLeader: {
        type: 0,
        userId: 0,
        name: "",
        phoneNumber: "",
        emailAddress: "",
        department: "",
        id: 0
      },
      dutyDriver: {
        type: 0,
        userId: 0,
        name: "",
        phoneNumber: "",
        emailAddress: "",
        department: "",
        id: 0
      },
      otherDutyPersons: [
        {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        }
      ],
      takeOverInfo: {
        handOverPerson: {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        },
        takeOverPerson: {
          type: 0,
          userId: 0,
          name: "",
          phoneNumber: "",
          emailAddress: "",
          department: "",
          id: 0
        },
        content: "",
        attachments: [],
        handTime: null,
        id: 0
      },
      id: 0
    }
  },
  mutations: {
    allPeople(state, data) {
      state.allPeople = data;
    },
    allDutyPersons(state, data) {
      state.allDutyPersons = data;
    },
    allChargeLeaders(state, data) {
      state.allChargeLeaders = data;
    },
    allDutyLeaders(state, data) {
      state.allDutyLeaders = data;
    },
    allDutyDrivers(state, data) {
      state.allDutyDrivers = data;
    },
    allTeams(state, data) {
      state.allTeams = data;
    },
    allDutyOrders(state, data) {
      state.allDutyOrders = data;
    },
    allOnDotyInfo(state, data) {
      state.onDotyInfo = data;
    }
  },
  actions: {
    //   获取值班人员、局值班领导、站值班领导、值班驾驶员
    async getAllDutys({ commit }) {
      let res = await api.getAllByType({
        type: null,
        skipCount: 0,
        maxResultCount: 10000
      });
      let resArr = res.data.result;
      let [allDutyPersons, allChargeLeaders, allDutyLeaders, allDutyDrivers] = [
        [],
        [],
        [],
        []
      ];
      resArr.forEach(item => {
        switch (item.type) {
          case 0:
            allDutyPersons.push(item);
            break;
          case 1:
            allChargeLeaders.push(item);
            break;
          case 2:
            allDutyLeaders.push(item);
            break;
          case 3:
            allDutyDrivers.push(item);
            break;
          default:
            break;
        }
      });
      commit("allPeople", res.data.result);
      commit("allDutyPersons", allDutyPersons);
      commit("allChargeLeaders", allChargeLeaders);
      commit("allDutyLeaders", allDutyLeaders);
      commit("allDutyDrivers", allDutyDrivers);
      return res.data.result;
    },
    // 获取应急处理组
    async getAllTeams({ commit }) {
      let res = await api.getAllTeam({
        key: "",
        skipCount: 0,
        maxResultCount: 10000
      });
      commit("allTeams", res.data.result);
      return res.data.result;
    },
    // 获取所有班次
    async getAllDutyOrders({ commit }) {
      let res = await api.getAll();
      commit("allDutyOrders", res.data.result);
      return res.data.result;
    },
    // 获取当前排班信息
    async getCurrent({ commit }) {
      let res = await api.getCurrent();
      for (let k in res.data.result) {
        if (res.data.result[k] == null) {
          res.data.result[k] = {};
        }
      }
      commit("allOnDotyInfo", res.data.result);
      return res.data.result;
    }
  }
};
