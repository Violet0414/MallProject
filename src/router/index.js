import Vue from 'vue'
import VueRouter from 'vue-router'


import Header from '../views/Layout/Header.vue'
import Home from '../views/Home/Home.vue'
import EditGoods from '../views/Admin/EditGoods.vue'

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
    path: '/editGoods',
    name: 'editGoods',
    component: EditGoods,
    children: [
      {
        path: '/editGoods',
        name: 'editGoods',
        component: EditGoods,
      }  
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
