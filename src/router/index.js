import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from '../views/Layout/Header.vue'
import AHeader from '../views/Layout/AHeader.vue'
import Login from '../components/Login.vue'
import Home from '../views/Home/Home.vue'
import AHome from '../views/Home/AHome.vue'
import EditGoods from '../views/Admin/EditGoods.vue'
import EditOrder from '../views/Admin/EditOrder.vue'

const AdminCenter = () => import('../views/Admin/AdminCenter.vue')
const Center = () => import('../views/Center/Center.vue')
const GoodsDetail = () => import('../components/GoodsDetail.vue')
const GoodsList = () => import('../views/GoodsList/GoodsList.vue')
const Cart = () => import('../views/Cart/Cart.vue')
const MyOrders = () => import('../views/Cart/MyOrders.vue')
const EditComment = () => import('../views/Admin/EditComment.vue')
const EditUsers = () => import('../views/Admin/EditUser.vue')



Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'login',
    component: Login,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/goodsDetail/:gid',
    name: 'goodsDetail',
    component: GoodsDetail
  },

  {
    path: '/home',
    component: Header,
    meta: {
      isLogin: true
    },
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
      {
        path: '/myOrders',
        name: 'myOrders',
        component: MyOrders
      },
    ]
  },

  {
    path: '/home',
    component: AHeader,
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/aHome',
        name: 'aHome',
        component: AHome,
      },
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
      {
        path: '/adminCenter',
        name: 'adminCenter',
        component: AdminCenter,
      },
      {
        path: '/editComment',
        name: 'editComment',
        component: EditComment,
      },
      {
        path: '/editUsers',
        name: 'editUsers',
        component: EditUsers,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})


// ??????vuex??????
import store from '../store/index'

router.beforeEach((to, from, next) => {
  console.log('????????????', to)
  
  if(to.matched.some(ele => ele.meta.isLogin)) {
    // ??????????????????????????????
    let token = store.state.loginModule.userinfo.token;
    if(token) {
      next()
    }else{
      next('/login')
    }
  }else{
    next();
    console.log('1111111')
  }
})

export default router
