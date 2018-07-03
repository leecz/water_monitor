import echarts from 'echarts'

const HANDLER = '_vue_echarts_resize_handler'
function bind(el, binding) {
  unbind(el)
  el[HANDLER] = function() {
    let chart = echarts.getInstanceByDom(el)
    if (!chart) {
      return
    }
    chart.resize()
  }
  window.addEventListener('resize', el[HANDLER])
}

function unbind(el) {
  window.removeEventListener('resize', el[HANDLER])
}

var directive = {
  bind: bind,
  unbind: unbind
}

export default {
  install(Vue) {
    Vue.directive('onEchartResize', directive)
  }
}
