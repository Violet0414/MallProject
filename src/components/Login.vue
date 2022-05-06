<template>
  <div class="outDiv">

    <div class="loginDiv">
      <div class="imgDiv">
      </div>
      <el-form 
      :model="ruleForm" 
      status-icon 
      :rules="rules" 
      ref="ruleForm" 
      label-width="60px" 
      class="form">
        <el-form-item label="账号" prop="uid">
          <el-input type="text" v-model="ruleForm.uid" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <div class="radioDiv">
          <el-radio v-model="type" label="0">用户登录</el-radio>
          <el-radio v-model="type" label="1">管理员登录</el-radio>
        </div>
        <Dialog ref="dialog"></Dialog>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="regBtn" type="warning" @click="register()">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import jwt from 'jwt-decode';
import {mapMutations} from 'vuex'
import Dialog from './Register.vue'

 export default {
   components: {
     Dialog,
   },
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        type: null,        // 登录人员身份控制
        ruleForm: {
          uid: '',
          pwd: '',
        },
        rules: {
          uid: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePwd, trigger: 'blur' }
          ],
        }
      };
    },

    methods: {
      register() {
        this.$refs.dialog.dialogVisible = true;
      },

      ...mapMutations('loginModule', ['setUser']),
      submitForm(formName) {
        if(this.type === null) {
          this.$message({
            type: 'error',
            message: '请选择登录身份'
          })
        }else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('校验通过', this.ruleForm)
              let {uid, pwd} = this.ruleForm;
              this.$api.getLogin({
                uid,
                pwd,
                type: this.type
              }).then(res => {
                console.log('返回数据：', res.data)
                if(res.data.status === 200){
                  console.log(jwt(res.data.data))
                  // 数据存储
                  let obj = {
                    uid: jwt(res.data.data).uid,
                    name: jwt(res.data.data).name,
                    address: jwt(res.data.data).address,
                    token: res.data.data,
                    type: this.type,
                  }
                  console.log(obj);
                  this.setUser(obj)
                  // 存储至本地
                  localStorage.setItem('user', JSON.stringify(obj))
                  if(this.type == 1) {
                    this.$router.push('/aHome')
                  }else{
                    this.$router.push('/home')
                  }
                }else{
                  this.$message({
                    type: 'error',
                    message: '账号或密码输入错误'
                  })
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }

      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

  .outDiv {
    position: fixed;
    background-image: url('../assets/demo1.jpg');
    background-size: cover;
    overflow: hidden;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
  }

  .loginDiv {
    width: 470px;
    height: 320px;
    margin: 150px auto;
    border-radius: 15px;
    border: 1px solid rgb(193, 193, 193);
    background-color: aliceblue;
  }

  .imgDiv {
    position: absolute;
    height: 100px;
    width: 100px;
    left: 46%;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(193, 193, 193);
    border-radius: 100%;
    background-image: url('../assets/logo.png');
    background-size: cover;
    top: 17%
  }

  .form {
    position: absolute;
    top: 35%;
    left: 35%;
    /* transform: translate(-50%, -30%); */
  }

  .radioDiv {
    position: relative;
    padding-bottom: 7%;
    left: 37%;
  }

  .el-input {
    width: 150% !important;
  }

  .el-button {
    position: absolute;
    margin-left: 100%;
  }

  .regBtn {
    position: absolute !important;
    left: 47.5%;
  }

</style>>
  