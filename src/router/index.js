import Vue from 'vue'
import Router from 'vue-router'
import Deposit from '@/pages/Deposit'
import Invest from '@/pages/Invest'
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
      path: '/invest',
      name: 'Invest',
      component: Invest
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '*',
      redirect: { name: 'Deposit' }
    },
  ]
})
