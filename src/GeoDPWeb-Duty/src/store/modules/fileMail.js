/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import api from '@/api/fileMail'

const fileMail = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async send({ commit }, param) {
      param.attachments.forEach((i, index) => {
        delete param.attachments[index].status;
        delete param.attachments[index].uid;
      });
      const res = await api.send(param);
      return res.data.result;
    },
    async reSend({ commit }, param) {
      const res = await api.reSend(param);
      return res.data.result;
    },
    async saveDraft({ commit }, param) {
      param.attachments.forEach((i, index) => {
        delete param.attachments[index].status;
        delete param.attachments[index].uid;
      });
      const res = await api.saveDraft(param);
      return res.data.result;
    },
    async queryReceive({ commit }, param) {
      const res = await api.queryReceive(param);
      return res.data.result;
    },
    async querySend({ commit }, param) {
      const res = await api.querySend(param);
      return res.data.result;
    },
    async queryDraft({ commit }, param) {
      const res = await api.queryDraft(param);
      return res.data.result;
    },
    async editDraft({ commit }, param) {
      const res = await api.editDraft(param);
      return res.data.result;
    },
    async delDraftMails({ commit }, ids) {
      let param = { mailIds: ids };
      const res = await api.delDraftMails(param);
      return res.data.result;
    }
  }
};

export default fileMail;
