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

    .imgItem{
        position: relative;
        margin-top: -8%;
        margin-left: 10px;
        width: 18%;
        height: 300px;
    }

    .imgDiv {
        position: relative;
        float: left;

        border: 1px solid rgb(235, 235, 235);
        border-radius: 10px 10px 0% 0%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        
        background-color: rgb(255, 255, 255);
        margin: 10px;
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
        /* border: 0.5px solid #a9a9a9; */
        border-radius: 0% 0% 10px 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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