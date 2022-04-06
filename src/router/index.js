import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from '../views/Layout/Header.vue'
import AHeader from '../views/Layout/AHeader.vue'
import Login from '../components/Login.vue'
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
    path: '/login',
    name: 'login',
    component: Login,
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
        path: '/goodsDetail/:gid',
        name: 'goodsDetail',
        component: GoodsDetail
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


// 获取vuex数据
import store from '../store/index'

router.beforeEach((to, from, next) => {
  console.log('路由守卫', to)
  
  if(to.matched.some(ele => ele.meta.isLogin)) {
    // 判断当前用户是否登录
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
