<template>
    <div :style="{width:width}" class="nav-side">
        <router-link class="nav-item" to="/admin/user">用户管理</router-link>
        <router-link class="nav-item" to="/admin/vehicle">车辆管理</router-link>
        <router-link class="nav-item" to="/admin/brand">品牌管理</router-link>
        <router-link class="nav-item" to="/admin/model">车系管理</router-link>
        <router-link class="nav-item" to="/admin/design">车型管理</router-link>
        <router-link class="nav-item" to="/admin/report">质检管理</router-link>
        <router-link class="nav-item" to="/admin/appo">预约管理</router-link>
        <!-- <a href="#" class="nav-item">安全设置</a>
        <a href="#" class="nav-item">买卖设置</a> -->
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
        background: #0B5A81;
        color: #fff;
    }

</style>
