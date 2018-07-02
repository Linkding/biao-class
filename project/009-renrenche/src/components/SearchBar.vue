<template>
    <form class="search-bar" @submit="search($event)">
        <input type="search" placeholder="请输入关键字" autofocus v-model="keyword">
        <button type="submit">🔍</button>
    </form>
</template>
<script>
import api from "../lib/api";

  export default {
    props:{
      model:{
        default:'model',
      },
      searchable:{
        default:''
      },
      cb:{
        default (){}
      },
    },
    data(){
      return {
        keyword:'',
      }
    },
    methods:{
      search(e){
        e.preventDefault();
        
        if(!this.cb)
          return
        this.cb(this.keyword);
      }
    }
  }
</script>
<style scoped>
.search-bar {
    margin: 10px 0;
}
input {
  width: 45%;
  /* font-size: 1.6rem; */
}
button {
  border-left: 0;
}

button:hover {
  background: #181818;
}
</style>

