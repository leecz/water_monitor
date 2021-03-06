// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'

Vue.config.productionTip = false
import timeFormater from './plugins/timeFormater'
Vue.use(timeFormater)

import echartResize from './plugins/echartResize'
Vue.use(echartResize)

import scrollToFixed from './plugins/scrollToFixed'
Vue.use(scrollToFixed)

import { Table, TableColumn } from 'element-ui'
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
