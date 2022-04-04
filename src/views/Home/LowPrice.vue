<template>
  <div class="lowDiv">
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
      console.log('specialGoods执行1')
       this.$api.specialGoods({
          page,
          type: 0
        }).then(res => {
          console.log(res.data);
          console.log("imgList:", this.imgList)
          if(res.status == 200){
            this.imgList = res.data.data
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        })
    },
  },

  created() {
    this.specialGoods(1);
  },
}
</script>

<style scoped>
  .lowDiv {
    position: relative;
    top: 33%;
  }
</style>