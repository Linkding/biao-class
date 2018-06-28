<template>
    <div :style="{marginBottom: this.pushDown ? '20px': 0,}" class="main-nav">
       <div class="row container">
           <div class="col left">
               <a href="" class="logo">logo</a>
               <a href="#" class="nav-item">item</a>
               <a href="#" class="nav-item">item</a>
               <a href="#" class="nav-item">item</a>
               <a href="#" class="nav-item">item</a>
           </div>
           <div class="col right">
               <a href="#" class="nav-item">item</a>
               <a href="#" class="nav-item">item</a>
               <a href="#" class="nav-item tel">400-666-6666</a>
           </div>
       </div>
    </div>
</template>
<script>
    export default {
        props:{
            pushDown :{
                default: false,
            }
        },
    }
</script>
    
<style scoped>
    .main-nav {
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
    .logo {
        display: inline-block;
        background: #fd521d;
        width: 120px;
        height: 60px;
        vertical-align: top;
        margin-right: 15px;
    }
    .left{
        width: 60%;
    }
    .right {
        width: 40%;
    }
    .nav-item {
        display: inline-block;
        padding: 1.5rem;
        color: #555;
        text-decoration: none;
    }

    .tel {
        color: #fd521d;
        font-weight: bold;
    }
</style>
