<template>
    <div>
        <el-upload
          :action="url"
          ref="upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success= "successUpload"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
  import base from "../api/base.js"

  export default {
    data() {
      return {
        url: base.uploadUrl,   // 图片地址服务器
        fileList:[],
        dialogImageUrl: '',
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      submitUpload() {
        this.$refs.upload.submit();
      },

      successUpload(res, file, fileList) {
        console.log('上传成功！', res, file, fileList)
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        // 将图片上传成功的返回数据传递给父组件
        let imgUrl = base.host + '/' + res.url.slice(7);
        console.log("uploadimg下的imgUrl:",imgUrl);
        this.$emit('sendImg', imgUrl)
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>