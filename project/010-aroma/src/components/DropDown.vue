<template>
    <div @mouseleave="show_menu = false" class="dropdown" :style="{width:Width + 'px'}">
        <input  v-if="showInput" type="search"
          @keyup="show_menu=true"
          @focus="show_menu=true"
          v-model="keyword"
          placeholder="请搜索"
        >
        <div @mouseenter="show_menu=true" class="drop-area">
          <div v-if="showItemTitle"   class="drop-title">{{selected?selected[displayKey]:itemTitle?itemTitle:'请选择'}}</div>
          <div v-if="result.length&& show_menu" class="drop-item">
              <div @click="select(row)" v-for="(row,index) in  result" :key='index'>{{row[displayKey]}}</div>
          </div>
        </div>
    </div>
</template>
<script>
import api from "../lib/api";
export default {
  props: {
    Width:'',
    showItemTitle:{default:false}, //是否显示下拉框标题
    itemTitle: {}, //下拉选项框默认标题名字
    showInput: {   //是否显示搜索框
      default:false,
    },
    api: {},       //指定搜索api参数，model名，字段等
    list: {        //指定显示选项的数据
      default() {
        return [];
      }
    },
    default: {},
    onSelect: {},  //点击选项时候，父级提供的回调
    primaryKey: {   //
      default: "id"
    },
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
    test() {
      console.log("11");
    },
    //处理传入的api值，eg:'[model].[prop,prop]'
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
    //触发product模块编辑事件时调用
    on_edit_product(row) {
      if (!row || row == null || row == undefined) {
        this.selected = {};
        this.keyword = '';
      }else{
        this.keyword = row[this.displayKey];
        this.selected = row;
      }
    },
    //触发vehicle模块编辑事件时调用
    on_edit_vehicle(row) {
      if (!row) this.selected = {};
      this.selected = row;
    },
    //触发report模块编辑事件时调用
    on_edit_report(row){
      if(!row) this.selected = {};
      this.selected = row;
    },
    set_default() {
      //点击编辑事件，选择一个默认的选项
      //不交互传参
      let key = this.default;
      if (key) {
        let def = this.list.find(row => {
          return row[this.primaryKey] == key;
        });
        this.select(def);
      }
    },
    // 点击选项时触发的函数
    select(row) {
      this.selected = row;

      if(this.showInput)
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
    // this.set_default();
    this.api_conf = this.parse_api();

    let list = this.list;

    list && (this.result = this.list); //为什么要用result引用list
    console.log('this.result',this.result);
    
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
    },
    list(n) {
      this.list = n;
      this.result = this.list;
      console.log('this.result111',this.result);
      
    },
    change_item_title() {
      if (!itemTitle) {
        return itemTitle;
      } else if (selected) {
        return selected[displayKey];
      } else {
        return "请选择";
      }
    }
  }
};
</script>
<style>
.drop-area,
.dropdown input,
.drop-title,
.drop-item {
  width: 100%;
}
.drop-area {
  z-index: 20;
  position: absolute;
  opacity: .9;
}
.dropdown {
  position: relative;
  /* display: inline-block; */
  padding: 10px 0;
}
.dropdown input {
  padding: 3px 5px;
  display: inline-block;
}
.drop-title,
.drop-item {
  background: #fff;
  padding: 2px;
  display: block;
  font-size: 1rem;
  border: 1px solid #d9e1e5;
}
.dropdown:hover .drop-title {
  border-bottom: 0;
}
.dropdown:hover .drop-item,
.dropdown:hover .drop-title {
  border-color: #0b5a81;
}

.drop-item > *:hover {
  background: #0b5a81;
  color: #fff;
}

.drop-item {
  position: absolute;
  z-index: 10;
}
</style>
