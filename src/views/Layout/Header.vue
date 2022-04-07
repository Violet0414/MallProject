<template>
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <div class="logoDiv"></div>
          </div>
        </el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-link @click="linkHome">首页</el-link>
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-link @click="linkGoods">商城</el-link>
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-link @click="linkCart">购物车</el-link>
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-link @click="linkOrders">订单</el-link>
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-link @click="linkCenter">个人中心</el-link>
        </div></el-col>
        <div class="userDiv">
          <div class="uImg"></div>
          您好，{{userinfo.name}}
          <li class="el-icon-switch-button" @click="exit" style="margin-left: 5px"></li>
        </div>
      </el-row>
      <router-view></router-view>
    </div>
    
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'Header',
    computed: {
      ...mapState('loginModule', ['userinfo'])   
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
      ...mapMutations('loginModule', ['clearUser']),
      exit() {
        console.log('退出');
         this.$confirm('是否退出系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 情况vuex和本地数据，跳转至登录界面
          this.clearUser();
          localStorage.removeItem('user')
          this.$router.push('/login')
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
          }); 
        })
      },

      linkHome() {
        console.log('首页被点击')
        this.$router.push('/home')
      },

      linkGoods() {
          console.log('商城被点击')
          this.$router.push('/goodsList')
      },

      linkCenter() {
          console.log('个人中心被点击')
          this.$router.push('/center')
      },

      linkCart() {
        console.log('购物车被点击')
        this.$router.push('/cart')
      },

      linkOrders() {
        console.log('订单被点击')
        this.$router.push('/myOrders')
      }
    }
};
</script>

<style scoped>
    .header {
      position: relative;
      background-color: #ffffff;
      color: rgb(255, 255, 255);
      text-align: center;
      line-height: 55px;
      
      border: 1px solid rgb(235, 235, 235);
      border-radius: 10px 10px 10px 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .userDiv {
      position: absolute;
      color: black;
      right: 5%;
      top: 5%;
    }

    .uImg {
      position: relative;
      float: left;
      margin-top: 8%;
      right: 5%;
      height: 30px;
      width: 30px;
      background-image: url('../../assets/user.png');
      background-size: cover;
      border-radius: 100%;
      /* border: 1px solid; */
    }

    .el-row {
      margin: auto;
    }

    .logoDiv {
      position: relative;
      margin-left: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      height: 60px;
      width: 60px;
      background-image: url("../../assets/logo.png");
      background-size: cover;
    }

    .el-link.el-link--default {
      font-size: 16px;
    }


</style>