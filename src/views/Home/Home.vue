<template>
  <div class="outDiv">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="test">
    </div>
    <div class="test2">
    </div>
    <h2 style="text-align: center; color: black;">特价商品</h2>
    <div class="lowDiv">
      <LowPrice></LowPrice>
    </div>
    <h2 style="text-align: center; color: black;">好物推荐</h2>
    <div class="belowDiv">
      <ShowRecommend></ShowRecommend>
    </div>
    <el-footer>Footer</el-footer>

  </div>
</template>

<script>


import LowPrice from './LowPrice.vue'
import ShowRecommend from './ShowRecommend.vue'

export default {
  components: {
    LowPrice,
    ShowRecommend,
  },

  methods: {
    
  }
}
</script>

<style scoped>
  .test {
    position: absolute;
    background-image: url('../../assets/test.png');
    background-size: cover;
    height: 200px;
    width: 200px;
    margin-top: 15px;
  }

  .test2 {
    position: absolute;
    background-image: url('../../assets/test.png');
    background-size: cover;
    height: 200px;
    width: 200px;
    margin-left: 85%;
    margin-top: 15px;
  }

  .outDiv {
    margin-top: 1%;
    margin: auto;
    height: 100%;
    width: 100%;
    position:absolute;
  }

  .belowDiv {
    width: 90%;
    margin-left: 7%;
    height: 250px;
    margin-top: 10%;
  }

  .lowDiv {
    width: 85%;
    height: 250px;
    margin: auto;
    position: relative;
    margin-top: -2%;
  }

  .second {
    width: 85%;
    height: 350px;
    margin: 1%;
    background-color: antiquewhite;
    position: relative;
    margin-top: 0%;
    float: left;
  }

  .itemDiv {
    height: 39%;
  }


/* 轮播图背景 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    background-image: url('../../assets/item1.jpg');
    background-size: cover;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    background-image: url('../../assets/item2.jpg');
    background-size: cover;
  }



/* 页面布局背景 */
  .el-footer {
    position: relative;
    background-color: #a0c8fd;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 100%;
  }
  
  
  

</style>