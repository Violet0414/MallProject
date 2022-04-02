<template>
  <div>
    <el-checkbox 
      v-model="checked"
      @change="change">
    </el-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: null,
      checkedPrice: 0,
      sumPrice: 0
    }
  },

  props: ['itemPrice', 'num'],


  methods: {
    change() {
      console.log('itemPrice:', this.itemPrice)
      console.log('num:', this.num)
      if(this.checked === true) {
        this.sumPrice = this.itemPrice * this.num
      } else {
        this.sumPrice = -1 * this.itemPrice * this.num 
      }
      this.$emit('sumPrice', this.sumPrice)
    },


  }

  

}
</script>

<style>

</style>