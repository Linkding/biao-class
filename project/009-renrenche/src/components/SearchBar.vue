<template>
    <form class="search-bar" @submit="submit($event);search($event)">
        <input @keyup="change()" type="search" placeholder="请输入关键字"  v-model="keyword">
        <button type="submit">🔍</button>
    </form>
</template>
<script>
import api from "../lib/api";

  export default {
    props:{
      isSearch:{
        default:true,
      },
      model:{
        default:'model',
      },
      searchable:{ //搜索的属性，eg：标题等
        default:''
      },
      onSubmit:{
        default (){}
      },
      onChange(){},
    },
    data(){
      return {
        keyword:'',
      }
    },
    methods:{
      change(){
        if(this.onChange)
          this.onChange(this.keyword);
      },
      submit(e){
        e.preventDefault();

        if(this.onSubmit)
          this.onSubmit(this.keyword)
      },
      search(e){
        e.preventDefault();
        if(this.isSearch){
          this.$router.push({
            path:'/search',
            query:{keyword:this.keyword},
          })
        }
        // if(!this.cb)
        //   return
        // this.cb(this.keyword);
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

