/**填报矿山基本信息模块 */
/*eslint-disable */
import api from "@/api/mineInformation/report";
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
    // 撤销
    async cancel ( { commit }, id ) {
      const res = await api.cancel( id );
      return res;
    },
    // 销号
    async cancelGeosite ( { commit }, data ) {
      const res = await api.cancelGeosite( data );
      return res;
    },
    // 提交
    async commit ( { commit }, data ) {
      const res = await api.commit( data );
      return res;
    },
    // 删除
    async delData ( { commit }, id ) {
      const res = await api.delData( id );
      return res;
    },

    // 编辑详情
    async edit ( { commit }, id ) {
      const res = await api.edit( id );
      commit( "setCurrentData", res.data );
      return res;
    },
    // 获取详情
    async getMineInfoById ( { commit }, id ) {
      const res = await api.getById( id );
      commit( "setCurrentData", res.data );
      return res;
    },
    // 更新
    async update ( { commit }, data ) {
      return await api.update( data );
    },
    // 新增
    async create ( { commit }, data ) {
      return await api.create( data );
    },

    async getAdministrative ( { commit }, data ) {
      const res = await api.getAdministrative( data );
      return res;
    },
    async generateGeositeCode ( { commit }, data ) {
      const res = await api.generateGeositeCode( data );
      return res;
    },
    // 获取基本信息
    async queryMineInfo ( { commit }, data ) {
      let res = await api.queryMineInfo( data );
      return res.data.result;
    }
  },
  getters: {
    getCurrentData: state => state.currentData
  }
};
