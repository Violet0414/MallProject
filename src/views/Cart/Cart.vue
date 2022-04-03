<template>
  <div class="outside">
    <div class="foot">
      <div class="totalPrice">
        清单：{{totalNum}}
        合计:{{totalPrice}}￥
        <el-button type="danger" round class="tBtn" @click="settlement">结算</el-button>
      </div>
    </div>
    <CartList :cartList="cartList" @sumPrice="sumPrice"></CartList>
    <MyPage :total="total" :pageSize="pageSize" @changePage="changePage" class="page" :current-page="currentPage"></MyPage>
    
  </div>
  
</template>

<script>
import CartList from './CartList'
import MyPage from '../../components/MyPage.vue'

export default {
  name: 'Cart',
  components: {
    CartList,
    MyPage,
  },

  data() {
    return {
      cartList: [],
      currentPage: 1,
      total: 5,
      pageSize: 1,
      
      sum: 0,
      byte: '',
      gList: [],
    };
  },

  computed: {
    totalPrice: function() {
      return parseFloat(this.sum).toFixed(2) 
    },

    totalNum: function() {
      return this.gList.join(",");
    }
  },

  created() {
    this.getCart(1);
  },


  methods: {
    sumPrice(sumPrice, itemName, sumNum, checked) {
      this.byte = itemName + '×' + sumNum
      if(checked === true){
        this.sum = this.sum + sumPrice
        this.gList = this.gList.concat(this.byte)
      } else {
        console.log('sumNum:', sumNum)
        this.sum = this.sum - sumPrice
        console.log("byte:", this.byte)
        console.log("this.gList.indexOf(this.byte):", this.gList.indexOf(this.byte))
        this.gList.splice(this.gList.indexOf(this.byte), 1);
      }
      // console.log('祖爷爷组件接受到sumPrice:', this.sum, " itemName:", itemName, "sumNum:", this.sumNum, checked)
    },

    // 购物车数据绑定
    getCart(page) {

      this.$api.getCart({
        page,
        uid: 666
      }).then(res => {
        if(res.status == 200){
          this.cartList = res.data.data
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
        }
        console.log(res.data);
        console.log("cartList:", this.cartList)
      })
    },

    settlement() {
      console.log('结算')
    },

    // 页面改变
    changePage(num) {
        this.currentPage = num
        this.pageSize = this.pageSize;
        this.getCart(num);                //列表分页
    },

  },
};
</script>

<style scoped>
  .outside {
    width: 85%;
    position:absolute;
  }

  .foot {
    position: fixed;
    width: 80%;
    height: 50px;
    bottom: 2px;
    left: 50%;
    margin-left:-40%;
    background-color: rgb(255, 255, 255);
    border: 1px solid;
    border-radius: 30px;
    z-index: 9;
  }
  
  .totalPrice {

    font-size: 20px;
    color: red;
    left: 88%;
    top: 90%;
  }

  .tBtn {
    position: absolute;
    top: 15%;
    right: 10%;
  }

</style>