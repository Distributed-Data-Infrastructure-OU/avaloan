const ethers = require('ethers');
let ethereum = window.ethereum;
const Web3 = require('web3');

export default {
  namespaced: true,
  state: {
    networkId: 1,
    web3: null,
    provider: null,
    account: null,
    balance: null
  },
  mutations: {
    setWeb3(state, web3) {
      state.web3 = web3;
    },
    setProvider(state, provider) {
      state.provider = provider;
    },
    setAccount(state, account) {
      state.account = account;
    },
    setBalance(state, balance) {
      state.balance = balance;
    }
  },
  getters: {
  },
  actions: {
    async initNetwork({ dispatch }) {
        await dispatch('initWeb3');
        await dispatch('initProvider');
        await dispatch('initAccount');
        await dispatch('updateBalance');
    },
    async initWeb3({ commit, state }) {
      console.log("Getting web3");
      window.ethers = ethers;

      if (!state.web3) {
        if (typeof ethereum !== 'undefined') {
          await ethereum.request({ method: 'eth_requestAccounts' });
          web3 = new Web3(ethereum);
          window.web3 = web3;
        } else if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider);
        } else {
          throw 'NO_WEB3'
        }
      
        commit('setWeb3', web3);
      }
    },
    async initProvider({ commit, state }) {
      const provider = new ethers.providers.Web3Provider(state.web3.currentProvider);
      window.provider = provider;

      commit('setProvider', provider);
    },
    async initAccount({ commit, state }) {
      if (state.account) {
        return state.account;
      }

      let provider = state.provider;
      let accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const mainAccount = accounts[0];
        commit('setAccount', mainAccount);
        console.log("Connected web3 account: " + mainAccount);
      } else {
        console.log("No web3 accounts available.")
      }
    },
    async updateBalance({ state, commit }) {
      const mainAccount = state.account;
      const web3 = state.web3;
      web3.eth.getBalance(mainAccount, function(e, result) {
        let balance = parseFloat(web3.utils.fromWei(result, 'ether'));
        console.log("Balance: " + balance);

        commit('setBalance', balance);
      });
    }
  },
};
