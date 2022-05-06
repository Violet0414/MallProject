<template>
    <div>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"> 

             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="商品价格" prop="price" style="float: left;">
                  <el-input v-model="ruleForm.price"></el-input>
                </el-form-item>

                <el-form-item label="库存数量" prop="stock">
                  <el-input v-model="ruleForm.stock"></el-input>
                </el-form-item>

                <el-form-item label="商品分类" prop="type" style="float: left;">
                    <el-select v-model="ruleForm.type" placeholder="请选择类别">
                      <el-option label="上新" value="0"></el-option>
                      <el-option label="流行" value="1"></el-option>
                      <el-option label="推荐" value="2"></el-option>
                      <el-option label="特价" value="3"></el-option>
                      <el-option label="爆款" value="4"></el-option>
                      <el-option label="即将下架" value="5"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="评分" prop="score">
                    <el-select v-model="ruleForm.score" placeholder="请评分">
                      <el-option label="1" value="1"></el-option>
                      <el-option label="2" value="2"></el-option>
                      <el-option label="3" value="3"></el-option>
                      <el-option label="4" value="4"></el-option>
                      <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="商品参数" prop="parameter">
                  <el-input type="textarea"
                  maxlength="100"
                  show-word-limit  
                  v-model="ruleForm.parameter"></el-input>
                </el-form-item>

                <el-form-item label="商品简介" prop="introduction">
                  <el-input type="textarea" 
                  maxlength="300"
                  show-word-limit 
                  v-model="ruleForm.introduction"></el-input>
                </el-form-item>


                <el-form-item label="上传图片">

                    <UploadImg @sendImg = 'sendImg'></UploadImg>
                    
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary">确 定</el-button>
                        <el-button @click="dialogVisibleImg = false">取 消</el-button>
                    </span>
                </el-form-item>

                <el-dialog
                title="提示"
                :visible.sync="dialogVisibleImg"
                width="30%"
                append-to-body>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary">确 定</el-button>
                        <el-button @click="dialogVisibleImg = false">取 消</el-button>
                    </span>
                </el-dialog>

                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" 
                style="float: right; margin-top: 30px">立即上传</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import UploadImg from '../../components/UploadImg.vue'

export default {
  components: {
      UploadImg,
    },

    props: {
      title: {
        type: String,
        default: '添加商品'
      },
      rowData: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },

    data() {
        return {
        dialogVisible: false,
        dialogVisibleImg: false,    // 上传图片弹窗
        imgUrl: '',

        ruleForm: {
          gid: '',
          name: '',
          type: '',
          score: '',
          stock: '',
          price: '',
          parameter: '', 
          introduction: '',
        },

        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择商品类别', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          score: [
            { required: true, message: '请评分', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          stock: [
            { required: true, message: '请输入库存数量', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          parameter: [
            { required: true, message: '请输入商品参数', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入商品简介', trigger: 'blur' },
            // { min: 4, max: 4, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },

    watch: {
      rowData(val) {
        console.log('触发监听器', val)
        this.ruleForm = val;
      } 
    },

    methods: {
      // 关闭弹窗时发送的事件
      handleDialogClose() {
          this.$emit('changeDialog')
        },

      // 获取图片地址
      sendImg(val) {
        console.log('显示图片路径', val)
        this.imgUrl = val
      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('进入提交阶段')
          let {gid, name, price, type, score, parameter, introduction, img, stock} = this.ruleForm;
          if (this.title === '编辑商品') {
            if(this.imgUrl != ''){        // 判断是否重新上传图片，若重新上传则重新赋值图片地址
              img = this.imgUrl;
            }
            this.$api.updateGoods({gid, name, price, type, score, parameter, introduction, img, stock})
            .then((res) => {
              if(res.status == 200){
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                setTimeout(() => {
                  history.go(0)
                }, 700);
              }else {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                })
                return false;
              }
            })
          }else{
            let imgUrl = this.imgUrl;
            this.$api.addGoods({gid, name, price, type, score, parameter, introduction, imgUrl, stock})
            .then((res) => {
              if(res.status == 200){
                this.$message({
                  type: 'success',
                  message: '添加成功' 
                })
                setTimeout(() => {
                  history.go(0)
                }, 700);
              }
            }) 
          }
        } else {
          console.log('添加失败');
          return false;
        }
        });
        
      },
    }
}
</script>

<style scoped>
  .demo-ruleForm {
    left: 5% !important;
  }

  ::v-deep .el-form-item__content {
    display: flex;
    justify-content: start;
  }

  ::v-deep .el-upload--picture-card {
    width: 130px;
    height: 130px;
  }

</style>