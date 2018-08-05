<template>
    <div :style="{width:width}" class="nav-side">
        <router-link class="nav-item" to="/order/meorder">我的订单</router-link>
        <router-link class="nav-item" to="/me/setting">设置</router-link>
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
    .router-link-active {
        background: #F9726C;
        color: #fff;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, .05)
    }

</style>
