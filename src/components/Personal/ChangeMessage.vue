<template>
    <div>
        <el-dialog
        title="修改姓名"
        :visible.sync="nDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitMessage('ruleForm', tableName, 'name', ruleForm.name)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改性别"
        :visible.sync="sDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitMessage('ruleForm', tableName, 'sex', ruleForm.sex)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改地址"
        :visible.sync="aDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitMessage('ruleForm', tableName, 'address', ruleForm.address)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
        title="修改手机号"
        :visible.sync="pDialog"
        :append-to-body="true"
        :before-close="handleDialogClose"
        width="70%"> 
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitMessage('ruleForm', tableName, 'phone', ruleForm.phone)" style="float: right; margin-top: 30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </diV>
</template>

<script>

import store from '../../store/index'

export default {
    inject: ['reload'],
    props: [
        'nDialog',
        'sDialog',
        'pDialog',
        'aDialog',
        'tableName',
    ],
    data() {
        return {
        value: '',

        ruleForm: {
          name: '',
          address: '',
          sex: '',
          phone: '',
        },

        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请输入性别', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },

    methods: {
      // 关闭弹窗时发送的事件
      handleDialogClose() {
          this.$emit('changeDialog')
          console.log('弹窗关闭时的事件触发了！')
      },

      submitMessage(formName, tableName, column, message) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('进入提交阶段')
            this.$api.changeMessage({
              tableName: tableName,
              column,
              message,
              uid: store.state.loginModule.userinfo.uid,
            })
            .then((res) => {
              if(res.status == 200){
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });         
                setTimeout(() => {
                  this.reload()
                }, 700);
              }
            }) 
          } else {
            console.log('修改失败');
            return false;
          }
        });
      },

    }
}
</script>

<style scoped>
  .el-upload {
    float: left;
    margin-left: 50px;
  }
</style>