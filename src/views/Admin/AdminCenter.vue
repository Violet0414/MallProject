<template>
  <div>
      <PersonalCenter  :userData="userData" :tableName="tableName"></PersonalCenter> 
  </div>
</template>

<script>
import PersonalCenter from '../../components/Personal/PersonalCenter'
import store from '../../store/index'

export default {
    components: {
        PersonalCenter,
    },


      


    data() {
        return {
            userData: [],
            number:'',
            tableName: 'admin',
        }
    },

    created() {
      this.http(1)
    },

    methods: {
      
      // 分页, 绑定信息
      http(){
        this.$api.getCenter({
          uid: store.state.loginModule.userinfo.uid,
          tableName: 'admin',
        }).then(res => {
          console.log('res.data:', res.data);
          if(res.status == 200){
            this.userData = res.data.data;        // 数据列表绑定
          }
        })
      },
    }   
}
</script>

<style>

</style>