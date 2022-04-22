<template>
  <div>
        <download-excel
          class = "export-excel-wrapper"
          :data = tableData
          :fields = headName
          name = "订单表.xls">
          <el-button type="primary" class="ebtn" size="small">导出表单</el-button>
      </download-excel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tableData: {},
      // headName: {},
    }
  },
  props: ['tableData', 'headName']

}
</script>

<style>

</style>