/**
 * 请求的方法
 */

// import axios from 'axios'
import base from './base'
//node>js 
const qs = require('querystring')
//导入二次封装的axios文件
import axios from '../utils/request'




//axios接口配置基础地址
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
//http://localhost:8888 

const api = {
    // 登录接口
    getLogin(params) {
        return axios.post(base.login, params)
    },

    // 注册接口
    register(params) {
        return axios.get(base.register, {
            params
        })
    },

    // 获取个人信息
    getCenter(params) {
        return axios.get(base.getCenter, {
            params 
        })
    },

    
    // 修改个人信息
    changeMessage(params) {
        console.log('parmas:',params)
        return axios.get(base.changeMessage, {
            params 
        })
    },

// =================================== 商城部分 ===================================

    // 展示商品
    showGoods(params) {
        return axios.get(base.showGoods, {
            params 
        })
    },


    // 特殊商品
    specialGoods(params) {
        return axios.get(base.specialGoods, {
            params 
        })
    },

    
    // 搜索商品
    getSearch(params) {
        return axios.get(base.getSearch, {
            params 
        })
    },



// =================================== 购物车部分 ===================================

    addCart(params) {
        return axios.get(base.addCart, {
            params 
        })
    },

    delCart(params) {
        return axios.get(base.delCart, {
            params 
        })
    },


    // 获取购物车商品
    getCart(params) {
        return axios.get(base.getCart, {
            params 
        })
    },

// =================================== 订单部分 ===================================

    // 结算生成订单
    addOrder(params) {
        return axios.get(base.addOrder, {
            params 
        })
    },

    // 管理员展示订单
    showOrders(params) {
        return axios.get(base.showOrders, {
            params 
        })
    },

    // 管理员删除订单
    delOrder(params) {
        return axios.get(base.delOrder, {
            params 
        })
    },

    myOrders(params) {
        return axios.get(base.myOrders, {
            params 
        })
    },

    // 查询订单
    searchOrder(params) {
        return axios.get(base.searchOrder, {
            params 
        })
    },

    // 更改订单状态
    changeOrder(params) {
        return axios.get(base.changeOrder, {
            params 
        })
    },

// =================================== 商品部分 ===================================

    // 商品详情
    goodsDetail(params) {
        return axios.get(base.goodsDetail, {
            params 
        })
    },


    // 修改商品信息
    updateGoods(params) {
        return axios.get(base.updateGoods, {
            params 
        })
    },


    // 添加商品
    addGoods(params) {
        return axios.get(base.addGoods, {
            params 
        })
    },


    // 删除商品
    delGoods(params) {
        return axios.get(base.delGoods, {
            params 
        })
    },


    // 展示评论
    showComments(params) {
        return axios.get(base.showComments, {
            params 
        })
    },


    // 添加评论
    addComments(params) {
        return axios.get(base.addComments, {
            params 
        })
    },


}

export default api
