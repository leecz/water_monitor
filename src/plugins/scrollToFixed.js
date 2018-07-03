import './scrollToFixed.css'

const throttle = require('lodash/throttle')
const FIX_CLASS = 'fixed-top'
const HANDLER = '_vue_scroll_fixed_handler'

function bind(el, binding) {
  unbind(el)
  el[HANDLER] = throttle(function() {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    let offsetTop = el.offsetTop
    if (scrollTop > offsetTop) {
      el.classList.add(FIX_CLASS)
    } else {
      el.classList.remove(FIX_CLASS)
    }
  }, 50)
  window.addEventListener('scroll', el[HANDLER])
}

function unbind(el) {
  window.removeEventListener('scroll', el[HANDLER])
}

export default {
  install(Vue) {
    Vue.directive('onScrollToFixed', {
      bind,
      unbind
    })
  }
}
