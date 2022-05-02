<template>
    <div>
        <el-dialog
        title="注册"
        :visible.sync="dialogVisible"
        :modal-append-to-body='false'
        width="50%"> 

             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="uid">
                  <el-input v-model="ruleForm.uid"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="pwd">
                  <el-input v-model="ruleForm.pwd"></el-input>
                </el-form-item>

                <el-form-item label="昵称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>


                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                      <el-option label="男" value="男"></el-option>
                      <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>


                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="float: right; margin-top: 30px">立即注册</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

export default {
  components: {
    },

    props: {

    },

    data() {
        return {
        dialogVisible: false,

        ruleForm: {
          uid: '',
          pwd: '',
          name: '',
          sex: '',
          address: '', 
          phone: '',
        },

        rules: {
          uid: [
            { required: true, message: '请输入您的账号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
            // { min: 4, max: 4, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            // { min: 4, max: 4, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },

    methods: {
      // 关闭弹窗时发送的事件
      handleDialogClose() {
          this.$emit('changeDialog')
        },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            console.log('进入提交阶段')
            let {uid, pwd, name, sex, address, phone} = this.ruleForm;
            
            this.$api.register({uid, pwd, name, sex, address, phone})
            .then((res) => {
              if(res.data.status == 200){
                this.$message({
                  type: 'success',
                  message: '注册成功'
                })
              }else {
                this.$message({
                  type: 'error',
                  message: '账号已存在,请重新输入账号'
                })
                return false;
              }
            }) 
          }
        });
      },

    }
}
</script>

<style>

</style>