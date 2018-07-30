<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-lg-3">
                <div class="nav-side">
                    <router-link class="nav-item" to="/me/order">我的订单</router-link>
                    <router-link class="nav-item" to="/me/setting">设置</router-link>
                </div>
            </div>
            <div class="col-lg-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import '../css/sidenav.css';
    
    export default{
        components:{Nav},
    }
</script>
