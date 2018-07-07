<template>
    <div @mouseleave="show_menu=false" class="dropdown">
        <input type="search"
          @keyup="show_menu=true"
          @focus="show_menu=true"
          v-model="keyword"
          placeholder="请搜索"
        >
        <div v-if="list.length" @click="show_menu=true" class="drop-title">{{selected ? selected[displayKey]:'请选择'}}</div>
        <div v-if="show_menu && result.length" class="drop-item">
            <div @click="select(row)" v-for="(row,index) in  result" :key='index'>{{row[displayKey]}}</div>
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
import api from "../lib/api";
export default {
  props: {
    api: {},
    list: {
      default() {
        return [];
      }
    },
    default: {},
    onSelect: {},
    primaryKey: {
      default: "id"
    },
    selectItem: {},
    displayKey: {
      default: "name"
    }
  },
  data() {
    return {
      api_conf: {},
      result: [],
      selected: "",
      show_menu: false,
      keyword: "",
      timer: null
    };
  },
  methods: {
    test(){
      console.log('11')
    },
    parse_api() {
      let api_prop = this.api;
      if (typeof api_prop != "string") return Object.assign({}, api);
      api_prop = api_prop.split(".");
      let model = api_prop[0];
      let property = api_prop[1];

      property = property.split(",");

      return {
        model,
        property
      };
    },
    //model模块，触发编辑时候，调用
    on_edit_model(row) {
      if (!row) this.selected = {};
      this.selected = row;
    },
    //vehicle模块，触发编辑时候，调用
    on_edit_vehicle(row) {
      if (!row) 
        this.selected = {};
      this.selected = row;
    },
    set_default() {
      let key = this.default;
      if (key) {
        let def = this.list.find(row => {
          return row[this.primaryKey] == key;
        });
        this.select(def);
      }
    },
    select(row) {
      // this.show_menu = false;
      this.selected = row;
      console.log('row',row);
      
      this.keyword = row[this.displayKey];
      if (this.onSelect) 
        this.onSelect(row);
    },
    filter() {
      this.result = Object.assign([], this.list);
      this.result = this.result.filter(row => {
        return row[this.displayKey].indexOf(this.keyword) !== -1;
      });
    },
    search() {
      let condition = {};

      let property = this.api_conf.property;

      if (!property) return;

      property.forEach(prop => {
        condition[prop] = this.keyword;
      });

      clearTimeout(this.timer); //清除计时器

      this.timer = setTimeout(() => {
        api(`${this.api_conf.model}/search`, { or: condition }).then(r => {
          this.result = r.data;
        });
      }, 300);
    }
  },
  mounted() {
    this.set_default();
    this.api_conf = this.parse_api();

    let list = this.list;
    list && (this.result = this.list); //为什么要用result引用list
  },
  watch: {
    keyword() {
      if (this.api) this.search();
      else this.filter();
    },
    default: {
      deep: true,
      handler() {
        this.set_default();
      }
    }
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
  border: 1px solid #d9e1e5;
}

.dropdown:hover .drop-item,
.dropdown:hover .drop-title {
  border-bottom: 0;
  border-color: #0b5a81;
}

.drop-item > *:hover {
  background: #0b5a81;
  color: #fff;
}

.drop-item {
  position: absolute;
  z-index: 1;
}
</style>
