/* eslint-disable no-unused-vars */
// eslint-disable-next-line
import api from '@/api/rwszszj'

const rwszszj = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllBook({ commit }) {
      const res = await api.getAllBook();
      res.data.forEach((item, index, arr) => {
        arr[index].label = item.year;
        item.children.forEach((book, ind, books) => {
          books[ind].label = book.rwaA01A040;
          books[ind].value = book.rwaA01A030;
        });
      });
      return res.data;
    },
    async getAllFund({ commit }) {
      const res = await api.getAllFund();
      return res.data;
    }
  }
};

export default rwszszj;
