<template>
    <div :style="{width:width}" class="nav-side">
        <router-link class="nav-item" to="/admin/user">用户管理</router-link>
        <router-link class="nav-item" to="/admin/stock">股票管理</router-link>
        <router-link class="nav-item" to="/admin/trade">交易管理</router-link>
        <router-link class="nav-item" to="/admin/account">股票账户管理</router-link>
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
        background: #CBA58C;
        color: #fff;
    }

</style>
