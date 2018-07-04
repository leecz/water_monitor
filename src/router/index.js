import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import WaterMonitor from '@/pages/WaterMonitor'
import StatMain from '@/pages/TableMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/jiaoxi',
      component: WaterMonitor
    },
    {
      path: '/stat',
      component: StatMain
    }
  ]
})
