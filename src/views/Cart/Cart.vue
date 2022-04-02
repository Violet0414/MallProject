<template>
  <div class="outside">
    <CartList :cartList="cartList" @sumPrice="sumPrice"></CartList>
    <div class="totalPrice">总价:{{totalPrice}}￥</div>
    <MyPage :total="total" :pageSize="pageSize" 
    @changePage="changePage" class="page" :current-page="currentPage"></MyPage>
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
      sum: 0
    };
  },

  computed: {
    totalPrice: function() {
      return parseFloat(this.sum).toFixed(2) 
      
    }
  },

  created() {
    this.getCart(1);
  },


  methods: {
    sumPrice(sumPrice) {
        this.sum = sumPrice + this.sum
        console.log('祖爷爷组件接受到sumPrice:', this.sum)
      },

    getCart(page) {
      console.log('getCart执行=================')
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
  
  .totalPrice {
    position: fixed;
    font-size: 20px;
    color: red;
    left: 88%;
    top: 90%;
    /*  */
  }

</style>