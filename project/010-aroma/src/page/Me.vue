<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-lg-3">
                <SideNav/>
            </div>
            <div class="col-lg-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import SideNav from '../components/SideNav';
    import '../css/sidenav.css';
    
    export default{
        components:{Nav, SideNav},
    }
</script>
