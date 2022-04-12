import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index'
import './plugins/element.js'
import './utils/localStorage' // 持久化

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video


import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);




// 导出excel表
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)



Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
