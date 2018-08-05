<template>
    <form class="search-bar" @submit="submit($event);search($event)" @mouseleave="show_input = false">
        <transition name="tr">
          <input @keyup="change()" v-if="show_input" type="search" placeholder="请输入关键字"  v-model="keyword">
        </transition>
        <button type="submit" @mouseenter="show_input = !show_input">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
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
        show_input:false,
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
.search-bar input,
.search-bar button {
  border: 0;
  background: 0;
}
.search-bar input {
  /* opacity: 0; */
  width: 45%;
  border-bottom: 1px solid rgba(0, 0, 0, .09)
}
button {
  border-left: 0;
}

.tr-enter-active, .tr-leave-active {
  transition: opacity .5s
}
.tr-enter, .tr-leave-to /* .tr-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>

