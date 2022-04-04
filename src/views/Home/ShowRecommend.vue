<template>
  <div class="recDiv">
    <GoodsList :imgList="imgList"></GoodsList>
  </div>
</template>

<script>

import GoodsList from '../../components/ShowList/List.vue'

export default {
  components: {
    GoodsList,
  },

  data() {
    return {
      imgList: [],
    }
  },

  methods: {
    specialGoods(page) {
      console.log('specialGoods执行')
       this.$api.specialGoods({
          page,
          type: 1
        }).then(res => {
          if(res.status == 200){
            this.imgList = res.data.data
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        })
    }
  },

  created() {
    this.specialGoods(1);
  },
}
</script>

<style scoped>
  .recDiv {
    position: relative;
    top: 38%;
    margin-top: -10%;
  }
</style>