/**填报防灾预案表模块 */
/* eslint-disable */
import api from "@/api/mineInformation/query";
import appconst from "@/lib/appconst";

export default {
    namespaced: true,
    state: {
        tableData: [],
        currentData: {}
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
            commit( "setTableData", res.data.result.items );
            return res.data.result;
        },
        async getById ( { commit }, id ) {
            const rep = await api.getById( id );
            return rep.data;
        },
        async getByCode ( { commit }, code ) {
            const rep = await api.getByCode( code );
            const data = rep.data.result;
            console.log( data );
            return data;
        }
    },
    getters: {
        getCurrentData: state => state.currentData
    }
};
