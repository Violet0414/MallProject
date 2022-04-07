<template>
    <div>
        <el-pagination class="page"
            background
            layout="prev, pager, next, jumper, total"
            :total="total" 
            :page-size="pageSize" 
            :current-page="currentPage"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            // default: 100
        },
        pageSize: {
            type: Number,
        },
        currentPage: {
            type: Number,
            default: 3
        }
    },

    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        },
    }
}
</script>

<style scoped>
    .el-pagination{
        position:relative;  
        top: -45%;
        text-align: center;
    }

    .page{
        display: inline;
    }
</style>