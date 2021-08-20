import { getAvaxPrice } from "@/api/coingecko"

export default {
  namespaced: true,
  state: {
    avaxPrice: null
  },
  mutations: {
    setAvaxPrice(state, price) {
      state.avaxPrice = price;
    }
  },
  getters: {
  },
  actions: {
    async updateAvaxPrice() {
        const avaxPrice = await getAvaxPrice();
        commit('setAvaxPrice', avaxPrice);
    }
  }
}
