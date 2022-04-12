<template>
  <div class="outDiv">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
          
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
    <div id="main" style="width: 600px;height:400px;"></div>
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
      columnData: [153, 289, 87, 93, 120],
    }
  },

  created() {
    this.getSales();
  },

  mounted() {
    this.draw()
  },

  methods: {
    draw() {
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '类别销量统计'
        },
        tooltip: {},
        xAxis: {
          data: ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6']
        },
        yAxis: {
          // type: 'value'
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: this.columnData
          }
        ]
      });
    },

    getSales() {
       console.log('getSales=================')
         this.$api.getSales({
          }).then(res => {
            if(res.status == 200){
              this.columnData = 
              [res.data.data[0].sales, res.data.data[1].sales, 
              res.data.data[2].sales, res.data.data[3].sales, 
              res.data.data[4].sales]
              console.log(this.columnData)
            }
        })
    }
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

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    margin-top: 10px;
    border-radius: 4px;
    min-height: 300px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>