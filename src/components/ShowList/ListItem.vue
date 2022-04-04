<template>
  <div class="imgItem">
      <div class="imgDiv">
        <img :src="imgItem.img" @click="itemClick">
      </div>

       <div class="imgInfo" >
           <el-link @click="itemClick">
                <p>{{imgItem.name}}</p>
                <span>{{imgItem.price}}￥</span>
           </el-link>
      </div>  
       <!-- <el-card :body-style="{ padding: '0px' }">
           <div class="imgDiv">
                <img :src="imgItem.img" class="image" @click="itemClick">
           </div>
            <div style="padding: 14px;">
                <span>{{imgItem.name}}</span>
                <div class="bottom clearfix">
                    <time class="time">{{imgItem.price}}￥</time>
                </div>
            </div>
        </el-card> -->
  </div>
  
</template>

<script>
import GoodsDetail from '../GoodsDetail'


export default {
    name:"ListItem",
    components:{
        GoodsDetail,
    },

    props: {
        imgItem:{
            type: Object,
            default() {
                return {}
            }
        },
    },

    methods: {
        itemClick() {
            let routeData = this.$router.resolve({
                path: '/GoodsDetail/' + this.imgItem.gid,
            })
            window.open(routeData.href, '_blank')
        },
    }
}
</script>

<style scoped>
      .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }




    .imgItem{
        position: relative;
        margin-top: -9%;
        margin-left: 10px;
        width: 18%;
        height: 300px;
    }

    .imgDiv {
        float: left;
        border: 1px solid red;
        margin: 10px;
        position: relative;
        width: 100%;
        height: 50%;
    }

    .imgDiv img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        background-size: cover !important;
    }


    .imgInfo{
        position: relative;
        border-radius: 0% 0% 6% 6%;
        float: left;
        font-size: 18px;
        margin-left: 10px;
        top: -3%;
        width: 101%;
        line-height: 18px;
        text-align: center;
        background: rgb(255, 255, 255);   
    }


    .imgInfo p{
        margin: 0%;
        overflow: hidden;
        
        text-overflow: ellipsis;
        margin-bottom: 3px;
    }


    .imgInfo span{
        display: flex;
        color: rgb(255, 0, 0);
        justify-content: space-around;
    }

</style>