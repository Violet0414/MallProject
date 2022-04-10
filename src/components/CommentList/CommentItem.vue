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
        /* position: absolute; */
        height: 180px;
        width: 99%;
        /* border: 1px solid; */
        margin: auto;
        margin-top: 3px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .itemDiv h4 {
        position: absolute;
        left: 15px;
    }

    .itemDiv p {
        position: absolute;
        margin-top: 5%;
        left: 30px;
    }

    .itemDiv span {
        position: absolute;
        left: 90%;
        margin-top: 8%;
    }

</style>