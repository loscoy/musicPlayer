// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './VueX/store'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Toast from "muse-ui-toast";
import AtComponents from 'at-ui'
import 'at-ui-style'

const ToastOption = {
  position: 'bottom',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: '',               // 关闭的图标
  close: false,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
}

Vue.use(ElementUI)
Vue.use(MuseUI);
Vue.use(Toast,ToastOption)
Vue.use(AtComponents)

Vue.prototype.$axios = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
