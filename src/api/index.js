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

    // 更新销量
    updateSales(params) {
        return axios.get(base.updateSales, {
            params 
        })
    },

    // 查询库存
    selectStock(params) {
        return axios.get(base.selectStock, {
            params 
        })
    },

    // 更新库存
    updateStock(params) {
        return axios.get(base.updateStock, {
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

    // 查询商品是否在购物内
    selectCart(params) {
        return axios.get(base.selectCart, {
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

    // 个人订单查看
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

    // 搜索个人订单
    searchMyorders(params) {
        return axios.get(base.searchMyorders, {
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


// =================================== 用户管理部分 ===================================  

    // 管理员获取评论表
    editComments(params) {
        return axios.get(base.editComments, {
            params 
        })
    },

    // 管理员获取用户表
    editUsers(params) {
        return axios.get(base.editUsers, {
            params 
        })
    },

    // 删除用户
    delUser(params) {
        return axios.get(base.delUser, {
            params 
        })
    },

    // 删除评论
    delComment(params) {
        return axios.get(base.delComment, {
            params 
        })
    },

    // 搜索用户
    searchUser(params) {
        return axios.get(base.searchUser, {
            params 
        })
    },

    // 搜索评论
    searchComment(params) {
        return axios.get(base.searchComment, {
            params 
        })
    },
    
    // 提交反馈
    addFeedback(params) {
        return axios.get(base.addFeedback, {
            params 
        })
    },

    // 获取反馈
    editProposal(params) {
        return axios.get(base.editProposal, {
            params 
        })
    },

    // 删除反馈
    delProposal(params) {
        return axios.get(base.delProposal, {
            params 
        })
    },

    // 获取各种总数
    getNum(params) {
        return axios.get(base.getNum, {
            params 
        })
    },

    // 获取总利润
    getProfit(params) {
        return axios.get(base.getProfit, {
            params 
        })
    },

    // 获取总额
    getSales(params) {
        return axios.get(base.getSales, {
            params 
        })
    },  

}

export default api
