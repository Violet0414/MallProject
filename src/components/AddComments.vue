<template>
    <div>
        <el-dialog
            title="评论"
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose">
            
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="内容" prop="content">
                  <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit('ruleForm')">发布</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import store from '../store/index'

export default {
    inject: ['reload'],
    name: 'Addcomments',
    props: {
        dialogVisible: {
            type: Boolean,
            default() {
                return false;
            }
        },

        gid: {
            type: String,
            default() {
                return '';
            }
        },
    },

    data() {
        return {
            ruleForm: {
                content:''
            },

            rules: {
                content: [
                    { required: true, message: '请输入评论内容', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            }
      }
    },

    methods: {
        // 弹窗关闭时触发的事件
        handleClose(){
            console.log('关闭事件触发了')
            // this.dialogVisible = false
            this.$emit('changeDialog')
        },
    
    
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    console.log('进入提交阶段')
                    let content = this.ruleForm.content;
                    let gid = this.gid
                    let uid = store.state.loginModule.userinfo.uid

                    this.$api.addComments({gid, uid, content})
                    .then((res) => {
                    if(res.status == 200){
                        this.$message({
                        message: '发布成功',
                        type: 'success'
                        });
                        setTimeout(() => {
                            this.reload()
                        }, 700);
                    }else {
                        this.$message.error('发布失败');
                        return false; 
                        }
                    });
                }else {
                    return false
                }
            });
        }
        

    }
}
</script>

<style lang="scss" scoped>

</style>