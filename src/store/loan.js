const ethers = require('ethers');
import LOAN from '@contracts/SmartLoan.json'
import LOAN_FACTORY from '@contracts/SmartLoansFactory.json'
import { calculateCollateral, fromWei, toWei } from "@/utils/calculate";

export default {
  namespaced: true,
  state: {
    loan: null,
    assets: null,
    isLoanAlreadyCreated: null,
    totalValue: null,
    debt: null,
    solvency: null
  },
  mutations: {
    setLoan(state, loan) {
      state.loan = loan;
    },
    setAssets(state, assets) {
      state.assets = assets;
    },
    setIsLoanAlreadyCreated(state, created) {
      state.isLoanAlreadyCreated = created;
    },
    setTotalValue(state, totalValue) {
      state.totalValue = totalValue;
    },
    setDebt(state, debt) {
      state.debt = debt;
    },
    setSolvency(state, solvency) {
      state.solvency = solvency;
    }
  },
  getters: {
  },
  actions: {
    async initLoan({ state, rootState, dispatch, commit }) {
      const provider = rootState.network.provider;
      const account = rootState.network.account;
  
      const loanFactory = new ethers.Contract(LOAN_FACTORY.networks[rootState.network.networkId].address, LOAN_FACTORY.abi, provider.getSigner());
      const userLoan = await loanFactory.getAccountForUser(account);
  
      console.log(ethers.constants.AddressZero)
      commit('setIsLoanAlreadyCreated', userLoan != ethers.constants.AddressZero);

      if (state.isLoanAlreadyCreated) {
        commit('setLoan', new ethers.Contract(userLoan, LOAN.abi, provider.getSigner()));
        console.log("Loan linked: " + state.loan.address);

        dispatch('updateLoanStats');
        dispatch('updateAssets');
      }
    },
    async updateAssets({ state, rootState, commit }) {
      const provider = rootState.network.provider;
      const address = rootState.network.address;
      const loan = state.loan;
    
      const prices = await loan.getAllAssetsPrices();
      const balances = await loan.getAllAssetsBalances();
    
      const assets = [];

      prices.forEach(async (price, i) => {
        assets[i] = {};

        if (i == 0) {
          assets[0].balance = fromWei(await provider.getBalance(loan.address));
          assets[0].price = 1;
        } else {
          assets[i].price = fromWei(price);
          assets[i].balance = fromWei(balances[i]);
        }
    
        assets[i].value = assets[i].balance * assets[i].price;
        assets[i].share = assets[i].value / state.totalValue;
      });

      commit('setAssets', assets);
    },
    async updateLoanStats({ state, commit }) {
      const loan = state.loan;
      const status = await loan.getFullLoanStatus();

      commit('setTotalValue', fromWei(status[0]));
      commit('setDebt', fromWei(status[1]));
      commit('setSolvency', status[2]/1000);

      console.log(state.debt);
    },
    async createNewLoan({ rootState, dispatch }, { amount }) {
      const provider = rootState.network.provider;
  
      const collateral = calculateCollateral(amount);
      const loanFactory = new ethers.Contract(LOAN_FACTORY.networks[rootState.network.networkId].address, LOAN_FACTORY.abi, provider.getSigner());
      const tx = await loanFactory.createAndFundLoan(toWei(amount.toString()), {value: toWei(collateral.toString()), gasLimit: 3000000});
  
      console.log("Loan created: " + tx.hash);
      const receipt = await provider.waitForTransaction(tx.hash);
      console.log(receipt);

      dispatch('initLoan');
    },
    async borrow({ state, rootState, dispatch }, { amount }) {
      const provider = rootState.network.provider;
      const loan = state.loan;
    
      const tx = await loan.borrow(toWei(amount.toString()), {gasLimit: 3000000});
      console.log("Funds borrowed: " + tx.hash);
      const receipt = await provider.waitForTransaction(tx.hash);
      console.log(receipt);

      dispatch('updateLoanStats');
    },
    async repay({ state, rootState, dispatch }, { amount }) {
      const provider = rootState.network.provider;
      const loan = state.loan;
    
      const tx = await loan.repay(toWei(amount.toString()), {gasLimit: 3000000});
      console.log("Funds repaid: " + tx.hash);
      const receipt = await provider.waitForTransaction(tx.hash);
      console.log(receipt);

      dispatch('updateLoanStats');
    },
    async fund({ state, rootState, dispatch }, { amount }) {
      const provider = rootState.network.provider;
      const loan = state.loan;
    
      const tx = await loan.fund({value: toWei(amount.toString()), gasLimit: 3000000});
      console.log("Funds added: " + tx.hash);
      const receipt = await provider.waitForTransaction(tx.hash);
      console.log(receipt);

      dispatch('updateLoanStats');
    },
    async withdraw({ state, rootState, dispatch }, { amount }) {
      const provider = rootState.network.provider;
      const loan = state.loan;
    
      const tx = await loan.withdraw(toWei(amount.toString()), {gasLimit: 3000000});
      console.log("Funds withdrawn: " + tx.hash);
      const receipt = await provider.waitForTransaction(tx.hash);
      console.log(receipt);

      dispatch('updateLoanStats');
    }
  }
}
