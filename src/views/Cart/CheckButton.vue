<template>
  <div>
    <el-checkbox 
      v-model="checked"
      :lable= "this.itemGid"
      @change="change">
    </el-checkbox>
    <el-button type="danger" icon="el-icon-delete" circle class="delBtn" @click="delCart"></el-button>
  </div>
</template>

<script>
import store from '../../store/index'

export default {
  inject: ['reload'],

  data() {
    return {
      checked: false,
      sumPrice: 0,
      sunNum: '',
    }
  },

  props: ['itemGid', 'itemName', 'itemPrice', 'num'],


  methods: {
    change() {
      this.sumPrice = this.itemPrice * this.num
      this.sumNum = this.num
    
      this.$emit('sumPrice', this.itemGid, this.sumPrice, this.itemName, this.sumNum, this.checked)
    },


    delCart() {
      console.log(this.itemGid)
      this.$confirm('此操作将移除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delCart({
            gid: this.itemGid,
            uid: store.state.loginModule.userinfo.uid,
          }).then(res => {
            if(res.data.status === 200) {
                this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.reload()                  // 更新视图
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }


  }

  

}
</script>

<style scoped>
  .delBtn {
    position: absolute;
    margin-left: 95%;
    margin-top: 3%;
  }
</style>