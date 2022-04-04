import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from '../views/Layout/Header.vue'
import AHeader from '../views/Layout/AHeader.vue'
import Home from '../views/Home/Home.vue'
import EditGoods from '../views/Admin/EditGoods.vue'
import EditOrder from '../views/Admin/EditOrder.vue'

const Center = () => import('../views/Center/Center.vue')
const GoodsDetail = () => import('../components/GoodsDetail.vue')
const GoodsList = () => import('../views/GoodsList/GoodsList.vue')
const Cart = () => import('../views/Cart/Cart.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Header,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/center',
        name: 'center',
        component: Center
      },
      {
        path: '/goodsList',
        name: 'goodsList',
        component: GoodsList
      },
      {
        path: '/cart',
        name: 'cart',
        component: Cart
      },
    ]
  },

  {
    path: '/goodsDetail/:gid',
    name: 'goodsDetail',
    component: GoodsDetail
  },

  {
    path: '',
    name: '',
    component: AHeader,
    children: [
      {
        path: '/editGoods',
        name: 'editGoods',
        component: EditGoods,
      },
      {
        path: '/editOrder',
        name: 'editOrder',
        component: EditOrder,
      },  
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
