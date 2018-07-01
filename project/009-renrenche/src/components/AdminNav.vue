<template>
    <div :style="{width:width}" class="nav-side">
        <a href="#" class="nav-item">基础设置</a>
        <a href="#" class="nav-item">安全设置</a>
        <a href="#" class="nav-item">买卖设置</a>
    </div>
</template>

<script>
    import "../css/sidenav.css";
    export default {
       props:{
            width:[ 'width' ],
       } 
    }
</script>

<style scoped>
    

</style>
