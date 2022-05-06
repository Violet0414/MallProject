<template> 
  <div class="outDiv">
    <!-- 搜索栏区域 -->
    <div class="header">
      <el-input placeholder="请输入您所要查询的商品" @change="searchInput" v-model="input" clearable></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="addGoods">添加</el-button>
    </div>

      <el-tabs v-model="activeName" @tab-click="cHandleClick">
        <el-tab-pane label="全部" name="全部"></el-tab-pane>
        <el-tab-pane label="上新" name="0"></el-tab-pane>
        <el-tab-pane label="流行" name="1"></el-tab-pane>
        <el-tab-pane label="推荐" name="2"></el-tab-pane>
        <el-tab-pane label="特价" name="3"></el-tab-pane>
        <el-tab-pane label="爆款" name="4"></el-tab-pane>
        <el-tab-pane label="即将下架" name="5"></el-tab-pane>
      </el-tabs>

      
    <!-- 表单区域 -->
    <el-table
    class="form"
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
        prop="img"
        label="商品图"
        width="120">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width:110px;height:80px;"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="gid"
        label="编号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="110">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sales"
        label="销量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="score"
        label="评分"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300">
            <template slot-scope="scope">
              <el-button size="mini" 
                @click="handleDetail(scope.$index, scope.row)">
                查看
            </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit">
                编辑
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

    <MyPage :total="total" :pageSize="pageSize" @changePage="changePage" class="page" :current-page="currentPage"></MyPage>
    <Dialog ref="dialog" :title="title" :rowData="rowData"></Dialog>
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
      showGoods(page) {
        console.log('showgoods执行=================')
         this.$api.showGoods({
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
        this.showGoods(1);
        this.currentPage = 1;
        return;
      }
      this.$api
        .getSearch({
          search: String(val),
          type: this.type
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
            this.$message({
              type: 'error',
              message: '暂无此商品'
            })
          }
        });
      },


      // 改变传入的type值。调用输入查询方法
      getSearch(val) {
        this.type = 'name'
        this.searchInput(val)
      },


      // 类别查询
      cHandleClick() {
        if(this.activeName === '全部'){
          this.showGoods(1)
        }else{
          this.type = 'type';
          this.searchInput(this.activeName);
          this.type = 'name'
        }
      },


      // 页面改变
      changePage(num) {
          this.currentPage = num
          this.pageSize = this.pageSize;
          this.showGoods(num);                //列表分页
      },


      // 添加时打开弹出
      addGoods(){
        this.title = '添加商品'
        this.$refs.dialog.dialogVisible = true;
      },
      

      // 编辑弹窗
      handleEdit(index, row){
        this.title = '编辑商品'
        this.rowData = row;
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
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delGoods({
            gid: row.gid
          }).then(res => {
            if(res.data.status === 200) {
                this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.showGoods(1)                  // 更新视图
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
      this.showGoods(1)
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
    left: 18%;
  }

  .page {
    position: absolute;
    left: 40%;
  }

</style>