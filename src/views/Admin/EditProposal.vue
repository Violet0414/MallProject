<template> 
  <div class="outDiv">
    <!-- 表单区域 -->
    <el-table
    class="form"
    :data="tableData"
    max-height="500"
    border
    style="width: 100%">
      <el-table-column
        prop="fid"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="300">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="110">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
            <template slot-scope="scope">
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
  

  export default {
    components: {
      MyPage,
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
      editProposal(page) {
         this.$api.editProposal({
            page,
          }).then(res => {
            console.log(res.data);
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
        this.editProposal(1);
        this.currentPage = 1;
        return;
      }
      this.$api
        .searchUser({
          search: val,
        })
        .then((res) => {
          console.log("搜索---", res.data);
          this.currentPage = 1;
          if (res.data.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;;
          } else {
            this.total = 1;
            this.pageSize = 1;
          }
        });
      },


      // 页面改变
      changePage(num) {
          this.currentPage = num
          this.pageSize = this.pageSize;
          this.editProposal(num);                //列表分页
      },

      


      // 删除操作
      handleDelete(index, row){
        console.log('删除asdasdasdasd', index, row)
        this.$confirm('此操作将永久删除该提议, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delProposal({
            fid: row.fid
          }).then(res => {
            if(res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              // this.editProposal(1)                  // 更新视图
              location.reload();
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
      this.editProposal(1)
    }
  }

</script>

<style scoped>
  .outDiv {
    margin-top: 1%;
    margin: auto;
    height: 100%;
    width: 100%;
    position:relative;
    top: 260%;
    left: 45%;
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
    left: 25%;
  }

</style>