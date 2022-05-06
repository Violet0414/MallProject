<template>
  <div class="outDiv">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-four">
            <li class="el-icon-s-custom"> 用户总数: {{uNum}} 人</li>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-three">
            <li class="el-icon-s-goods"> 商品总数: {{gNum}} 种</li>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-two">
            <li class="el-icon-s-order"> 利润:{{pNum}}￥</li>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-one">
            <li class="el-icon-s-comment"> 反馈总数: {{fNum}} 条</li>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="main" style="width: 750px;height:550px;"></div>
    <EditProposal></EditProposal>
  </div>
</template>

<script>
import EditProposal from '../Admin/EditProposal.vue'

export default {
  components: {
    EditProposal,
  },
  data() {
    return {
      columnData: [],

      uNum: '',
      gNum: '',
      pNum: '',
      fNum: '',
      
    }
  },

  created() {
    this.getUnum('users', 'uid');
    this.getGnum('goods', 'gid');
    this.getFnum('feedback', 'fid');
    this.getPnum();

  },

  mounted() {
    this.$api.getSales().then(res => {
      for(let i = 0; i < res.data.data.length; i++){
        this.columnData[i] = res.data.data[i].sales
        console.log(this.columnData)
      }
      this.draw()
    })
  },

  methods: {
    draw() {
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '各类别销量统计'
        },
        tooltip: {},
        xAxis: {
          data: ['上新', '流行', '推荐', '特价', '爆款', '即将下架']
        },
        yAxis: {
          // type: 'value'
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: this.columnData,
            itemStyle:{
                normal:{
                   color: function(params) {
                	  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                    return colorList[params.dataIndex]
                  }
                }
            },
          }
        ]
      });
    },

    getPnum() {
      this.$api.getProfit({
        }).then(res => {
          if(res.status == 200){
            this.pNum = res.data.data[0].price.toFixed(2);
          }
      })
    },

    getUnum(tableName, column) {
      this.$api.getNum({
        tableName,
        column,
        }).then(res => {
          if(res.status == 200){
            this.uNum = res.data.num;
          }
      })
    },

    getGnum(tableName, column) {
      this.$api.getNum({
        tableName,
        column,
        }).then(res => {
          if(res.status == 200){
            this.gNum = res.data.num;
          }
      })
    },

    getFnum(tableName, column) {
      this.$api.getNum({
        tableName,
        column,
        }).then(res => {
          if(res.status == 200){
            this.fNum = res.data.num;
          }
      })
    },

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

  .grid-content li{
    font-size: 25px;
  }

  .bg-one {
    border-radius: 10px;
    background-color: #0073b6;
  }
  
  .bg-two {
    border-radius: 10px;
    background-color: #807bb6;
  }

  .bg-three {
    border-radius: 10px;
    background-color: #43a1df;
  }

  .bg-four {
    border-radius: 10px;
    background-color: #1bd4b2;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    margin-top: 10px;
    border-radius: 6px;
    min-height: 150px;
    display: flex;
    align-items:center;
    justify-content:center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>