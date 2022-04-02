<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :itemPrice="itemPrice" @sumPrice="sumPrice" :num="num"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.img" alt="商品图片">
    </div>

    <div class="item-info">
      <div class="item-title">{{itemInfo.name}}</div>
      <div class="item-desc">商品描述: {{itemInfo.introduction}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
      </div>
    </div>

    <el-input-number class="numSelect" size="small" v-model="num"></el-input-number>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

  export default {
    name: "ShopCartItem",
    data() {
      return {
        itemPrice: this.itemInfo.price,
        num: 1,
        sum: 0,
      }
    },

    props: {
      itemInfo: Object
    },
    components: {
      CheckButton
    },


    created() {
      // console.log('itemInfo:', this.itemInfo)
    },

    methods: {
      sumPrice(sumPrice) {
        this.sum = sumPrice + this.sum
        console.log('父组件接受到sumPrice:', this.sum)
        this.$emit('sumPrice', sumPrice)
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title {
    overflow: hidden;
    white-space: nowrap;
  }

  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 100px;
    height: 130px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    display: flex;
    justify-content: left;
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    width: 60%;
  }

  .item-info .item-desc {
    position: absolute;
    font-size: 14px;
    color: #666;
    margin-top: 9%;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    /* bottom: 10px; */
    /* left: 10px; */
    /* right: 10px; */
  }

  .info-bottom .item-price {
    color: orangered;
    margin-top: 30%;
    /* margin-bottom: 50%; */
    /* margin-right: 10%; */
  }

  .numSelect {
    margin-top: 8%;
  }
</style>
