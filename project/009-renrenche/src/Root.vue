<template>
  <div>
    <!-- <Me/> -->
    <!-- <SettingNav/> -->
    <!-- <Singup/> -->
    <!-- <Login/> -->
    <!-- <Detail/> -->
    <Home/>
    <!-- <DropDown :selectItem="yo" displayKey='nickname' :list="[
                      {name:'whh',key:'王花',nickname:'wowow'},
                      {name:'lss',key:'lss',nickname:'wowow'}]"/> -->
    <!-- <SearchBar/> -->
    <!-- <SearchResult/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Home from './page/Home.vue';
import Detail from './page/Detail.vue';
import Login from './page/Login';
import Singup from './page/Singup';
import SearchResult from './page/SearchResult';
import Me from './page/settings/Me';
import SettingNav from './components/SettingNav';
import DropDown from './components/DropDown';
import SearchBar from './components/SearchBar';

export default {
  name: 'root',
  components: {
    Detail,
    Home,
    Login,
    Singup,
    SettingNav,
    Me,
    DropDown,
    SearchBar,
    SearchResult,
  },
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
