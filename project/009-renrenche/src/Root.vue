<template>
  <div>
    <router-view></router-view>
    <!-- <Me/> -->
    <!-- <SettingNav/> -->
    <!-- <Singup/> -->
    <!-- <Login/> -->
    <!-- <Detail/> -->
    <!-- <Home/> -->
    <!-- <DropDown :list="tmp" :showInput="true" :displayKey="'name'" /> -->
    <!-- <SearchBar/> -->
    <!-- <SearchResult/> -->
    <!-- <Vehicle/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Home from './page/Home.vue';
import DropDown from './components/DropDown.vue';


export default {
  name: 'root',
  // components:{DropDown},
  data(){
    return{
      tmp:[
        {name:'lxb1'},
        {name:'lxb2'},
        {name:'lxb3'},
      ]
    }
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
