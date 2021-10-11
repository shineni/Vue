<template>
    <div class="box"> 
        这是Test ---{{username}}
        <button @click ="changeName">ChangeName</button>
        <h3>H3 Color</h3>
    </div>

</template>

<script>
    // 默认导出，固定写法!
    export default {
        // data数据源
        // 注意： .vue组件中的data不能像之前一样，不能指向对象
        // 注意：组件中的data必须是一个函数
        data(){
            //这个return出去的{}中可以定义数据
            return {
                username:'admin'
            }
        },
        methods:{
            changeName(){
                this.username='shine'
            }
        }
    }
</script>


<style lang="less">
.box{
    background-color:#bfa;
    h3 { 
        color:red !important;
    }
}
</style>