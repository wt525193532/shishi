/**填报防灾预案表模块 */
/* eslint-disable */
import api from "@/api/heritageProtection/report";
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
        // 撤销
        async cancelCommit ( { commit }, formId ) {
            const res = await api.cancelCommit( { formId } );
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
        // 编辑防灾预案表信息
        async edit ( { commit }, id ) {
            const res = await api.edit( id );
            // commit("setCurrentData", res.data.result);
            return res;
        },
        // 获取防灾预案表信息
        // eslint-disable-next-line
        async getById ( { commit }, id ) {
            const res = await api.getById( id );
            // commit("setCurrentData", res.data.result);
            return res;
        },
        // 编辑
        async update ( { commit }, data ) {
            return await api.update( data );
        },
        // 新增
        async create ( { commit }, data ) {
            return await api.create( data );
        }
    },
    getters: {
        getCurrentData: state => state.currentData
    }
};
