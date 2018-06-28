<template>
    <div :style="{width:width}" class="side-nav">
        <a href="#" class="nav-item">基础设置</a>
        <a href="#" class="nav-item">我的收藏</a>
        <a href="#" class="nav-item">我的发布</a>
        <a href="#" class="nav-item">浏览足迹</a>
    </div>
</template>

<script>
    export default {
       props:{
            width:[ 'width' ],
       } 
    }
</script>

<style scoped>
    .side-nav {
        background: #fff;
    }

    .nav-item {
        font-size: 1.1rem;
        color: #555;
        display: block;
        padding: 10px 20px;
    }
    .nav-item:active {
        background: rgba(0, 0, 0, .05);
    }
    .nav-item:hover{
        background: rgba(0, 0, 0, .05);
    }

</style>
