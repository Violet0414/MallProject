<template> 
  <div class="outDiv">
    <!-- 搜索栏区域 -->
    <div class="header">
      <el-input placeholder="请输入您所要查询的订单" 
      @change="searchInput" v-model="input" clearable style="margin-right: 10px;"></el-input>
      <el-button class="sbtn" type="primary">查询</el-button>

      <download-excel
          class = "export-excel-wrapper"
          :data = this.tableData
          :fields = this.fields
          name = "商品订单表">
          <el-button type="primary" class="ebtn" size="small">导出订单</el-button>
      </download-excel>
    </div>

    <el-tabs v-model="activeName" @tab-click="cHandleClick">
      <el-tab-pane label="待处理" name="待处理"></el-tab-pane>
      <el-tab-pane label="配送中" name="配送中"></el-tab-pane>
      <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
    </el-tabs>

      
    <!-- 表单区域 -->
    <el-table
      class="form"
      :data="tableData"
      border
      style="width: 100%">

      <el-table-column
        prop="oid"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="用户编号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="清单"
        width="450">
      </el-table-column>
      <el-table-column
        prop="price"
        label="总价"
        width="90">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="220">
      </el-table-column>
      <el-table-column
        prop="time"
        label="下单时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="changeStatus(scope.$index, scope.row, '配送中')"
                icon="el-icon-truck"
                v-show="dType">
                配送
              </el-button>
              <el-button
                size="mini"
                type="success"
                @click="changeStatus(scope.$index, scope.row, '已完成')"
                icon="el-icon-check"
                v-show="sType">
                完成
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
    <!-- <Dialog ref="dialog" :title="title" :rowData="rowData"></Dialog> -->
  </div>
</template>


<script>
  import MyPage from '../../components/MyPage.vue'  

  export default {
    components: {
      MyPage,
      // Dialog,
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
        type: 0,
        title: '添加商品',
        rowData:{},     // 当前行的数据对象

        dType: true,    // 控制配送按钮是否显示
        sType: null,    // 控制完成按钮是否显示

        fields: {'用户': 'uid', '购物清单': 'detail', '总价': 'price', '地址': 'address', '时间': 'time', },
      }
    },

    methods: {
      showOrders(page, type) {
        console.log('showOrders执行=================')
         this.$api.showOrders({
            page,
            type,        // 查询待处理订单
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
      console.log('searchInput执行');
       if (!val) {
        this.showOrders(1, this.type);
        console.log('val为空执行');
        this.currentPage = 1;
        return;
      }
      this.$api
        .searchOrder({
          search: val,
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
              message: '暂无此订单'
            })
          }
        });
      },


      // 类别查询
      cHandleClick() {
        if(this.activeName === '待处理'){
          this.type = 0
          this.dType = true
          this.sType = false
          this.showOrders(1, this.type)
        }else if(this.activeName === '配送中'){
          this.type = 1
          this.dType = false
          this.sType = true
          this.showOrders(1, this.type)
        }else if(this.activeName === '已完成'){
          this.type = 2
          this.dType = false
          this.sType = false
          this.showOrders(1, this.type)
        }
      },


      // 页面改变
      changePage(num) {
          this.currentPage = num
          this.pageSize = this.pageSize;
          this.showOrders(num, this.type);                //列表分页
      },


      changeStatus(index, row, bType){
        console.log('删除', index, row)
        this.$confirm('此操作将变更该订单状态为'+ bType + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.changeOrder({
            oid: row.oid
          }).then(res => {
            if(res.data.status === 200) {
                this.$message({
                type: 'success',
                message: '变更成功'
              })
              this.showOrders(1, this.type)                  // 更新视图
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },


      // 删除操作
      handleDelete(index, row){
        console.log('删除', index, row)
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delOrder({
            oid: row.oid
          }).then(res => {
            if(res.data.status === 200) {
                this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.showOrders(1, this.type)                  // 更新视图
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
      this.showOrders(1, this.type)
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

  .sbtn {
      margin: auto;
      height: 30%;
  }
  
  .ebtn {
    height: 40px;
    margin-left: 10px;
    margin-bottom: 9px;
  }

  .form{
    left: 1%;
  }

  .page {
    position: absolute;
    left: 40%;
  }

</style>