<template>
  <div class="outDiv">
    <el-container style="height: 100%">
      <div class="main">

        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 3" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>

        <div class="lowDiv">
          <LowPrice></LowPrice>
        </div>

        <div class="belowDiv">
          <ShowRecommend></ShowRecommend>
        </div>

      </div>
      <el-footer>Footer</el-footer>
    </el-container>
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

<style>
  .outDiv {
    top: 10;
    left: 0;
    height: 100%;
    width: 100%;
    position:absolute;
  }

  .belowDiv {
    width: 85%;
    height: 250px;
    margin: auto;
    /* background-color: antiquewhite; */
    position: relative;
    margin-top: 10%;
  }

  .lowDiv {
    width: 85%;
    height: 250px;
    margin: auto;
    /* background-color: antiquewhite; */
    position: relative;
    margin-top: 0%;
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


/* 轮播图背景 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }


/* 页面布局背景 */
  .el-footer {
    position: relative;
    margin-top: 80%;
    background-color: #a0c8fd;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 100%;
  }
  
  .main {
    position: relative;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100% !important;
  }
  

</style>