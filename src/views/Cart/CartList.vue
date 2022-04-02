<template>
  <div>
    <cart-list-item v-for="item in cartList" 
    :key="item.iid" 
    :item-info="item"
    @sumPrice="sumPrice"></cart-list-item>
  </div>
</template>

<script>
  // import Scroll from 'common/scroll/Scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  CartListItem
    },

    data() {
      return {
        sum: 0
      }
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },

    mounted() {
      console.log('cartList:', this.cartList)
    },

    methods: {
      sumPrice(sumPrice) {
        this.sum = sumPrice
        console.log('爷爷组件接受到sumPrice:', this.sum)
        this.$emit('sumPrice', sumPrice)
      }
    },
	}
</script>

<style scoped>

</style>
