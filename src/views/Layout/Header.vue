<template>
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="3"><div class="grid-content bg-purple">
          <el-link @click="linkHome">图</el-link>
        </div></el-col>
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
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-link>特价</el-link>
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
      background-color: #e6e6e6;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
</style>