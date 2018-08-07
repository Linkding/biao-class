<template>
    <div :style="{width:width}" class="nav-side">
        <router-link class="nav-item" to="/admin/user">用户管理</router-link>
        <router-link class="nav-item" to="/admin/breed">葡萄品种管理</router-link>
        <router-link class="nav-item" to="/admin/occasion">场合管理</router-link>
        <router-link class="nav-item" to="/admin/location">产地管理</router-link>
        <router-link class="nav-item" to="/admin/material">酒具材质管理</router-link>
        <router-link class="nav-item" to="/admin/order">订单管理</router-link>
        <router-link class="nav-item" to="/admin/ptype">产品类型管理</router-link>
        <router-link class="nav-item" to="/admin/product">产品管理</router-link>
        <router-link class="nav-item" to="/admin/category">分类管理</router-link>
        <router-link class="nav-item" to="/admin/cart">购物车管理</router-link>
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
