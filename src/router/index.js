import Vue from 'vue'
import Router from 'vue-router'
import Deposit from '@/pages/Deposit'
import Borrow from '@/pages/Borrow'
import Dashboard from '@/pages/Dashboard'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/deposit',
      name: 'Deposit',
      component: Deposit
    },
    {
      path: '/borrow',
      name: 'Borrow',
      component: Borrow
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '*',
      redirect: { name: 'Dashboard' }
    },
  ]
})
