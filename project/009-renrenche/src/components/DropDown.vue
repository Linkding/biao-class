<template>
    <div @mouseleave="show_menu=false" class="dropdown">
        <input type="search"
          v-if="api"
          @keyup="show_menu=true"
          v-model="keyword"
        >
        <div v-if="list.length" @click="show_menu=true" class="drop-title">{{selected ? selected[displayKey]:'请选择'}}</div>
        <div v-if="show_menu && result.length" class="drop-item">
            <div @click="select(row)" v-for="(row,index) in  list" :key='index'>{{row[displayKey]}}</div>
        </div>
    </div>
    <!-- <div @mouseleave="show_menu=false" class="dropdown">
        <div @mouseenter="show_menu=true" class="drop-title">{{selected ? selected[displayKey]:'请选择'}}</div>
        <div v-if="show_menu" class="drop-item">
            <div @click="select(row)" v-for="(row,index) in  list" :key='index'>{{row[displayKey]}}</div>
        </div>
    </div> -->
</template>
<script>
import  api from '../lib/api';

export default {
  props: {
    api:{},
    list: {
      defalut(){
        return[]
      }
    },
    defalut:{},
    onSelect:{},
    primaryKey:{
      defalut:'id',
    },
    selectItem: {},
    displayKey: {
      default: "name"
    },
  },
  data() {
    return {
      api_conf:{},
      result:[],
      selected:'',
      show_menu: false,
      keyword:'',
      timer:null,
    };
  },
  methods: {
    parse_api(){
      let api_conf = this.api;
      if(typeof api_conf != 'string')
        return Object.assign({},api);
      api_conf = api_prop.split('.');
      let model = api_prop[0];
      let property = api_prop[1];

      property = property.split(',');

      return {
        model,
        property,
      }
    },
    select(row) {
      this.selected = row;
      if (this.selectItem) this.selectItem(row);
    },
    on_edit(row){
      if(!row)
        this.selected = {};
      this.selected = row;
    },
    set_default(){
      let key = this.defalut;
      if(key){
        let def = this.list.find(row=>{
          return row[this.primaryKey] == key;
        });
        this.select(def);
      }
    },
    select(row){
      this.show_menu = false;
      this.selected =  row;
      this.keyword = row[this.displayKey];
    },

  },
  mounted() {
    // this.set_default();
    let list = this.list;
    // console.log('this.list.length',this.list.length)
    this.api_conf = this.parse_api();
    list && (this.result = this.list);
  },
  watch:{
    keyword(){
      let condition = {};

      let property = this.api_conf.property;

      if(!property)
        return;
      property.forEach(prop=>{
        condition[prop] = this.keyword;
      });

      clearTimeout(this.timer);//清除计时器

      this.timer = setTimeout(()=>{
        api(`${this.api_conf.model}/search`,{or:condition})
          .then(r=>{
            this.result= r.data;
          });
      },300);

    },
    defalut:{
      deep:true,
      handler(){
        this.set_default();
      }
    },
  }
};
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.drop-title,
.drop-item {
  background: #fff;
  width: 80px;
  padding: 2px;
  display: block;
  /* border: 1px solid #e6e6e6; */
}


.drop-title,
.drop-item {
  border: 1px solid #D9E1E5;
}

.dropdown:hover .drop-item, 
.dropdown:hover .drop-title {
    border-bottom: 0;
    border-color: #0B5A81;

}

.drop-item > *:hover {
    background: #0B5A81;
    color: #fff;
}

.drop-item {
  position: absolute;
  z-index: 1;
}

</style>
