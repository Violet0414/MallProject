<template>
  <div class="outside">

    <el-tabs>
        <el-tab-pane label="个人信息">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content bg-purple" v-if="!!userData[0]">
                账号：{{userData[0].uid}}  
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="200">
            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">姓名：{{userData[0].name}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changeName"></el-button>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">性别：{{userData[0].sex}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changeSex"></el-button>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="200"> 
            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">
                手机号：{{userData[0].phone}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changePhone"></el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" v-if="!!userData[0]">地址：{{userData[0].address}}
                <el-button class="editBtn" icon="el-icon-edit" @click="changeAddress"></el-button>
              </div>
            </el-col>
          </el-row>
          <ChangeMessage 
            :tableName="tableName" 
            :nDialog='nDialog' 
            :aDialog="aDialog" 
            :pDialog="pDialog" 
            :sDialog="sDialog" 
            @changeDialog="changeDialog">
          </ChangeMessage>  
          
        </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-row :gutter="150">
          <div>
            <ChangePassword :tableName="tableName"></ChangePassword>
           
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue' 
import ChangeMessage from './ChangeMessage.vue'


export default {
  components: {
    ChangePassword,
    ChangeMessage
  },

  props: {
    userData: {
      type: Array,
      default() {
        return ''
      }
    },
    tableName: {
        type: String,
        default() {
          return ''
        }
      },
  },
  data() {
    return {
      nDialog: false,
      sDialog: false,
      aDialog: false,
      pDialog: false,
      eDialog: false,
      // tableName: 'users'
    }
  },


  methods: {
    // 修改弹窗状态
    changeDialog(){
      this.nDialog = false;
      this.sDialog = false;
      this.aDialog = false;
      this.pDialog = false;
      console.log('changeDialog()事件接收了！')
    },


    changeName() {
      this.nDialog = true
    },

    changeSex() {
      this.sDialog = true
    },

    changeAddress() {
      this.aDialog = true
    },

    changePhone() {
      this.pDialog = true
    },

  }
}
</script>

<style scoped>
  .outside {
    position: absolute;
    margin-top: 5px;
    width: 100%;
    text-align: left;
  }

  .el-row {
    margin-bottom: 20px;
    color: black;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    padding: 1px;
    margin: auto;
  }

  .editBtn {
      height: 5% !important;
			width: 12% !important;
			border-radius: 5px !important;
			background-color:transparent !important;
			border: 0 !important;
			outline:none !important;
			-webkit-background-size:cover !important;
      -moz-background-size: cover !important;
      -o-background-size: cover !important;
      background-size: cover !important;
  }

  .el-tabs__item {
    font-size: 10px !important;
  }
</style>