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
          <el-link @click="linkCenter">个人中心</el-link>
        </div></el-col>
      </el-row>
      <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    name: 'Header',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
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