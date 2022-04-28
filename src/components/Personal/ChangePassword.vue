<template>
    <div class="formDiv">
        <el-form label-position="right" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="旧密码：" label-width="200px" prop="opwd">
                <el-input v-model="form.opwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" label-width="200px" prop="npwd">
                <el-input v-model="form.npwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" label-width="200px" prop="cpwd">
                <el-input v-model="form.cpwd" type="password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" class="subbtn" @click="onSubmit('form', tableName, 'pwd', form.npwd)" :plain="true">确认修改</el-button>
            </el-form-item>

            <div class="ulDiv">
                <ul style="font-size: 14px">
                    <li>密码长度8-24位</li>
                    <li>需同时包含大写字母、小写字母、数字,不可使用特殊字符</li>
                    <li>密码不能包含邮箱</li>
                </ul>
            </div>
        </el-form>
    </div>
</template>

<script>
import store from '../../store/index'

  export default {
    props: {
      tableName: {
        type: String,
        default() {
          return ''
        }
      },
    },
    data() {
      return {
        form: {
          opwd:'',
          npwd:'',
          cpwd:''
        },
        rules: {
          opwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          npwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 8, max: 64, message: '长度在 8 到 64 个字符', trigger: 'blur' },
            { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/, message: '密码格式不正确', trigger: 'blur' },
          ],
          cpwd: [
            { required: true, message: true, message: '请确认新密码', trigger: 'blur' },
            { min: 8, max: 24, message: '长度在 8 到 24 个字符', trigger: 'blur' }
          ],
        }
      }
    },

    created() {
      // console.log('---------------', this.tableName);
    },


    methods: {
      onSubmit(formName, tableName, column, message) { 
        if (this.form.npwd === this.form.cpwd) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('进入提交阶段')
                this.$api.changeMessage({
                tableName,
                column,
                message,
                uid: store.state.loginModule.userinfo.uid,
                })
                .then((res) => {
                  if(res.status == 200){
                    this.$message({
                        message: '修改成功,请重新登录',
                        type: 'success'
                    });      
                    setTimeout(() => {
                      this.$router.push('/login')
                    }, 1000);
                  }
                }) 
                } else {
                    this.$message({
                        message: '服务器错误，修改失败',
                        type: 'error'
                    });
                    return false;
                  }
                });
        }else {
            this.$message({
                message: '修改失败，两次密码字段不一致',
                type: 'error'
            });
        }
      }
    }
}
</script>

<style scoped>
    .formDiv {
        width: 90%;
    }

    .ulDiv {
        width: 50%;
        margin-left: 5%;
        color: rgb(107, 107, 107);
    }

    .ulDiv li {
        height: 30px;
    }

    .subbtn {
        position: relative;
        left: 50%;
        /* background: #409EFF !important; */
    }

    .el-form-item__label {
        font-size: 16px;
    }
</style>