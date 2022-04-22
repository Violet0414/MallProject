<template> 
  <div class="outDiv">
    <!-- 搜索栏区域 -->
    <div class="header">
      <el-input placeholder="请输入您所要查询的评论" @change="searchInput" v-model="input" clearable></el-input>
      <el-button type="primary">查询</el-button>
      <!-- <el-button type="primary" @click="addGoods">添加</el-button> -->
    </div>

      
    <!-- 表单区域 -->
    <el-table
    class="form"
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
        prop="cid"
        label="编号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="账号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="gid"
        label="评论商品编号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        width="500">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
            <template slot-scope="scope">
              <el-button size="mini" 
                @click="handleDetail(scope.$index, scope.row)">
                查看
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-delete">
                删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>

    <MyPage :total="total" :pageSize="pageSize" 
    @changePage="changePage" class="page" 
    :current-page="currentPage"></MyPage>
  </div>
</template>


<script>
  import MyPage from '../../components/MyPage.vue'
  import Dialog from './AddGoods.vue'
  

  export default {
    components: {
      MyPage,
      Dialog,
    },
    data() {
      return {
        tableData: [],
        total: 5,
        pageSize: 1,
        input: '',

        activeName: '全部',
        dialogVisible: false,
        currentPage: 1, // 页面改变时的变量
        type: 'name',
        title: '添加商品',
        rowData:{},     // 当前行的数据对象
      }
    },

    methods: {
      editComments(page) {
         this.$api.editComments({
            page,
          }).then(res => {
            if(res.status == 200){
              this.tableData = res.data.data
              this.total = res.data.total;
              this.pageSize = res.data.pageSize;
            }
        })
      },


      // 通过输入查询
      searchInput(val){
       if (!val) {
        this.editComments(1);
        this.currentPage = 1;
        return;
      }
      this.$api
        .searchComment({
          search: val,
        })
        .then((res) => {
          this.currentPage = 1;
          if (res.data.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;;
          } else {
            this.total = 1;
            this.pageSize = 1;
            this.$message({
              type: 'error',
              message: '暂无此评论'
            }); 
          }
        });
      },


      // 调用输入查询方法
      getSearch(val) {
        this.searchInput(val)
      },




      // 页面改变
      changePage(num) {
          this.currentPage = num
          this.pageSize = this.pageSize;
          this.editComments(num);                //列表分页
      },


      // 添加时打开弹出
      addGoods(){
        this.title = '添加商品'
        this.$refs.dialog.dialogVisible = true;
      },
      

      // 查看详情操作
      handleDetail(index, row) {
        this.rowData = row;
        let routeData = this.$router.resolve({
            path: '/GoodsDetail/' + this.rowData.gid,
        })
        window.open(routeData.href, '_blank')
      },


      // 删除操作
      handleDelete(index, row){
        console.log('删除', index, row)
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delComment({
            cid: row.cid
          }).then(res => {
            if(res.data.status === 200) {
                this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.editComments(1)                  // 更新视图
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },

    },

    created() {
      this.editComments(1)
    }
  }

</script>

<style scoped>
  .outDiv {
    margin-top: 1%;
    margin: auto;
    height: 100%;
    width: 100%;
    position:absolute;
  }

  .header{
    display: flex;
    margin: 20px;
  }

  .header button {
    margin-top: 7px;
    margin-left: 20px;
    height: 10%;
  } 

  .form{
    left: 10%;
  }

  .page {
    position: absolute;
    left: 40%;
  }

</style>