/**
 * @file 入口文件
 * @author sunbai
 */

import Vue from 'vue';
import Main from './pages/main.vue'

const vm = new Vue({
    // 根的操作，指定一下往id为app的div上挂
    el: '#app',
    // 渲染main到app上
    render: h => h(Main)
});


