<template>
  <div>
      <PersonalCenter  :userData="userData" :tableName="tableName"></PersonalCenter>
      <!-- <Upload></Upload> -->
  </div>
</template>

<script>
import PersonalCenter from '../../components/Personal/PersonalCenter'

export default {
    components: {
        PersonalCenter,
        // Upload,
    },
    data() {
        return {
            userData: [],
            number:'',
            tableName: 'users',
        }
    },

    created() {
      this.http(1)
    },

    methods: {
      // 分页, 绑定信息
      http(){
        this.$api.getCenter({
          uid: 666,
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