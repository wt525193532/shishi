/**用户查询功能模块 */
// eslint-disable-next-line
import api from '@/api/user'

const user = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async getAllByUnit({ commit }, parms) {
      const res = await api.getAllByUnit(parms);
      return res.data.result;
    }
  }
};

export default user;
