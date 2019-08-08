/**填报隐患点基本信息模块 */
/*eslint-disable */
import api from "@/api/basicInfo/query";
import appconst from "@/lib/appconst";
export default {
  namespaced: true,
  state: {
    currentData: {},
    tableData: []
  },
  mutations: {
    setCurrentData ( state, data ) {
      state.currentData = data;
    },
    setTableData ( state, data ) {
      state.tableData = data;
    }
  },
  actions: {
    // 查询
    async query ( { commit }, data ) {
      const res =
        data.status[0] == appconst.DataStatusEnum.Processing
          ? await api.getFormProcessing( data )
          : await api.getByStatus( data );
      // debugger;
      commit( "setTableData", res.data.result.items );
      return res.data.result;
    },
    // async getByIdQuery({ commit }, data) {
    //   const res = await api.getByIdQuery(data);
    //   return res;
    // },
    async getById ( { commit }, id ) {
      const rep = await api.getById( id );
      return rep;
    },
    async getByCode ( { commit }, code ) {
      const rep = await api.getByCode( code );
      const data = rep.data.result;
      console.log( data );
      return data && data[0];
    }
  },
  getters: {
    getCurrentData: state => state.currentData
  }
};
