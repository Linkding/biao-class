<template>
  <div>
    <router-view></router-view>
    <!-- <Me/> -->
    <!-- <SettingNav/> -->
    <!-- <Singup/> -->
    <!-- <Login/> -->
    <!-- <Detail/> -->
    <!-- <Home/> -->
    <!-- <DropDown :selectItem="yo" displayKey='nickname' :list="[
                      {name:'whh',key:'王花',nickname:'wowow'},
                      {name:'lss',key:'lss',nickname:'wowow'}]"/> -->
    <!-- <SearchBar/> -->
    <!-- <SearchResult/> -->
    <!-- <Vehicle/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Home from './page/Home.vue';


export default {
  name: 'root',
  methods:{
    yo(i){
      console.log(i)
    }
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
