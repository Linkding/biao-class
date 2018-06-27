<template>
  <div>
    <Login/>
    <!-- <Detail/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Home from './page/Home.vue';
import Detail from './page/Detail.vue';
import Login from './page/Login';

export default {
  name: 'root',
  components: {
    Detail,
    Home,
    Login,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
