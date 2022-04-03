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
  inject: ['reload'],

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
      
      sum: 0,       // 总价
      byte: '',     // 清单字节
      gList: [],    // 清单
      idList: [],   // 选中的商品id
    };
  },

  computed: {
    totalPrice: function() {
      return parseFloat(this.sum).toFixed(2) 
    },

    totalNum: function() {
      return this.gList.join(",");
    },

    totalId: function()  {
      return this.idList.join(",")
    }
  },

  created() {
    this.getCart(1);
  },


  methods: {
    sumPrice(itemGid, sumPrice, itemName, sumNum, checked) {
      this.byte = itemName + '×' + sumNum
      if(checked === true){
        this.sum = this.sum + sumPrice
        this.gList = this.gList.concat(this.byte)
        this.idList = this.idList.concat(itemGid)
      } else {
        this.sum = this.sum - sumPrice
        this.gList.splice(this.gList.indexOf(this.byte), 1);
        this.idList.splice(this.idList.indexOf(itemGid), 1);
      }
      console.log('itemGid:', itemGid)
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
        // console.log("cartList:", this.cartList)
      })
    },

    settlement() {
      console.log('结算')
      console.log('结算ID:', this.idList)
      console.log('结算清单:', this.totalNum, this.totalPrice)
      console.log('======')
      
      this.$api.addOrder({
        uid: 666,
        address: '测试地址',

        gid: this.idList,
        detail: this.totalNum,
        prcie: this.totalPrice,
      })
      .then((res) => {
      if(res.status == 200){
          console.log('订单生成完毕')
          this.$api.delCart({
            uid: 666,
            gid: this.idList,
          }).then((res) => {
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '结算成功'
              })
              setTimeout(() => {
                this.reload()
              }, 700);
            }
          })
      }else {
          this.$message.error('结算失败');
          return false; 
          }
      });
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