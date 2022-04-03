<template>
    <div>
      <h2>{{goodsData.name}}</h2>
        <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content bg-purple">价格：{{goodsData.price}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple">类别：{{goodsData.type}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple">销量：{{goodsData.sales}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content bg-purple">评分：{{goodsData.score}}</div></el-col>
        </el-row>
        

        <div class="block">
          <img :src="imgUrl">
        </div>

        <div class="tabDiv">
          <el-button type="warning" icon="el-icon-star-off" class="collection" :style="getStyle()" @click="addCart"> {{btnText}} </el-button>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="参数" name="first">{{goodsData.parameter}}</el-tab-pane>
            <el-tab-pane label="简介" name="second">{{goodsData.introduction}}</el-tab-pane>
            <el-tab-pane label="评论" name="third">
              <el-button type="primary" icon="el-icon-edit" @click="addComment">添加评论</el-button>

              <Dialog :dialogVisible="dialogVisible" :gid="gid" @changeDialog="changeDialog"></Dialog>
              <CommentList :commentList="commentList"></CommentList>

            </el-tab-pane>
            
          </el-tabs>
        </div>
    </div>
</template>
  
<script>
import CommentList from '../components/CommentList/CommentList.vue'
import Dialog from '../components/AddComments.vue'
  
  export default {
      components: {
        CommentList,
        Dialog,
      },
      data(){
        return {
          gid: null,
          goodsData:[],
          commentList: [],
          activeName: 'first',
          imgUrl: '',

          btnStatus: true,
          btnText: '加入购物车',

          dialogVisible: false
        }
      },


      created() {
        console.log('详情页创建，返回数据：', this.$route.params)
        this.gid = this.$route.params.gid
        console.log(this.gid)
  
  
        this.$api.goodsDetail({
          gid: this.gid
        }).then(res => {
          this.goodsData = res.data.data[0];
          this.imgUrl = this.goodsData.img;
        }) 
        this.showComments(this.gid);
      },
  
      methods: {
        handleClick(tab, event) {
          console.log(this.activeName);
        },

        // 展示评论
        showComments(gid) {
          this.$api.showComments({
              gid,
            }).then(res => {
              this.commentList = res.data.data
              if(res.status == 200){
                console.log('commentList:',this.commentList)
                this.total = res.data.total;
                this.pageSize = res.data.pageSize;
              }
            })
        },

        // 添加评论
        addComment() {
          console.log('按钮事件触发了')
          this.dialogVisible = true
        },

        // 加入购物车
        addCart() {
          if(this.btnStatus) {
            let gid = this.gid
            let uid = '666'
            let gname = this.goodsData.name
            let imgUrl = this.imgUrl
            console.log('传入的goodsData.name为:', this.goodsData.name)
            console.log('传入的gid为:', gid)
            console.log('传入的uid为:', uid)
            console.log('传入的imgUrl为:', imgUrl)
            this.$api.addCart({gid, uid, imgUrl, gname})
            .then((res) => {
              if(res.status == 200){
                this.btnStatus = false
                this.btnText = '从购物车删除'
                this.$message({
                message: '添加成功',
                type: 'success'
                });
              }
            });
          } else {
            let gid = this.gid
            let uid = '666'
            console.log('传入的gid为:', gid)
            console.log('传入的uid为:', uid)            
            this.$api.delCart({gid, uid})
            .then((res) => {
              if(res.status == 200){
                this.btnStatus = true
                this.btnText = '加入购物车'
                this.$message({
                message: '删除成功',
                type: 'success'
                });
              }
            });
          }
          
        },


        changeDialog() {
          this.dialogVisible = false
        },
    

        getStyle() {
          if(this.btnStatus === false) {
            return {background: 'red !important' }
          }
        },
      }
  }
  </script>
  
  <style>
    .block {
      border: 1px solid red;
      margin: 10px;
      left: 65%;
      top: 5%;
      position: absolute;
      width: 30%;
      height: 240px;
    }

    .block img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }

    .collection {
      position: relative;
      left: 85%;
      top: 3;
      
    }

    .tabDiv {
      margin-top: 10%
    }
  
    .el-tabs__item {
    font-size: 20px !important;
    }
  
    .el-row {
      margin-bottom: 30px;
    }
  
    .el-col {
      border-radius: 4px;
    }
    
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
  
  </style>