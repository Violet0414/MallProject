<template>
    <div class="list">
      <!-- 绑定数据 -->
      <ListItem v-for="item in commentList" :key="item.id" :cItem="item"></ListItem>    
    </div>
</template>
  
  <script>
  import ListItem from './CommentItem.vue'
  
  
  export default {
    name: "List",
    data() {
      return {
        // commentList: '',
      };
    },
    
    components: {
      ListItem
    },
  
    props: {
      commentList:{
        type: Array,
        default(){
          return []
        }
      },
    },

    created() {
      // this.commentList = this.commentList;
      // console.log('==++++++', this.commentList)
    },

    mounted() {
      // console.log('commentList:::',this.commentList)
    }
  }
  </script>
  
  <style scoped>
    .list{
      position: relative;
    }
  </style>