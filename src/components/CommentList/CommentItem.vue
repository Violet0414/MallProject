<template>
    <div class="itemDiv">
        <h4>用户{{cItem.uid}}</h4>
        <p>{{cItem.content}}</p>
        <span>{{cItem.time}}</span>
    </div>
</template>

<script>
export default {
    name: 'CommentList',
    props: {
        cItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },

    data() {
        return {
            
        };
    },

    mounted() {
        // console.log('列表：', this.cItem)
    },

    methods: {
        
    },
};
</script>

<style scoped>
    .itemDiv {
        width: 100%;
        border: 1px solid;
        margin-top: 3px;
    }

    .itemDiv p {
        position: relative;
        left: 30px;
    }

    .itemDiv h4 {
        position: relative;
        left: 10px;
    }

    .itemDiv span {
        position: relative;
        left: 90%;
        bottom: 3px;
    }

</style>