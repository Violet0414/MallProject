<template>
  <div class="list">
    <!-- 绑定数据 -->
    <ListItem v-for="item in imgList" :key="item.id" :imgItem="item"></ListItem>    
  </div>
  
</template>

<script>
import ListItem from './ListItem.vue'


export default {
  name: "List",
  
  components: {
    ListItem
  },

  props: {
    imgList:{
      type: Array,
      default(){
        return []
      }
    },
  },

  data () {
      return {
        
      }
    },


    methods: {

    }
}
</script>

<style scoped>
  .list{
    display: flex;
    flex-wrap: wrap;
  }
</style>